import express from "express";
import { port_http, private_key } from "./config.js";
import sha256 from "crypto-js/sha256.js";
import hmacSHA512 from "crypto-js/hmac-sha512.js";
import Base64 from "crypto-js/enc-base64.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import axios from "axios";

const app = express();
app.use(express.json({ limit: "500000mb" }));
app.use(
  express.urlencoded({
    limit: "500000mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// Définit les 'headers' pour autoriser les requêtes CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Autorise les requêtes venant de l'adresse indiquée
    methods: "OPTIONS, GET, POST, PUT, PUT, DELETE", // Autorise les méthodes indiquées
    allowedHeaders: "Authorization,content-type,X-Requested-With", // Autorise les headers indiqués
  })
);

// **********************************
// Gestion du chat avec les websockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {});
});
// **********************************

// Écoute des requêtes HTTP sur le port 3001
server.listen(port_http, function () {
  console.log("Serveur HTTP démarré sur le port " + port_http);
});

// Accueil
app.get("/Sorties/Populaires", function (req, res) {
  let nbPopulaires = req.query.nbPopulaires;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/sorties/",
    method: "GET",
  };
  axios(options)
    .then((response) => {
      if (response.data.ok) {
        let sorties = response.data.data;
        let sortiesPopulaires = sorties.sort((a, b) => {
          return b.nbVues - a.nbVues;
        });
        sortiesPopulaires = sortiesPopulaires.slice(0, nbPopulaires);
        response.data.data = sortiesPopulaires;
      }
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Sorties
app.get("/Sorties", function (req, res) {
  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/sorties",
    method: "GET",
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 1 Sortie
app.get("/Sortie", function (req, res) {
  let idSortie = req.query.idSortie;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/sorties/" + idSortie,
    method: "GET",
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.put("/Sortie/IncrNbVues", function (req, res) {
  let idSortie = req.query.idSortie;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/sorties/" + idSortie,
    method: "PUT",
    data: {
      nbVues: 1,
    },
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/optionsSortie", function (req, res) {
  let idSortie = req.query.idSortie;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/options/sortie/" + idSortie,
    method: "GET",
  };
  axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/Sortie/Commentaires", function (req, res) {
  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/commentaires/sortie/" + req.query.idSortie,
    method: "GET",
  };
  axios(options)
    .then((response) => {
      let commentaires = response.data.data;
      for (let i = 0; i < commentaires.length; i++) {
        const options2 = {
          url:
            "http://172.24.96.1:8080/utilisateurs/" +
            commentaires[i].pseudoUtilisateur,
          method: "GET",
        };
        axios(options2)
          .then((response) => {
            commentaires[i].nomUtilisateur = response.data.data[0].nom;
            commentaires[i].prenomUtilisateur = response.data.data[0].prenom;
            if (i == commentaires.length - 1) {
              response.data.data = commentaires;
              res.send(response.data);
            }
          })
          .catch((err) => {
            res.send(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
app.post("/Sortie/Commentaire", function (req, res) {
  if (tokenOK(req)) {
    let options = {
      url: "http://172.24.96.1:8080/commentaires",
      method: "POST",
      data: {
        idSortie: req.body.idSortie,
        pseudoUtilisateur: req.body.pseudoUtilisateur,
        commentaire: req.body.commentaire,
        note: req.body.note,
        images: req.body.images,
        dateHeureCreation: req.body.dateHeureCreation,
      },
    };
    axios(options)
      .then((response) => {
        console.log(response);
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.post("/Sortie/Reserver", async function (req, res) {
  if (tokenOK(req)) {
    let idCommande = 0;
    let idOptions = [];
    let options = {
      url: "http://172.24.96.1:8080/commandes/utilisateur/" + req.body.pseudo,
      method: "GET",
    };
    await axios(options)
      .then((response) => {
        idCommande = response.data.data[0]?.idCommande;
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
    if (idCommande == 0) {
      options = {
        url: "http://172.24.96.1:8080/commandes/",
        method: "POST",
        data: {
          pseudoUtilisateur: req.body.pseudo,
        },
      };
      await axios(options)
        .then((response) => {
          idCommande = response.data.data[0]?.idCommande;
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
    for (let i = 0; i < req.body.options.length; i++) {
      idOptions.push(req.body.options[i].idOption);
    }
    console.log("idCommande", idCommande);
    options = {
      url: "http://172.24.96.1:8080/reservations",
      method: "POST",
      data: {
        idSortie: req.body.idSortie,
        nbPersonnes: req.body.nbPersonnes,
        idOptions: idOptions,
        idCommande: idCommande,
      },
    };
    await axios(options)
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});

// Connexion
app.post("/Connexion", async function (req, res) {
  const pseudo = req.body.pseudo;
  const mdp = req.body.mdp;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.24.96.1:8080/utilisateurs/" + pseudo,
    method: "GET",
  };
  let connecte = 0;
  let pseudoUtilisateur;
  await axios(options).then((response) => {
    if (response.data.ok) {
      let utilisateur = response.data.data[0];
      // Récupération du mot de passe haché en base de données
      let mdpBdd = utilisateur.mdp;
      pseudoUtilisateur = utilisateur.pseudo;
      // Hachage (sha256) + salage avec login en préfixe
      const hashDigest = sha256(pseudo + mdp);
      // Hachage (hmacSHA512) + salage avec private_key en suffixe
      const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, private_key));

      // Vérification du mot de passe
      if (mdpBdd == hmacDigest) {
        connecte = pseudo == "admin" ? 1 : 2;
      }
    }
  });

  // connecte = 0 => Connexion KO
  // connecte = 1 => Connexion Admin
  // connecte = 2 => Connexion Utilisateur
  let connexion = false;
  let token, role;
  if (connecte > 0) {
    connexion = true;
    role = connecte == 1 ? "admin" : "utilisateur";
    token = jwt.sign(
      {
        data: {
          role: role,
        },
      },
      private_key,
      { expiresIn: 60 * 60 }
    ); // 60 minutes
  }
  res.send({ connexion, token, role, pseudo: pseudoUtilisateur });
});

// MonCompte
app.get("/MonCompte", async function (req, res) {
  if (tokenOK(req)) {
    const pseudo = req.query.pseudo;
    let obj = {
      ok: true,
      message: "Accès autorisé",
      infos: {},
      commandes: {},
    };
    let options = {
      url: "http://172.24.96.1:8080/utilisateurs/" + pseudo,
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.infos = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/commandes/utilisateur/" + pseudo,
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.commandes = response.data;
      obj.commandes.data = obj.commandes.data.filter(
        (commande) => commande.dateCommande
      );
    });
    for (let i = 0; i < obj.commandes.data.length; i++) {
      options = {
        url:
          "http://172.24.96.1:8080/reservations/commande/" +
          obj.commandes.data[i].idCommande,
        method: "GET",
      };
      await axios(options).then(async (response) => {
        obj.commandes.data[i].reservations = response.data.data;
      });
    }
    for (let i = 0; i < obj.commandes.data.length; i++) {
      for (let j = 0; j < obj.commandes.data[i].reservations.length; j++) {
        options = {
          url:
            "http://172.24.96.1:8080/options/reservation/" +
            obj.commandes.data[i].reservations[j].idReservation,
          method: "GET",
        };
        await axios(options).then(async (response) => {
          obj.commandes.data[i].reservations[j].options = response.data.data;
        });
        options = {
          url:
            "http://172.24.96.1:8080/sorties/" +
            obj.commandes.data[i].reservations[j].idSortie,
          method: "GET",
        };
        await axios(options).then(async (response) => {
          obj.commandes.data[i].reservations[j].sortie = response.data.data[0];
          options = {
            url:
              "http://172.24.96.1:8080/options/sortie/" +
              obj.commandes.data[i].reservations[j].idSortie,
            method: "GET",
          };
          await axios(options).then((response) => {
            obj.commandes.data[i].reservations[j].sortie.options =
              response.data.data;
          });
        });
      }
    }
    res.send(obj);
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.put("/MonCompte/MesInfos", async function (req, res) {
  if (tokenOK(req)) {
    const pseudo = req.body.utilisateur.pseudo;
    const utilisateur = req.body.utilisateur;
    let options = {
      url: "http://172.24.96.1:8080/utilisateurs/" + pseudo,
      method: "PUT",
      data: utilisateur,
    };
    await axios(options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});

// Gestion (admin)
app.get("/Gestion", async function (req, res) {
  if (tokenOK(req, true)) {
    let obj = {
      ok: true,
      message: "Accès autorisé",
      sorties: {},
      options: {},
      commandes: {},
      reservations: {},
      utilisateurs: {},
      commentaires: {},
    };
    // Requête vers le serveur Spring
    let options = {
      url: "http://172.24.96.1:8080/sorties",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.sorties = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/options",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.options = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/commandes",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.commandes = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/reservations",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.reservations = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/utilisateurs",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.utilisateurs = response.data;
    });
    options = {
      url: "http://172.24.96.1:8080/commentaires",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.commentaires = response.data;
    });
    res.send(obj);
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.post("/Gestion", async function (req, res) {
  if (tokenOK(req, true)) {
    const table = req.body.table;
    const maTable = req.body.maTable;
    if (table === "utilisateurs" && maTable.mdp) {
      // Hachage (sha256) + salage avec login en préfixe
      const hashDigest = sha256(maTable.pseudo + maTable.mdp);
      // Hachage (hmacSHA512) + salage avec private_key en suffixe
      maTable.mdp = Base64.stringify(hmacSHA512(hashDigest, private_key));
    } else if (table === "reservations") {
      maTable.idOptions = [];
    }
    let options = {
      url: "http://172.24.96.1:8080/" + table,
      method: "POST",
      data: maTable,
    };
    await axios(options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.put("/Gestion", async function (req, res) {
  if (tokenOK(req, true)) {
    const table = req.body.table;
    const id = req.body.id;
    const maTable = req.body.maTable;
    if (table === "utilisateurs" && maTable.mdp) {
      // Hachage (sha256) + salage avec login en préfixe
      const hashDigest = sha256(maTable.pseudo + maTable.mdp);
      // Hachage (hmacSHA512) + salage avec private_key en suffixe
      maTable.mdp = Base64.stringify(hmacSHA512(hashDigest, private_key));
    } else if (table === "reservations") {
      maTable.idOptions = [];
    }
    let options = {
      url: "http://172.24.96.1:8080/" + table + "/" + id,
      method: "PUT",
      data: maTable,
    };
    await axios(options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.delete("/Gestion", async function (req, res) {
  if (tokenOK(req, true)) {
    const table = req.body.table;
    const id = req.body.id;
    let options = {
      url: "http://172.24.96.1:8080/" + table + "/" + id,
      method: "DELETE",
    };
    await axios(options).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});

// Panier
app.get("/Panier", async function (req, res) {
  if (tokenOK(req)) {
    console.log(req);
    const pseudo = req.query.pseudo;

    // Commande
    let commandes = [];
    let options = {
      url: "http://172.24.96.1:8080/commandes/utilisateur/" + pseudo,
      method: "GET",
    };
    await axios(options).then((response) => {
      console.log(response.data);
      commandes = response.data.data;
    });
    let commande = commandes.find((c) => !c.dateCommande);

    // Réservations
    let reservations = [];
    options = {
      url:
        "http://172.24.96.1:8080/reservations/commande/" + commande.idCommande,
      method: "GET",
    };
    await axios(options).then((response) => {
      reservations = response.data.data;
    });

    for (let i = 0; i < reservations.length; i++) {
      // Sortie
      options = {
        url: "http://172.24.96.1:8080/sorties/" + reservations[i].idSortie,
        method: "GET",
      };
      await axios(options).then((response) => {
        reservations[i].sortie = response.data.data[0];
      });
      // Options
      options = {
        url:
          "http://172.24.96.1:8080/options/reservation/" +
          reservations[i].idReservation,
        method: "GET",
      };
      await axios(options).then((response) => {
        reservations[i].options = response.data.data;
      });
    }
    console.log(reservations);
    res.send(reservations);
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});
app.delete("/Panier", async function (req, res) {
  if (tokenOK(req)) {
    const id = req.body.idReservation;
    let options = {
      url: "http://172.24.96.1:8080/reservations/" + id,
      method: "DELETE",
    };
    await axios(options).then((response) => {
      res.send(response.data);
    });
  } else {
    res.send({ ok: false, message: "Accès refusé" });
  }
});

// Vérifie si le token est valide
function tokenOK(req, admin = false) {
  let valide = false;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      let decoded = jwt.verify(token, private_key);
      let role = decoded.data.role;
      // temps restant en ms
      let exp = decoded.exp * 1000 - Date.now();

      // L'accès est autorisé si :
      // - admin = true, alors si le rôle est 'admin'
      // - le token est valide et si le temps restant est inférieur à 1 heure
      if ((admin ? role == "admin" : true) && exp > 0 && exp < 60 * 60 * 1000) {
        valide = true;
      }
    } catch (e) {
      console.log("tokenOK(): " + e);
    }
  }
  return valide;
}

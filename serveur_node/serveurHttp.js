import express from "express";
import { port_http, private_key } from "./config.js";
import sha256 from "crypto-js/sha256.js";
import hmacSHA512 from "crypto-js/hmac-sha512.js";
import Base64 from "crypto-js/enc-base64.js";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    url: "http://172.23.224.1:8080/sorties/",
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

// 1 Sortie
app.get("/Sortie", function (req, res) {
  let idSortie = req.query.idSortie;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.23.224.1:8080/sorties/" + idSortie,
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
    url: "http://172.23.224.1:8080/sorties/" + idSortie,
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
    url: "http://172.23.224.1:8080/options/sortie/" + idSortie,
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

// Connexion
app.post("/Connexion", async function (req, res) {
  const pseudo = req.body.pseudo;
  const mdp = req.body.mdp;

  // Requête vers le serveur Spring
  const options = {
    url: "http://172.23.224.1:8080/utilisateurs/" + pseudo,
    method: "GET",
  };
  let connecte = 0;
  await axios(options).then((response) => {
    if (response.data.ok) {
      let utilisateur = response.data.data[0];
      // Récupération du mot de passe haché en base de données
      let mdpBdd = utilisateur.mdp;
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
  res.send({ connexion, token, role });
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
      url: "http://172.23.224.1:8080/sorties",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.sorties = response.data;
    });
    options = {
      url: "http://172.23.224.1:8080/options",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.options = response.data;
    });
    options = {
      url: "http://172.23.224.1:8080/commandes",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.commandes = response.data;
    });
    options = {
      url: "http://172.23.224.1:8080/reservations",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.reservations = response.data;
    });
    options = {
      url: "http://172.23.224.1:8080/utilisateurs",
      method: "GET",
    };
    await axios(options).then((response) => {
      obj.utilisateurs = response.data;
    });
    options = {
      url: "http://172.23.224.1:8080/commentaires",
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

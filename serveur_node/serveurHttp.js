import express from "express";
import { port_http, private_key } from "./config.js";
import sha256 from "crypto-js/sha256.js";
import hmacSHA512 from "crypto-js/hmac-sha512.js";
import Base64 from "crypto-js/enc-base64.js";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Écoute des requêtes HTTP sur le port 3001
app.listen(port_http, function () {
  console.log("Serveur HTTP démarré sur le port " + port_http);
});

// Définit les 'headers' pour autoriser les requêtes CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Autorise les requêtes venant de l'adresse indiquée
    methods: "OPTIONS, GET, POST, PUT, PUT, DELETE", // Autorise les méthodes indiquées
    allowedHeaders: "Authorization,content-type,X-Requested-With", // Autorise les headers indiqués
  })
);

// Route par défaut (Accueil)
app.get("/", function (req, res) {
  console.log("Accueil");
});

// Route de connexion
app.post("/Connexion", async function (req, res) {
  // connecte = 0 => Connexion KO
  // connecte = 1 => Connexion Admin
  // connecte = 2 => Connexion Utilisateur
  let connecte = await connexionOK(req);
  let connexion = false;

  let token;
  let role;
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

// Route test d'accès
// Seul l'admin peut accéder à cette route
// L'accès est autorisé si :
// - le rôle est 'admin'
// - le token est valide et si le temps restant est inférieur à 1 heure
app.get("/test", function (req, res) {
  const authHeader = req.headers.authorization;
  let autorise = false;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      let decoded = jwt.verify(token, private_key);
      let role = decoded.data.role;
      // temps restant en ms
      let exp = decoded.exp * 1000 - Date.now();

      if (role == "admin" && exp > 0 && exp < 60 * 60 * 1000) {
        autorise = true;
      }
    } catch (e) {
      console.log('app.get("/test") : ' + e);
    }
  }

  let mess = "";
  if (autorise) {
    mess = "Accès autorisé";
  } else {
    mess = "Accès refusé";
  }
  res.send({ mess });
});

// Vérifie la connexion d'un utilisateur
async function connexionOK(req) {
  const pseudo = req.body.pseudo;
  const mdp = req.body.mdp;

  // TMP =========================
  var connection = await mysql.createConnection({
    host: "mysql-tourgo.alwaysdata.net",
    database: "tourgo_mysql",
    user: "tourgo",
    password: "LCbg.@YeV3NGzfY",
  });
  await connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(
      `select mdp from Utilisateur where pseudo = '${pseudo}'`,
      function (err, rows) {
        if (err || rows.length == 0 || rows[0] == undefined) resolve(0);
        else {
          // Récupération du mot de passe haché en base de données
          let mdpBdd = rows[0].mdp;
          // Hachage (sha256) + salage avec login en préfixe
          const hashDigest = sha256(pseudo + mdp);
          // Hachage (hmacSHA512) + salage avec private_key en suffixe
          const hmacDigest = Base64.stringify(
            hmacSHA512(hashDigest, private_key)
          );

          // Vérification du mot de passe
          if (mdpBdd == hmacDigest) {
            resolve(pseudo == "admin" ? 1 : 2);
          } else {
            resolve(0);
          }
        }
      }
    );
    connection.end();
  });
}

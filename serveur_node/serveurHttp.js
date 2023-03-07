import express from "express";
import { port_http, private_key } from "./config.js";
import sha256 from "crypto-js/sha256.js";
import hmacSHA512 from "crypto-js/hmac-sha512.js";
import Base64 from "crypto-js/enc-base64.js";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Écoute des requêtes HTTP sur le port 3001
app.listen(port_http, function () {
  console.log("Serveur HTTP démarré sur le port " + port_http);
});

app.get("/", function (req, res) {
  console.log("test");
});

app.post("/connexion", function (req, res) {
  console.log("POST connexion");
  let login = req.body.login;
  let mdp = req.body.mdp;

  var connection = mysql.createConnection({
    host: "mysql-tourgo.alwaysdata.net",
    database: "tourgo_mysql",
    user: "tourgo",
    password: "LCbg.@YeV3NGzfY",
  });
  connection.connect();
  connection.query(
    "select mdp from Utilisateur where pseudo = 'admin'",
    function (err, rows) {
      if (err) throw err;
      // Récupération du mot de passe haché en base de données
      let mdpBdd = rows[0].mdp;
      // Hachage (sha256) + salage avec login en préfixe
      const hashDigest = sha256(login + mdp);
      // Hachage (hmacSHA512) + salage avec private_key en suffixe
      const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, private_key));

      // Vérification du mot de passe
      if (mdpBdd == hmacDigest) {
        res.send({ res: true });
      } else {
        res.send({ res: false });
      }
    }
  );
  connection.end();

  // if (login == "admin" && mdp == "admin") {
  //   let ident = "ubo";
  //   let role = "admin";

  //   let token = jwt.sign(
  //     {
  //       data: {
  //         ident: ident,
  //         role: role,
  //       },
  //     },
  //     private_key,
  //     { expiresIn: 60 * 60 }
  //   ); // 60 minutes

  //   res.send({ res: true });
  // } else {
  //   res.send({ res: false });
  // }
});

import React, { useState } from "react";
import "./connexion.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Connexion = () => {
  const [inscription, setInscription] = useState("signUpContainer");
  const [utilisateur, setUtilisateur] = useState({
    nom: "",
    prenom: "",
    mail: "",
    dateNaissance: "",
    pseudo: "",
    mdp: "",
  });

  const showConnexion = () => {
    setInscription("signUpContainer");
  };
  const showInscription = () => {
    setInscription("signUpContainer activeSignUp");
  };
  const seConnecter = () => {
    const options = {
      url: "http://localhost:3001/Connexion",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        pseudo: utilisateur.pseudo,
        mdp: utilisateur.mdp,
      },
    };

    axios(options).then((response) => {
      console.log(response.data.connexion);
      if (response.data.connexion) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        window.location.href = "/";
      }
    });
  };
  const sInscrire = () => {
    console.log("inscrit");
  };

  return (
    <>
      <Navbar navbarTransparente={false} />
      <div className="pageConnexion">
        <div className="containerConnexion">
          {/* Formulaire d'inscription */}
          <div className={inscription}>
            <div className="formConnexion">
              <h1 className="title">Créer un compte</h1>
              <input
                type="text"
                value={utilisateur.nom}
                placeholder="Nom"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, nom: e.target.value });
                }}
              />
              <input
                type="text"
                value={utilisateur.prenom}
                placeholder="Prénom"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, prenom: e.target.value });
                }}
              />
              <input
                type="text"
                value={utilisateur.mail}
                placeholder="Adresse mail"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, mail: e.target.value });
                }}
              />
              <input
                type="date"
                value={utilisateur.dateNaissance}
                onChange={(e) => {
                  setUtilisateur({
                    ...utilisateur,
                    dateNaissance: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                value={utilisateur.pseudo}
                placeholder="Pseudo"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, pseudo: e.target.value });
                }}
              />
              <input
                type="password"
                value={utilisateur.mdp}
                placeholder="Mot de passe"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, mdp: e.target.value });
                }}
              />
              <button className="btn" onClick={sInscrire}>
                S'inscrire
              </button>
            </div>
          </div>

          {/* Formulaire de connexion */}
          <div
            className={
              "signInContainer" +
              (inscription.includes("activeSignUp") ? " activeSignIn" : "")
            }
          >
            <div className="formConnexion">
              <h1 className="title">Se connecter</h1>
              <input
                type="text"
                value={utilisateur.pseudo}
                placeholder="Pseudo"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, pseudo: e.target.value });
                }}
              />
              <input
                type="password"
                value={utilisateur.mdp}
                placeholder="Mot de passe"
                onChange={(e) => {
                  setUtilisateur({ ...utilisateur, mdp: e.target.value });
                }}
              />
              <button className="btn" onClick={seConnecter}>
                Se connecter
              </button>
            </div>
          </div>

          {/* Couvertures */}
          <div
            className={
              "overlayContainer" +
              (inscription.includes("activeSignUp") ? " leftOverlay" : "")
            }
          >
            <div
              className={
                "overlay" +
                (inscription.includes("activeSignUp") ? " left" : "")
              }
            >
              {/* Couverture de connexion */}
              <div
                className={
                  "leftOverlayPanel" +
                  (inscription.includes("activeSignUp") ? " leftTrue" : "")
                }
              >
                <h1>Content de vous revoir !</h1>
                <p>
                  Pour s'inscrire à une sortie ou visualiser vos commandes,
                  veuillez vous connecter.
                </p>
                <button className="ghostBtn" onClick={showConnexion}>
                  Se connecter
                </button>
              </div>

              {/* Couverture d'inscription */}
              <div
                className={
                  "rightOverlayPanel" +
                  (inscription.includes("activeSignUp") ? " rightTrue" : "")
                }
              >
                <h1>Bonjour et bienvenue !</h1>
                <p>
                  Entrez quelques informations pour pouvoir vous inscrire à une
                  sortie.
                </p>
                <button className="ghostBtn" onClick={showInscription}>
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connexion;

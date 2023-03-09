import React, { useState } from "react";
import "./connexion.css";
import Navbar from "../../components/Navbar/Navbar";

const Connexion = () => {
  const [inscription, setInscription] = useState("signUpContainer");

  const showConnexion = () => {
    setInscription("signUpContainer");
  };
  const showInscription = () => {
    setInscription("signUpContainer activeSignUp");
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
              <input type="text" placeholder="Nom" />
              <input type="text" placeholder="Prénom" />
              <input type="text" placeholder="Adresse mail" />
              <input type="date" />
              <input type="text" placeholder="Pseudo" />
              <input type="password" placeholder="Mot de passe" />
              <button className="btn" onClick={() => console.log("inscrit")}>
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
              <input type="text" placeholder="Pseudo" />
              <input type="password" placeholder="Mot de passe" />
              <button className="btn" onClick={() => console.log("connecté")}>
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

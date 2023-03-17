import React, { useState, useEffect } from "react";
import "./moncompte.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import Reservation from "../../components/Reservation/Reservation";
import axios from "axios";

const MonCompte = () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  };

  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });

    // Récupération des sorties les plus populaires
    let options = {
      url: "http://localhost:3001/MonCompte",
      method: "GET",
      headers: headers,
      params: {
        pseudo: sessionStorage.getItem("pseudo"),
      },
    };
    axios(options).then((response) => {
      if (response.data.ok) {
        setUtilisateur(response.data.infos.data[0]);
        setCommandes(response.data.commandes.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [utilisateur, setUtilisateur] = useState({
    pseudo: "",
    mdp: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    mail: "",
    nouveauMdp: "",
    confirmationMdp: "",
  });
  const [commandes, setCommandes] = useState([]);

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="monCompteSection flex">
        <div className="secContainer">
          <h1 className="titre" data-aos="fade-right">
            Mes informations
          </h1>
          <div className="formulaire grid">
            <div className="input grid">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                value={utilisateur.pseudo}
                disabled
              />
            </div>
            <div className="input grid">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={utilisateur.nom}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, nom: e.target.value })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                value={utilisateur.prenom}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, prenom: e.target.value })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="dateNaissance">Date de naissance</label>
              <input
                type="date"
                name="dateNaissance"
                id="dateNaissance"
                value={utilisateur.dateNaissance}
                onChange={(e) =>
                  setUtilisateur({
                    ...utilisateur,
                    dateNaissance: e.target.value,
                  })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={utilisateur.mail}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, mail: e.target.value })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="mdp">Mot de passe</label>
              <input
                type="password"
                name="mdp"
                id="mdp"
                value={utilisateur.mdp}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, mdp: e.target.value })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="nouveauMdp">Nouveau mot de passe</label>
              <input
                type="password"
                name="nouveauMdp"
                id="nouveauMdp"
                value={utilisateur.nouveauMdp}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, nouveauMdp: e.target.value })
                }
              />
            </div>
            <div className="input grid">
              <label htmlFor="confirmationMdp">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="confirmationMdp"
                id="confirmationMdp"
                value={utilisateur.confirmationMdp}
                onChange={(e) =>
                  setUtilisateur({
                    ...utilisateur,
                    confirmationMdp: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button
            className="btn btnValider"
            onClick={async (e) => {
              if (utilisateur.nouveauMdp !== utilisateur.confirmationMdp) {
                alert(
                  "La confirmation du nouveau mot de passe est différent du nouveau mot de passe !"
                );
              } else {
                let options = {
                  url: "http://localhost:3001/MonCompte/MesInfos",
                  method: "PUT",
                  headers: headers,
                  data: {
                    utilisateur: utilisateur,
                  },
                };
                await axios(options).then((response) => {
                  if (response.data.ok) {
                    setUtilisateur(response.data.data[0]);
                  }
                });
              }
            }}
          >
            Modifier mes informations
          </button>
          <h1 className="titre" data-aos="fade-left">
            Mes commandes
          </h1>
          <div className="commandes grid">
            {commandes.map((commande) => (
              <div className="commande grid" key={commande.idCommande}>
                <h2 className="titreCommande">
                  Commande du {commande.dateCommande}
                </h2>
                {commande.reservations.map((reservation) => (
                  <Reservation
                    reservation={reservation}
                    key={reservation.idReservation}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MonCompte;

import React, { useState, useEffect } from "react";
import "./moncompte.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import Reservation from "../../components/Reservation/Reservation";

const MonCompte = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  const [utilisateur, setUtilisateur] = useState({
    pseudo: "mon_pseudo",
    nom: "mon_nom",
    prenom: "mon_prenom",
    dateNaissance: "2001-07-01",
    email: "monemail@gmail.com",
    mdp: "",
    nouveauMdp: "",
    confirmationMdp: "",
  });

  const [commandes, setCommandes] = useState([
    {
      idCommande: 1,
      dateCommande: "2021-01-01",
      reservations: [
        {
          idReservation: 1,
          nbPersonnes: 5,
          sortie: {
            idSortie: 1,
            nomSortie: "Journée au Puy du Fou",
            descriptionSortie: "description plus ou moins longue de la sortie",
            prixSortie: 50,
            nbPlaces: 600,
            nbInscrits: 150,
            date: "05/06/2023",
            heure: "08h00",
            duree: "02h00",
            lieu: "52 Rue Albirt Loutte, 92900 Brets.",
            image: "https://picsum.photos/1920/1080",
          },
          options: [
            {
              idOption: 1,
              nomOption: "Option 1",
              prixOption: 2,
            },
            {
              idOption: 2,
              nomOption: "Option 2",
              prixOption: 3,
            },
          ],
        },
        {
          idReservation: 2,
          nbPersonnes: 1,
          sortie: {
            idSortie: 2,
            nomSortie: "La transléonarde",
            descriptionSortie: "description plus ou moins longue de la sortie",
            prixSortie: 30,
            nbPlaces: 600,
            nbInscrits: 150,
            date: "05/06/2023",
            heure: "08h00",
            duree: "02h00",
            lieu: "52 Rue Albirt Loutte, 92900 Brets.",
            image: "https://picsum.photos/1920/1080",
          },
          options: [],
        },
        {
          idReservation: 3,
          nbPersonnes: 2,
          sortie: {
            idSortie: 3,
            nomSortie: "Balade en forêt",
            descriptionSortie: "description plus ou moins longue de la sortie",
            prixSortie: 2,
            nbPlaces: 600,
            nbInscrits: 150,
            date: "05/06/2023",
            heure: "08h00",
            duree: "02h00",
            lieu: "52 Rue Albirt Loutte, 92900 Brets.",
            image: "https://picsum.photos/1920/1080",
          },
          options: [
            {
              idOption: 1,
              nomOption: "Option 1",
              prixOption: 1.5,
            },
          ],
        },
      ],
    },
    {
      idCommande: 2,
      dateCommande: "2021-05-15",
      reservations: [
        {
          idReservation: 1,
          nbPersonnes: 5,
          sortie: {
            idSortie: 1,
            nomSortie: "Journée au Puy du Fou",
            descriptionSortie: "description plus ou moins longue de la sortie",
            prixSortie: 50,
            nbPlaces: 600,
            nbInscrits: 150,
            date: "05/06/2023",
            heure: "08h00",
            duree: "02h00",
            lieu: "52 Rue Albirt Loutte, 92900 Brets.",
            image: "https://picsum.photos/1920/1080",
          },
          options: [
            {
              idOption: 1,
              nomOption: "Option 1",
              prixOption: 2,
            },
            {
              idOption: 2,
              nomOption: "Option 2",
              prixOption: 3,
            },
          ],
        },
        {
          idReservation: 2,
          nbPersonnes: 1,
          sortie: {
            idSortie: 2,
            nomSortie: "La transléonarde",
            descriptionSortie: "description plus ou moins longue de la sortie",
            prixSortie: 30,
            nbPlaces: 600,
            nbInscrits: 150,
            date: "05/06/2023",
            heure: "08h00",
            duree: "02h00",
            lieu: "52 Rue Albirt Loutte, 92900 Brets.",
            image: "https://picsum.photos/1920/1080",
          },
          options: [],
        },
      ],
    },
  ]);

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
                value={utilisateur.email}
                onChange={(e) =>
                  setUtilisateur({ ...utilisateur, email: e.target.value })
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
            onClick={(e) => {
              if (utilisateur.nouveauMdp !== utilisateur.confirmationMdp) {
                alert(
                  "La confirmation du nouveau mot de passe est différent du nouveau mot de passe !"
                );
              } else {
                console.log(utilisateur);
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

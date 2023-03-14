import React, { useEffect, useState } from "react";
import "./panier.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import Reservation from "../../components/Reservation/Reservation";

const Panier = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  const [reservations, setReservations] = useState([
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
  ]);

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="panierSection flex">
        <div className="secContainer">
          <h1 className="titre">Panier</h1>
          <div className="panier grid">
            {reservations.map((reservation) => (
              <Reservation
                reservation={reservation}
                deleteCallback={(idResa) => {
                  setReservations(
                    reservations.filter((res) => res.idReservation !== idResa)
                  );
                }}
              />
            ))}
          </div>
          <div className="total flex">
            <p className="totalNom">Total :&nbsp;</p>
            <p className="totalPrix">
              {reservations.reduce(
                (acc, res) =>
                  acc +
                  res.sortie.prixSortie * res.nbPersonnes +
                  res.options.reduce(
                    (acc, option) => acc + option.prixOption,
                    0
                  ) *
                    res.nbPersonnes,
                0
              )}{" "}
              €
            </p>
          </div>
          <button
            className="btn btnValider"
            onClick={(e) => {
              setReservations([]);
            }}
          >
            Valider
          </button>
        </div>
      </section>
    </>
  );
};

export default Panier;

import React, { useEffect, useState } from "react";
import "./panier.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";

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
              <div className="reservation flex">
                <div className="reservationInfosGaucheImage">
                  <img
                    src={reservation.sortie.image}
                    alt={reservation.sortie.nomSortie}
                  />
                </div>
                <div className="reservationInfos flex">
                  <div className="reservationInfosGauche grid">
                    <div className="reservationInfosGaucheTexte">
                      <h2>{reservation.sortie.nomSortie}</h2>
                    </div>
                    <div className="infoResa">
                      <div className="reservationPrix flex">
                        <p>Prix :&nbsp;</p>
                        <p>{reservation.sortie.prixSortie} €</p>
                      </div>
                      {
                        // affichage des options si il y en a
                        reservation.options.length > 0 && (
                          <div className="optionsDiv">
                            <p>Options : </p>
                            <div className="reservationOptions grid">
                              {reservation.options.map((option) => (
                                <div className="option flex">
                                  <div className="optionNom flex">
                                    <p>{option.nomOption}</p>
                                  </div>
                                  <div className="optionPrix flex">
                                    <p>{option.prixOption} €</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="reservationInfosDroitePrix flex">
                      <p className="nbPersonnes">
                        {reservation.nbPersonnes} personne
                        {reservation.nbPersonnes > 1 && "s"}
                      </p>
                      {/* affichage du prix de la sortie + le prix des options */}
                      <p className="prixOptions">
                        {reservation.options.reduce(
                          (acc, option) => acc + option.prixOption,
                          0
                        ) *
                          reservation.nbPersonnes +
                          reservation.sortie.prixSortie *
                            reservation.nbPersonnes}{" "}
                        €
                      </p>
                    </div>
                  </div>
                  <div className="reservationInfosDroite grid">
                    <BsArrowRightShort
                      className="icon seeIcon"
                      onClick={() =>
                        (window.location.href =
                          "/Sortie?id=" + reservation.sortie.idSortie)
                      }
                    />
                    <RiDeleteBin6Line
                      className="icon deleteIcon"
                      onClick={() => {
                        let resas = reservations.filter(
                          (res) =>
                            res.idReservation !== reservation.idReservation
                        );
                        setReservations(resas);
                      }}
                    />
                  </div>
                </div>
              </div>
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

import React from "react";
import "./reservation.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";

const Reservation = ({ reservation, deleteCallback }) => {
  return (
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
                reservation.sortie.prixSortie * reservation.nbPersonnes}{" "}
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
            onClick={() => deleteCallback(reservation.idReservation)}
          />
        </div>
      </div>
    </div>
  );
};

export default Reservation;

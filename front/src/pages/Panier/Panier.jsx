import React, { useEffect, useState } from "react";
import "./panier.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import Reservation from "../../components/Reservation/Reservation";
import axios from "axios";

const Panier = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });

    // Récupération des réservations en cours
    const optionsHttp = {
      url: "http://localhost:3001/Panier",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      params: {
        pseudo: sessionStorage.getItem("pseudo"),
      },
    };
    axios(optionsHttp).then((response) => {
      setReservations(response.data);
    });
  }, []);

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="panierSection flex">
        <div className="secContainer">
          <h1 className="titre">Panier</h1>
          <div className="panier grid">
            {reservations?.map((reservation) => (
              <Reservation
                reservation={reservation}
                deleteCallback={async () => {
                  const optionsHttp = {
                    url: "http://localhost:3001/Panier",
                    method: "DELETE",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json;charset=UTF-8",
                      Authorization:
                        "Bearer " + sessionStorage.getItem("token"),
                    },
                    data: {
                      idReservation: reservation.idReservation,
                    },
                  };
                  await axios(optionsHttp).then((response) => {});
                  const optionsHttp2 = {
                    url: "http://localhost:3001/Panier",
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json;charset=UTF-8",
                      Authorization:
                        "Bearer " + sessionStorage.getItem("token"),
                    },
                    params: {
                      pseudo: sessionStorage.getItem("pseudo"),
                    },
                  };
                  await axios(optionsHttp2).then((response) => {
                    setReservations(response.data);
                  });
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

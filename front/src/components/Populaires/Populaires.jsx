import React, { useEffect, useState } from "react";
import "./populaires.css";
import Aos from "aos";
import "aos/dist/aos.css";
import CarteSortie from "../CarteSortie/CarteSortie";
import axios from "axios";

const Populaires = () => {
  const [sorties, setSorties] = useState([]);

  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });

    // Récupération des sorties les plus populaires
    const options = {
      url: "http://localhost:3001/Sorties/Populaires",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        nbPopulaires: 3,
      },
    };

    axios(options).then((response) => {
      if (response.data.ok) {
        setSorties(response.data.data);
      }
    });
  }, []);

  return (
    <section className="popular section container">
      <div className="secContainer">
        {/* Titre et sous-titre */}
        <div className="secHeader">
          <div className="textDiv">
            <h2 data-aos="fade-right" className="secTitle">
              Sorties populaires
            </h2>
            <p data-aos="fade-left" data-aos-duration="2500">
              Des visites de châteaux historiques aux explorations de grottes
              souterraines, venez découvrir les meilleures sorties du
              Finistère&nbsp;!
            </p>
          </div>
        </div>

        {/* Cartes des sorties les plus populaires */}
        <div className="mainContent grid">
          {sorties.map((sortie, index) => (
            <CarteSortie
              sortie={{
                titre: "0" + (index + 1),
                infoSupp: sortie.nomSortie,
                date: sortie.date,
                lieu: sortie.lieu,
                image: sortie.image,
                idSortie: sortie.idSortie,
              }}
              fade={
                index === 0
                  ? "fade-right"
                  : index === 1
                  ? "fade-up"
                  : "fade-left"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Populaires;

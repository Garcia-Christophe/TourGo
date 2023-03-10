import React, { useEffect } from "react";
import "./populaires.css";
import BG from "../../assets/fondEcranAccueil.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import CarteSortie from "../CarteSortie/CarteSortie";

const sorties = [
  {
    titre: "La transléonarde",
    date: "05/06/2023",
    lieu: "A côté du terrain de Pontivy.",
    image: BG,
  },
  {
    titre: "Puy du Fou",
    date: "05/06/2023",
    lieu: "A côté du terrain de Pontivy.",
    image: BG,
  },
  {
    titre: "Le Fort du Petit minou",
    date: "05/06/2023",
    lieu: "A côté du terrain de Pontivy.",
    image: BG,
  },
];

const Populaires = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
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
                infoSupp: sortie.titre,
                date: sortie.date,
                lieu: sortie.lieu,
                image: sortie.image,
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

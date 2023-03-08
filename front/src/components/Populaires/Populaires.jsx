import React, { useEffect } from "react";
import "./populaires.css";
import BG from "../../assets/fondEcranAccueil.jpg";
import { BsArrowRightShort } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";

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
            <div
              data-aos={
                index === 0
                  ? "fade-right"
                  : index === 1
                  ? "fade-up"
                  : "fade-left"
              }
              data-aos-duration="1000"
              className="singleDestination"
            >
              <div className="destImage">
                <img src={sortie.image} alt={sortie.titre} />
                <div className="overlayInfo">
                  <h3>Le {sortie.date}</h3>
                  <p>{sortie.lieu}</p>

                  <BsArrowRightShort className="icon" />
                </div>
              </div>
              <div className="destFooter">
                <div className="number">0{index + 1}</div>
                <div className="destText flex">
                  <h6>{sortie.titre}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Populaires;

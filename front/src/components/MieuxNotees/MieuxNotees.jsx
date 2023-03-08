import React, { useEffect } from "react";
import "./mieuxNotees.css";
import BG from "../../assets/fondEcranAccueil.jpg";
import { BsArrowRightShort } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";

const sorties = [
  {
    titre: "La transléonarde",
    description: "Une description de la sortie qui sera affichée ici.",
    image: BG,
  },
  {
    titre: "Puy du Fou",
    description: "Une description de la sortie qui sera affichée ici.",
    image: BG,
  },
  {
    titre: "Le Fort du Petit minou",
    description: "Une description de la sortie qui sera affichée ici.",
    image: BG,
  },
  {
    titre: "Le Jardin du Concervatoire Botanique",
    description: "Une description de la sortie qui sera affichée ici.",
    image: BG,
  },
];

const MieuxNotees = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="mieuxNotees container section">
      <div className="secContainer">
        <div className="secIntro">
          <h2 data-aos="fade-right" className="secTitle">
            Les mieux notées
          </h2>
          <p data-aos="fade-left" data-aos-duration="2500">
            <span className="pourcentage">92 %</span> des touristes sont
            satisfaits de leurs sorties avec TourGo&nbsp;!
          </p>
        </div>

        <div className="mainContainer grid">
          {sorties.map((sortie) => (
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="singlePost grid"
            >
              <div className="imgDiv">
                <img src={sortie.image} alt={sortie.titre} />
              </div>

              <div className="postDetails">
                <h3 data-aos="fade-up" data-aos-duration="1100">
                  {sortie.titre}
                </h3>
                <p data-aos="fade-up" data-aos-duration="1200">
                  {sortie.description}
                </p>
              </div>

              <a
                href="/"
                data-aos="fade-up"
                data-aos-duration="1300"
                className="flex"
              >
                En savoir plus
                <BsArrowRightShort className="icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MieuxNotees;

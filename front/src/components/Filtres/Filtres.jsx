import React, { useEffect, useState } from "react";
import "./filtres.css";
import Aos from "aos";
import "aos/dist/aos.css";

const Filtres = () => {
  useEffect(() => {
    // Personnalisation de la barre de progression
    for (let e of document.querySelectorAll(
      'input[type="range"].slider-progress'
    )) {
      e.style.setProperty("--value", e.value);
      e.style.setProperty("--min", e.min === "" ? "0" : e.min);
      e.style.setProperty("--max", e.max === "" ? "100" : e.max);
      e.addEventListener("input", () =>
        e.style.setProperty("--value", e.value)
      );
    }

    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  const [prixMax, setPrixMax] = useState(1000);

  return (
    <section className="accueil">
      <div className="secContainer container">
        {/* Titre, sous-titre, bouton Découvrir */}
        <div className="homeText">
          <h1 data-aos="fade-up" className="title">
            Réservez votre sortie avec Route Go
          </h1>
          <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
            Découvrez de nouveaux endroits et de nouvelles personnes !
          </p>
          <button data-aos="fade-up" data-aos-duration="3000" className="btn">
            <a href="/">Découvrir</a>
          </button>
        </div>

        {/* Recherche des sorties par filtres */}
        <div className="accueilCard grid">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="dateDebutDiv"
          >
            <label htmlFor="dateDebut">Date de début :</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="dateFinDiv"
          >
            <label htmlFor="dateFin">Date de fin :</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>
          <div className="prixDiv">
            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="label_total flex"
            >
              <label htmlFor="prix">Prix max :</label>
              <h3 className="total">{prixMax} €</h3>
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="3000"
              className="input flex"
            >
              <input
                type="range"
                min="0"
                max="1000"
                value={prixMax}
                step="10"
                className="styled-slider slider-progress"
                onChange={(e) => setPrixMax(e.target.value)}
              />
            </div>
          </div>
          <button className="btn">Rechercher</button>
        </div>
      </div>
    </section>
  );
};

export default Filtres;

import React, { useEffect, useState } from "react";
import "./sorties.css";
import Navbar from "../../components/Navbar/Navbar";
import CarteSortie from "../../components/CarteSortie/CarteSortie";
import Aos from "aos";
import "aos/dist/aos.css";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import axios from "axios";

const Sorties = () => {
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

    // Récupération des sorties
    let options = {
      url: "http://localhost:3001/Sorties",
      method: "GET",
    };
    axios(options).then((response) => {
      if (response.data.ok) {
        setSorties(response.data.data);
      }
    });
  }, []);

  const [sorties, setSorties] = useState([]); // liste des sorties affichées
  const nbSortiesAffichees = 9; // nombre de sorties affichées par page
  const [indexPremiereSortie, setIndexPremiereSortie] = useState(0); // index de la première sortie affichée

  const [dateDebut, setDateDebut] = useState(""); // date à partir de laquelle on veut voir les sorties
  const [dateFin, setDateFin] = useState(""); // date jusqu'à laquelle on veut voir les sorties
  const [prixMax, setPrixMax] = useState(1000); // 0 - 1000 €
  const [dureeMax, setDureeMax] = useState(72); // 72h = 3 jours
  const [disponibilite, setDisponibilite] = useState("Toutes"); // Toutes, Places restantes, Complètes
  const [periode, setPeriode] = useState("Toutes"); // Toutes, Passées, A venir

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="page-sorties flex">
        {/* Filtres */}
        <section className="sortiesFiltresContainer">
          <div className="secContainer container">
            {/* Recherche des sorties par filtres */}
            <div className="filtresPart grid">
              {/* Filtres : date de début, date de fin. Type : date picker */}
              <div className="filtresDates">
                <div className="dateDebutDiv">
                  <label htmlFor="dateDebut">Date de début :</label>
                  <div className="input flex">
                    <input
                      type="date"
                      value={dateDebut}
                      onChange={(e) => setDateDebut(e.target.value)}
                    />
                  </div>
                </div>
                <div className="dateFinDiv">
                  <label htmlFor="dateFin">Date de fin :</label>
                  <div className="input flex">
                    <input
                      type="date"
                      value={dateFin}
                      onChange={(e) => setDateFin(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* Filtres : prix max, durée max. Type : progress bar */}
              <div className="filtresPrixDuree">
                <div className="filtresPrix">
                  <div className="label_total flex">
                    <label htmlFor="prix">Prix max :</label>
                    <h3 className="total">{prixMax} €</h3>
                  </div>
                  <div className="input flex">
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
                <div className="filtresDuree">
                  <div className="label_duree flex">
                    <label htmlFor="prix">Durée max :</label>
                    <h3 className="duree">{dureeMax} h</h3>
                  </div>
                  <div className="input flex">
                    <input
                      type="range"
                      min="0"
                      max="72"
                      value={dureeMax}
                      className="styled-slider slider-progress"
                      onChange={(e) => setDureeMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* Filtres : disponibilités, période. Type : radio buttons */}
              <div className="filtresDispoPeriode">
                <div className="filtresDispo">
                  <label htmlFor="disponibilite">Disponibilités :</label>
                  <div className="radioBtns flex">
                    <div className="dispo-toutes">
                      <label>
                        <input
                          type="radio"
                          value="Toutes"
                          checked={disponibilite === "Toutes"}
                          onChange={(e) => setDisponibilite(e.target.value)}
                        />
                        &nbsp;Toutes
                      </label>
                    </div>
                    <div div className="dispo-places-restantes">
                      <label>
                        <input
                          type="radio"
                          value="Places restantes"
                          checked={disponibilite === "Places restantes"}
                          onChange={(e) => setDisponibilite(e.target.value)}
                        />
                        &nbsp;Places restantes
                      </label>
                    </div>
                    <div className="dispo-completes">
                      <label>
                        <input
                          type="radio"
                          value="Completes"
                          checked={disponibilite === "Completes"}
                          onChange={(e) => setDisponibilite(e.target.value)}
                        />
                        &nbsp;Complètes
                      </label>
                    </div>
                  </div>
                </div>
                <div className="filtresPeriode">
                  <label htmlFor="periode">Période :</label>
                  <div className="radioBtns flex">
                    <div className="periode-toutes">
                      <label>
                        <input
                          type="radio"
                          value="Toutes"
                          checked={periode === "Toutes"}
                          onChange={(e) => setPeriode(e.target.value)}
                        />
                        &nbsp;Toutes
                      </label>
                    </div>
                    <div div className="periode-passees">
                      <label>
                        <input
                          type="radio"
                          value="Passées"
                          checked={periode === "Passées"}
                          onChange={(e) => setPeriode(e.target.value)}
                        />
                        &nbsp;Passées
                      </label>
                    </div>
                    <div className="periode-a-venir">
                      <label>
                        <input
                          type="radio"
                          value="A venir"
                          checked={periode === "A venir"}
                          onChange={(e) => setPeriode(e.target.value)}
                        />
                        &nbsp;A venir
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnDiv flex">
              <button data-aos="fade-up" className="btn">
                Rechercher
              </button>
            </div>
          </div>
        </section>

        {/* Liste des cartes Sorties */}
        <section className="sortiesSortiesContainer">
          <div className="secContainer">
            {/* Titre, sous-titre et flèches */}
            <div className="secHeader flex">
              <div data-aos="fade-right" className="textDiv">
                <h2 className="secTitle">Toutes les sorties</h2>
                <p>Trouvez la sortie qui vous correspond !</p>
              </div>
              <div data-aos="fade-left" className="iconsDiv flex">
                <BsArrowLeftShort
                  className="icon leftIcon"
                  onClick={() => {
                    if (indexPremiereSortie > 0) {
                      setIndexPremiereSortie(
                        indexPremiereSortie - nbSortiesAffichees
                      );
                    }
                  }}
                />
                <BsArrowRightShort
                  className="icon"
                  onClick={() => {
                    if (
                      sorties.length >
                      indexPremiereSortie + nbSortiesAffichees
                    ) {
                      setIndexPremiereSortie(
                        indexPremiereSortie + nbSortiesAffichees
                      );
                    }
                  }}
                />
              </div>
            </div>
            {/* 9 cartes sorties (maximum) correspondantes */}
            <div className="cartesSorties grid">
              {sorties.map((sortie, index) => {
                if (
                  index >= indexPremiereSortie &&
                  index < indexPremiereSortie + nbSortiesAffichees
                )
                  return (
                    <CarteSortie
                      sortie={{
                        idSortie: sortie.idSortie,
                        titre: sortie.nomSortie,
                        infoSupp: sortie.descriptionSortie,
                        date: sortie.date,
                        lieu: sortie.lieu,
                        image: sortie.image,
                      }}
                      fade="fade-up"
                      fadeDuration={1000}
                    />
                  );
                else return null;
              })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Sorties;

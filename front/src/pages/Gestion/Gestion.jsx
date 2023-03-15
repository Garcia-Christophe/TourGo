import React, { useState, useEffect } from "react";
import "./gestion.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";

const Gestion = () => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  const [onglet, setOnglet] = useState(1);

  const [utilisateurs, setUtilisateurs] = useState([
    {
      pseudo: "mon_pseudo",
      nom: "mon_nom",
      prenom: "mon_prenom",
      dateNaissance: "2001-07-01",
      email: "albus.dumbledore@gmail.com",
      mdp: "",
    },
    {
      pseudo: "mon_pseudo2",
      nom: "mon_nom2",
      prenom: "mon_prenom2",
      dateNaissance: "2001-07-02",
      email: "222",
      mdp: "",
    },
  ]);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState({
    pseudo: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    mdp: "",
  });
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    pseudo: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    mdp: "",
  });
  const [commandes, setCommandes] = useState([
    {
      idCommande: 1,
      dateCommande: "2021-01-01",
      pseudoUtilisateur: "mon_pseudo",
    },
    {
      idCommande: 2,
      dateCommande: "2021-01-02",
      pseudoUtilisateur: "mon_pseudo",
    },
    {
      idCommande: 3,
      dateCommande: "2021-01-03",
      pseudoUtilisateur: "mon_pseudo2",
    },
  ]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState({
    idCommande: "",
    dateCommande: "",
    pseudoUtilisateur: "",
  });
  const [nouvelleCommande, setNouvelleCommande] = useState({
    idCommande: "",
    dateCommande: "",
    pseudoUtilisateur: "",
  });
  const [reservations, setReservations] = useState([
    {
      idReservation: 1,
      nbPersonnes: 5,
      idSortie: 1,
      idCommande: 1,
    },
    {
      idReservation: 2,
      nbPersonnes: 1,
      idSortie: 2,
      idCommande: 1,
    },
    {
      idReservation: 3,
      nbPersonnes: 2,
      idSortie: 3,
      idCommande: 1,
    },
    {
      idReservation: 4,
      nbPersonnes: 3,
      idSortie: 1,
      idCommande: 2,
    },
  ]);
  const [reservationSelectionnee, setReservationSelectionnee] = useState({
    idReservation: "",
    nbPersonnes: "",
    idSortie: "",
    idCommande: "",
  });
  const [nouvelleReservation, setNouvelleReservation] = useState({
    idReservation: "",
    nbPersonnes: "",
    idSortie: "",
    idCommande: "",
  });
  const [sorties, setSorties] = useState([
    {
      idSortie: 1,
      nomSortie: "Journée au Puy du Fou",
      descriptionSortie: "description plus ou moins longue de la sortie",
      prixSortie: 50,
      nbPlaces: 600,
      nbInscrits: 150,
      date: "2023-06-05",
      heure: "08:00:00",
      duree: "06:00:00",
      lieu: "52 Rue Albirt Loutte, 92900 Brets.",
      image: "https://picsum.photos/1920/1080",
      nbVues: 5,
    },
    {
      idSortie: 2,
      nomSortie: "Journée2 au Puy du Fou",
      descriptionSortie: "description plus ou moins longue de la sortie",
      prixSortie: 50,
      nbPlaces: 600,
      nbInscrits: 150,
      date: "2023-06-05",
      heure: "08:00:00",
      duree: "06:00:00",
      lieu: "52 Rue Albirt Loutte, 92900 Brets.",
      image: "https://picsum.photos/1920/1080",
      nbVues: 3,
    },
    {
      idSortie: 3,
      nomSortie: "Journée3 au Puy du Fou",
      descriptionSortie: "description plus ou moins longue de la sortie",
      prixSortie: 50,
      nbPlaces: 600,
      nbInscrits: 150,
      date: "2023-06-05",
      heure: "08:00:00",
      duree: "06:00:00",
      lieu: "52 Rue Albirt Loutte, 92900 Brets.",
      image: "https://picsum.photos/1920/1080",
      nbVues: 7,
    },
  ]);
  const [sortieSelectionnee, setSortieSelectionnee] = useState({
    idSortie: 0,
    nomSortie: "",
    descriptionSortie: "",
    prixSortie: 0,
    nbPlaces: 1,
    date: "",
    heure: "",
    duree: "",
    lieu: "",
    image: "",
  });
  const [nouvelleSortie, setNouvelleSortie] = useState({
    idSortie: 0,
    nomSortie: "",
    descriptionSortie: "",
    prixSortie: 0,
    nbPlaces: 1,
    date: "",
    heure: "",
    duree: "",
    lieu: "",
    image: "",
  });
  const [options, setOptions] = useState([
    {
      idOption: 1,
      nomOption: "Option 1",
      prixOption: 10,
      idSortie: 1,
    },
    {
      idOption: 2,
      nomOption: "Option 2",
      prixOption: 2,
      idSortie: 1,
    },
    {
      idOption: 3,
      nomOption: "Option 3",
      prixOption: 3,
      idSortie: 1,
    },
    {
      idOption: 4,
      nomOption: "Option 1",
      prixOption: 1,
      idSortie: 2,
    },
  ]);
  const [optionSelectionnee, setOptionSelectionnee] = useState({
    idOption: "",
    nomOption: "",
    prixOption: "",
    idSortie: "",
  });
  const [nouvelleOption, setNouvelleOption] = useState({
    idOption: "",
    nomOption: "",
    prixOption: "",
    idSortie: "",
  });
  const [commentaires, setCommentaires] = useState([
    {
      pseudoUtilisateur: "mon_pseudo",
      idSortie: 1,
      note: 4,
      commentaire: "Très bien, je recommande !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: ["https://picsum.photos/1920/1080"],
    },
    {
      pseudoUtilisateur: "mon_pseudo",
      idSortie: 2,
      note: 5,
      commentaire: "Très bien, je recommande !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: [],
    },
    {
      pseudoUtilisateur: "mon_pseudo2",
      idSortie: 2,
      note: 1,
      commentaire: "Organisation à revoir, à changer je dirais même !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: [
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
      ],
    },
  ]);
  const [commentaireSelectionne, setCommentaireSelectionne] = useState({
    pseudoUtilisateur: "",
    idSortie: "",
    note: "",
    commentaire: "",
    dateHeureCreation: "",
    images: [],
  });
  const [nouveauCommentaire, setNouveauCommentaire] = useState({
    pseudoUtilisateur: "",
    idSortie: "",
    note: "",
    commentaire: "",
    dateHeureCreation: "",
    images: [],
  });

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="gestionSection">
        <div className="secContainer">
          <h1 className="titre" data-aos="fade-right">
            Gestion
          </h1>
          <div className="gestionOnglets">
            <div className="bloc-onglets">
              <button
                className={onglet === 1 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(1)}
              >
                Sorties
              </button>
              <button
                className={onglet === 2 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(2)}
              >
                Options
              </button>
              <button
                className={onglet === 3 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(3)}
              >
                Commentaires
              </button>
              <button
                className={onglet === 4 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(4)}
              >
                Utilisateurs
              </button>
              <button
                className={onglet === 5 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(5)}
              >
                Commandes
              </button>
              <button
                className={onglet === 6 ? "onglet onglet-actif" : "onglet"}
                onClick={() => setOnglet(6)}
              >
                Réservations
              </button>
            </div>
            <div className="contenu-onglets">
              <div
                className={onglet === 1 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Sorties</h2>
                <hr />
                <table className="table-sorties">
                  <thead>
                    <tr>
                      <th id="sorties-ID">ID</th>
                      <th id="sorties-Nom">Nom</th>
                      <th id="sorties-Description">Description</th>
                      <th id="sorties-Prix">Prix</th>
                      <th id="sorties-Places">Places</th>
                      <th id="sorties-Inscrits">Inscrits</th>
                      <th id="sorties-Date">Date</th>
                      <th id="sorties-Heure">Heure</th>
                      <th id="sorties-Duree">Durée</th>
                      <th id="sorties-Lieu">Lieu</th>
                      <th id="sorties-Image">Image</th>
                      <th id="sorties-Vues">Vues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorties.map((sortie) => (
                      <tr onClick={() => setSortieSelectionnee(sortie)}>
                        <td className="idObjet">{sortie.idSortie}</td>
                        <td>{sortie.nomSortie}</td>
                        <td>{sortie.descriptionSortie}</td>
                        <td>{sortie.prixSortie}</td>
                        <td>{sortie.nbPlaces}</td>
                        <td>{sortie.nbInscrits}</td>
                        <td>{sortie.date}</td>
                        <td>{sortie.heure}</td>
                        <td>{sortie.duree}</td>
                        <td>{sortie.lieu}</td>
                        <td>{sortie.image}</td>
                        <td>{sortie.nbVues}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setSortieSelectionnee({
                        idSortie: 0,
                        nomSortie: "",
                        descriptionSortie: "",
                        prixSortie: 0,
                        nbPlaces: 1,
                        date: "",
                        heure: "",
                        duree: "",
                        lieu: "",
                        image: "",
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!sortieSelectionnee}
                    onClick={() => {
                      setSorties(
                        sorties.filter(
                          (sortie) =>
                            sortie.idSortie !== sortieSelectionnee.idSortie
                        )
                      );
                      setSortieSelectionnee({
                        idSortie: 0,
                        nomSortie: "",
                        descriptionSortie: "",
                        prixSortie: 0,
                        nbPlaces: 1,
                        date: "",
                        heure: "",
                        duree: "",
                        lieu: "",
                        image: "",
                      });
                      document.getElementById("messageSortie").innerHTML =
                        "Sortie supprimée.";
                      document
                        .getElementById("messageSortie")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageSortie")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={nouvelleSortie.nomSortie}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              nomSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Description</label>
                        <textarea
                          value={nouvelleSortie.descriptionSortie}
                          maxlength="500"
                          rows="4"
                          cols="50"
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              descriptionSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prix</label>
                        <input
                          type="number"
                          min={0}
                          value={nouvelleSortie.prixSortie}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              prixSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Places</label>
                        <input
                          type="number"
                          min={1}
                          value={nouvelleSortie.nbPlaces}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              nbPlaces: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Date</label>
                        <input
                          type="date"
                          value={nouvelleSortie.date}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Heure</label>
                        <input
                          type="time"
                          value={nouvelleSortie.heure}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              heure: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Durée</label>
                        <input
                          type="time"
                          value={nouvelleSortie.duree}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              duree: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Lieu</label>
                        <input
                          type="text"
                          value={nouvelleSortie.lieu}
                          onChange={(e) =>
                            setNouvelleSortie({
                              ...nouvelleSortie,
                              lieu: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Image</label>
                        <input
                          id="ajouterInputFileSortie"
                          type="file"
                          onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setNouvelleSortie({
                                ...nouvelleSortie,
                                image: e.target.result,
                              });
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btnAjouter"
                      onClick={() => {
                        if (
                          nouvelleSortie.nomSortie &&
                          nouvelleSortie.descriptionSortie &&
                          nouvelleSortie.prixSortie &&
                          nouvelleSortie.nbPlaces &&
                          nouvelleSortie.date &&
                          nouvelleSortie.heure &&
                          nouvelleSortie.duree &&
                          nouvelleSortie.lieu &&
                          nouvelleSortie.image
                        ) {
                          setSorties([...sorties, nouvelleSortie]);
                          setNouvelleSortie({
                            idSortie: 0,
                            nomSortie: "",
                            descriptionSortie: "",
                            prixSortie: 0,
                            nbPlaces: 1,
                            date: "",
                            heure: "",
                            duree: "",
                            lieu: "",
                            image: "",
                          });
                          document.getElementById(
                            "ajouterInputFileSortie"
                          ).value = "";
                          document.getElementById("messageSortie").innerHTML =
                            "Sortie ajoutée.";
                          document
                            .getElementById("messageSortie")
                            .classList.remove("messageKO");
                          document
                            .getElementById("messageSortie")
                            .classList.add("messageOK");
                        } else {
                          document.getElementById("messageSortie").innerHTML =
                            "Veuillez remplir tous les champs.";
                          document
                            .getElementById("messageSortie")
                            .classList.remove("messageOK");
                          document
                            .getElementById("messageSortie")
                            .classList.add("messageKO");
                        }
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={sortieSelectionnee.nomSortie}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              nomSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Description</label>
                        <textarea
                          value={sortieSelectionnee.descriptionSortie}
                          maxlength="500"
                          rows="4"
                          cols="50"
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              descriptionSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prix</label>
                        <input
                          type="number"
                          min={0}
                          value={sortieSelectionnee.prixSortie}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              prixSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Places</label>
                        <input
                          type="number"
                          min={1}
                          value={sortieSelectionnee.nbPlaces}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              nbPlaces: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Date</label>
                        <input
                          type="date"
                          value={sortieSelectionnee.date}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Heure</label>
                        <input
                          type="time"
                          value={sortieSelectionnee.heure}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              heure: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Durée</label>
                        <input
                          type="time"
                          value={sortieSelectionnee.duree}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              duree: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Lieu</label>
                        <input
                          type="text"
                          value={sortieSelectionnee.lieu}
                          onChange={(e) =>
                            setSortieSelectionnee({
                              ...sortieSelectionnee,
                              lieu: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Image</label>
                        <input
                          id="modifierInputFileSortie"
                          type="file"
                          onChange={(e) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setSortieSelectionnee({
                                ...sortieSelectionnee,
                                image: e.target.result,
                              });
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btnModifier"
                      onClick={() => {
                        if (
                          sortieSelectionnee.nomSortie &&
                          sortieSelectionnee.descriptionSortie &&
                          sortieSelectionnee.prixSortie &&
                          sortieSelectionnee.nbPlaces &&
                          sortieSelectionnee.date &&
                          sortieSelectionnee.heure &&
                          sortieSelectionnee.duree &&
                          sortieSelectionnee.lieu &&
                          sortieSelectionnee.image
                        ) {
                          setSorties([
                            ...sorties.filter(
                              (sortie) =>
                                sortie.idSortie !== sortieSelectionnee.idSortie
                            ),
                            sortieSelectionnee,
                          ]);
                          setSortieSelectionnee({
                            idSortie: 0,
                            nomSortie: "",
                            descriptionSortie: "",
                            prixSortie: 0,
                            nbPlaces: 1,
                            date: "",
                            heure: "",
                            duree: "",
                            lieu: "",
                            image: "",
                          });
                          document.getElementById(
                            "modifierInputFileSortie"
                          ).value = "";
                          document.getElementById("messageSortie").innerHTML =
                            "Sortie modifiée.";
                          document
                            .getElementById("messageSortie")
                            .classList.remove("messageKO");
                          document
                            .getElementById("messageSortie")
                            .classList.add("messageOK");
                        } else {
                          document.getElementById("messageSortie").innerHTML =
                            "Veuillez remplir tous les champs.";
                          document
                            .getElementById("messageSortie")
                            .classList.remove("messageOK");
                          document
                            .getElementById("messageSortie")
                            .classList.add("messageKO");
                        }
                      }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
                <p id="messageSortie" className="message"></p>
              </div>
              <div
                className={onglet === 2 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Options</h2>
                <hr />
                <table className="table-options">
                  <thead>
                    <tr>
                      <th id="options-ID">ID</th>
                      <th id="options-Nom">Nom</th>
                      <th id="options-Prix">Prix</th>
                      <th id="options-IDSortie">ID Sortie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {options.map((option) => (
                      <tr onClick={() => setOptionSelectionnee(option)}>
                        <td className="idObjet">{option.idOption}</td>
                        <td>{option.nomOption}</td>
                        <td>{option.prixOption}</td>
                        <td>{option.idSortie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setOptionSelectionnee({
                        idOption: 0,
                        nomOption: "",
                        prixOption: 0,
                        idSortie: 0,
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!optionSelectionnee}
                    onClick={() => {
                      setOptions(
                        options.filter(
                          (option) =>
                            option.idOption !== optionSelectionnee.idOption
                        )
                      );
                      setOptionSelectionnee({
                        idOption: 0,
                        nomOption: "",
                        prixOption: 0,
                        idSortie: 0,
                      });
                      document.getElementById("messageOption").innerHTML =
                        "Option supprimée.";
                      document
                        .getElementById("messageOption")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageOption")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={nouvelleOption.nomOption}
                          onChange={(e) =>
                            setNouvelleOption({
                              ...nouvelleOption,
                              nomOption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prix</label>
                        <input
                          type="number"
                          min={0}
                          value={nouvelleOption.prixOption}
                          onChange={(e) =>
                            setNouvelleOption({
                              ...nouvelleOption,
                              prixOption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Sortie</label>
                        <input
                          type="number"
                          min={1}
                          value={nouvelleOption.idSortie}
                          onChange={(e) =>
                            setNouvelleOption({
                              ...nouvelleOption,
                              idSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="btn btnAjouter"
                      onClick={() => {
                        if (
                          nouvelleOption.nomOption &&
                          nouvelleOption.prixOption &&
                          nouvelleOption.idSortie
                        ) {
                          setOptions([...options, nouvelleOption]);
                          setNouvelleOption({
                            idOption: 0,
                            nomOption: "",
                            prixOption: 0,
                            idSortie: 0,
                          });
                          document.getElementById("messageOption").innerHTML =
                            "Option ajoutée.";
                          document
                            .getElementById("messageOption")
                            .classList.remove("messageKO");
                          document
                            .getElementById("messageOption")
                            .classList.add("messageOK");
                        } else {
                          document.getElementById("messageOption").innerHTML =
                            "Veuillez remplir tous les champs.";
                          document
                            .getElementById("messageOption")
                            .classList.remove("messageOK");
                          document
                            .getElementById("messageOption")
                            .classList.add("messageKO");
                        }
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={optionSelectionnee.nomOption}
                          onChange={(e) =>
                            setOptionSelectionnee({
                              ...optionSelectionnee,
                              nomOption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prix</label>
                        <input
                          type="number"
                          min={0}
                          value={optionSelectionnee.prixOption}
                          onChange={(e) =>
                            setOptionSelectionnee({
                              ...optionSelectionnee,
                              prixOption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Sortie</label>
                        <input
                          type="number"
                          min={1}
                          value={optionSelectionnee.idSortie}
                          onChange={(e) =>
                            setOptionSelectionnee({
                              ...optionSelectionnee,
                              idSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <button
                      className="btn btnModifier"
                      onClick={() => {
                        if (
                          optionSelectionnee.nomOption &&
                          optionSelectionnee.prixOption &&
                          optionSelectionnee.idSortie
                        ) {
                          setOptions(
                            options.map((option) =>
                              option.idOption === optionSelectionnee.idOption
                                ? optionSelectionnee
                                : option
                            )
                          );
                          document.getElementById("messageOption").innerHTML =
                            "Option modifiée.";
                          document
                            .getElementById("messageOption")
                            .classList.remove("messageKO");
                          document
                            .getElementById("messageOption")
                            .classList.add("messageOK");
                        } else {
                          document.getElementById("messageOption").innerHTML =
                            "Veuillez remplir tous les champs.";
                          document
                            .getElementById("messageOption")
                            .classList.remove("messageOK");
                          document
                            .getElementById("messageOption")
                            .classList.add("messageKO");
                        }
                      }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
                <p id="messageOption" className="message"></p>
              </div>
              <div
                className={onglet === 3 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Commentaires</h2>
                <hr />
                <table className="table-commentaires">
                  <thead>
                    <tr>
                      <th id="commentaires-Utilisateur">Utilisateur</th>
                      <th id="commentaires-IDSortie">ID Sortie</th>
                      <th id="commentaires-Note">Note</th>
                      <th id="commentaires-Commentaire">Commentaire</th>
                      <th id="commentaires-Date">Date</th>
                      <th id="commentaires-Images">Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commentaires.map((commentaire) => (
                      <tr
                        onClick={() => setCommentaireSelectionne(commentaire)}
                      >
                        <td className="idObjet">
                          {commentaire.pseudoUtilisateur}
                        </td>
                        <td>{commentaire.idSortie}</td>
                        <td>{commentaire.note}</td>
                        <td>{commentaire.commentaire}</td>
                        <td>{commentaire.dateHeureCreation}</td>
                        <td>{commentaire.images}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setCommentaireSelectionne({
                        pseudoUtilisateur: "",
                        idSortie: 0,
                        note: 0,
                        commentaire: "",
                        dateHeureCreation: "",
                        images: [],
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!commentaireSelectionne}
                    onClick={() => {
                      setCommentaires(
                        commentaires.filter(
                          (commentaire) =>
                            commentaire.pseudoUtilisateur !==
                              commentaireSelectionne.pseudoUtilisateur ||
                            commentaire.idSortie !==
                              commentaireSelectionne.idSortie ||
                            commentaire.dateHeureCreation !==
                              commentaireSelectionne.dateHeureCreation
                        )
                      );
                      setCommentaireSelectionne({
                        pseudoUtilisateur: "",
                        idSortie: 0,
                        note: 0,
                        commentaire: "",
                        dateHeureCreation: "",
                        images: [],
                      });
                      document.getElementById("messageCommentaire").innerHTML =
                        "Commentaire supprimé.";
                      document
                        .getElementById("messageCommentaire")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageCommentaire")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Utilisateur</label>
                        <input
                          type="text"
                          value={nouveauCommentaire.pseudoUtilisateur}
                          onChange={(e) =>
                            setNouveauCommentaire({
                              ...nouveauCommentaire,
                              pseudoUtilisateur: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Sortie</label>
                        <input
                          type="number"
                          min={1}
                          value={nouveauCommentaire.idSortie}
                          onChange={(e) =>
                            setNouveauCommentaire({
                              ...nouveauCommentaire,
                              idSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Note</label>
                        <input
                          type="number"
                          min={0}
                          max={5}
                          value={nouveauCommentaire.note}
                          onChange={(e) =>
                            setNouveauCommentaire({
                              ...nouveauCommentaire,
                              note: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Commentaire</label>
                        <textarea
                          value={nouveauCommentaire.commentaire}
                          maxLength={500}
                          onChange={(e) =>
                            setNouveauCommentaire({
                              ...nouveauCommentaire,
                              commentaire: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Date</label>
                        <input
                          type="datetime-local"
                          value={nouveauCommentaire.dateHeureCreation}
                          onChange={(e) =>
                            setNouveauCommentaire({
                              ...nouveauCommentaire,
                              dateHeureCreation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Images</label>
                        <input
                          type="file"
                          name="images"
                          id="ajouterInputImagesCommentaire"
                          multiple
                          onChange={(e) => {
                            for (let i = 0; i < e.target.files.length; i++) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                nouveauCommentaire.images.push(e.target.result);
                              };
                              reader.readAsDataURL(e.target.files[i]);
                            }
                          }}
                        />
                      </div>
                      <button
                        className="btn btnAjouter"
                        onClick={() => {
                          if (
                            nouveauCommentaire.pseudoUtilisateur.length > 0 &&
                            nouveauCommentaire.idSortie > 0 &&
                            nouveauCommentaire.note >= 0 &&
                            nouveauCommentaire.note <= 5 &&
                            nouveauCommentaire.commentaire.length > 0 &&
                            nouveauCommentaire.dateHeureCreation.length > 0
                          ) {
                            setCommentaires([
                              ...commentaires,
                              nouveauCommentaire,
                            ]);
                            setNouveauCommentaire({
                              pseudoUtilisateur: "",
                              idSortie: 0,
                              note: 0,
                              commentaire: "",
                              dateHeureCreation: "",
                              images: [],
                            });
                            document.getElementById(
                              "ajouterInputImagesCommentaire"
                            ).value = "";
                            document.getElementById(
                              "messageCommentaire"
                            ).innerHTML = "Commentaire ajouté.";
                            document
                              .getElementById("messageCommentaire")
                              .classList.remove("messageKO");
                            document

                              .getElementById("messageCommentaire")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageCommentaire"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageCommentaire")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageCommentaire")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireModifier grid">
                      <div className="input grid">
                        <label>Note</label>
                        <input
                          type="number"
                          min={0}
                          max={5}
                          value={commentaireSelectionne.note}
                          onChange={(e) =>
                            setCommentaireSelectionne({
                              ...commentaireSelectionne,
                              note: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Commentaire</label>
                        <textarea
                          value={commentaireSelectionne.commentaire}
                          maxLength={500}
                          onChange={(e) =>
                            setCommentaireSelectionne({
                              ...commentaireSelectionne,
                              commentaire: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Images</label>
                        <input
                          type="file"
                          id="modifierInputImagesCommentaire"
                          multiple
                          onChange={(e) => {
                            for (let i = 0; i < e.target.files.length; i++) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                commentaireSelectionne.images.push(
                                  e.target.result
                                );
                              };
                              reader.readAsDataURL(e.target.files[i]);
                            }
                          }}
                        />
                      </div>
                      <button
                        className="btn btnModifier"
                        onClick={() => {
                          if (
                            commentaireSelectionne.note >= 0 &&
                            commentaireSelectionne.note <= 5 &&
                            commentaireSelectionne.commentaire.length > 0
                          ) {
                            setCommentaires(
                              commentaires.map((commentaire) =>
                                commentaire.pseudoUtilisateur ===
                                  commentaireSelectionne.pseudoUtilisateur &&
                                commentaire.idSortie ===
                                  commentaireSelectionne.idSortie &&
                                commentaire.dateHeureCreation ===
                                  commentaireSelectionne.dateHeureCreation
                                  ? commentaireSelectionne
                                  : commentaire
                              )
                            );
                            setCommentaireSelectionne({
                              pseudoUtilisateur: "",
                              idSortie: 0,
                              note: 0,
                              commentaire: "",
                              dateHeureCreation: "",
                              images: [],
                            });
                            document.getElementById(
                              "modifierInputImagesCommentaire"
                            ).value = "";
                            document.getElementById(
                              "messageCommentaire"
                            ).innerHTML = "Commentaire modifié.";
                            document
                              .getElementById("messageCommentaire")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageCommentaire")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageCommentaire"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageCommentaire")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageCommentaire")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                <p id="messageCommentaire" className="message"></p>
              </div>
              <div
                className={onglet === 4 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Utilisateurs</h2>
                <hr />
                <table className="table-utilisateurs">
                  <thead>
                    <tr>
                      <th id="utilisateurs-Pseudo">Pseudo</th>
                      <th id="utilisateurs-Nom">Nom</th>
                      <th id="utilisateurs-Prenom">Prénom</th>
                      <th id="utilisateurs-DateNaissance">Date naissance</th>
                      <th id="utilisateurs-Email">Email</th>
                      <th id="utilisateurs-Mdp">Mdp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilisateurs.map((utilisateur) => (
                      <tr
                        onClick={() => setUtilisateurSelectionne(utilisateur)}
                      >
                        <td className="idObjet">{utilisateur.pseudo}</td>
                        <td>{utilisateur.nom}</td>
                        <td>{utilisateur.prenom}</td>
                        <td>{utilisateur.dateNaissance}</td>
                        <td>{utilisateur.email}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setUtilisateurSelectionne({
                        pseudo: "",
                        nom: "",
                        prenom: "",
                        dateNaissance: "",
                        email: "",
                        mdp: "",
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!utilisateurSelectionne}
                    onClick={() => {
                      setUtilisateurs(
                        utilisateurs.filter(
                          (utilisateur) =>
                            utilisateur.pseudo !== utilisateurSelectionne.pseudo
                        )
                      );
                      setUtilisateurSelectionne({
                        pseudo: "",
                        nom: "",
                        prenom: "",
                        dateNaissance: "",
                        email: "",
                        mdp: "",
                      });
                      document.getElementById("messageUtilisateur").innerHTML =
                        "Utilisateur supprimé.";
                      document
                        .getElementById("messageUtilisateur")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageUtilisateur")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Pseudo</label>
                        <input
                          type="text"
                          value={nouvelUtilisateur.pseudo}
                          onChange={(e) =>
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              pseudo: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={nouvelUtilisateur.nom}
                          onChange={(e) =>
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              nom: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prénom</label>
                        <input
                          type="text"
                          value={nouvelUtilisateur.prenom}
                          onChange={(e) =>
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              prenom: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Date naissance</label>
                        <input
                          type="date"
                          value={nouvelUtilisateur.dateNaissance}
                          onChange={(e) =>
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              dateNaissance: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Email</label>
                        <input
                          type="email"
                          value={nouvelUtilisateur.email}
                          onChange={(e) =>
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Mot de passe</label>
                        <input
                          type="password"
                          value={nouvelUtilisateur.mdp}
                          onChange={(e) => {
                            setNouvelUtilisateur({
                              ...nouvelUtilisateur,
                              mdp: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <button
                        className="btn btnAjouter"
                        onClick={() => {
                          if (
                            nouvelUtilisateur.pseudo !== "" &&
                            nouvelUtilisateur.nom !== "" &&
                            nouvelUtilisateur.prenom !== "" &&
                            nouvelUtilisateur.dateNaissance !== "" &&
                            nouvelUtilisateur.email !== ""
                          ) {
                            setUtilisateurs([
                              ...utilisateurs,
                              nouvelUtilisateur,
                            ]);
                            setNouvelUtilisateur({
                              pseudo: "",
                              nom: "",
                              prenom: "",
                              dateNaissance: "",
                              email: "",
                              mdp: "",
                            });
                            document.getElementById(
                              "messageUtilisateur"
                            ).innerHTML = "Utilisateur ajouté.";
                            document
                              .getElementById("messageUtilisateur")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageUtilisateur")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageUtilisateur"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageUtilisateur")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageUtilisateur")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireModifier grid">
                      <div className="input grid">
                        <label>Nom</label>
                        <input
                          type="text"
                          value={utilisateurSelectionne.nom}
                          onChange={(e) =>
                            setUtilisateurSelectionne({
                              ...utilisateurSelectionne,
                              nom: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Prénom</label>
                        <input
                          type="text"
                          value={utilisateurSelectionne.prenom}
                          onChange={(e) =>
                            setUtilisateurSelectionne({
                              ...utilisateurSelectionne,
                              prenom: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Date naissance</label>
                        <input
                          type="date"
                          value={utilisateurSelectionne.dateNaissance}
                          onChange={(e) =>
                            setUtilisateurSelectionne({
                              ...utilisateurSelectionne,
                              dateNaissance: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Email</label>
                        <input
                          type="email"
                          value={utilisateurSelectionne.email}
                          onChange={(e) =>
                            setUtilisateurSelectionne({
                              ...utilisateurSelectionne,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Mot de passe</label>
                        <input
                          type="password"
                          value={utilisateurSelectionne.mdp}
                          onChange={(e) => {
                            setUtilisateurSelectionne({
                              ...utilisateurSelectionne,
                              mdp: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <button
                        className="btn btnModifier"
                        onClick={() => {
                          if (
                            utilisateurSelectionne.nom !== "" &&
                            utilisateurSelectionne.prenom !== "" &&
                            utilisateurSelectionne.dateNaissance !== "" &&
                            utilisateurSelectionne.email !== ""
                          ) {
                            setUtilisateurs(
                              utilisateurs.map((utilisateur) =>
                                utilisateur.pseudo ===
                                utilisateurSelectionne.pseudo
                                  ? utilisateurSelectionne
                                  : utilisateur
                              )
                            );
                            setUtilisateurSelectionne({
                              idUtilisateur: 0,
                              pseudo: "",
                              nom: "",
                              prenom: "",
                              dateNaissance: "",
                              email: "",
                              mdp: "",
                            });
                            document.getElementById(
                              "messageUtilisateur"
                            ).innerHTML = "Utilisateur modifié.";
                            document
                              .getElementById("messageUtilisateur")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageUtilisateur")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageUtilisateur"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageUtilisateur")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageUtilisateur")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                <p id="messageUtilisateur" className="message"></p>
              </div>
              <div
                className={onglet === 5 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Commandes</h2>
                <hr />
                <table className="table-commandes">
                  <thead>
                    <tr>
                      <th id="commandes-ID">ID</th>
                      <th id="commandes-Date">Date</th>
                      <th id="commandes-Utilisateur">Utilisateur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commandes.map((commande) => (
                      <tr onClick={() => setCommandeSelectionnee(commande)}>
                        <td className="idObjet">{commande.idCommande}</td>
                        <td>{commande.dateCommande}</td>
                        <td>{commande.pseudoUtilisateur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setCommandeSelectionnee({
                        idCommande: 0,
                        dateCommande: "",
                        pseudoUtilisateur: "",
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!commandeSelectionnee}
                    onClick={() => {
                      setCommandes(
                        commandes.filter(
                          (commande) =>
                            commande.idCommande !==
                            commandeSelectionnee.idCommande
                        )
                      );
                      setCommandeSelectionnee({
                        idCommande: 0,
                        dateCommande: "",
                        pseudoUtilisateur: "",
                      });
                      document.getElementById("messageCommande").innerHTML =
                        "Commande supprimée.";
                      document
                        .getElementById("messageCommande")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageCommande")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Date</label>
                        <input
                          type="date"
                          value={nouvelleCommande.dateCommande}
                          onChange={(e) =>
                            setNouvelleCommande({
                              ...nouvelleCommande,
                              dateCommande: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>Utilisateur</label>
                        <input
                          type="text"
                          value={nouvelleCommande.pseudoUtilisateur}
                          onChange={(e) =>
                            setNouvelleCommande({
                              ...nouvelleCommande,
                              pseudoUtilisateur: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn btnAjouter"
                        onClick={() => {
                          if (
                            nouvelleCommande.dateCommande !== "" &&
                            nouvelleCommande.pseudoUtilisateur !== ""
                          ) {
                            setCommandes([...commandes, nouvelleCommande]);
                            setNouvelleCommande({
                              idCommande: 0,
                              dateCommande: "",
                              pseudoUtilisateur: "",
                            });
                            document.getElementById(
                              "messageCommande"
                            ).innerHTML = "Commande ajoutée.";
                            document
                              .getElementById("messageCommande")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageCommande")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageCommande"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageCommande")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageCommande")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireModifier grid">
                      <div className="input grid">
                        <label>Date</label>
                        <input
                          type="date"
                          value={commandeSelectionnee.dateCommande}
                          onChange={(e) =>
                            setCommandeSelectionnee({
                              ...commandeSelectionnee,
                              dateCommande: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn btnModifier"
                        onClick={() => {
                          if (commandeSelectionnee.dateCommande !== "") {
                            setCommandes(
                              commandes.map((commande) =>
                                commande.idCommande ===
                                commandeSelectionnee.idCommande
                                  ? commandeSelectionnee
                                  : commande
                              )
                            );
                            setCommandeSelectionnee({
                              idCommande: 0,
                              dateCommande: "",
                              pseudoUtilisateur: "",
                            });
                            document.getElementById(
                              "messageCommande"
                            ).innerHTML = "Commande ajoutée.";
                            document
                              .getElementById("messageCommande")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageCommande")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageCommande"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageCommande")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageCommande")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                <p id="messageCommande" className="message"></p>
              </div>
              <div
                className={onglet === 6 ? "contenu contenu-actif" : "contenu"}
              >
                <h2>Réservations</h2>
                <hr />
                <table className="table-reservations">
                  <thead>
                    <tr>
                      <th id="reservations-ID">ID</th>
                      <th id="reservations-Personnes">Personnes</th>
                      <th id="reservations-IDSortie">ID Sortie</th>
                      <th id="reservations-IDCommande">ID Commande</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr
                        onClick={() => setReservationSelectionnee(reservation)}
                      >
                        <td className="idObjet">{reservation.idReservation}</td>
                        <td>{reservation.nbPersonnes}</td>
                        <td>{reservation.idSortie}</td>
                        <td>{reservation.idCommande}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btnActions flex">
                  <button
                    className="btn btnDeselectionner"
                    onClick={() =>
                      setReservationSelectionnee({
                        idReservation: 0,
                        nbPersonnes: 0,
                        idSortie: 0,
                        idCommande: 0,
                      })
                    }
                  >
                    Désélectionner
                  </button>
                  <button
                    className="btn btnSupprimer"
                    disabled={!reservationSelectionnee}
                    onClick={() => {
                      setReservations(
                        reservations.filter(
                          (reservation) =>
                            reservation.idReservation !==
                            reservationSelectionnee.idReservation
                        )
                      );
                      setReservationSelectionnee({
                        idReservation: 0,
                        nbPersonnes: 0,
                        idSortie: 0,
                        idCommande: 0,
                      });
                      document.getElementById("messageReservation").innerHTML =
                        "Réservation supprimée.";
                      document
                        .getElementById("messageReservation")
                        .classList.remove("messageKO");
                      document
                        .getElementById("messageReservation")
                        .classList.add("messageOK");
                    }}
                  >
                    Supprimer
                  </button>
                </div>
                <div className="ajouterModifierDiv flex">
                  <div className="ajouterDiv grid">
                    <h3>Ajouter</h3>
                    <div className="formulaireAjouter grid">
                      <div className="input grid">
                        <label>Personnes</label>
                        <input
                          type="number"
                          min={1}
                          value={nouvelleReservation.nbPersonnes}
                          onChange={(e) =>
                            setNouvelleReservation({
                              ...nouvelleReservation,
                              nbPersonnes: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Sortie</label>
                        <input
                          type="number"
                          min={1}
                          value={nouvelleReservation.idSortie}
                          onChange={(e) =>
                            setNouvelleReservation({
                              ...nouvelleReservation,
                              idSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Commande</label>
                        <input
                          type="number"
                          min={1}
                          value={nouvelleReservation.idCommande}
                          onChange={(e) =>
                            setNouvelleReservation({
                              ...nouvelleReservation,
                              idCommande: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn btnAjouter"
                        onClick={() => {
                          if (
                            nouvelleReservation.nbPersonnes > 0 &&
                            nouvelleReservation.idSortie > 0 &&
                            nouvelleReservation.idCommande > 0
                          ) {
                            setReservations([
                              ...reservations,
                              nouvelleReservation,
                            ]);
                            setNouvelleReservation({
                              idReservation: 0,
                              nbPersonnes: 0,
                              idSortie: 0,
                              idCommande: 0,
                            });
                            document.getElementById(
                              "messageReservation"
                            ).innerHTML = "Réservation ajoutée.";
                            document
                              .getElementById("messageReservation")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageReservation")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageReservation"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageReservation")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageReservation")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                  <div className="modifierDiv grid">
                    <h3>Modifier</h3>
                    <div className="formulaireModifier grid">
                      <div className="input grid">
                        <label>Personnes</label>
                        <input
                          type="number"
                          min={1}
                          value={reservationSelectionnee.nbPersonnes}
                          onChange={(e) =>
                            setReservationSelectionnee({
                              ...reservationSelectionnee,
                              nbPersonnes: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Sortie</label>
                        <input
                          type="number"
                          min={1}
                          value={reservationSelectionnee.idSortie}
                          onChange={(e) =>
                            setReservationSelectionnee({
                              ...reservationSelectionnee,
                              idSortie: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input grid">
                        <label>ID Commande</label>
                        <input
                          type="number"
                          min={1}
                          value={reservationSelectionnee.idCommande}
                          onChange={(e) =>
                            setReservationSelectionnee({
                              ...reservationSelectionnee,
                              idCommande: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        className="btn btnModifier"
                        onClick={() => {
                          if (
                            reservationSelectionnee.nbPersonnes > 0 &&
                            reservationSelectionnee.idSortie > 0 &&
                            reservationSelectionnee.idCommande > 0
                          ) {
                            setReservations(
                              reservations.map((reservation) =>
                                reservation.idReservation ===
                                reservationSelectionnee.idReservation
                                  ? reservationSelectionnee
                                  : reservation
                              )
                            );
                            setReservationSelectionnee({
                              idReservation: 0,
                              nbPersonnes: 0,
                              idSortie: 0,
                              idCommande: 0,
                            });
                            document.getElementById(
                              "messageReservation"
                            ).innerHTML = "Réservation ajoutée.";
                            document
                              .getElementById("messageReservation")
                              .classList.remove("messageKO");
                            document
                              .getElementById("messageReservation")
                              .classList.add("messageOK");
                          } else {
                            document.getElementById(
                              "messageReservation"
                            ).innerHTML = "Veuillez remplir tous les champs.";
                            document
                              .getElementById("messageReservation")
                              .classList.remove("messageOK");
                            document
                              .getElementById("messageReservation")
                              .classList.add("messageKO");
                          }
                        }}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                <p id="messageReservation" className="message"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gestion;

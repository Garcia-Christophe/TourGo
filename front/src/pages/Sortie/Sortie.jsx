import React, { useEffect, useState } from "react";
import "./sortie.css";
import Navbar from "../../components/Navbar/Navbar";
import Aos from "aos";
import "aos/dist/aos.css";
import etoilePleine from "../../assets/etoilePleine.png";
import etoileVide from "../../assets/etoileVide.png";
import axios from "axios";

const Sortie = () => {
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

    // Récupération de la sortie
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    const optionsHttp = {
      url: "http://localhost:3001/Sortie",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        idSortie: id,
      },
    };
    axios(optionsHttp).then((response) => {
      if (response.data.ok) {
        setSortie(response.data.data[0]);
      }
    });

    // Récupération des options
    const optionsHttp2 = {
      url: "http://localhost:3001/optionsSortie",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        idSortie: id,
      },
    };

    axios(optionsHttp2).then((response) => {
      if (response.data.ok) {
        setOptions(response.data.data);
      }
    });

    // Incrémentation du nombre de vues de la sortie
    const optionsHttp3 = {
      url: "http://localhost:3001/Sortie/IncrNbVues",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        idSortie: id,
      },
    };
    axios(optionsHttp3).then((response) => {
      if (response.data.ok) {
        console.log("Nombre de vues incrémenté");
      }
    });
  }, []);

  const [sortie, setSortie] = useState({
    idSortie: 1,
    nomSortie: "",
    descriptionSortie: "",
    prixSortie: 0,
    nbPlaces: 0,
    nbInscrits: 0,
    date: "1970-01-01",
    heure: "00:00",
    lieu: "",
    image: "",
  });
  const [options, setOptions] = useState([]);
  // const options = [
  //   {
  //     idOption: 1,
  //     nomOption: "Option 1",
  //     prixOption: 1,
  //     ajoutee: false,
  //   },
  //   {
  //     idOption: 2,
  //     nomOption: "Option 2",
  //     prixOption: 2,
  //     ajoutee: false,
  //   },
  //   {
  //     idOption: 3,
  //     nomOption: "Option 3",
  //     prixOption: 3,
  //     ajoutee: false,
  //   },
  // ];
  const [commentaires, setCommentaires] = useState([
    {
      prenomUtilisateur: "Jean",
      nomUtilisateur: "Dupont",
      note: 4,
      commentaire:
        "J'en suis très satisfait, seul bémol, c'est en noir uniquement. Comme c'est un produit qui peut se mettre à l'extérieur, pourquoi ne pas le proposer en blanc ? La plupart des maisons ont des murs blancs (en tout cas plus de murs blancs que de murs noirs me semble-t-il), et, là, quand on veut faire discret, c'est raté. Le jour où ça sort en blanc, j'en achète 4 de plus illico !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: [
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
      ],
    },
    {
      prenomUtilisateur: "Jean",
      nomUtilisateur: "Dupont",
      note: 2,
      commentaire:
        "J'en suis très satisfait, seul bémol, c'est en noir uniquement. Comme c'est un produit qui peut se mettre à l'extérieur, pourquoi ne pas le proposer en blanc ? La plupart des maisons ont des murs blancs (en tout cas plus de murs blancs que de murs noirs me semble-t-il), et, là, quand on veut faire discret, c'est raté. Le jour où ça sort en blanc, j'en achète 4 de plus illico !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: [],
    },
    {
      prenomUtilisateur: "Jean",
      nomUtilisateur: "Dupont",
      note: 5,
      commentaire:
        "J'en suis très satisfait, seul bémol, c'est en noir uniquement. Comme c'est un produit qui peut se mettre à l'extérieur, pourquoi ne pas le proposer en blanc ? La plupart des maisons ont des murs blancs (en tout cas plus de murs blancs que de murs noirs me semble-t-il), et, là, quand on veut faire discret, c'est raté. Le jour où ça sort en blanc, j'en achète 4 de plus illico !",
      dateHeureCreation: "2020-12-01T15:00:00.000Z",
      images: [
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1920/1080",
      ],
    },
  ]);
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [newComm_note, setNewComNote] = useState(1);
  const [newCom_texte, setNewComText] = useState("");
  const [newCom_images, setNewComImages] = useState([]);

  return (
    <>
      <Navbar navbarTransparente={false} />
      <section className="page-sortie flex">
        <div className="secContainer">
          {/* Image, nom et prix */}
          <img src={sortie.image} alt={sortie.nomSortie} />
          <div className="premieresInfos">
            <div className="premiereLigne">
              <h1 data-aos="fade-right" className="nom">
                {sortie.nomSortie}
              </h1>
              <p className="prix">{sortie.prixSortie} €</p>
            </div>
            <p>{sortie.descriptionSortie}</p>
            <p>
              Nombre de places restantes :{" "}
              <b>
                {sortie.nbPlaces - sortie.nbInscrits}/{sortie.nbPlaces}
              </b>
            </p>
            <p>
              Date : <b>{sortie.date}</b>
            </p>
            <p>
              Lieu : <b>{sortie.lieu}</b>
            </p>
          </div>
          {
            // Possibilité de réserver si la sortie n'est pas passée
            new Date(sortie.date) > new Date() && (
              <div className="reservation">
                <div className="formulaire">
                  <div className="inputNbPersonnes input flex">
                    <h1 className="nbPersonnes">
                      Nombre de personnes<span> : {nbPersonnes}</span>
                    </h1>
                    <div className="input flex">
                      <input
                        type="range"
                        min="1"
                        max={sortie.nbPlaces - sortie.nbInscrits}
                        value={nbPersonnes}
                        step="1"
                        className="styled-slider slider-progress"
                        onChange={(e) => setNbPersonnes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="optionsDiv">
                    <h1 className="options">Options</h1>
                    <div className="inputOptions input flex">
                      {
                        // Affichage des options
                        options.map((option) => (
                          <div className="option flex">
                            <input
                              type="checkbox"
                              id={option.idOption}
                              name={option.nomOption}
                              value={option.prixOption}
                              onChange={(e) =>
                                (option.ajoutee = e.target.checked)
                              }
                            />
                            &nbsp;{option.nomOption} ({option.prixOption} €)
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    if (sessionStorage.getItem("token") === null) {
                      window.location.href = "/Connexion";
                    } else {
                      console.log("resa : " + nbPersonnes);
                    }
                  }}
                  className="btnReserver btn"
                >
                  Réserver
                </button>
              </div>
            )
          }
          <div className="commentairesDiv">
            <h1 className="titre">Commentaires</h1>
            <div className="commentaires">
              {
                // Affichage des commentaires
                commentaires.map((commentaire) => (
                  <div
                    className="commentaire grid"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div className="infos grid">
                      <p className="nomUtilisateur">
                        {commentaire.prenomUtilisateur}{" "}
                        {commentaire.nomUtilisateur}
                      </p>
                      <div className="etoiles flex">
                        {
                          // Affichage des étoiles
                          Array.from(
                            Array(parseInt(commentaire.note)).keys()
                          ).map((etoile) => (
                            <img src={etoilePleine} alt="etoile" />
                          ))
                        }
                        {
                          // Affichage des étoiles vides
                          Array.from(
                            Array(5 - parseInt(commentaire.note)).keys()
                          ).map((etoile) => (
                            <img src={etoileVide} alt="etoile" />
                          ))
                        }
                      </div>
                      <p className="date">
                        {new Date(commentaire.dateHeureCreation).toLocaleString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                    <p className="commentaireText">{commentaire.commentaire}</p>
                    <div className="images">
                      {
                        // Affichage des images
                        commentaire.images.map((image) => (
                          <img src={image} alt={commentaire.note} />
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="mettreUnCommentaire">
              <h1 className="titre">Mettre un commentaire</h1>
              <div className="formulaire">
                <div className="input grid">
                  <label htmlFor="note">Note : {newComm_note}/5</label>
                  <div className="input">
                    <input
                      id="newComNote"
                      type="range"
                      min="1"
                      max="5"
                      value={newComm_note}
                      step="1"
                      className="styled-slider slider-progress"
                      onChange={(e) => setNewComNote(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input grid">
                  <label htmlFor="commentaire">Commentaire</label>
                  <textarea
                    name="commentaire"
                    id="commentaire"
                    cols="30"
                    rows="10"
                    value={newCom_texte}
                    maxlength="500"
                    onChange={(e) => setNewComText(e.target.value)}
                  ></textarea>
                </div>
                <div className="input grid">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    name="images"
                    id="newComImages"
                    multiple
                    onChange={(e) => {
                      for (let i = 0; i < e.target.files.length; i++) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          newCom_images.push(e.target.result);
                        };
                        reader.readAsDataURL(e.target.files[i]);
                      }
                    }}
                  />
                </div>
                <button
                  className="btn btnEnvoyer"
                  onClick={(e) => {
                    if (sessionStorage.getItem("token") === null) {
                      window.location.href = "/Connexion";
                    } else {
                      setCommentaires([
                        ...commentaires,
                        {
                          prenomUtilisateur: "Jean",
                          nomUtilisateur: "Dupont",
                          note: newComm_note,
                          commentaire: newCom_texte,
                          images: newCom_images,
                          dateHeureCreation: new Date(),
                        },
                      ]);
                      setNewComImages([]);
                      document.getElementById("newComImages").value = [];
                      setNewComText("");
                    }
                  }}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sortie;

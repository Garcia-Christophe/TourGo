import React, { useEffect } from "react";
import "./carteSortie.css";
import { BsArrowRightShort } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";

const CarteSortie = ({ sortie, fade = "fade-up", fadeDuration = "1000" }) => {
  useEffect(() => {
    // Effets d'affichage
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div
      data-aos={fade}
      data-aos-duration={fadeDuration}
      className="singleDestination"
    >
      <div className="destImage">
        <img src={sortie.image} alt={sortie.titre} />
        <div className="overlayInfo">
          <h3>Le {sortie.date}</h3>
          <p>{sortie.lieu}</p>

          <BsArrowRightShort
            className="icon"
            onClick={() =>
              (window.location.href = "/Sortie?id=" + sortie.idSortie)
            }
          />
        </div>
      </div>
      <div className="destFooter">
        <div className="number">{sortie.titre}</div>
        <div className="destText flex">
          <h6>{sortie.infoSupp}</h6>
        </div>
      </div>
    </div>
  );
};

export default CarteSortie;

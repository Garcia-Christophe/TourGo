import React, { useState, useEffect } from "react";
import "./navbar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import Logo from "../../assets/logo.png";
import LogoBlanc from "../../assets/logoBlanc.png";

const Navbar = ({ navbarTransparente }) => {
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };
  const hideNav = () => {
    setActive("navBar");
  };
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= (navbarTransparente ? 10 : 0)) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };
  window.addEventListener("scroll", addBg);

  useEffect(() => {
    addBg();
  });

  return (
    <section className="navBarSection">
      <div className={transparent}>
        {/* Logo de l'application */}
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1 className="flex">
              <img
                src={transparent.includes("activeHeader") ? Logo : LogoBlanc}
                alt="logo"
                className="icon"
                style={{ width: "5rem" }}
              />
              &nbsp;&nbsp;Route&nbsp;<span className="go">Go</span>
            </h1>
          </a>
        </div>

        {/* Barre de navigation */}
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Accueil
              </a>
            </li>
            <li className="navItem">
              <a href="/Sorties" className="navLink">
                Sorties
              </a>
            </li>
            <li className="navItem">
              <a href="/Contact" className="navLink">
                Contact
              </a>
            </li>
            {
              // Si l'utilisateur est connecté
              sessionStorage.getItem("token") != null && (
                <li className="navItem">
                  <a href="/MonCompte" className="navLink">
                    Mon compte
                  </a>
                </li>
              )
            }
            {
              // Si l'administrateur est connecté
              sessionStorage.getItem("token") != null &&
                sessionStorage.getItem("role") === "admin" && (
                  <li className="navItem">
                    <a href="/Gestion" className="navLink">
                      Gestion
                    </a>
                  </li>
                )
            }
            <div className="headerBtns flex">
              <button className="btn panierBtn">
                <a
                  href={
                    // Si l'utilisateur n'est pas connecté, renvoie vers la page de connexion
                    sessionStorage.getItem("token") != null
                      ? "/Panier"
                      : "/Connexion"
                  }
                >
                  Panier
                </a>
              </button>
              {
                // Si l'utilisateur n'est pas connecté, affiche le bouton "Connexion"
                sessionStorage.getItem("token") == null ? (
                  <button className="btn">
                    <a href="/Connexion">Connexion</a>
                  </button>
                ) : (
                  // Sinon, affiche le bouton "Déconnexion"
                  <button
                    className="btn"
                    onClick={() => {
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("role");
                    }}
                  >
                    <a href="/">Déconnexion</a>
                  </button>
                )
              }
            </div>
          </ul>
          <div onClick={hideNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        {/* Menu déroulable pour téléphone */}
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;

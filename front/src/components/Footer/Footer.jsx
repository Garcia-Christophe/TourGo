import React from "react";
import "./footer.css";
import Logo from "../../assets/logo.png";
import { ImFacebook } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="secContainer container grid">
        {/* Logo et réseaux sociaux */}
        <div className="logoDiv">
          <div className="footerLogo">
            <a href="/" className="logo flex">
              <h1 className="flex">
                <img
                  src={Logo}
                  alt="logo"
                  className="icon"
                  style={{ width: "5rem" }}
                />
                &nbsp;&nbsp;Route&nbsp;<span className="go">Go</span>
              </h1>
            </a>
          </div>

          <div className="socials flex">
            <ImFacebook className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div>
        </div>

        {/* Liens */}
        <div className="footerLinks">
          <span className="linkTitle">Informations</span>
          <li>
            <a href="https://gitlab.com/G.Christophe/tourgo">GitLab</a>
          </li>
          <li>
            <a href="https://moodlesciences.univ-brest.fr/moodle/course/view.php?id=517">
              Projet Moodle
            </a>
          </li>
          <li>
            <a href="https://www.univ-brest.fr/fr">UBO</a>
          </li>
          <li>
            <a href="https://www.google.fr/maps/place/UBO/@48.3983939,-4.4776249,13.5z/data=!4m6!3m5!1s0x4816bb66b341243d:0x7548a91dfdedef74!8m2!3d48.3983335!4d-4.4969446!16s%2Fg%2F11glyc5_ng">
              Nous trouver
            </a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Liens utiles</span>
          <li>
            <a href="/">Partenaires</a>
          </li>
          <li>
            <a href="/">Sorties & Conditions</a>
          </li>
          <li>
            <a href="/">Accessibilité</a>
          </li>
          <li>
            <a href="/">Confidentialité</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Nous contacter</span>
          <span className="phone">01 23 45 67 89</span>
          <span className="email">tourgo.contact@gmail.com</span>
          <a href="/" className="chat">
            Messages par chat
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Filtres from "../components/Filtres/Filtres";
import Populaires from "../components/Populaires/Populaires";
import MieuxNotees from "../components/MieuxNotees/MieuxNotees";

const Accueil = () => {
  return (
    <>
      <Navbar navbarTransparente={true} />
      <Filtres />
      <Populaires />
      <MieuxNotees />
    </>
  );
};

export default Accueil;

import React from "react";
import "./app.css";
import Navbar from "./components/Navbar/Navbar";
import Accueil from "./components/Accueil/Accueil";
import Populaires from "./components/Populaires/Populaires";
import MieuxNotees from "./components/MieuxNotees/MieuxNotees";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Accueil />
      <Populaires />
      <MieuxNotees />
      <Footer />
    </>
  );
};

export default App;

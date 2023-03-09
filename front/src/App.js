import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Accueil from "./pages/Accueil";
import Sorties from "./pages/Sorties";
import Contact from "./pages/Contact";
import MonCompte from "./pages/MonCompte";
import Gestion from "./pages/Gestion";
import Panier from "./pages/Panier";
import Connexion from "./pages/Connexion/Connexion";
import Footer from "./components/Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/Sorties" element={<Sorties />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/MonCompte" element={<MonCompte />} />
            <Route exact path="/Gestion" element={<Gestion />} />
            <Route exact path="/Panier" element={<Panier />} />
            <Route exact path="/Connexion" element={<Connexion />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

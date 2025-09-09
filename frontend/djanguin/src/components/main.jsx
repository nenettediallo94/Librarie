import { Routes, Route } from "react-router-dom";
import '../App.css';
import Accueil from "../pages/AccueilPage";
import CataloguePage from "../pages/CataloguePage";
import AjouterLivre from "./AjouterLivre";
import LivreDetails from "../components/LivreDetails";

// import APropos from "./apropos";
// import Contact from "./contact";


function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/CataloguePage" element={<CataloguePage />} />
        <Route path="/AjouterLivre" element={<AjouterLivre />} />
        <Route path="/Livre/:id" element={<LivreDetails />} />
        {/* <Route path="/apropos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </main>
  );
};
export default Main;

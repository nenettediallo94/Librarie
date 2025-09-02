import { Routes, Route } from "react-router-dom";
import '../App.css';
import Accueil from "../pages/AccueilPage";
import CataloguePage from "../pages/CataloguePage";
import AddBookForm from "./AddBookForm";
// import APropos from "./apropos";
// import Contact from "./contact";


function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/CataloguePage" element={<CataloguePage />} />
        <Route path="/AddBookForm" element={<AddBookForm />} />
        {/* <Route path="/apropos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </main>
  );
};
export default Main;

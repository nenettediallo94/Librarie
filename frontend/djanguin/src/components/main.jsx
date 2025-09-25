

import { Routes, Route } from "react-router-dom";
import '../App.css';
import Accueil from "../pages/AccueilPage";
import CataloguePage from "../pages/CataloguePage";
import AuteurPage from "../pages/AuteurPage";
import AjouterLivre from "./AjouterLivre";
import AjouterUser from "./AjouterUser";
import LivreDetails from "../components/LivreDetails";
import Abonnement from "../pages/AbonnementPage";
import AuteurLivresPage from "../pages/AuteurLivresPage";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import DashboardAdmin from "../pages/DashboardAdmin"; // <-- Ajouter ton dashboard
import AjouterActualite from "./AjouterActualite"; // <-- Importer le composant d'ajout d'actualité
import ActualitesPage from "../pages/ActualitePage";
import ActualiteDetail from "../components/ActualiteDetail"; // <-- Importer le composant de détail d'actualité
import FAQ from "./FAQ";
import ModifierUser from "./ModifierUser"; // Nouveau composant pour modifier un utilisateur
import Inscription from "./Inscription"; // <-- Importer le composant d'inscription
import RoleSelection from "./RoleSelection"; // <-- Importer la sélection de rôle
import Connexion from "./Connexion"; // <-- Importer le composant de connexion
import PourLesAuteurs from "./PourLesAuteurs"; // <-- Importer le composant PourLesAuteurs
import ModifierLivre from "../pages/ModifierLivre";



function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/CataloguePage" element={<CataloguePage />} />
        <Route path="/AuteurPage" element={<AuteurPage />} />
        <Route path="/AjouterLivre" element={<AjouterLivre />} />
        <Route path="/Livre/:id" element={<LivreDetails />} />
        <Route path="/AjouterUser" element={<AjouterUser />} />
        <Route path="/AbonnementPage" element={<Abonnement />} />
        <Route path="/AuteurLivresPage/:auteurId" element={<AuteurLivresPage />} />
        <Route path="/AjouterActualite" element={<AjouterActualite />} />
        <Route path="/ActualitesPage" element={<ActualitesPage />} />
        <Route path="/Actualite/:id" element={<ActualiteDetail />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/selection-role" element={<RoleSelection />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/modifier-utilisateur/:id" element={<ModifierUser />} />
        <Route path="/PourLesAuteurs" element={<PourLesAuteurs />} />
        <Route path="/ModifierLivre/:id" element={<ModifierLivre />} />





        {/* Connexion admin */}
        <Route path="/AdminLogin" element={<Connexion />} />

        {/* Tableau de bord admin protégé */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Si tu veux ajouter les pages APropos ou Contact plus tard */}
        {/* <Route path="/apropos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </main>
  );
};

export default Main;

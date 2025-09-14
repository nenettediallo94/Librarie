// import { Routes, Route } from "react-router-dom";
// import '../App.css';
// import Accueil from "../pages/AccueilPage";
// import CataloguePage from "../pages/CataloguePage";
// import AuteurPage from "../pages/AuteurPage";
// import AjouterLivre from "./AjouterLivre";
// import AjouterUser from "./AjouterUser";
// import LivreDetails from "../components/LivreDetails";
// import Abonnement from "../pages/AbonnementPage";
// import AuteurLivresPage from "../pages/AuteurLivresPage";
// import AdminLogin from "./AdminLogin";
// import ProtectedRoute from "./ProtectedRoute";


// // import APropos from "./apropos";
// // import Contact from "./contact";


// function Main() {
//   return (
//     <main>
//       <Routes>
//         <Route path="/" element={<Accueil />} />
//         <Route path="/CataloguePage" element={<CataloguePage />} />
//         <Route path="/AuteurPage" element={<AuteurPage />} />
//         <Route path="/AjouterLivre" element={<AjouterLivre />} />
//         <Route path="/Livre/:id" element={<LivreDetails />} />
       
//         <Route path="/AjouterUser" element={<AjouterUser />} />
//         <Route path="/AbonnementPage" element={<Abonnement />} />
//         <Route path="/AuteurLivresPage/:auteurId" element={<AuteurLivresPage />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path=""
//         {/* <Route path="/apropos" element={<APropos />} />
//         <Route path="/contact" element={<Contact />} /> */}
//       </Routes>
//     </main>
//   );
// };
// export default Main;


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

        {/* Connexion admin */}
        <Route path="/AdminLogin" element={<AdminLogin />} />

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

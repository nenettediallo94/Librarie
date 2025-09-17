
// // App.js
// import './App.css';
// import { useLocation } from 'react-router-dom';
// import Header from './components/Header';
// import Main from './components/main';


// function App() {
//   const location = useLocation();

//   // On vérifie si le chemin actuel est celui du formulaire.
//   // Assurez-vous que le chemin est bien "/AjouterLivre" comme dans votre main.js
//   const isFormPage = location.pathname === '/AjouterLivre';
 

//   return (
//     <div className="flex flex-col min-h-screen mt-20">
//       {/* Rendu conditionnel : on affiche le Header seulement si ce n'est PAS la page du formulaire */}
//       {!isFormPage && <Header />}
//       <main className="flex-grow">
//         <Main />
//       </main>
//     </div>
//   );
// }


// export default App; 


// App.js
import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/main';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  // Pages sur lesquelles le Header ne doit pas s'afficher
  const noHeaderPaths = [
    '/AjouterLivre', // formulaire
    '/AdminLogin',   // page login admin
    '/admin/dashboard', // dashboard admin
    '/AjouterActualite', // page ajout actualité
    '/AjouterUtilisateur' // page ajout utilisateur
  ];

  // ✅ Pages sur lesquelles le Footer ne doit pas s'afficher
  const noFooterPaths = [
    '/AjouterLivre',
    '/AdminLogin',
    '/admin/dashboard',
    '/AjouterActualite',
    '/AjouterUtilisateur',
    '/inscription',
    '/connexion',
    '/selection-role'
  ];

  const hideHeader = noHeaderPaths.includes(location.pathname);
  const hideFooter = noFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Header conditionnel */}
      {!hideHeader && <Header />}
      <main className="flex-grow"><Main /></main>
      {/* Footer conditionnel */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;

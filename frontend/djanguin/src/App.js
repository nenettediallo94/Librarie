

// App.js
import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/main';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const location = useLocation();

  // Pages sur lesquelles le Header ne doit pas s'afficher
  const noHeaderPaths = [
    '/AjouterLivre', // formulaire
    '/AdminLogin',   // page login admin
    '/admin/dashboard', // dashboard admin
    '/AjouterActualite', // page ajout actualité
    '/AjouterUser', // page ajout utilisateur
    '/ModifierLivre', // page modification livre
  ];

  // ✅ Pages sur lesquelles le Footer ne doit pas s'afficher
  const noFooterPaths = [
    '/AjouterLivre',
    '/AdminLogin',
    '/admin/dashboard',
    '/AjouterActualite',
    '/AjouterUser',
    '/inscription',
    '/connexion',
    '/selection-role',
    '/ModifierLivre',
  ];

  // Vérifie si le chemin commence par une des routes à masquer
  const shouldHide = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  const hideHeader = shouldHide(noHeaderPaths);
  const hideFooter = shouldHide(noFooterPaths);


  return (
    <div className="flex flex-col min-h-screen mt-20">
      {/* Header conditionnel */}
      {!hideHeader && <Header />}
      <main className="flex-grow"><Main /></main>
      {/* Footer conditionnel */}
      {!hideFooter && <Footer />}
      <ChatbotWidget />
    </div>
  );
}

export default App;



import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu mobile

  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "Catalogue", path: "/CataloguePage" },
    { name: "Auteurs", path: "/AuteurPage" },
    { name: "Abonnement", path: "/AbonnementPage" },
    { name: "Mon espace", path: "/selection-role" }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;

    try {
      // Appel au backend avec fetch
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(term)}`);

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      const { auteurs, livres } = data;

      // Redirection selon les résultats
      if (auteurs.length > 0) {
        navigate(`/AuteurPage?search=${encodeURIComponent(term)}`);
      } else if (livres.length > 0) {
        navigate(`/CataloguePage?search=${encodeURIComponent(term)}`);
      } else {
        alert("Aucun résultat trouvé !");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la recherche !");
    }

    setSearchTerm(""); // Réinitialiser la barre de recherche
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#160216] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Nom de la bibliothèque */}
        <div className="flex-shrink-0">
          <Link
            to="/" 
            className="text-2xl font-bold text-white hover:text-teal-300 transition-colors duration-200"
          >
            DJANGUIN
          </Link>
          <p className="text-sm text-white mt-1">Bibliothèque Numérique</p>
        </div>

        {/* Menu pour les grands écrans */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Barre de recherche */}
          <form className="relative w-64" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]" 
            />
          </form>
          {/* Menu de navigation */}
          <nav>
            <ul className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-white hover:text-teal-400 transition-colors duration-200 ${
                        isActive ? 'font-bold text-teal-400' : ''
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bouton Hamburger pour les petits écrans */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu déroulant pour mobile */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4">
          {/* Barre de recherche mobile */}
          <form className="relative mb-4" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]" 
            />
          </form>
          {/* Liens de navigation mobile */}
          <nav>
            <ul className="flex flex-col items-center space-y-3">
              {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)} // Ferme le menu au clic
                  className={({ isActive }) =>
                    `block py-2 text-white hover:text-teal-400 transition-colors duration-200 ${
                      isActive ? 'font-bold text-teal-400' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

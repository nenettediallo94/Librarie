

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
;
      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      const { auteurs, livres, genres } = data;

      // Redirection selon les résultats
      if (auteurs.length > 0) {
        navigate(`/AuteurPage?search=${encodeURIComponent(term)}`);
      } else if (livres.length > 0) {
        navigate(`/CataloguePage?search=${encodeURIComponent(term)}`);
      } else if (genres.length > 0) {
        navigate(`/CataloguePage?genre=${encodeURIComponent(term)}`);
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
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Nom de la bibliothèque */}
        <div className="flex flex-col items-center sm:items-start">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-teal-300 transition-colors duration-200"
          >
            DJANGUIN
          </Link>
          <p className="text-sm text-white mt-1">Bibliothèque Numérique</p>
        </div>

        {/* Barre de recherche */}
        <form className="relative w-full sm:w-1/3" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]" 
          />
        </form>

        {/* Menu de navigation */}
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4">
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
    </header>
  );
}

export default Header;

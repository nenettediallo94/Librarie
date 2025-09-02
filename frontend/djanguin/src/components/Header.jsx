// src/components/Header.js

import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "Catalogue", path: "/CataloguePage" },
    { name: "Auteurs", path: "/AuteursPage" },
    { name: "Abonnement", path: "/AbonnementPage" },
    { name: "Mon espace", path: "/MonEspacePage" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#160216] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Nom de la bibliothèque et lien vers la page d'accueil */}
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
        <div className="relative w-full sm:w-1/3"> {/* Utilisation d'une fraction plus petite pour la barre de recherche sur les grands écrans */}
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]" 
          />
        </div>
        
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

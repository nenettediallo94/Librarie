

import React, { useEffect, useState } from "react";
import { getAuteurs } from "../services/auteurService";
import { Link } from "react-router-dom";

function AuteurPage() {
  const [auteurs, setAuteurs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 8;

  useEffect(() => {
    chargerAuteurs(page);
  }, [page]);

  const chargerAuteurs = async (pageActuelle) => {
    try {
      const data = await getAuteurs(pageActuelle, limit);
      if (pageActuelle === 1) setAuteurs(data.auteurs);
      else setAuteurs((prev) => [...prev, ...data.auteurs]);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const chargerPlus = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const filteredAuteurs = auteurs.filter((auteur) =>
    `${auteur.prenoms} ${auteur.nom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (auteur.biographie && auteur.biographie.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Barre supérieure */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Nos auteurs</h1>

        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Rechercher un auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]"
          />
        </div>

        <Link
          to="/AjouterUser"
          className="btn-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Ajouter un nouvel auteur
        </Link>
      </div>

      {/* Liste des auteurs filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAuteurs.length > 0 ? (
          filteredAuteurs.map((auteur) => (
            <div
              key={auteur._id}
              className="p-6 border rounded-xl shadow-lg bg-white flex flex-col items-center text-center"
            >
              {/* Image */}
              <img
                src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "/default-avatar.png"}
                alt={`${auteur.prenoms} ${auteur.nom}`}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />

              {/* Nom */}
              <h3 className="text-xl font-semibold mb-1">
                {auteur.prenoms} {auteur.nom}
              </h3>

              {/* Genre préféré */}
              <p className="text-sm font-semibold text-gray-700 mb-2">
                 {auteur.genrePrefere || "Pas disponible"}
              </p>

              {/* Biographie sur 2 lignes */}
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {auteur.biographie || "Pas de biographie disponible."}
              </p>

              {/* Nombre d’œuvres */}
              <p className="text-gray-800 font-medium mb-4">
                Œuvres disponibles : {auteur.nbOeuvres || 0}
              </p>

              {/* Bouton Voir ses œuvres */}
              <Link
                to={`/AuteurLivresPage/${auteur._id}`}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#160216] transition-colors"
              >
                Voir ses œuvres
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Aucun auteur ne correspond à votre recherche.
          </p>
        )}
      </div>

      {/* Bouton Voir plus */}
      {page < totalPages && (
        <div className="text-center mt-6">
          <button
            onClick={chargerPlus}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
}

export default AuteurPage;

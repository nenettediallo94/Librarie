

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLivres } from "../services/bookService";

function CataloguePage() {
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- état pour la recherche

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const data = await getLivres();
        setLivres(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLivres();
  }, []);

  // Filtrer les livres en fonction du texte de recherche
  const filteredLivres = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (livre.auteur && `${livre.auteur.prenoms} ${livre.auteur.nom}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
    livre.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Barre supérieure */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Catalogue des Livres</h1>

        {/* Barre de recherche */}
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Rechercher par titre, auteur ou genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 rounded-full bg-white border border-gray-600 text-[#160216] placeholder-[#160216] focus:outline-none focus:ring-2 focus:ring-[#160216]"
          />
        </div>

        {/* Bouton Ajouter un livre */}
        {/* <Link
          to="/AjouterLivre"
          className="btn-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Ajouter un nouveau livre
        </Link> */}
      </div>

      {/* Liste des livres filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLivres.length > 0 ? (
          filteredLivres.slice(0, 8).map((livre) => (
            <div
              key={livre._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Image de couverture */}
              <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                {livre.imageCouverture ? (
                  <img
                    src={`http://localhost:5000/${livre.imageCouverture}`}
                    alt={livre.titre}
                    className="max-h-full w-auto object-contain"
                  />
                ) : (
                  <div className="text-4xl">📚</div>
                )}
              </div>

              {/* Contenu du livre */}
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-lg font-bold truncate">{livre.titre}</h4>
                <p className="text-sm font-semibold mb-2">
                  {livre.auteur ? `${livre.auteur.prenoms} ${livre.auteur.nom}` : "Inconnu"}
                </p>

                <div className="flex justify-between text-xs mb-2">
                  <span className="italic">{livre.genre}</span>
                  <span
                    className={`font-semibold ${
                      livre.disponibilite === "gratuit"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {livre.disponibilite === "gratuit" ? "Gratuit ✅" : "Abonnement ❌"}
                  </span>
                  <span>{livre.langue}</span>
                </div>

                <p className="text-xs text-gray-700 line-clamp-2 mb-2">
                  {livre.description
                    ? livre.description.substring(0, 100) + "..."
                    : "Description non disponible"}
                </p>

                <div className="flex justify-between items-center mt-auto text-xs">
                  <span>{livre.pages || "120"} pages</span>
                  <span>{livre.annee || "2025"}</span>
                  <Link
                    to={`/Livre/${livre._id}`}
                    state={{ scrollPosition: window.scrollY }}
                    className="text-sm bg-[#160216] text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 p-8 rounded-lg text-center col-span-4">
            <p className="text-gray-500">
              Aucun livre ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CataloguePage;

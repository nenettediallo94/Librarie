import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLivreById } from "../services/bookService";
import BookReader from "./BookReader";

const LivreDetails = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);
  const [showReader, setShowReader] = useState(false); // Contrôle affichage PDF

  useEffect(() => {
    const fetchLivre = async () => {
      try {
        const data = await getLivreById(id);
        setLivre(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLivre();
  }, [id]);

  if (!livre) return <p className="text-center mt-8">Chargement du livre...</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <Link
        to="/CataloguePage"
        className="text-purple-600 hover:underline mb-4 inline-block"
      >
        ← Retour au catalogue
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden p-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200">
          {livre.imageCouverture ? (
            <img
              src={`http://localhost:5000/${livre.imageCouverture}`}
              alt={livre.titre}
              className="max-h-full w-auto object-contain"
            />
          ) : (
            <div className="text-6xl">📚</div>
          )}
        </div>

        {/* Informations */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{livre.titre}</h1>
            <p className="text-sm font-semibold mb-1">{livre.auteur}</p>
            {livre.coauteurs && (
              <p className="text-sm text-gray-600 mb-1">
                Co-auteurs: {livre.coauteurs}
              </p>
            )}

            <div className="flex gap-4 text-xs mb-2">
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

            <p className="text-sm text-gray-700 mb-2">{livre.description}</p>
          </div>

          <div className="flex justify-between items-center text-sm mt-4">
            <span>Pages : {livre.pages}</span>
            <span>{livre.annee}</span>
            {livre.documentLivre && (
              <button
                onClick={() => setShowReader(true)}
                className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
              >
                Lire maintenant
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Affichage conditionnel du BookReader */}
      {showReader && (
        <div className="mt-8">
          <BookReader pdfUrl={`http://localhost:5000/${livre.documentLivre}`} />
        </div>
      )}
    </div>
  );
};

export default LivreDetails;

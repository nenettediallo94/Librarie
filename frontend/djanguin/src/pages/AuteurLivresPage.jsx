import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLivresByAuteurId } from "../services/LivreService"; // Vous devrez créer ce service

function AuteurLivresPage() {
  const { auteurId } = useParams();
  const [livres, setLivres] = useState([]);
  const [auteur, setAuteur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const data = await getLivresByAuteurId(auteurId);
        if (data.livres) {
          setLivres(data.livres);
          setAuteur(data.auteur); // Si votre API renvoie aussi l'auteur
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des livres:", err);
        setError("Erreur lors du chargement des livres. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchLivres();
  }, [auteurId]);

  if (loading) {
    return <div className="text-center mt-8">Chargement des livres...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {auteur && (
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Œuvres de {auteur.prenoms} {auteur.nom}
        </h1>
      )}
      
      {livres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {livres.map((livre) => (
            <div key={livre._id} className="p-6 border rounded-xl shadow-lg bg-white flex flex-col items-center text-center">
              {/* Image du livre */}
              <img
                src={livre.couverture ? `http://localhost:5000${livre.couverture}` : "/default-book.png"}
                alt={livre.titre}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* Titre du livre */}
              <h3 className="text-xl font-semibold mb-1">{livre.titre}</h3>
              {/* Année de publication */}
              <p className="text-gray-600 text-sm">{livre.anneePublication}</p>
              {/* Lien pour voir les détails du livre */}
              <Link to={`/livre/${livre._id}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Aucun livre trouvé pour cet auteur.
        </p>
      )}
    </div>
  );
}

export default AuteurLivresPage;
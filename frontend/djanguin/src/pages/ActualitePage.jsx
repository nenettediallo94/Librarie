import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActualites } from "../services/actualiteService";

function ActualitesPage() {
  const [actualites, setActualites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const data = await getActualites();
        setActualites(data);
      } catch (err) {
        setError("Impossible de charger les actualités.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchActualites();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Chargement des actualités...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#160216]">
        Toutes les Actualités
      </h1>
      
      {actualites.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Aucune actualité n'a été trouvée pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.map((actu) => (
            <div
              key={actu._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={`http://localhost:5000/${actu.image}`}
                alt={actu.titre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                      {actu.categorie}
                    </span>
                    <span className="italic">
                      Publié le {new Date(actu.publieLe).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-blue-800 line-clamp-2 mb-2">
                    {actu.titre}
                  </h2>
                  <p className="line-clamp-3 text-gray-700 text-sm mb-4">
                    {actu.extrait}
                  </p>
                </div>
                <Link
                  to={`/Actualite/${actu._id}`}
                  className="inline-block self-start bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Lire la suite
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActualitesPage;
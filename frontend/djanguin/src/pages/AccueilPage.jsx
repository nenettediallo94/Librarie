import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/couverturedjan.png";
import { getLivres } from "../services/bookService";
import { getActualites } from "../services/actualiteService";

function Accueil() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const livresData = await getLivres();
        setRecentBooks(livresData.slice(0, 3));

        const actualitesData = await getActualites();
        setActualites(actualitesData.slice(0, 3));
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Section avec background */}
      <div
        className="relative min-h-screen flex flex-col justify-between bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="relative z-10 flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Découvrez la Littérature Guinéenne
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg font-bold mb-8">
              Dianguin vous donne accès à une collection de romans, nouvelles et
              poésies d’auteurs guinéens. Une bibliothèque numérique pour
              valoriser notre patrimoine littéraire.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/CataloguePage"
                className="bg-[#160216] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:text-black transition-colors duration-300 text-center"
              >
                Explorez le catalogue
              </Link>
              <Link
                to="/AuteurPage"
                className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#160216] transition-colors duration-300 text-center"
              >
                Découvrez nos auteurs
              </Link>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="relative z-20 w-full mt-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <div className="bg-white text-black rounded-lg p-6 shadow-lg">
              <p className="text-3xl font-bold">100</p>
              <p>Œuvres disponibles</p>
            </div>
            <div className="bg-white text-black rounded-lg p-6 shadow-lg">
              <p className="text-3xl font-bold">1500</p>
              <p>Utilisateurs</p>
            </div>
            <div className="bg-white text-black rounded-lg p-6 shadow-lg">
              <p className="text-3xl font-bold">🌍</p>
              <p>Disponible partout en Guinée</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section livres récents */}
      <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-8xl mx-auto my-12 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">📖 Livres ajoutés récemment</h2>
            <p className="text-gray-600 text-sm">
              Les œuvres les plus appréciées par nos lecteurs
            </p>
          </div>
          <Link
            to="/CataloguePage"
            className="text-sm bg-[#160216] text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#160216] border border-[#160216] transition"
          >
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentBooks.length > 0 ? (
            recentBooks.map((livre) => (
              <div
                key={livre._id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={`http://localhost:5000/${livre.imageCouverture}`}
                  alt={livre.titre}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-lg font-bold truncate">{livre.titre}</h4>
                  <p className="text-sm font-semibold mb-2">{livre.auteur}</p>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="italic">{livre.genre}</span>
                    <span
                      className={`font-semibold ${
                        livre.disponibilite === "gratuit"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {livre.disponibilite === "gratuit"
                        ? "Gratuit ✅"
                        : "Abonnement ❌"}
                    </span>
                    <span>{livre.langue}</span>
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-2 mb-2">
                    {livre.description
                      ? livre.description.substring(0, 200) + "..."
                      : "Description non disponible"}
                  </p>
                  <div className="flex justify-between items-center mt-auto text-xs">
                    <span>{livre.pages || "120"} pages</span>
                    <span>{livre.annee || "2025"}</span>
                    <Link
                      to={`/Livre/${livre._id}`}
                      className="text-sm bg-[#160216] text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Aucun livre ajouté récemment.</p>
          )}
        </div>
      </div>

      {/* Section Nos nouveautés + Actualités */}
      <div className="bg-white rounded-lg shadow-md my-8 mx-4 md:mx-auto md:max-w-8xl flex flex-col md:flex-row overflow-hidden gap-4">
        
        {/* Sous-section Nouveautés */}
        {recentBooks.length > 0 && (
          <div className="flex-1 p-4 flex flex-col justify-center bg-purple-50 rounded-md">
            <h2 className="text-xl font-bold mb-1 text-purple-700 flex items-center gap-1">Nos nouveautés</h2>
            <p className="text-gray-600 mb-2 text-sm">Le dernier ajout à notre collection, à ne pas manquer !</p>

            <div className="flex-1 overflow-hidden md:flex hidden mt-4">
              <img
                src={`http://localhost:5000/${recentBooks[0].imageCouverture}`}
                alt={recentBooks[0].titre}
                className="h-72 w-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-md"
              />
            </div>

            <h3 className="text-lg font-semibold truncate mb-1">{recentBooks[0].titre}</h3>
            <p className="text-sm text-gray-700 mb-2 truncate">{recentBooks[0].auteur}</p>

            <div className="flex flex-wrap gap-1 mb-2 text-xs">
              <span className="italic bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{recentBooks[0].genre}</span>
              <span className={`px-2 py-0.5 rounded font-semibold ${recentBooks[0].disponibilite === "gratuit" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                {recentBooks[0].disponibilite === "gratuit" ? "Gratuit ✅" : "Abonnement ❌"}
              </span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">{recentBooks[0].langue}</span>
            </div>

            <p className="text-gray-700 mb-3 line-clamp-2 text-sm">
              {recentBooks[0].description ? recentBooks[0].description.substring(0, 120) + "..." : "Description non disponible"}
            </p>

            <div className="flex gap-2 items-center text-xs">
              <span className="px-2 py-0.5 bg-gray-100 rounded">{recentBooks[0].pages || "120"} pages</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded">{recentBooks[0].annee || "2025"}</span>
              <Link to={`/Livre/${recentBooks[0]._id}`} className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 transition-colors text-xs">
                Voir détails
              </Link>
            </div>
          </div>
        )}

        {/* Sous-section Actualités dynamique */}
        {actualites.length > 0 && (
          <div className="flex-1 p-4 flex flex-col justify-start bg-blue-50 rounded-md border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-1">📰 Actualités</h2>

            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {actualites.map((actu) => (
                <div key={actu._id} className="border-b border-gray-200 pb-2">
                  <h3 className="font-semibold">{actu.titre}</h3>
                  <p className="line-clamp-2 text-gray-600">{actu.extrait}</p>
                </div>
              ))}

              <Link to="/ActualitesPage" className="mt-2 text-blue-600 text-xs font-semibold hover:underline">
                Voir toutes les actualités
              </Link>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Accueil;

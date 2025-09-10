// import React, { useEffect, useState } from "react";
// import { getAuteurs } from "../services/auteurService";
// import { Link } from "react-router-dom";

// function AuteurPage() {
//   const [auteurs, setAuteurs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const auteursPerPage = 8;

//   useEffect(() => {
//     const fetchAuteurs = async () => {
//       try {
//         const data = await getAuteurs(); // récupérer tous les auteurs
//         setAuteurs(data);
//       } catch (err) {
//         console.error("Erreur lors du chargement des auteurs :", err);
//       }
//     };
//     fetchAuteurs();
//   }, []);

//   // Calcul des auteurs à afficher pour la page actuelle
//   const indexOfLast = currentPage * auteursPerPage;
//   const indexOfFirst = indexOfLast - auteursPerPage;
//   const currentAuteurs = auteurs.slice(indexOfFirst, indexOfLast);

//   // Pagination
//   const totalPages = Math.ceil(auteurs.length / auteursPerPage);
//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Nos auteurs</h1>

//       {currentAuteurs.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
//           {currentAuteurs.map((auteur) => (
//             <div
//               key={auteur._id}
//               className="flex flex-col items-center text-center bg-white shadow rounded-lg p-4"
//             >
//               <img
//                 src={`http://localhost:5000/${auteur.photo}`}
//                 alt={auteur.nom}
//                 className="w-24 h-24 rounded-full object-cover mb-2"
//               />
//               <h3 className="text-lg font-semibold">{auteur.nom}</h3>
//               <p className="text-sm text-gray-600">
//                 {auteur.bio ? auteur.bio.substring(0, 60) + "..." : ""}
//               </p>
//               <Link
//                 to={`/Auteur/${auteur._id}`}
//                 className="mt-2 text-purple-600 text-xs font-semibold hover:underline"
//               >
//                 Voir profil
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Aucun auteur disponible pour le moment.</p>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 gap-2">
//           {pageNumbers.map((num) => (
//             <button
//               key={num}
//               onClick={() => setCurrentPage(num)}
//               className={`px-3 py-1 rounded-md border ${
//                 currentPage === num
//                   ? "bg-purple-600 text-white border-purple-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AuteurPage;

import React, { useEffect, useState } from "react";
import { getAuteurs } from "../services/auteurService";
import { Link } from "react-router-dom";

function AuteurPage() {
  const [auteurs, setAuteurs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; // nombre d’auteurs par page

  useEffect(() => {
    chargerAuteurs(page);
  }, [page]);

  const chargerAuteurs = async (pageActuelle) => {
    try {
      const data = await getAuteurs(pageActuelle, limit);
      if (pageActuelle === 1) {
        setAuteurs(data.auteurs); // première page → remplacer
      } else {
        setAuteurs((prev) => [...prev, ...data.auteurs]); // pages suivantes → ajouter
      }
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  const chargerPlus = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Nos auteurs</h1>
            <Link
              to="/AjouterUser"
              className="btn-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
            >
              Ajouter un nouvel auteur
            </Link>
          </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {auteurs && auteurs.length > 0 ? (
  auteurs.map((auteur) => (
    <div key={auteur._id} className="p-4 border rounded-lg shadow-md bg-white">
      <img
        src={auteur.imageProfil || "/default-avatar.png"}
        alt={`${auteur.prenoms} ${auteur.nom}`}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h3 className="mt-2 font-semibold text-center">
        {auteur.prenoms} {auteur.nom}
      </h3>
      <p className="text-sm text-gray-600 text-center">
        {auteur.biographie?.substring(0, 60)}...
      </p>
    </div>
  ))
) : (
  <p className="text-center text-gray-500">Aucun auteur trouvé.</p>
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

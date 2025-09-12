// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // <-- ajouter useNavigate

// // Cette fonction a été mise à jour pour interroger votre API locale.
// const getLivreById = async (id) => {
//   if (!id) return null;
//   try {
//     const response = await fetch(`http://localhost:5000/api/livres/${id}`);
//     if (!response.ok) {
//       throw new Error(`Erreur HTTP: Le livre avec l'ID ${id} n'a pas été trouvé. Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération du livre:", error);
//     return null;
//   }
// };

// const LivreDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // <-- hook pour la navigation

//   const [livre, setLivre] = useState(null);
//   const [showReader, setShowReader] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLivre = async () => {
//       const data = await getLivreById(id);
//       if (data) {
//         setLivre(data);
//         setError(null);
//       } else {
//         setError(`Impossible de charger les données du livre avec l'ID "${id}". Veuillez vérifier que votre serveur backend est bien lancé et que cet ID est valide.`);
//       }
//     };

//     if (id) {
//       fetchLivre();
//     }
//   }, [id]);

//   if (!livre && !error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <p className="text-xl font-semibold text-gray-700">Chargement du livre...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-red-50">
//         <div className="text-center p-8 bg-white rounded-lg shadow-xl border border-red-300">
//           <h1 className="text-2xl font-bold text-red-700 mb-4">Erreur de chargement</h1>
//           <p className="text-lg text-red-600 mb-4">{error}</p>
//           <p className="text-gray-500">
//             Veuillez vérifier la console pour plus de détails sur le problème côté serveur.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const pdfUrl = `http://localhost:5000/${livre.documentLivre}`;

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {/* Bouton retour */}
//       <button
//         onClick={() => navigate(-1)} // -1 = revenir à la page précédente
//         className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//       >
//         ⬅ Retour
//       </button>

//       <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden p-6">
//         {/* Image */}
//         <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
//           {livre.imageCouverture ? (
//             <img
//               src={`http://localhost:5000/${livre.imageCouverture}`}
//               alt={livre.titre}
//               className="max-h-full w-auto object-contain rounded-lg"
//             />
//           ) : (
//             <div className="text-6xl text-gray-500">📚</div>
//           )}
//         </div>

//         {/* Infos */}
//         <div className="flex-1 flex flex-col justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2 text-gray-900">{livre.titre}</h1>
//             <p className="text-sm font-semibold mb-1 text-gray-800">{livre.auteur}</p>
//             {livre.coauteurs && (
//               <p className="text-sm text-gray-600 mb-1">
//                 Co-auteurs: {livre.coauteurs}
//               </p>
//             )}
            
//             <div className="flex gap-4 text-xs mb-2">
//               <span className="italic text-gray-600">{livre.genre}</span>
//               <span className={`font-semibold ${livre.disponibilite === "gratuit" ? "text-green-600" : "text-orange-500"}`}>
//                 {livre.disponibilite === "gratuit" ? "Gratuit ✅" : "Abonnement ❌"}
//               </span>
//               <span className="text-gray-600">{livre.langue}</span>
//             </div>

//             <p className="text-sm text-gray-700 mb-2">{livre.description}</p>
//           </div>

//           <div className="flex justify-between items-center text-sm mt-4">
//             <span className="text-gray-600">Pages : {livre.pages}</span>
//             <span className="text-gray-600">{livre.annee}</span>
//             {livre.documentLivre && (
//               <button
//                 onClick={() => setShowReader(true)}
//                 className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
//               >
//                 Lire maintenant
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Lecteur PDF */}
//       {showReader && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Lecteur de PDF</h2>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <iframe
//               title="Lecteur de PDF"
//               src={pdfUrl}
//               className="w-full rounded-lg"
//               style={{ height: '80vh', border: 'none' }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LivreDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 

// Fonction API
const getLivreById = async (id) => {
  if (!id) return null;
  try {
    const response = await fetch(`http://localhost:5000/api/livres/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: Le livre avec l'ID ${id} n'a pas été trouvé. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du livre:", error);
    return null;
  }
};

const LivreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const location = useLocation(); // 👈 récupère les infos envoyées depuis le catalogue

  const [livre, setLivre] = useState(null);
  const [showReader, setShowReader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivre = async () => {
      const data = await getLivreById(id);
      if (data) {
        setLivre(data);
        setError(null);
      } else {
        setError(
          `Impossible de charger les données du livre avec l'ID "${id}". Veuillez vérifier que votre serveur backend est bien lancé et que cet ID est valide.`
        );
      }
    };

    if (id) {
      fetchLivre();
    }
  }, [id]);

  if (!livre && !error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Chargement du livre...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl border border-red-300">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Erreur de chargement</h1>
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <p className="text-gray-500">
            Veuillez vérifier la console pour plus de détails sur le problème côté serveur.
          </p>
        </div>
      </div>
    );
  }

  const pdfUrl = `http://localhost:5000/${livre.documentLivre}`;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Bouton retour */}
      <button
        onClick={() => {
          if (location.state?.livreId) {
            navigate(-1); // revenir à la page précédente
            setTimeout(() => {
              const el = document.getElementById(`livre-${location.state.livreId}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 200); // petit délai pour laisser le DOM se recharger
          } else {
            navigate(-1); // fallback si pas de livreId
          }
        }}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        ⬅ Retour
      </button>

      <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden p-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
          {livre.imageCouverture ? (
            <img
              src={`http://localhost:5000/${livre.imageCouverture}`}
              alt={livre.titre}
              className="max-h-full w-auto object-contain rounded-lg"
            />
          ) : (
            <div className="text-6xl text-gray-500">📚</div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{livre.titre}</h1>
            <p className="text-sm font-semibold mb-1 text-gray-800">{livre.auteur}</p>
            {livre.coauteurs && (
              <p className="text-sm text-gray-600 mb-1">
                Co-auteurs: {livre.coauteurs}
              </p>
            )}
            
            <div className="flex gap-4 text-xs mb-2">
              <span className="italic text-gray-600">{livre.genre}</span>
              <span
                className={`font-semibold ${
                  livre.disponibilite === "gratuit"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {livre.disponibilite === "gratuit" ? "Gratuit ✅" : "Abonnement ❌"}
              </span>
              <span className="text-gray-600">{livre.langue}</span>
            </div>

            <p className="text-sm text-gray-700 mb-2">{livre.description}</p>
          </div>

          <div className="flex justify-between items-center text-sm mt-4">
            <span className="text-gray-600">Pages : {livre.pages}</span>
            <span className="text-gray-600">{livre.annee}</span>
            {livre.documentLivre && (
              <button
                onClick={() => setShowReader(true)}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
              >
                Lire maintenant
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lecteur PDF */}
      {showReader && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Lecteur de PDF</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <iframe
              title="Lecteur de PDF"
              src={pdfUrl}
              className="w-full rounded-lg"
              style={{ height: '80vh', border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LivreDetails;

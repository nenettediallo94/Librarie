// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getLivreById } from "../services/bookService";
// import BookReader from "./BookReader";

// const LivreDetails = () => {
//   const { id } = useParams();
//   const [livre, setLivre] = useState(null);
//   const [showReader, setShowReader] = useState(false); // Contrôle affichage PDF

//   useEffect(() => {
//     const fetchLivre = async () => {
//       try {
//         const data = await getLivreById(id);
//         setLivre(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchLivre();
//   }, [id]);

//   if (!livre) return <p className="text-center mt-8">Chargement du livre...</p>;

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <Link
//         to="/CataloguePage"
//         className="text-purple-600 hover:underline mb-4 inline-block"
//       >
//         ← Retour au catalogue
//       </Link>

//       <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden p-6">
//         {/* Image */}
//         <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200">
//           {livre.imageCouverture ? (
//             <img
//               src={`http://localhost:5000/${livre.imageCouverture}`}
//               alt={livre.titre}
//               className="max-h-full w-auto object-contain"
//             />
//           ) : (
//             <div className="text-6xl">📚</div>
//           )}
//         </div>

//         {/* Informations */}
//         <div className="flex-1 flex flex-col justify-between">
//           <div>
//             <h1 className="text-2xl font-bold mb-2">{livre.titre}</h1>
//             <p className="text-sm font-semibold mb-1">{livre.auteur}</p>
//             {livre.coauteurs && (
//               <p className="text-sm text-gray-600 mb-1">
//                 Co-auteurs: {livre.coauteurs}
//               </p>
//             )}

//             <div className="flex gap-4 text-xs mb-2">
//               <span className="italic">{livre.genre}</span>
//               <span
//                 className={`font-semibold ${
//                   livre.disponibilite === "gratuit"
//                     ? "text-green-600"
//                     : "text-orange-500"
//                 }`}
//               >
//                 {livre.disponibilite === "gratuit" ? "Gratuit ✅" : "Abonnement ❌"}
//               </span>
//               <span>{livre.langue}</span>
//             </div>

//             <p className="text-sm text-gray-700 mb-2">{livre.description}</p>
//           </div>

//           <div className="flex justify-between items-center text-sm mt-4">
//             <span>Pages : {livre.pages}</span>
//             <span>{livre.annee}</span>
//             {livre.documentLivre && (
//               <button
//                 onClick={() => setShowReader(true)}
//                 className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
//               >
//                 Lire maintenant
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Affichage conditionnel du BookReader */}
//       {showReader && (
//         <div className="mt-8">
//           <BookReader pdfUrl={`http://localhost:5000/${livre.documentLivre}`} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default LivreDetails;


// import React, { useState, useEffect } from 'react';

// // Données de livre simulées pour que l'application soit fonctionnelle sans backend
// // Remplacez ces données par l'appel à votre service une fois que votre backend sera prêt
// const getLivreById = async (id) => {
//   return {
//     id: id,
//     titre: "Avalez le crapaud !",
//     auteur: "Brian Tracy",
//     coauteurs: "N/A",
//     genre: "Développement personnel",
//     disponibilite: "gratuit",
//     langue: "Français",
//     description: "Un guide pour vaincre la procrastination et accomplir ses tâches les plus importantes.",
//     pages: 144,
//     annee: 2001,
//     // C'est la ligne clé pour le PDF : nous utilisons une URL de démonstration qui fonctionne.
//     // Remplacez-la par l'URL de votre serveur local une fois que vous l'aurez configuré.
//     documentLivre: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//     imageCouverture: "https://placehold.co/300x450/E5E7EB/4B5563?text=Couverture+du+Livre",
//   };
// };

// const LivreDetails = () => {
//   const [livre, setLivre] = useState(null);
//   const [showReader, setShowReader] = useState(false);

//   useEffect(() => {
//     // Dans un vrai projet, vous passeriez l'ID en paramètre,
//     // mais ici, on simule l'appel avec un ID statique.
//     const fetchLivre = async () => {
//       try {
//         const data = await getLivreById("un-id-de-livre");
//         setLivre(data);
//       } catch (err) {
//         console.error("Erreur lors de la récupération du livre:", err);
//       }
//     };
//     fetchLivre();
//   }, []);

//   if (!livre) {
//     return <p className="text-center mt-8 text-gray-700">Chargement du livre...</p>;
//   }

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md overflow-hidden p-6">
//         {/* Image */}
//         <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
//           {livre.imageCouverture ? (
//             <img
//               src={livre.imageCouverture}
//               alt={livre.titre}
//               className="max-h-full w-auto object-contain rounded-lg"
//             />
//           ) : (
//             <div className="text-6xl text-gray-500">📚</div>
//           )}
//         </div>

//         {/* Informations */}
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

//       {/* Affichage conditionnel du lecteur de PDF */}
//       {showReader && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Lecteur de PDF</h2>
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <iframe
//               title="Lecteur de PDF"
//               src={livre.documentLivre}
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

// import React, { useState, useEffect } from 'react';

// // Cette fonction a été mise à jour pour interroger votre API locale.
// // Assurez-vous que votre serveur est en cours d'exécution à http://localhost:5000.
// const getLivreById = async (id) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/livres/${id}`);
    
//     // Vérifie si la réponse est valide (statut 200 OK)
//     if (!response.ok) {
//       // Lance une erreur si le livre n'a pas été trouvé, par exemple
//       throw new Error(`Erreur HTTP: Le livre avec l'ID ${id} n'a pas été trouvé. Status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération du livre:", error);
//     // Vous pouvez retourner une valeur par défaut ou relancer l'erreur
//     return null;
//   }
// };

// const LivreDetails = () => {
//   const [livre, setLivre] = useState(null);
//   const [showReader, setShowReader] = useState(false);

//   useEffect(() => {
//     // Remplacez cette valeur par l'ID réel du livre que vous voulez afficher.
//     // Cet ID devrait provenir de vos routes React, par exemple.
//     const livreId = "123456789"; 

//     const fetchLivre = async () => {
//       try {
//         const data = await getLivreById(livreId);
//         setLivre(data);
//       } catch (err) {
//         console.error("Erreur lors de la récupération du livre:", err);
//       }
//     };
//     fetchLivre();
//   }, []); // Le tableau de dépendances vide signifie que cela ne s'exécute qu'une seule fois au montage.

//   if (!livre) {
//     return <p className="text-center mt-8 text-gray-700">Chargement du livre...</p>;
//   }

//   // Affiche le lecteur de PDF en utilisant l'URL fournie par l'API
//   const pdfUrl = `http://localhost:5000/${livre.documentLivre}`;

//   return (
//     <div className="container mx-auto px-6 py-8">
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

//         {/* Informations */}
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

//       {/* Affichage conditionnel du lecteur de PDF */}
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
import { useParams } from 'react-router-dom';

// Cette fonction a été mise à jour pour interroger votre API locale.
const getLivreById = async (id) => {
  if (!id) return null;
  try {
    const response = await fetch(`http://localhost:5000/api/livres/${id}`);
    
    // Vérifie si la réponse est valide (statut 200 OK)
    if (!response.ok) {
      // Lance une erreur si le livre n'a pas été trouvé, par exemple
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
  // On récupère l'ID directement depuis les paramètres d'URL, par exemple /livres/12345
  const { id } = useParams();

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
        // Définir un message d'erreur visible dans l'interface utilisateur
        setError(`Impossible de charger les données du livre avec l'ID "${id}". Veuillez vérifier que votre serveur backend est bien lancé et que cet ID est valide.`);
      }
    };

    if (id) {
      fetchLivre();
    }
  }, [id]); // Le useEffect se déclenche à chaque fois que l'ID dans l'URL change

  // Afficher un message de chargement
  if (!livre && !error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Chargement du livre...</p>
      </div>
    );
  }

  // Afficher un message d'erreur si la récupération a échoué
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

  // Construire l'URL du PDF une fois que le livre est chargé
  const pdfUrl = `http://localhost:5000/${livre.documentLivre}`;

  return (
    <div className="container mx-auto px-6 py-8">
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

        {/* Informations */}
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
              <span className={`font-semibold ${livre.disponibilite === "gratuit" ? "text-green-600" : "text-orange-500"}`}>
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

      {/* Affichage conditionnel du lecteur de PDF */}
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


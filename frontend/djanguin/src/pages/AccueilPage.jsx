

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from "../assets/couverturedjan.png";
// import { getLivres } from "../services/bookService";
// import { getActualites } from "../services/actualiteService";
// import FAQ from "../components/FAQ";

// function Accueil() {
//   const [recentBooks, setRecentBooks] = useState([]);
//   const [actualites, setActualites] = useState([]);
//   const [currentActuIndex, setCurrentActuIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const livresData = await getLivres();
//         setRecentBooks(livresData.slice(0, 3));

//         const actualitesData = await getActualites();
//         setActualites(actualitesData);
//       } catch (err) {
//         console.error("Erreur lors du chargement :", err);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (actualites.length > 1) {
//       const interval = setInterval(() => {
//         setIsFading(true);
//         setTimeout(() => {
//           setCurrentActuIndex(
//             (prevIndex) => (prevIndex + 1) % actualites.length
//           );
//           setIsFading(false);
//         }, 500);
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [actualites]);

//   const handlePrev = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentActuIndex((prevIndex) =>
//         prevIndex === 0 ? actualites.length - 1 : prevIndex - 1
//       );
//       setIsFading(false);
//     }, 500);
//   };

//   const handleNext = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentActuIndex((prevIndex) => (prevIndex + 1) % actualites.length);
//       setIsFading(false);
//     }, 500);
//   };

//   const actualiteActuelle = actualites[currentActuIndex];

//   return (
//     <>
//       {/* Section avec background */}
//       <div
//         className="relative min-h-screen flex flex-col justify-between bg-cover bg-center"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="relative z-10 flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
//           <div className="text-center text-white max-w-4xl mx-auto">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
//               Découvrez la Littérature Guinéenne
//             </h1>
//             <p className="mt-4 max-w-3xl mx-auto text-lg font-bold mb-8">
//               Dianguin vous donne accès à une collection de romans, nouvelles et
//               poésies d’auteurs guinéens. Une bibliothèque numérique pour
//               valoriser notre patrimoine littéraire.
//             </p>

//             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 to="/CataloguePage"
//                 className="bg-[#160216] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:text-black transition-colors duration-300 text-center"
//               >
//                 Explorez le catalogue
//               </Link>
//               <Link
//                 to="/AuteurPage"
//                 className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#160216] transition-colors duration-300 text-center"
//               >
//                 Découvrez nos auteurs
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Statistiques */}
//         <div className="relative z-20 w-full mt-8">
//           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">100</p>
//               <p>Œuvres disponibles</p>
//             </div>
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">1500</p>
//               <p>Utilisateurs</p>
//             </div>
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">🌍</p>
//               <p>Disponible partout en Guinée</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section livres récents */}
//       <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-8xl mx-auto my-12 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-bold">📖 Livres ajoutés récemment</h2>
//             <p className="text-gray-600 text-sm">
//               Les œuvres les plus appréciées par nos lecteurs
//             </p>
//           </div>
//           <Link
//             to="/CataloguePage"
//             className="text-sm bg-[#160216] text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#160216] border border-[#160216] transition"
//           >
//             Voir tout
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {recentBooks.length > 0 ? (
//             recentBooks.map((livre) => (
//               <div
//                 key={livre._id}
//                 className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
//               >
//                 <img
//                   src={`http://localhost:5000/${livre.imageCouverture}`}
//                   alt={livre.titre}
//                   className="h-48 w-full object-cover"
//                 />
//                 <div className="p-4 flex flex-col flex-1">
//                   <h4 className="text-lg font-bold truncate">{livre.titre}</h4>
//                   <p className="text-sm font-semibold mb-2">{livre.auteur}</p>
//                   <div className="flex justify-between text-xs mb-2">
//                     <span className="italic">{livre.genre}</span>
//                     <span
//                       className={`font-semibold ${
//                         livre.disponibilite === "gratuit"
//                           ? "text-green-600"
//                           : "text-orange-500"
//                       }`}
//                     >
//                       {livre.disponibilite === "gratuit"
//                         ? "Gratuit ✅"
//                         : "Abonnement ❌"}
//                     </span>
//                     <span>{livre.langue}</span>
//                   </div>
//                   <p className="text-xs text-gray-700 line-clamp-2 mb-2">
//                     {livre.description
//                       ? livre.description.substring(0, 200) + "..."
//                       : "Description non disponible"}
//                   </p>
//                   <div className="flex justify-between items-center mt-auto text-xs">
//                     <span>{livre.pages || "120"} pages</span>
//                     <span>{livre.annee || "2025"}</span>
//                     <Link
//                       to={`/Livre/${livre._id}`}
//                       state={{ livreId: livre._id, scrollPosition: window.scrollY }}
//                       className="text-sm bg-[#160216] text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
//                     >
//                       Voir détails
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 italic">
//               Aucun livre ajouté récemment.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Section Nouveautés + Actualités */}
//       <div className="bg-white rounded-lg shadow-md my-8 mx-4 md:mx-auto md:max-w-8xl flex flex-col md:flex-row overflow-hidden gap-4">
//         {/* Nouveauté */}
//         {recentBooks.length > 0 && (
//           <div className="flex-1 p-4 flex flex-col justify-center bg-purple-50 rounded-md">
//             <h2 className="text-xl font-bold mb-1 text-purple-700 flex items-center gap-1">
//               Nos nouveautés
//             </h2>
//             <p className="text-gray-600 mb-2 text-sm">
//               Le dernier ajout à notre collection, à ne pas manquer !
//             </p>
//             <div className="flex-1 overflow-hidden md:flex hidden mt-4">
//               <img
//                 src={`http://localhost:5000/${recentBooks[0].imageCouverture}`}
//                 alt={recentBooks[0].titre}
//                 className="h-72 w-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-md"
//               />
//             </div>
//             <h3 className="text-lg font-semibold truncate mb-1">
//               {recentBooks[0].titre}
//             </h3>
//             <p className="text-sm text-gray-700 mb-2 truncate">
//               {recentBooks[0].auteur}
//             </p>
//             <div className="flex flex-wrap gap-1 mb-2 text-xs">
//               <span className="italic bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
//                 {recentBooks[0].genre}
//               </span>
//               <span
//                 className={`px-2 py-0.5 rounded font-semibold ${
//                   recentBooks[0].disponibilite === "gratuit"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-orange-100 text-orange-700"
//                 }`}
//               >
//                 {recentBooks[0].disponibilite === "gratuit"
//                   ? "Gratuit ✅"
//                   : "Abonnement ❌"}
//               </span>
//               <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
//                 {recentBooks[0].langue}
//               </span>
//             </div>
//             <p className="text-gray-700 mb-3 line-clamp-2 text-sm">
//               {recentBooks[0].description
//                 ? recentBooks[0].description.substring(0, 120) + "..."
//                 : "Description non disponible"}
//             </p>
//             <div className="flex gap-2 items-center text-xs">
//               <span className="px-2 py-0.5 bg-gray-100 rounded">
//                 {recentBooks[0].pages || "120"} pages
//               </span>
//               <span className="px-2 py-0.5 bg-gray-100 rounded">
//                 {recentBooks[0].annee || "2025"}
//               </span>
//               <Link
//                 to={`/Livre/${recentBooks[0]._id}`}
//                 state={{ livreId: recentBooks[0]._id }}
//                 className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 transition-colors text-xs"
//               >
//                 Voir détails
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* Actualités */}
//         {actualites.length > 0 && actualiteActuelle && (
//           <div className="flex-1 p-4 flex flex-col justify-start bg-blue-50 rounded-md border-t md:border-t-0 md:border-l border-gray-200">
//             <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-1">
//               <span role="img" aria-label="Actualité">
//                 📰
//               </span>{" "}
//               Actualités
//             </h2>

//             <div className="relative">
//               {/* Boutons de navigation */}
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
//               >
//                 &lt;
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
//               >
//                 &gt;
//               </button>

//               {/* Conteneur actu */}
//               <div
//                 key={actualiteActuelle._id}
//                 className={`transition-opacity duration-500 ease-in-out ${
//                   isFading ? "opacity-0" : "opacity-100"
//                 }`}
//               >
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3">
//                     <img
//                       src={`http://localhost:5000/${actualiteActuelle.image}`}
//                       alt={actualiteActuelle.titre}
//                       className="w-full h-48 object-cover rounded-md"
//                     />
//                   </div>

//                   <div className="flex-1 flex flex-col justify-between">
//                     <div className="flex flex-col">
//                       <div className="flex justify-between items-center text-xl text-black mb-1">
//                         <span className="bg-gray-200 px-2 py-1 rounded-full text-xl font-semibold">
//                           {actualiteActuelle.categorie}
//                         </span>
//                         <span className="italic">
//                           Publié le{" "}
//                           {new Date(
//                             actualiteActuelle.publieLe
//                           ).toLocaleDateString()}
//                         </span>
//                       </div>

//                       <h3 className="font-bold text-lg text-blue-800 line-clamp-2">
//                         {actualiteActuelle.titre}
//                       </h3>

//                       <p className="line-clamp-3 text-gray-700 mt-1">
//                         {actualiteActuelle.extrait}
//                       </p>
//                     </div>

//                     <div className="mt-4">
//                       <Link
//                         to={`/Actualite/${actualiteActuelle._id}`}
//                         className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
//                       >
//                         Lire la suite
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Link
//               to="/ActualitesPage"
//               className="mt-4 text-blue-600 text-sm font-semibold hover:underline text-center"
//             >
//               Voir toutes les actualités
//             </Link>
//           </div>
//         )}
//       </div>
//       <FAQ />
//     </>
//   );
// }

// export default Accueil;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from "../assets/couverturedjan.png";
// import { getLivres } from "../services/bookService";
// import { getActualites } from "../services/actualiteService";
// import { getAuteurs } from "../services/auteurService"; // Nouveau service à créer
// import FAQ from "../components/FAQ";
// import Temoignage from "../components/Temoignages"; // Nouveau composant à créer

// function Accueil() {
//   const [recentBooks, setRecentBooks] = useState([]);
//   const [actualites, setActualites] = useState([]);
//   const [currentActuIndex, setCurrentActuIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false);
//   const [auteurs, setAuteurs] = useState([]);
//   const [temoignages, setTemoignages] = useState([
//     {
//       nom: "Fatoumata Diallo",
//       commentaire: "Djanguin est une vraie découverte pour moi !",
//       photo: null,
//       role: "Lectrice",
//     },
//     {
//       nom: "Ibrahima Camara",
//       commentaire: "Une plateforme qui valorise la littérature guinéenne.",
//       photo: null,
//       role: "Lecteur",
//     },
//     {
//       nom: "Aminata Barry",
//       commentaire: "J'adore suivre les nouveautés des auteurs.",
//       photo: null,
//       role: "Lectrice",
//     },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const livresData = await getLivres();
//         setRecentBooks(livresData.slice(0, 3));

//         const actualitesData = await getActualites();
//         setActualites(actualitesData);

//         const { auteurs: auteursData } = await getAuteurs();
//         setAuteurs(auteursData.slice(0, 4)); // Top 4 auteurs en vedette
//       } catch (err) {
//         console.error("Erreur lors du chargement :", err);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (actualites.length > 1) {
//       const interval = setInterval(() => {
//         setIsFading(true);
//         setTimeout(() => {
//           setCurrentActuIndex(
//             (prevIndex) => (prevIndex + 1) % actualites.length
//           );
//           setIsFading(false);
//         }, 500);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [actualites]);

//   const handlePrev = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentActuIndex((prevIndex) =>
//         prevIndex === 0 ? actualites.length - 1 : prevIndex - 1
//       );
//       setIsFading(false);
//     }, 500);
//   };

//   const handleNext = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentActuIndex((prevIndex) => (prevIndex + 1) % actualites.length);
//       setIsFading(false);
//     }, 500);
//   };

//   const actualiteActuelle = actualites[currentActuIndex];

//   return (
//     <>
//       {/* Hero Section */}
//       <div
//         className="relative min-h-screen flex flex-col justify-between bg-cover bg-center"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="relative z-10 flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
//           <div className="text-center text-white max-w-4xl mx-auto">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
//               Découvrez la Littérature Guinéenne
//             </h1>
//             <p className="mt-4 max-w-3xl mx-auto text-lg font-bold mb-8">
//               Dianguin vous donne accès à une collection de romans, nouvelles et
//               poésies d’auteurs guinéens. Une bibliothèque numérique pour
//               valoriser notre patrimoine littéraire.
//             </p>
//             <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 to="/CataloguePage"
//                 className="bg-[#160216] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:text-black transition-colors duration-300 text-center"
//               >
//                 Explorez le catalogue
//               </Link>
//               <Link
//                 to="/AuteurPage"
//                 className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#160216] transition-colors duration-300 text-center"
//               >
//                 Découvrez nos auteurs
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Statistiques */}
//         <div className="relative z-20 w-full mt-8">
//           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">100</p>
//               <p>Œuvres disponibles</p>
//             </div>
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">1500</p>
//               <p>Utilisateurs</p>
//             </div>
//             <div className="bg-white text-black rounded-lg p-6 shadow-lg">
//               <p className="text-3xl font-bold">🌍</p>
//               <p>Disponible partout en Guinée</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Livres récents */}
//       <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-8xl mx-auto my-12 flex flex-col">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-bold">📖 Livres ajoutés récemment</h2>
//             <p className="text-gray-600 text-sm">
//               Les œuvres les plus appréciées par nos lecteurs
//             </p>
//           </div>
//           <Link
//             to="/CataloguePage"
//             className="text-sm bg-[#160216] text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#160216] border border-[#160216] transition"
//           >
//             Voir tout
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {recentBooks.length > 0 ? (
//             recentBooks.map((livre) => (
//               <div
//                 key={livre._id}
//                 className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
//               >
//                 <img
//                   src={`http://localhost:5000/${livre.imageCouverture}`}
//                   alt={livre.titre}
//                   className="h-48 w-full object-cover"
//                 />
//                 <div className="p-4 flex flex-col flex-1">
//                   <h4 className="text-lg font-bold truncate">{livre.titre}</h4>
//                   <p className="text-sm font-semibold mb-2">{livre.auteur}</p>
//                   <div className="flex justify-between text-xs mb-2">
//                     <span className="italic">{livre.genre}</span>
//                     <span
//                       className={`font-semibold ${livre.disponibilite === "gratuit"
//                           ? "text-green-600"
//                           : "text-orange-500"
//                         }`}
//                     >
//                       {livre.disponibilite === "gratuit"
//                         ? "Gratuit ✅"
//                         : "Abonnement ❌"}
//                     </span>
//                     <span>{livre.langue}</span>
//                   </div>
//                   <p className="text-xs text-gray-700 line-clamp-2 mb-2">
//                     {livre.description
//                       ? livre.description.substring(0, 200) + "..."
//                       : "Description non disponible"}
//                   </p>
//                   <div className="flex justify-between items-center mt-auto text-xs">
//                     <span>{livre.pages || "120"} pages</span>
//                     <span>{livre.annee || "2025"}</span>
//                     <Link
//                       to={`/Livre/${livre._id}`}
//                       state={{ livreId: livre._id, scrollPosition: window.scrollY }}
//                       className="text-sm bg-[#160216] text-white py-1 px-3 rounded hover:bg-purple-700 transition-colors"
//                     >
//                       Voir détails
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 italic">Aucun livre ajouté récemment.</p>
//           )}
//         </div>
//       </div>

//       {/* Nouveautés + Actualités */}
//       <div className="bg-white rounded-lg shadow-md my-8 mx-4 md:mx-auto md:max-w-8xl flex flex-col md:flex-row overflow-hidden gap-4">
//         {recentBooks.length > 0 && (
//           <div className="flex-1 p-4 flex flex-col justify-center bg-purple-50 rounded-md">
//             <h2 className="text-xl font-bold mb-1 text-purple-700 flex items-center gap-1">
//               Nos nouveautés
//             </h2>
//             <p className="text-gray-600 mb-2 text-sm">
//               Le dernier ajout à notre collection, à ne pas manquer !
//             </p>
//             <div className="flex-1 overflow-hidden md:flex hidden mt-4">
//               <img
//                 src={`http://localhost:5000/${recentBooks[0].imageCouverture}`}
//                 alt={recentBooks[0].titre}
//                 className="h-72 w-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-md"
//               />
//             </div>
//             <h3 className="text-lg font-semibold truncate mb-1">
//               {recentBooks[0].titre}
//             </h3>
//             <p className="text-sm text-gray-700 mb-2 truncate">
//               {recentBooks[0].auteur}
//             </p>
//             <div className="flex flex-wrap gap-1 mb-2 text-xs">
//               <span className="italic bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
//                 {recentBooks[0].genre}
//               </span>
//               <span
//                 className={`px-2 py-0.5 rounded font-semibold ${recentBooks[0].disponibilite === "gratuit"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-orange-100 text-orange-700"
//                   }`}
//               >
//                 {recentBooks[0].disponibilite === "gratuit"
//                   ? "Gratuit ✅"
//                   : "Abonnement ❌"}
//               </span>
//               <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
//                 {recentBooks[0].langue}
//               </span>
//             </div>
//             <p className="text-gray-700 mb-3 line-clamp-2 text-sm">
//               {recentBooks[0].description
//                 ? recentBooks[0].description.substring(0, 120) + "..."
//                 : "Description non disponible"}
//             </p>
//             <div className="flex gap-2 items-center text-xs">
//               <span className="px-2 py-0.5 bg-gray-100 rounded">
//                 {recentBooks[0].pages || "120"} pages
//               </span>
//               <span className="px-2 py-0.5 bg-gray-100 rounded">
//                 {recentBooks[0].annee || "2025"}
//               </span>
//               <Link
//                 to={`/Livre/${recentBooks[0]._id}`}
//                 state={{ livreId: recentBooks[0]._id }}
//                 className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 transition-colors text-xs"
//               >
//                 Voir détails
//               </Link>
//             </div>
//           </div>
//         )}

//         {actualites.length > 0 && actualiteActuelle && (
//           <div className="flex-1 p-4 flex flex-col justify-start bg-blue-50 rounded-md border-t md:border-t-0 md:border-l border-gray-200">
//             <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-1">
//               📰 Actualités
//             </h2>
//             <div className="relative">
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
//               >
//                 &lt;
//               </button>
//               <button
//                 onClick={handleNext}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
//               >
//                 &gt;
//               </button>
//               <div
//                 key={actualiteActuelle._id}
//                 className={`transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"
//                   }`}
//               >
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3">
//                     <img
//                       src={`http://localhost:5000/${actualiteActuelle.image}`}
//                       alt={actualiteActuelle.titre}
//                       className="w-full h-48 object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div className="flex flex-col">
//                       <div className="flex justify-between items-center text-xl text-black mb-1">
//                         <span className="bg-gray-200 px-2 py-1 rounded-full text-xl font-semibold">
//                           {actualiteActuelle.categorie}
//                         </span>
//                         <span className="italic">
//                           Publié le{" "}
//                           {new Date(actualiteActuelle.publieLe).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <h3 className="font-bold text-lg text-blue-800 line-clamp-2">
//                         {actualiteActuelle.titre}
//                       </h3>
//                       <p className="line-clamp-3 text-gray-700 mt-1">
//                         {actualiteActuelle.extrait}
//                       </p>
//                     </div>
//                     <div className="mt-4">
//                       <Link
//                         to={`/Actualite/${actualiteActuelle._id}`}
//                         className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
//                       >
//                         Lire la suite
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <Link
//               to="/ActualitesPage"
//               className="mt-4 text-blue-600 text-sm font-semibold hover:underline text-center"
//             >
//               Voir toutes les actualités
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Section Auteurs en vedette */}
//       <div className="bg-gray-50 rounded-lg shadow-lg my-12 mx-4 md:mx-auto md:max-w-8xl p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">✍️ Auteurs en vedette</h2>

//         {/* Liste des auteurs filtrés */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {auteurs.length > 0 ? (
//             auteurs.slice(0, 3).map((auteur) => (
//               <div
//                 key={auteur._id}
//                 className="p-6 border rounded-xl shadow-lg bg-white flex flex-col items-center text-center"
//               >
//                 {/* Image */}
//                 <img
//                   src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "/default-avatar.png"}
//                   alt={`${auteur.prenoms} ${auteur.nom}`}
//                   className="w-32 h-32 rounded-full object-cover mb-4"
//                 />

//                 {/* Nom */}
//                 <h3 className="text-xl font-semibold mb-1">
//                   {auteur.prenoms} {auteur.nom}
//                 </h3>

//                 {/* Genre préféré */}
//                 <p className="text-sm font-semibold text-gray-700 mb-2">
//                   {auteur.genrePrefere || "Pas disponible"}
//                 </p>

//                 {/* Biographie sur 2 lignes */}
//                 <p className="text-gray-600 text-sm mb-2 line-clamp-2">
//                   {auteur.biographie || "Pas de biographie disponible."}
//                 </p>

//                 {/* Nombre d’œuvres */}
//                 <p className="text-gray-800 font-medium mb-4">
//                   Œuvres disponibles : {auteur.nbOeuvres || 0}
//                 </p>

//                 {/* Bouton Voir ses œuvres */}
//                 <Link
//                   to={`/AuteurLivresPage/${auteur._id}`}
//                   className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#160216] hover:text-white transition-colors"
//                 >
//                   Voir ses œuvres
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full">
//               Aucun auteur ne correspond à votre recherche.
//             </p>
//           )}
//         </div>
//       </div>


//       {/* Section Témoignages */}
//       <div className="bg-white rounded-lg shadow-lg my-12 mx-4 md:mx-auto md:max-w-6xl p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">💬 Témoignages de nos lecteurs</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {temoignages.map((temoignage, index) => (
//             <div key={index} className="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition flex flex-col">
//               <p className="text-gray-700 italic mb-4">"{temoignage.commentaire}"</p>
//               <div className="flex items-center gap-2 mt-auto">
//                 <img
//                   src={temoignage.photo || "/assets/default-user.png"}
//                   alt={temoignage.nom}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="text-sm font-semibold">{temoignage.nom}</p>
//                   <p className="text-xs text-gray-500">{temoignage.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Section Newsletter */}
//       <div className="bg-purple-50 rounded-lg shadow-lg my-12 mx-4 md:mx-auto md:max-w-4xl p-8 text-center">
//         <h2 className="text-2xl font-bold mb-4 text-purple-700">📬 Abonnez-vous à notre newsletter</h2>
//         <p className="text-gray-700 mb-6">
//           Recevez les dernières nouveautés et actualités de la littérature guinéenne directement dans votre boîte e-mail.
//         </p>
//         <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
//           <input
//             type="email"
//             placeholder="Votre email"
//             className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
//           />
//           <button
//             type="submit"
//             className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
//           >
//             S'abonner
//           </button>
//         </form>
//       </div>

//       <Temoignage />

//       <FAQ />
//     </>
//   );
// }

// export default Accueil;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/couverturedjan.png";
import { getLivres } from "../services/bookService";
import { getActualites } from "../services/actualiteService";
import { getAuteurs } from "../services/auteurService"; // Nouveau service à créer
import FAQ from "../components/FAQ";
import Temoignage from "../components/Temoignages"; // Nouveau composant à créer

function Accueil() {
  const [recentBooks, setRecentBooks] = useState([]);
  const [actualites, setActualites] = useState([]);
  const [currentActuIndex, setCurrentActuIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [auteurs, setAuteurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const livresData = await getLivres();
        setRecentBooks(livresData.slice(0, 3));

        const actualitesData = await getActualites();
        setActualites(actualitesData);

        const { auteurs: auteursData } = await getAuteurs();
        setAuteurs(auteursData.slice(0, 4)); // Top 4 auteurs en vedette
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (actualites.length > 1) {
      const interval = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentActuIndex(
            (prevIndex) => (prevIndex + 1) % actualites.length
          );
          setIsFading(false);
        }, 500);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [actualites]);

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentActuIndex((prevIndex) =>
        prevIndex === 0 ? actualites.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 500);
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentActuIndex((prevIndex) => (prevIndex + 1) % actualites.length);
      setIsFading(false);
    }, 500);
  };

  const actualiteActuelle = actualites[currentActuIndex];

  return (
    <>
      {/* Hero Section */}
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

      {/* ... (sections Livres, Actualités, Auteurs, Newsletter inchangées) ... */}

      {/* Livres récents */}
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
                      className={`font-semibold ${livre.disponibilite === "gratuit"
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
                      state={{ livreId: livre._id, scrollPosition: window.scrollY }}
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

      {/* Nouveautés + Actualités */}
      <div className="bg-white rounded-lg shadow-md my-8 mx-4 md:mx-auto md:max-w-8xl flex flex-col md:flex-row overflow-hidden gap-4">
        {recentBooks.length > 0 && (
          <div className="flex-1 p-4 flex flex-col justify-center bg-purple-50 rounded-md">
            <h2 className="text-xl font-bold mb-1 text-purple-700 flex items-center gap-1">
              Nos nouveautés
            </h2>
            <p className="text-gray-600 mb-2 text-sm">
              Le dernier ajout à notre collection, à ne pas manquer !
            </p>
            <div className="flex-1 overflow-hidden md:flex hidden mt-4">
              <img
                src={`http://localhost:5000/${recentBooks[0].imageCouverture}`}
                alt={recentBooks[0].titre}
                className="h-72 w-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold truncate mb-1">
              {recentBooks[0].titre}
            </h3>
            <p className="text-sm text-gray-700 mb-2 truncate">
              {recentBooks[0].auteur}
            </p>
            <div className="flex flex-wrap gap-1 mb-2 text-xs">
              <span className="italic bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                {recentBooks[0].genre}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-semibold ${recentBooks[0].disponibilite === "gratuit"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
              >
                {recentBooks[0].disponibilite === "gratuit"
                  ? "Gratuit ✅"
                  : "Abonnement ❌"}
              </span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                {recentBooks[0].langue}
              </span>
            </div>
            <p className="text-gray-700 mb-3 line-clamp-2 text-sm">
              {recentBooks[0].description
                ? recentBooks[0].description.substring(0, 120) + "..."
                : "Description non disponible"}
            </p>
            <div className="flex gap-2 items-center text-xs">
              <span className="px-2 py-0.5 bg-gray-100 rounded">
                {recentBooks[0].pages || "120"} pages
              </span>
              <span className="px-2 py-0.5 bg-gray-100 rounded">
                {recentBooks[0].annee || "2025"}
              </span>
              <Link
                to={`/Livre/${recentBooks[0]._id}`}
                state={{ livreId: recentBooks[0]._id }}
                className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 transition-colors text-xs"
              >
                Voir détails
              </Link>
            </div>
          </div>
        )}

        {actualites.length > 0 && actualiteActuelle && (
          <div className="flex-1 p-4 flex flex-col justify-start bg-blue-50 rounded-md border-t md:border-t-0 md:border-l border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-1">
              📰 Actualités
            </h2>
            <div className="relative">
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-blue-800 z-10"
              >
                &gt;
              </button>
              <div
                key={actualiteActuelle._id}
                className={`transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0" : "opacity-100"
                  }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3">
                    <img
                      src={`http://localhost:5000/${actualiteActuelle.image}`}
                      alt={actualiteActuelle.titre}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center text-xl text-black mb-1">
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-xl font-semibold">
                          {actualiteActuelle.categorie}
                        </span>
                        <span className="italic">
                          Publié le{" "}
                          {new Date(actualiteActuelle.publieLe).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-blue-800 line-clamp-2">
                        {actualiteActuelle.titre}
                      </h3>
                      <p className="line-clamp-3 text-gray-700 mt-1">
                        {actualiteActuelle.extrait}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/Actualite/${actualiteActuelle._id}`}
                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Lire la suite
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/ActualitesPage"
              className="mt-4 text-blue-600 text-sm font-semibold hover:underline text-center"
            >
              Voir toutes les actualités
            </Link>
          </div>
        )}
      </div>

      {/* Section Auteurs en vedette */}
      <div className="bg-gray-50 rounded-lg shadow-lg my-12 mx-4 md:mx-auto md:max-w-8xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">✍️ Auteurs en vedette</h2>

        {/* Liste des auteurs filtrés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {auteurs.length > 0 ? (
            auteurs.slice(0, 3).map((auteur) => (
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
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#160216] hover:text-white transition-colors"
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
      </div>

      {/* Section Newsletter */}
       <div className="bg-purple-50 rounded-lg shadow-lg my-12 mx-4 md:mx-auto md:max-w-4xl p-8 text-center">
         <h2 className="text-2xl font-bold mb-4 text-purple-700">📬 Abonnez-vous à notre newsletter</h2>
         <p className="text-gray-700 mb-6">
           Recevez les dernières nouveautés et actualités de la littérature guinéenne directement dans votre boîte e-mail.
         </p>
         <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
         <input
            type="email"
            placeholder="Votre email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            S'abonner
          </button>
        </form>
      </div>


      {/* Section Témoignages */}
      <Temoignage />

      {/* Section FAQ */}
      <FAQ />
    </>
  );
}

export default Accueil;



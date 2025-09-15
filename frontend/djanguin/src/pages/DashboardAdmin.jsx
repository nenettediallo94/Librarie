

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // ✅ Constantes pour les routes API
// const API_URL_LIVRES = "http://localhost:5000/api/livres";
// const API_URL_AUTEURS = "http://localhost:5000/api/auteurs";

// function DashboardAdmin() {
//     const [activeMenu, setActiveMenu] = useState("vue-ensemble");
//     const [adminName, setAdminName] = useState("");
//     const [livres, setLivres] = useState([]);
//     const [livreSelectionne, setLivreSelectionne] = useState(null);

//     // ✅ États pour la gestion des auteurs
//     const [auteurs, setAuteurs] = useState([]);
//     const [totalAuteurs, setTotalAuteurs] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8); // S'aligne avec le backend
//     const [loadingAuteurs, setLoadingAuteurs] = useState(true);

//     const navigate = useNavigate();

//     // --- Récupération du nom de l'admin ---
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const payload = JSON.parse(atob(token.split(".")[1]));
//                 setAdminName(payload.user?.email || "Admin");
//             } catch (err) {
//                 console.error("Erreur décodage token:", err);
//                 setAdminName("Admin");
//             }
//         }
//     }, []);

//     // --- Récupération des livres ---
//     useEffect(() => {
//         const fetchLivres = async () => {
//             try {
//                 const res = await fetch(API_URL_LIVRES, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!res.ok) throw new Error("Erreur HTTP " + res.status);
//                 const data = await res.json();
//                 setLivres(Array.isArray(data) ? data : []);
//             } catch (err) {
//                 console.error("Erreur fetch livres:", err);
//             }
//         };
//         fetchLivres();
//     }, []);

//     // --- Récupération des auteurs avec pagination ---
//     useEffect(() => {
//         const fetchAuteurs = async () => {
//             setLoadingAuteurs(true);
//             try {
//                 // Envoie les paramètres de pagination au backend
//                 const res = await fetch(`${API_URL_AUTEURS}?page=${currentPage}&limit=${itemsPerPage}`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!res.ok) throw new Error("Erreur HTTP " + res.status);
//                 const data = await res.json();
//                 setAuteurs(Array.isArray(data.auteurs) ? data.auteurs : []);
//                 setTotalAuteurs(data.total);
//             } catch (err) {
//                 console.error("Erreur fetch auteurs:", err);
//                 setAuteurs([]);
//             } finally {
//                 setLoadingAuteurs(false);
//             }
//         };
//         fetchAuteurs();
//     }, [currentPage, itemsPerPage]); // Déclenche la requête à chaque changement de page

//     // --- Fonctions d'action ---
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     const handleRetour = () => {
//         navigate("/");
//     };

//     // ✅ Logique de mise à jour du statut (cette route PATCH n'existe pas dans le backend donné, elle est gardée pour référence)
//     const handleUpdateStatus = async (auteurId, newStatus) => {
//         try {
//             // Note: Le backend fourni ne gère pas cette route. Ce code ne fonctionnera que si tu l'ajoutes.
//             const res = await fetch(`${API_URL_AUTEURS}/${auteurId}/statut`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//                 body: JSON.stringify({ statut: newStatus }),
//             });
//             if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
//             alert("Statut mis à jour !");
//             // Recharger la liste des auteurs après la mise à jour
//             setCurrentPage(1); // Retour à la première page
//             // On re-déclenche le useEffect pour un re-fetch
//             // Il serait mieux de mettre à jour l'état local, mais un re-fetch est plus simple
//             // pour le moment si le backend est complexe.
//         } catch (err) {
//             console.error("Erreur mise à jour statut:", err);
//             alert("Erreur lors de la mise à jour du statut");
//         }
//     };

//     const totalPages = Math.ceil(totalAuteurs / itemsPerPage);

//     const menuItems = [
//         { key: "vue-ensemble", label: "Vue d'ensemble" },
//         { key: "livres", label: "Livres" },
//         { key: "auteurs", label: "Auteurs" },
//         { key: "abonnements", label: "Abonnements" },
//         { key: "revenus", label: "Revenus" },
//         { key: "parametres", label: "Paramètres" },
//     ];

//     return (
//         <div className="flex min-h-screen">
//             {/* Barre latérale */}
//             <aside className="w-64 bg-[#160216] flex flex-col justify-between p-6 rounded-l-lg shadow-lg">
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h2>
//                     <ul className="flex flex-col gap-2">
//                         {menuItems.map((item) => (
//                             <li
//                                 key={item.key}
//                                 onClick={() => setActiveMenu(item.key)}
//                                 className={`cursor-pointer px-4 py-2 rounded-md transition-all font-semibold ${activeMenu === item.key
//                                         ? "bg-white text-[#160216]"
//                                         : "bg-[#160216] text-white hover:bg-white hover:text-[#160216]"
//                                     }`}
//                             >
//                                 {item.label}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full bg-[#ff0000] text-white py-2 rounded hover:bg-[#cc0000] transition"
//                     >
//                         Déconnexion
//                     </button>
//                     <button
//                         onClick={handleRetour}
//                         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//                     >
//                         Retour sur la plateforme
//                     </button>
//                 </div>
//             </aside>

//             {/* Contenu principal */}
//             <main className="flex-1 flex flex-col bg-[#DEDEDE]">
//                 {/* Barre supérieure */}
//                 <div className="mx-6 my-6 p-6 bg-[#F5F5F5] border border-gray-400 rounded-xl shadow-sm flex justify-between items-center">
//                     <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
//                     <div className="flex items-center gap-4">
//                         <button className="relative">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6 text-gray-800"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5M9 17H4l1.405-1.405A2.032 2.032 0 006 14.158V11a6 6 0 0112 0v3.159c0 .538.214 1.055.595 1.436L20 17h-5m-4 0v1a3 3 0 006 0v-1m-6 0h6"
//                                 />
//                             </svg>
//                             <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//                         </button>

//                         <div className="flex items-center gap-2 bg-white p-2 rounded-full">
//                             <img
//                                 src="https://via.placeholder.com/40"
//                                 alt="Profil"
//                                 className="w-10 h-10 rounded-full"
//                             />
//                             <span className="font-medium text-gray-800">{adminName}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Cartes de stats */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
//                     {/* Abonnés */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Abonnés</h3>
//                             <p className="text-2xl font-semibold">120</p>
//                         </div>
//                     </div>

//                     {/* Livres publiés */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Livres publiés</h3>
//                             <p className="text-xl font-semibold">{livres.length}</p>
//                         </div>
//                     </div>

//                     {/* Auteurs */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Auteurs</h3>
//                             <p className="text-xl font-semibold">{totalAuteurs}</p>
//                         </div>
//                     </div>

//                     {/* Livres lus 75% */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Livres lus (75%)</h3>
//                             <p className="text-xl font-semibold">80</p>
//                         </div>
//                     </div>

//                     {/* Revenus */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Revenus</h3>
//                             <p className="text-xl font-semibold">$1200</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sections */}
//                 <div className="flex-1 p-8">
//                     {activeMenu === "vue-ensemble" && (
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
//                             <p>Statistiques globales : utilisateurs, livres, abonnements, revenus...</p>
//                         </div>
//                     )}

//                     {activeMenu === "livres" && (
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">Gestion des livres</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                 {livres.map((livre) => (
//                                     <div key={livre._id} className="bg-white p-4 rounded-lg shadow flex flex-col">
//                                         <img
//                                             src={
//                                                 livre.imageCouverture
//                                                     ? `http://localhost:5000/${livre.imageCouverture}`
//                                                     : "https://via.placeholder.com/100"
//                                             }
//                                             alt={livre.titre}
//                                             className="w-full h-40 object-cover rounded mb-2"
//                                         />
//                                         <h3 className="font-bold">{livre.titre}</h3>
//                                         <p className="text-gray-600">Auteur: {livre.auteur || "Inconnu"}</p>
//                                         <p className="text-gray-600">Pages: {livre.pages || "N/A"}</p>

//                                         <div className="mt-3 flex gap-2">
//                                             <button
//                                                 onClick={() => setLivreSelectionne(livre)}
//                                                 className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
//                                             >
//                                                 Voir
//                                             </button>
//                                             <button
//                                                 onClick={() => navigate(`/livres/modifier/${livre._id}`)}
//                                                 className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
//                                             >
//                                                 Modifier
//                                             </button>
//                                             <button
//                                                 onClick={async () => {
//                                                     if (window.confirm(`Supprimer le livre "${livre.titre}" ?`)) {
//                                                         try {
//                                                             const res = await fetch(`${API_URL_LIVRES}/${livre._id}`, {
//                                                                 method: "DELETE",
//                                                                 headers: {
//                                                                     "Content-Type": "application/json",
//                                                                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                                                                 },
//                                                             });
//                                                             if (res.ok) {
//                                                                 setLivres(livres.filter((l) => l._id !== livre._id));
//                                                                 alert("Livre supprimé !");
//                                                             } else {
//                                                                 alert("Erreur lors de la suppression");
//                                                             }
//                                                         } catch (err) {
//                                                             console.error(err);
//                                                             alert("Erreur lors de la suppression");
//                                                         }
//                                                     }
//                                                 }}
//                                                 className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
//                                             >
//                                                 Supprimer
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Modal détail livre */}
//                             {livreSelectionne && (
//                                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
//                                     <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
//                                         <button
//                                             onClick={() => setLivreSelectionne(null)}
//                                             className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-lg"
//                                         >
//                                             ✖
//                                         </button>

//                                         <div className="flex flex-col lg:flex-row gap-6">
//                                             <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
//                                                 {livreSelectionne.imageCouverture ? (
//                                                     <img
//                                                         src={`http://localhost:5000/${livreSelectionne.imageCouverture}`}
//                                                         alt={livreSelectionne.titre}
//                                                         className="max-h-full w-auto object-contain rounded-lg"
//                                                     />
//                                                 ) : (
//                                                     <div className="text-6xl text-gray-500">📚</div>
//                                                 )}
//                                             </div>

//                                             <div className="flex-1 flex flex-col justify-between">
//                                                 <div>
//                                                     <h1 className="text-2xl font-bold mb-2">{livreSelectionne.titre}</h1>
//                                                     <p className="text-sm font-semibold mb-1">{livreSelectionne.auteur}</p>
//                                                     {livreSelectionne.coauteurs && (
//                                                         <p className="text-sm text-gray-600 mb-1">
//                                                             Co-auteurs: {livreSelectionne.coauteurs}
//                                                         </p>
//                                                     )}
//                                                     <p className="text-sm text-gray-700 mb-2">{livreSelectionne.description}</p>
//                                                 </div>

//                                                 {livreSelectionne.documentLivre && (
//                                                     <iframe
//                                                         src={`http://localhost:5000/${livreSelectionne.documentLivre}`}
//                                                         className="w-full rounded-lg mt-4"
//                                                         style={{ height: "50vh", border: "none" }}
//                                                         title="Lecteur PDF"
//                                                     />
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {activeMenu === "auteurs" && (
//             <div className="bg-white p-6 rounded-lg shadow-xl">
//               <h2 className="text-2xl font-bold mb-4">Gestion des auteurs</h2>
//               <p className="text-sm text-gray-500 mb-6">
//                 (Note: Seuls les auteurs approuvés sont affichés, comme spécifié dans votre route backend.)
//               </p>

//               {loadingAuteurs ? (
//                 <div className="text-center py-10 text-gray-500">Chargement des auteurs...</div>
//               ) : (
//                 <>
//                   <div className="overflow-x-auto rounded-lg shadow-md">
//                     <table className="min-w-full bg-white border-collapse">
//                       <thead className="bg-gray-200">
//                         <tr>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Nro</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Auteur</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Genres</th>
//                           {/* ✅ Nouvelle colonne */}
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Livres</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Revenus</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
//                           <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {auteurs.length > 0 ? (
//                           auteurs.map((auteur, index) => (
//                             <tr key={auteur._id} className="border-b last:border-0 hover:bg-gray-50">
//                               <td className="py-3 px-4">
//                                 {index + 1 + (currentPage - 1) * itemsPerPage}
//                               </td>
//                               <td className="py-3 px-4">
//                                 <div className="flex items-center gap-3">
//                                   <img
//                                     src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "https://via.placeholder.com/40"}
//                                     alt={auteur.prenoms}
//                                     className="w-10 h-10 rounded-full object-cover"
//                                   />
//                                   <span className="font-medium text-gray-800">
//                                     {auteur.prenoms} {auteur.nom}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td className="py-3 px-4 text-gray-600">{auteur.email}</td>
//                               <td className="py-3 px-4">
//                                 <span
//                                   className="px-3 py-1 text-xs font-bold rounded-full bg-green-200 text-green-800"
//                                 >
//                                   {auteur.statut}
//                                 </span>
//                               </td>
//                               <td className="py-3 px-4 text-gray-600">{auteur.genrePrefere || 'N/A'}</td>
//                               {/* ✅ Nouvelle cellule */}
//                               <td className="py-3 px-4 text-gray-600 font-semibold">{auteur.nombreDeLivres}</td>
//                               <td className="py-3 px-4 font-semibold text-gray-700">{auteur.revenus} FG</td>
//                               <td className="py-3 px-4 text-gray-600">
//                                 {auteur.dateCreation ? new Date(auteur.dateCreation).toLocaleDateString("fr-FR", {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 }) : 'N/A'}
//                               </td>
//                               <td className="py-3 px-4 flex gap-2">
//                                 <button
//                                   className="text-blue-600 hover:text-blue-800 font-semibold"
//                                   onClick={() => {
//                                     alert(`Voir les détails de ${auteur.prenoms} ${auteur.nom}`);
//                                   }}
//                                 >
//                                   Voir
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="9" className="text-center py-6 text-gray-500">
//                               Aucun auteur trouvé.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                                     {/* Pagination */}
//                                     {totalAuteurs > 0 && (
//                                         <div className="flex justify-between items-center mt-6">
//                                             <span className="text-sm text-gray-600">
//                                                 Résultats {(currentPage - 1) * itemsPerPage + 1} -{" "}
//                                                 {Math.min(currentPage * itemsPerPage, totalAuteurs)} sur {totalAuteurs}
//                                             </span>
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                                                     disabled={currentPage === 1}
//                                                     className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                 >
//                                                     Préc
//                                                 </button>
//                                                 {[...Array(totalPages)].map((_, i) => (
//                                                     <button
//                                                         key={i + 1}
//                                                         onClick={() => setCurrentPage(i + 1)}
//                                                         className={`px-4 py-2 border rounded-lg transition-all ${currentPage === i + 1
//                                                                 ? "bg-purple-600 text-white"
//                                                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                                                             }`}
//                                                     >
//                                                         {i + 1}
//                                                     </button>
//                                                 ))}
//                                                 <button
//                                                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                                                     disabled={currentPage === totalPages}
//                                                     className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                 >
//                                                     Suiv
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default DashboardAdmin;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // ✅ Constantes pour les routes API
// const API_URL_LIVRES = "http://localhost:5000/api/livres";
// const API_URL_AUTEURS = "http://localhost:5000/api/auteurs";
// const API_URL_USERS = "http://localhost:5000/api/users";

// function DashboardAdmin() {
//     const [activeMenu, setActiveMenu] = useState("vue-ensemble");
//     const [adminName, setAdminName] = useState("");
//     const [livres, setLivres] = useState([]);
//     const [livreSelectionne, setLivreSelectionne] = useState(null);

//     // ✅ États pour la gestion des auteurs
//     const [auteurs, setAuteurs] = useState([]);
//     const [totalAuteurs, setTotalAuteurs] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(8); // S'aligne avec le backend
//     const [loadingAuteurs, setLoadingAuteurs] = useState(true);

//     // Utilisateurs
//     const [utilisateurs, setUtilisateurs] = useState([]);
//     const [loadingUtilisateurs, setLoadingUtilisateurs] = useState(true);

//     const navigate = useNavigate();

//     // --- Récupération du nom de l'admin ---
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const payload = JSON.parse(atob(token.split(".")[1]));
//                 setAdminName(payload.user?.email || "Admin");
//             } catch (err) {
//                 console.error("Erreur décodage token:", err);
//                 setAdminName("Admin");
//             }
//         }
//     }, []);

//     // --- Récupération des utilisateurs ---
//     useEffect(() => {
//         const fetchUtilisateurs = async () => {
//             setLoadingUtilisateurs(true);
//             try {
//                 const res = await fetch(API_URL_USERS, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!res.ok) throw new Error("Erreur HTTP " + res.status);
//                 const data = await res.json();
//                 setUtilisateurs(Array.isArray(data) ? data : []);
//             } catch (err) {
//                 console.error("Erreur fetch utilisateurs:", err);
//                 setUtilisateurs([]);
//             } finally {
//                 setLoadingUtilisateurs(false);
//             }
//         };

//         fetchUtilisateurs();
//     }, []);


//     // --- Récupération des livres ---
//     useEffect(() => {
//         const fetchLivres = async () => {
//             try {
//                 const res = await fetch(API_URL_LIVRES, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!res.ok) throw new Error("Erreur HTTP " + res.status);
//                 const data = await res.json();
//                 setLivres(Array.isArray(data) ? data : []);
//             } catch (err) {
//                 console.error("Erreur fetch livres:", err);
//             }
//         };
//         fetchLivres();
//     }, []);

//     // --- Récupération des auteurs avec pagination ---
//     useEffect(() => {
//         const fetchAuteurs = async () => {
//             setLoadingAuteurs(true);
//             try {
//                 // Envoie les paramètres de pagination au backend
//                 const res = await fetch(`${API_URL_AUTEURS}?page=${currentPage}&limit=${itemsPerPage}`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });
//                 if (!res.ok) throw new Error("Erreur HTTP " + res.status);
//                 const data = await res.json();
//                 setAuteurs(Array.isArray(data.auteurs) ? data.auteurs : []);
//                 setTotalAuteurs(data.total);
//             } catch (err) {
//                 console.error("Erreur fetch auteurs:", err);
//                 setAuteurs([]);
//             } finally {
//                 setLoadingAuteurs(false);
//             }
//         };
//         fetchAuteurs();
//     }, [currentPage, itemsPerPage]); // Déclenche la requête à chaque changement de page

//     // --- Fonctions d'action ---
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     const handleRetour = () => {
//         navigate("/");
//     };

//     // ✅ Logique de mise à jour du statut
//     const handleUpdateStatus = async (auteurId, newStatus) => {
//         try {
//             const res = await fetch(`${API_URL_AUTEURS}/${auteurId}/statut`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//                 body: JSON.stringify({ statut: newStatus }),
//             });
//             if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
//             alert("Statut mis à jour !");
//             setCurrentPage(1);
//         } catch (err) {
//             console.error("Erreur mise à jour statut:", err);
//             alert("Erreur lors de la mise à jour du statut");
//         }
//     };

//     const totalPages = Math.ceil(totalAuteurs / itemsPerPage);

//     const menuItems = [
//         { key: "vue-ensemble", label: "Vue d'ensemble" },
//         { key: "livres", label: "Livres" },
//         { key: "auteurs", label: "Auteurs" },
//         { key: "utilisateurs", label: "Utilisateurs" },
//         { key: "abonnements", label: "Abonnements" },
//         { key: "revenus", label: "Revenus" },
//         { key: "parametres", label: "Paramètres" },
//     ];

//     return (
//         <div className="flex min-h-screen">
//             {/* Barre latérale */}
//             <aside className="w-64 bg-[#160216] flex flex-col justify-between p-6 rounded-l-lg shadow-lg">
//                 <div>
//                     <h2 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h2>
//                     <ul className="flex flex-col gap-2">
//                         {menuItems.map((item) => (
//                             <li
//                                 key={item.key}
//                                 onClick={() => setActiveMenu(item.key)}
//                                 className={`cursor-pointer px-4 py-2 rounded-md transition-all font-semibold ${activeMenu === item.key
//                                     ? "bg-white text-[#160216]"
//                                     : "bg-[#160216] text-white hover:bg-white hover:text-[#160216]"
//                                     }`}
//                             >
//                                 {item.label}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full bg-[#ff0000] text-white py-2 rounded hover:bg-[#cc0000] transition"
//                     >
//                         Déconnexion
//                     </button>
//                     <button
//                         onClick={handleRetour}
//                         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//                     >
//                         Retour sur la plateforme
//                     </button>
//                 </div>
//             </aside>

//             {/* Contenu principal */}
//             <main className="flex-1 flex flex-col bg-[#DEDEDE]">
//                 {/* Barre supérieure */}
//                 <div className="mx-6 my-6 p-6 bg-[#F5F5F5] border border-gray-400 rounded-xl shadow-sm flex justify-between items-center">
//                     <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
//                     <div className="flex items-center gap-4">
//                         <button className="relative">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6 text-gray-800"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5M9 17H4l1.405-1.405A2.032 2.032 0 006 14.158V11a6 6 0 0112 0v3.159c0 .538.214 1.055.595 1.436L20 17h-5m-4 0v1a3 3 0 006 0v-1m-6 0h6"
//                                 />
//                             </svg>
//                             <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//                         </button>

//                         <div className="flex items-center gap-2 bg-white p-2 rounded-full">
//                             <img
//                                 src="https://via.placeholder.com/40"
//                                 alt="Profil"
//                                 className="w-10 h-10 rounded-full"
//                             />
//                             <span className="font-medium text-gray-800">{adminName}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Cartes de stats */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
//                     {/* Abonnés */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Abonnés</h3>
//                             <p className="text-2xl font-semibold">120</p>
//                         </div>
//                     </div>

//                     {/* Livres publiés */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Livres publiés</h3>
//                             <p className="text-xl font-semibold">{livres.length}</p>
//                         </div>
//                     </div>

//                     {/* Auteurs */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Auteurs</h3>
//                             <p className="text-xl font-semibold">{totalAuteurs}</p>
//                         </div>
//                     </div>

//                     {/* Livres lus 75% */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Livres lus (75%)</h3>
//                             <p className="text-xl font-semibold">80</p>
//                         </div>
//                     </div>

//                     {/* Revenus */}
//                     <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
//                         <div>
//                             <h3 className="text-base font-bold text-gray-500">Revenus</h3>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Sections */}
//                 <div className="flex-1 p-8">
//                     {activeMenu === "vue-ensemble" && (
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
//                             <p>Statistiques globales : utilisateurs, livres, abonnements, revenus...</p>
//                         </div>
//                     )}

//                     {activeMenu === "livres" && (
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">Gestion des livres</h2>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                 {livres.map((livre) => (
//                                     <div key={livre._id} className="bg-white p-4 rounded-lg shadow flex flex-col">
//                                         <img
//                                             src={
//                                                 livre.imageCouverture
//                                                     ? `http://localhost:5000/${livre.imageCouverture}`
//                                                     : "https://via.placeholder.com/100"
//                                             }
//                                             alt={livre.titre}
//                                             className="w-full h-40 object-cover rounded mb-2"
//                                         />
//                                         <h3 className="font-bold">{livre.titre}</h3>
//                                         <p className="text-gray-600">Auteur: {livre.auteur || "Inconnu"}</p>
//                                         <p className="text-gray-600">Pages: {livre.pages || "N/A"}</p>

//                                         <div className="mt-3 flex gap-2">
//                                             <button
//                                                 onClick={() => setLivreSelectionne(livre)}
//                                                 className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
//                                             >
//                                                 Voir
//                                             </button>
//                                             <button
//                                                 onClick={() => navigate(`/livres/modifier/${livre._id}`)}
//                                                 className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
//                                             >
//                                                 Modifier
//                                             </button>
//                                             <button
//                                                 onClick={async () => {
//                                                     if (window.confirm(`Supprimer le livre "${livre.titre}" ?`)) {
//                                                         try {
//                                                             const res = await fetch(`${API_URL_LIVRES}/${livre._id}`, {
//                                                                 method: "DELETE",
//                                                                 headers: {
//                                                                     "Content-Type": "application/json",
//                                                                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                                                                 },
//                                                             });
//                                                             if (res.ok) {
//                                                                 setLivres(livres.filter((l) => l._id !== livre._id));
//                                                                 alert("Livre supprimé !");
//                                                             } else {
//                                                                 alert("Erreur lors de la suppression");
//                                                             }
//                                                         } catch (err) {
//                                                             console.error(err);
//                                                             alert("Erreur lors de la suppression");
//                                                         }
//                                                     }
//                                                 }}
//                                                 className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
//                                             >
//                                                 Supprimer
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Modal détail livre */}
//                             {livreSelectionne && (
//                                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
//                                     <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
//                                         <button
//                                             onClick={() => setLivreSelectionne(null)}
//                                             className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-lg"
//                                         >
//                                             ✖
//                                         </button>

//                                         <div className="flex flex-col lg:flex-row gap-6">
//                                             <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
//                                                 {livreSelectionne.imageCouverture ? (
//                                                     <img
//                                                         src={`http://localhost:5000/${livreSelectionne.imageCouverture}`}
//                                                         alt={livreSelectionne.titre}
//                                                         className="max-h-full w-auto object-contain rounded-lg"
//                                                     />
//                                                 ) : (
//                                                     <div className="text-6xl text-gray-500">📚</div>
//                                                 )}
//                                             </div>

//                                             <div className="flex-1 flex flex-col justify-between">
//                                                 <div>
//                                                     <h1 className="text-2xl font-bold mb-2">{livreSelectionne.titre}</h1>
//                                                     <p className="text-sm font-semibold mb-1">{livreSelectionne.auteur}</p>
//                                                     {livreSelectionne.coauteurs && (
//                                                         <p className="text-sm text-gray-600 mb-1">
//                                                             Co-auteurs: {livreSelectionne.coauteurs}
//                                                         </p>
//                                                     )}
//                                                     <p className="text-sm text-gray-700 mb-2">{livreSelectionne.description}</p>
//                                                 </div>

//                                                 {livreSelectionne.documentLivre && (
//                                                     <iframe
//                                                         src={`http://localhost:5000/${livreSelectionne.documentLivre}`}
//                                                         className="w-full rounded-lg mt-4"
//                                                         style={{ height: "50vh", border: "none" }}
//                                                         title="Lecteur PDF"
//                                                     />
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {activeMenu === "auteurs" && (
//                         <div className="bg-white p-6 rounded-lg shadow-xl">
//                             <h2 className="text-2xl font-bold mb-4">Gestion des auteurs</h2>
//                             <p className="text-sm text-gray-500 mb-6">
//                                 (Note: Seuls les auteurs approuvés sont affichés, comme spécifié dans votre route backend.)
//                             </p>

//                             {loadingAuteurs ? (
//                                 <div className="text-center py-10 text-gray-500">Chargement des auteurs...</div>
//                             ) : (
//                                 <>
//                                     <div className="overflow-x-auto rounded-lg shadow-md">
//                                         <table className="min-w-full bg-white border-collapse">
//                                             <thead className="bg-gray-200">
//                                                 <tr>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Nro</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Auteur</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Genres</th>
//                                                     {/* ✅ Nouvelle colonne */}
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Livres</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Revenus</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
//                                                     <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {auteurs.length > 0 ? (
//                                                     auteurs.map((auteur, index) => (
//                                                         <tr key={auteur._id} className="border-b last:border-0 hover:bg-gray-50">
//                                                             <td className="py-3 px-4">
//                                                                 {index + 1 + (currentPage - 1) * itemsPerPage}
//                                                             </td>
//                                                             <td className="py-3 px-4">
//                                                                 <div className="flex items-center gap-3">
//                                                                     <img
//                                                                         src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "https://via.placeholder.com/40"}
//                                                                         alt={auteur.prenoms}
//                                                                         className="w-10 h-10 rounded-full object-cover"
//                                                                     />
//                                                                     <span className="font-medium text-gray-800">
//                                                                         {auteur.prenoms} {auteur.nom}
//                                                                     </span>
//                                                                 </div>
//                                                             </td>
//                                                             <td className="py-3 px-4 text-gray-600">{auteur.email}</td>
//                                                             <td className="py-3 px-4">
//                                                                 <span
//                                                                     className="px-3 py-1 text-xs font-bold rounded-full bg-green-200 text-green-800"
//                                                                 >
//                                                                     {auteur.statut}
//                                                                 </span>
//                                                             </td>
//                                                             <td className="py-3 px-4 text-gray-600">{auteur.genrePrefere || 'N/A'}</td>
//                                                             {/* ✅ Nouvelle cellule */}
//                                                             <td className="py-3 px-4 text-gray-600 font-semibold">
//                                                                 {auteur.nombreDeLivres ?? 0}
//                                                             </td>

//                                                             <td className="py-3 px-4 font-semibold text-gray-700">{auteur.revenus} FG</td>
//                                                             <td className="py-3 px-4 text-gray-600">
//                                                                 {auteur.dateCreation ? new Date(auteur.dateCreation).toLocaleDateString("fr-FR", {
//                                                                     day: "numeric",
//                                                                     month: "short",
//                                                                     year: "numeric",
//                                                                 }) : 'N/A'}
//                                                             </td>
//                                                             <td className="py-3 px-4 flex gap-2">
//                                                                 <button
//                                                                     className="text-blue-600 hover:text-blue-800 font-semibold"
//                                                                     onClick={() => {
//                                                                         alert(`Voir les détails de ${auteur.prenoms} ${auteur.nom}`);
//                                                                     }}
//                                                                 >
//                                                                     Voir
//                                                                 </button>
//                                                             </td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="9" className="text-center py-6 text-gray-500">
//                                                             Aucun auteur trouvé.
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     {/* Pagination */}
//                                     {totalAuteurs > 0 && (
//                                         <div className="flex justify-between items-center mt-6">
//                                             <span className="text-sm text-gray-600">
//                                                 Résultats {(currentPage - 1) * itemsPerPage + 1} -{" "}
//                                                 {Math.min(currentPage * itemsPerPage, totalAuteurs)} sur {totalAuteurs}
//                                             </span>
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                                                     disabled={currentPage === 1}
//                                                     className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                 >
//                                                     Préc
//                                                 </button>
//                                                 {[...Array(totalPages)].map((_, i) => (
//                                                     <button
//                                                         key={i + 1}
//                                                         onClick={() => setCurrentPage(i + 1)}
//                                                         className={`px-4 py-2 border rounded-lg transition-all ${currentPage === i + 1
//                                                             ? "bg-purple-600 text-white"
//                                                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                                                             }`}
//                                                     >
//                                                         {i + 1}
//                                                     </button>
//                                                 ))}
//                                                 <button
//                                                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                                                     disabled={currentPage === totalPages}
//                                                     className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                                                 >
//                                                     Suiv
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     )}

//                     {activeMenu === "utilisateurs" && (
//                         <div className="bg-white p-6 rounded-lg shadow-xl">
//                             <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
//                             {loadingUtilisateurs ? (
//                                 <p className="text-gray-500">Chargement...</p>
//                             ) : utilisateurs.length > 0 ? (
//                                 <div className="overflow-x-auto rounded-lg shadow-md">
//                                     <table className="min-w-full bg-white border-collapse">
//                                         <thead className="bg-gray-200">
//                                             <tr>
//                                                 <th className="py-3 px-4 text-left font-semibold text-gray-600">N°</th>
//                                                 <th className="py-3 px-4 text-left font-semibold text-gray-600">Nom complet</th>
//                                                 <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
//                                                 <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
//                                                 <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {utilisateurs.map((user, index) => (
//                                                 <tr key={user._id} className="border-b last:border-0 hover:bg-gray-50">
//                                                     <td className="py-3 px-4">{index + 1}</td>
//                                                     <td className="py-3 px-4">{user.prenoms} {user.nom}</td>
//                                                     <td className="py-3 px-4">{user.email}</td>
//                                                     <td className="py-3 px-4">
//                                                         <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.estApprouve ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
//                                                             {user.estApprouve ? "Approuvé" : "En attente"}
//                                                         </span>
//                                                     </td>
//                                                     <td className="py-3 px-4">{new Date(user.dateCreation).toLocaleDateString("fr-FR")}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <p className="text-gray-500">Aucun utilisateur trouvé.</p>
//                             )}
//                         </div>
//                     )}

//                 </div>
//             </main>
//         </div>
//     );
// }

// export default DashboardAdmin;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Constantes pour les routes API
const API_URL_LIVRES = "http://localhost:5000/api/livres";
const API_URL_AUTEURS = "http://localhost:5000/api/auteurs";
const API_URL_USERS = "http://localhost:5000/api/users";
const API_URL_ACTUALITES = "http://localhost:5000/api/actualites";

function DashboardAdmin() {
    const [activeMenu, setActiveMenu] = useState("vue-ensemble");
    const [adminName, setAdminName] = useState("");
    const [livres, setLivres] = useState([]);
    const [livreSelectionne, setLivreSelectionne] = useState(null);
    const [actualiteSelectionnee, setActualiteSelectionnee] = useState(null);

    // ✅ États pour la gestion des actualités
    const [actualites, setActualites] = useState([]);
    const [loadingActualites, setLoadingActualites] = useState(true);
    // const [actualiteCounts, setActualiteCounts] = useState(0);

    // ✅ États pour la gestion des auteurs
    const [auteurs, setAuteurs] = useState([]);
    const [totalAuteurs, setTotalAuteurs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // S'aligne avec le backend
    const [loadingAuteurs, setLoadingAuteurs] = useState(true);

    // Utilisateurs
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loadingUtilisateurs, setLoadingUtilisateurs] = useState(true);

    const navigate = useNavigate();

    // --- Récupération du nom de l'admin ---
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setAdminName(payload.user?.email || "Admin");
            } catch (err) {
                console.error("Erreur décodage token:", err);
                setAdminName("Admin");
            }
        }
    }, []);

    // --- Récupération des utilisateurs ---
    useEffect(() => {
        const fetchUtilisateurs = async () => {
            setLoadingUtilisateurs(true);
            try {
                const res = await fetch(API_URL_USERS, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setUtilisateurs(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch utilisateurs:", err);
                setUtilisateurs([]);
            } finally {
                setLoadingUtilisateurs(false);
            }
        };

        fetchUtilisateurs();
    }, []);

    // ... (autres useEffects)

    // ✅ Récupération des actualités
    useEffect(() => {
        const fetchActualites = async () => {
            setLoadingActualites(true);
            try {
                const res = await fetch(API_URL_ACTUALITES, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setActualites(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch actualités:", err);
                setActualites([]);
            } finally {
                setLoadingActualites(false);
            }
        };

        fetchActualites();
    }, []); // Le tableau de dépendances vide assure un seul appel

    // Ajoutez cet useEffect après la récupération des actualités
    // useEffect(() => {
    //     if (actualites.length > 0) {
    //         const counts = actualites.reduce((acc, actualite) => {
    //             const categorie = actualite.categorie || 'Non catégorisée'; // Assurez-vous que l'objet actualité a bien une propriété 'categorie'
    //             acc[categorie] = (acc[categorie] || 0) + 1;
    //             return acc;
    //         }, {});
    //         setActualiteCounts(counts);
    //     }
    // }, [actualites]);

    // ... (autres fonctions)


    // --- Récupération des livres ---
    useEffect(() => {
        const fetchLivres = async () => {
            try {
                const res = await fetch(API_URL_LIVRES, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setLivres(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Erreur fetch livres:", err);
            }
        };
        fetchLivres();
    }, []);

    // --- Récupération des auteurs avec pagination ---
    useEffect(() => {
        const fetchAuteurs = async () => {
            setLoadingAuteurs(true);
            try {
                // Envoie les paramètres de pagination au backend
                const res = await fetch(`${API_URL_AUTEURS}?page=${currentPage}&limit=${itemsPerPage}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!res.ok) throw new Error("Erreur HTTP " + res.status);
                const data = await res.json();
                setAuteurs(Array.isArray(data.auteurs) ? data.auteurs : []);
                setTotalAuteurs(data.total);
            } catch (err) {
                console.error("Erreur fetch auteurs:", err);
                setAuteurs([]);
            } finally {
                setLoadingAuteurs(false);
            }
        };
        fetchAuteurs();
    }, [currentPage, itemsPerPage]); // Déclenche la requête à chaque changement de page

    // --- Fonctions d'action ---
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleRetour = () => {
        navigate("/");
    };

    // ✅ Logique de mise à jour du statut
    const handleUpdateStatus = async (auteurId, newStatus) => {
        try {
            const res = await fetch(`${API_URL_AUTEURS}/${auteurId}/statut`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ statut: newStatus }),
            });
            if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
            alert("Statut mis à jour !");
            setCurrentPage(1);
        } catch (err) {
            console.error("Erreur mise à jour statut:", err);
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    // ✅ Ajoutez cette fonction :
    const handleVoirActualite = (actualite) => {
        setActualiteSelectionnee(actualite);
    };

    const handleFermerActualiteModal = () => {
        setActualiteSelectionnee(null);
    };

    const totalPages = Math.ceil(totalAuteurs / itemsPerPage);

    const menuItems = [
        { key: "vue-ensemble", label: "Vue d'ensemble" },
        { key: "livres", label: "Livres" },
        { key: "auteurs", label: "Auteurs" },
        { key: "utilisateurs", label: "Utilisateurs" },
        { key: "actualites", label: "Actualités" },
        { key: "abonnements", label: "Abonnements" },
        { key: "revenus", label: "Revenus" },
        { key: "parametres", label: "Paramètres" },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Barre latérale */}
            <aside className="w-64 bg-[#160216] flex flex-col justify-between p-6 rounded-l-lg shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h2>
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <li
                                key={item.key}
                                onClick={() => setActiveMenu(item.key)}
                                className={`cursor-pointer px-4 py-2 rounded-md transition-all font-semibold ${activeMenu === item.key
                                    ? "bg-white text-[#160216]"
                                    : "bg-[#160216] text-white hover:bg-white hover:text-[#160216]"
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#ff0000] text-white py-2 rounded hover:bg-[#cc0000] transition"
                    >
                        Déconnexion
                    </button>
                    <button
                        onClick={handleRetour}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Retour sur la plateforme
                    </button>
                </div>
            </aside>

            {/* Contenu principal */}
            <main className="flex-1 flex flex-col bg-[#DEDEDE]">
                {/* Barre supérieure */}
                <div className="mx-6 my-6 p-6 bg-[#F5F5F5] border border-gray-400 rounded-xl shadow-sm flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9.33-5M9 17H4l1.405-1.405A2.032 2.032 0 006 14.158V11a6 6 0 0112 0v3.159c0 .538.214 1.055.595 1.436L20 17h-5m-4 0v1a3 3 0 006 0v-1m-6 0h6"
                                />
                            </svg>
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                        </button>

                        <div className="flex items-center gap-2 bg-white p-2 rounded-full">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profil"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium text-gray-800">{adminName}</span>
                        </div>
                    </div>
                </div>

                {/* Cartes de stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
                    {/* Abonnés */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Abonnés</h3>
                            <p className="text-2xl font-semibold">120</p>
                        </div>
                    </div>

                    {/* Livres publiés */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Livres publiés</h3>
                            <p className="text-xl font-semibold">{livres.length}</p>
                        </div>
                    </div>

                    {/* Auteurs */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Auteurs</h3>
                            <p className="text-xl font-semibold">{totalAuteurs}</p>
                        </div>
                    </div>

                    {/* Livres lus 75% */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Livres lus (75%)</h3>
                            <p className="text-xl font-semibold">80</p>
                        </div>
                    </div>

                    {/* Revenus */}
                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                        <div>
                            <h3 className="text-base font-bold text-gray-500">Revenus</h3>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="flex-1 p-8">
                    {activeMenu === "vue-ensemble" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Vue d'ensemble</h2>
                            <p>Statistiques globales : utilisateurs, livres, abonnements, revenus...</p>
                        </div>
                    )}

                    {activeMenu === "livres" && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Gestion des livres</h2>
                                <button
                                    onClick={() => navigate("/AjouterLivre")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un livre
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {livres.map((livre) => (
                                    <div key={livre._id} className="bg-white p-4 rounded-lg shadow flex flex-col">
                                        <img
                                            src={
                                                livre.imageCouverture
                                                    ? `http://localhost:5000/${livre.imageCouverture}`
                                                    : "https://via.placeholder.com/100"
                                            }
                                            alt={livre.titre}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <h3 className="font-bold">{livre.titre}</h3>
                                        <p className="text-gray-600">Auteur: {livre.auteur || "Inconnu"}</p>
                                        <p className="text-gray-600">Pages: {livre.pages || "N/A"}</p>

                                        <div className="mt-3 flex gap-2">
                                            <button
                                                onClick={() => setLivreSelectionne(livre)}
                                                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                                            >
                                                Voir
                                            </button>
                                            <button
                                                onClick={() => navigate(`/livres/modifier/${livre._id}`)}
                                                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm(`Supprimer le livre "${livre.titre}" ?`)) {
                                                        try {
                                                            const res = await fetch(`${API_URL_LIVRES}/${livre._id}`, {
                                                                method: "DELETE",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                },
                                                            });
                                                            if (res.ok) {
                                                                setLivres(livres.filter((l) => l._id !== livre._id));
                                                                alert("Livre supprimé !");
                                                            } else {
                                                                alert("Erreur lors de la suppression");
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert("Erreur lors de la suppression");
                                                        }
                                                    }
                                                }}
                                                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Modal détail livre */}
                            {livreSelectionne && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
                                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
                                        <button
                                            onClick={() => setLivreSelectionne(null)}
                                            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-lg"
                                        >
                                            ✖
                                        </button>

                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="flex-shrink-0 w-full lg:w-1/3 h-80 flex items-center justify-center bg-gray-200 rounded-lg">
                                                {livreSelectionne.imageCouverture ? (
                                                    <img
                                                        src={`http://localhost:5000/${livreSelectionne.imageCouverture}`}
                                                        alt={livreSelectionne.titre}
                                                        className="max-h-full w-auto object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="text-6xl text-gray-500">📚</div>
                                                )}
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h1 className="text-2xl font-bold mb-2">{livreSelectionne.titre}</h1>
                                                    <p className="text-sm font-semibold mb-1">{livreSelectionne.auteur}</p>
                                                    {livreSelectionne.coauteurs && (
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            Co-auteurs: {livreSelectionne.coauteurs}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-700 mb-2">{livreSelectionne.description}</p>
                                                </div>

                                                {livreSelectionne.documentLivre && (
                                                    <iframe
                                                        src={`http://localhost:5000/${livreSelectionne.documentLivre}`}
                                                        className="w-full rounded-lg mt-4"
                                                        style={{ height: "50vh", border: "none" }}
                                                        title="Lecteur PDF"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeMenu === "auteurs" && (
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Gestion des auteurs</h2>
                                <button
                                    onClick={() => navigate("/AjouterUser")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un auteur
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                                (Note: Seuls les auteurs approuvés sont affichés.)
                            </p>

                            {loadingAuteurs ? (
                                <div className="text-center py-10 text-gray-500">Chargement des auteurs...</div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto rounded-lg shadow-md">
                                        <table className="min-w-full bg-white border-collapse">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Nro</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Auteur</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Genres</th>
                                                    {/* ✅ Nouvelle colonne */}
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Livres</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Revenus</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {auteurs.length > 0 ? (
                                                    auteurs.map((auteur, index) => (
                                                        <tr key={auteur._id} className="border-b last:border-0 hover:bg-gray-50">
                                                            <td className="py-3 px-4">
                                                                {index + 1 + (currentPage - 1) * itemsPerPage}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={auteur.imageProfil ? `http://localhost:5000/${auteur.imageProfil}` : "https://via.placeholder.com/40"}
                                                                        alt={auteur.prenoms}
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                    />
                                                                    <span className="font-medium text-gray-800">
                                                                        {auteur.prenoms} {auteur.nom}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-600">{auteur.email}</td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className="px-3 py-1 text-xs font-bold rounded-full bg-green-200 text-green-800"
                                                                >
                                                                    {auteur.statut}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-600">{auteur.genrePrefere || 'N/A'}</td>
                                                            {/* ✅ Nouvelle cellule */}
                                                            <td className="py-3 px-4 text-gray-600 font-semibold">
                                                                {auteur.nombreDeLivres ?? 0}
                                                            </td>

                                                            <td className="py-3 px-4 font-semibold text-gray-700">{auteur.revenus} FG</td>
                                                            <td className="py-3 px-4 text-gray-600">
                                                                {auteur.dateCreation ? new Date(auteur.dateCreation).toLocaleDateString("fr-FR", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }) : 'N/A'}
                                                            </td>
                                                            <td className="py-3 px-4 flex gap-2">
                                                                <button
                                                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                                                    onClick={() => {
                                                                        alert(`Voir les détails de ${auteur.prenoms} ${auteur.nom}`);
                                                                    }}
                                                                >
                                                                    Voir
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center py-6 text-gray-500">
                                                            Aucun auteur trouvé.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalAuteurs > 0 && (
                                        <div className="flex justify-between items-center mt-6">
                                            <span className="text-sm text-gray-600">
                                                Résultats {(currentPage - 1) * itemsPerPage + 1} -{" "}
                                                {Math.min(currentPage * itemsPerPage, totalAuteurs)} sur {totalAuteurs}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Préc
                                                </button>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        onClick={() => setCurrentPage(i + 1)}
                                                        className={`px-4 py-2 border rounded-lg transition-all ${currentPage === i + 1
                                                            ? "bg-purple-600 text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Suiv
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* {activeMenu === "utilisateurs" && (
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
                                <button
                                    onClick={() => navigate("/AjouterUser")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter un utilisateur
                                </button>
                            </div>
                            {loadingUtilisateurs ? (
                                <p className="text-gray-500">Chargement...</p>
                            ) : utilisateurs.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg shadow-md">
                                    <table className="min-w-full bg-white border-collapse">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">N°</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Nom complet</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Inscrit le</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {utilisateurs.map((users, index) => (
                                                <tr key={users._id} className="border-b last:border-0 hover:bg-gray-50">
                                                    <td className="py-3 px-4">{index + 1}</td>
                                                    <td className="py-3 px-4">{users.prenoms} {users.nom}</td>
                                                    <td className="py-3 px-4">{users.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${users.estApprouve ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                                                            {users.estApprouve ? "Approuvé" : "En attente"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">{new Date(users.dateCreation).toLocaleDateString("fr-FR")}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">Aucun utilisateur trouvé.</p>
                            )}
                        </div>
                    )} */}

{activeMenu === "utilisateurs" && (
    <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
            {/* Si vous avez une route pour ajouter un utilisateur */}
            {/* <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                + Ajouter un utilisateur
            </button> */}
        </div>

        {loadingUtilisateurs ? (
            <div className="text-center py-10 text-gray-500">Chargement des utilisateurs...</div>
        ) : (
            <>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Nom</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Rôle</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Statut</th>
                                <th className="py-3 px-4 text-left font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilisateurs.length > 0 ? (
                                utilisateurs.map((user) => (
                                    <tr key={user._id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            {user.prenoms} {user.nom}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                        <td className="py-3 px-4 text-gray-600">{user.role}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.estApprouve ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                {user.estApprouve ? 'Approuvé' : 'En attente'}
                                            </span>
                                        </td>
                                        {/* <td className="py-3 px-4 flex gap-2"> */}
                                            {/* Bouton pour approuver si l'utilisateur n'est pas approuvé */}
                                            {/* {!user.estApprouve && (
                                                <button
                                                    onClick={() => handleApproveUser(user._id)}
                                                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
                                                >
                                                    Approuver
                                                </button>
                                            )} */}
                                            {/* Bouton pour supprimer */}
                                            {/* <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Supprimer
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        )}
    </div>
)}

                    {activeMenu === "actualites" && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Gestion des actualités</h2>
                                <button
                                    onClick={() => navigate("/AjouterActualite")}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                    + Ajouter une actualité
                                </button>
                            </div>
                            {loadingActualites ? (
                                <div className="text-center py-10 text-gray-500">Chargement des actualités...</div>
                            ) : (
                                <div id="listeActualites" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {actualites.length > 0 ? (
                                        actualites.map((actualite) => (
                                            <div key={actualite._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                                                <img
                                                    src={actualite.image ? `http://localhost:5000/${actualite.image}` : "https://via.placeholder.com/200x150"}
                                                    alt={actualite.titre}
                                                    className="w-full h-40 object-cover rounded mb-4"
                                                />
                                                <h3 className="text-lg font-bold mb-1">{actualite.titre}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{actualite.extrait}</p>
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <span>Publié le: {new Date(actualite.dateEvenement).toLocaleDateString()}</span>
                                                    <span>Par: {actualite.publiePar?.nom || "Admin"}</span>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleVoirActualite(actualite)}
                                                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                                    >
                                                        Voir
                                                    </button>
                                                    <button
                                                        onClick={() => alert('Fonctionnalité "Modifier" à implémenter')}
                                                        className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => alert('Fonctionnalité "Supprimer" à implémenter')}
                                                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 col-span-full text-center">Aucune actualité trouvée.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ✅ Modal de détail pour l'actualité */}
                    {actualiteSelectionnee && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                                <button
                                    onClick={handleFermerActualiteModal}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-3xl leading-none font-semibold"
                                >
                                    &times;
                                </button>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                        <img
                                            src={actualiteSelectionnee.image ? `http://localhost:5000/${actualiteSelectionnee.image}` : "https://via.placeholder.com/300x200"}
                                            alt={actualiteSelectionnee.titre}
                                            className="w-full h-auto object-cover rounded-md shadow"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <h2 className="text-3xl font-bold mb-2">{actualiteSelectionnee.titre}</h2>
                                        <p className="text-sm text-gray-500 mb-4">{actualiteSelectionnee.publiePar || "Admin"} - {new Date(actualiteSelectionnee.dateEvenement).toLocaleDateString()}</p>
                                        <p className="text-gray-700 mb-4">{actualiteSelectionnee.description}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                            <p><strong>Catégorie:</strong> {actualiteSelectionnee.categorie}</p>
                                            <p><strong>Heure:</strong> {actualiteSelectionnee.heure || 'N/A'}</p>
                                            <p><strong>Lieu:</strong> {actualiteSelectionnee.lieu || 'N/A'}</p>
                                            <p><strong>Temps de lecture:</strong> {actualiteSelectionnee.tempsDeLecture}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default DashboardAdmin;
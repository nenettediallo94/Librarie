// // src/pages/HomePage.js

// import React from 'react';
// import backgroundImage from '../assets/couverturedjan.png'

// function Accueil() {
//   return (
//     <div
//       className="relative min-h-screen"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-xl z-0"></div> */}

//       <div className="relative z-10">
//         {/* Section Héro - MODIFIÉE */}
//         <section className="h-[75vh] flex flex-col items-center justify-start p-8"> {/* Changed justify-center to justify-start */}
//           <div className="text-center max-w-4xl mx-auto">
//             {/* Titre en haut, gras, centré */}
//             <h1 className="text-6xl font-extrabold mb-6 text-white leading-tight pt-16 shadow-lg">
//               Découvrez la <span className="text-yellow-400">
//                 Guinée
//               </span>
//             </h1>
//             Paragraphe au centre, de taille différente */}
//             <p className="text-xl sm:text-2xl font-light mb-8 mt-12"> Augmenté la taille du paragraphe, ajouté mt-12 pour le positionner
//             {/* Dianguin vous donne accès à une vaste collection de romans, nouvelles et poésies d'auteurs guinéens. Une bibliothèque numérique pour valoriser notre patrimoine littéraire.
//             </p> */}
//             {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <button className="bg-white text-[#160216] py-3 px-8 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors">
//                 Explorez le catalogue
//               </button> */}
//             {/* <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#160216] transition-colors">
//                 Découvrez nos auteurs
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Dégradé de transition */}
//         <div className="h-32 bg-gradient-to-b from-transparent to-white"></div>

//         {/* Section Statistiques
//         <section className="py-16 bg-white bg-opacity-90">
//           <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
//             <div className="p-6 rounded-lg shadow-md bg-gray-50 hover:scale-105 transform transition duration-300">
//               <h3 className="text-4xl font-bold text-teal-600">100</h3>
//               <p className="mt-2 text-gray-700">Œuvres disponibles</p>
//             </div>
//             <div className="p-6 rounded-lg shadow-md bg-gray-50 hover:scale-105 transform transition duration-300">
//               <h3 className="text-4xl font-bold text-teal-600">1500</h3>
//               <p className="mt-2 text-gray-700">Utilisateurs</p>
//             </div>
//             <div className="p-6 rounded-lg shadow-md bg-gray-50 hover:scale-105 transform transition duration-300">
//               <h3 className="text-4xl font-bold text-teal-600">Partout</h3>
//               <p className="mt-2 text-gray-700">Disponible partout en Guinée</p>
//             </div>
//           </div>
//         </section> */}
//       </div>
//     </div>
//   );
// }

// export default Accueil;
// // src/pages/Accueil.jsx
import React from "react";
// import Header from "../components/Header";
import backgroundImage from "../assets/couverturedjan.png"; // Mets ton image ici

function Accueil() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Calque sombre */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

      {/* Contenu */}
      <div className="relative z-10 flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        {/* Header importé */}
        {/* <Header /> */}

        {/* Titre principal */}
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Découvrez la Littérature Guinéenne
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-lg font-bold mb-8">
            Dianguin vous donne accès à une collection de romans, nouvelles et
            poésies d’auteurs guinéens. Une bibliothèque numérique pour valoriser
            notre patrimoine littéraire.
          </p>

          {/* Boutons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#160216] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white hover:text-black transition-colors duration-300">
              Explorez le catalogue
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-white hover:text-[#160216] transition-colors duration-300">
              Découvrez nos auteurs
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="relative z-20 w-full mb-[-60px]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl px-4">
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

      <div className="bg-white text-black rounded-lg p-6 shadow-lg">
        <p className="text-3xl font-bold">Livres ajoutés récemment</p>
        <ul className="mt-4">
          <li className="border-b py-2">Titre du livre 1</li>
          <li className="border-b py-2">Titre du livre 2</li>
          <li className="border-b py-2">Titre du livre 3</li>
        </ul>
      </div>

    </div>
  );
}

export default Accueil;



import React from "react";

function Abonnement() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Nos Offres d’Abonnement
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Gratuit */}
                <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Gratuit</h2>
                    <p className="text-4xl font-bold text-green-600 mt-4">0 GNF</p>
                    <p className="text-gray-500 mt-2 text-center">
                        Accédez aux fonctionnalités de base gratuitement.
                    </p>

                    {/* Badge Plan actuel descendu en bas */}
                    <div className="mt-auto pt-6">
                        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                            Plan actuel
                        </span>
                    </div>
                </div>


                {/* Mensuel (Mise en avant) */}
                <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center border-4 border-blue-600 scale-105 transform">
                    <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                        Populaire
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800">Mensuel</h2>
                    <p className="text-5xl font-extrabold text-blue-600 mt-4">50 000 GNF</p>
                    <p className="text-gray-600 mt-3 text-center">
                        Profitez de toutes les fonctionnalités pendant <br /> 30 jours complets.
                    </p>
                    <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition">
                        S’abonner
                    </button>
                </div>

                {/* Hebdomadaire */}
                <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Hebdomadaire</h2>
                    <p className="text-4xl font-bold text-purple-600 mt-4">15 000 GNF</p>
                    <p className="text-gray-500 mt-2 text-center">
                        Accédez à toutes les fonctionnalités pendant 7 jours.
                    </p>
                    <button className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-2xl hover:bg-purple-700 transition">
                        S’abonner
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Abonnement;


// import React, { useEffect, useState } from "react";

// function Abonnement() {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/plans") // adapte le port selon ton backend
//       .then((res) => res.json())
//       .then((data) => setPlans(data))
//       .catch((err) => console.error("Erreur chargement plans:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-6">
//       <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         Nos Offres d’Abonnement
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className={`bg-white shadow-md rounded-3xl p-6 flex flex-col items-center ${
//               plan.nom === "Mensuel" ? "border-4 border-blue-600 scale-105" : ""
//             }`}
//           >
//             {plan.nom === "Mensuel" && (
//               <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full mb-4">
//                 Populaire
//               </span>
//             )}

//             <h2 className="text-2xl font-bold text-gray-800">{plan.nom}</h2>
//             <p
//               className={`text-4xl font-extrabold mt-4 ${
//                 plan.nom === "Mensuel"
//                   ? "text-blue-600"
//                   : "text-purple-600"
//               }`}
//             >
//               {plan.prix.toLocaleString()} GNF
//             </p>
//             <p className="text-gray-600 mt-3 text-center">{plan.description}</p>

//             {plan.prix > 0 && (
//               <button
//                 className={`mt-6 px-6 py-2 rounded-2xl text-white transition ${
//                   plan.nom === "Mensuel"
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-purple-600 hover:bg-purple-700"
//                 }`}
//               >
//                 S’abonner
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Abonnement;

// import React, { useEffect, useState } from "react";

// function Abonnement() {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/plans") // adapte selon ton backend
//       .then(res => res.json())
//       .then(data => setPlans(data))
//       .catch(err => console.error("Erreur chargement plans:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-6">
//       <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         Nos Offres d’Abonnement
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {plans.map((plan) => (
//           <div
//             key={plan._id}
//             className={`bg-white flex flex-col items-center p-6 rounded-3xl shadow-md ${
//               plan.nom === "Mensuel"
//                 ? "shadow-2xl border-4 border-blue-600 p-8 scale-105 transform"
//                 : ""
//             }`}
//           >
//             <h2
//               className={`${
//                 plan.nom === "Mensuel" ? "text-2xl font-bold text-gray-800" : "text-xl font-semibold text-gray-700"
//               }`}
//             >
//               {plan.nom}
//             </h2>

//             <p
//               className={`mt-4 font-bold ${
//                 plan.nom === "Mensuel" ? "text-5xl text-blue-600" : plan.nom === "Hebdomadaire" ? "text-4xl text-purple-600" : "text-4xl text-green-600"
//               }`}
//             >
//               {plan.prix.toLocaleString()} GNF
//             </p>

//             <p className="text-gray-500 mt-2 text-center flex-1">
//               {plan.description}
//             </p>

//             {/* Badge en bas */}
//             <div className="mt-auto pt-6">
//               {plan.nom === "Mensuel" && (
//                 <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
//                   Populaire
//                 </span>
//               )}
//               {plan.nom === "Gratuit" && (
//                 <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
//                   Plan actuel
//                 </span>
//               )}
//             </div>

//             {/* Bouton S’abonner */}
//             {plan.prix > 0 && (
//               <button
//                 className={`mt-6 px-6 py-2 rounded-2xl text-white text-lg font-semibold transition ${
//                   plan.nom === "Mensuel" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
//                 }`}
//               >
//                 S’abonner
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Abonnement;



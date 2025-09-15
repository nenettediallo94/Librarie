// import React, { useEffect, useState } from "react";

// function Temoignages() {
//   const [temoignages, setTemoignages] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [nom, setNom] = useState("");
//   const [profession, setProfession] = useState("");
//   const [commentaire, setCommentaire] = useState("");
//   const [image, setImage] = useState("");

//   // Charger témoignages
//   useEffect(() => {
//     fetch("http://localhost:5000/api/temoignages")
//       .then((res) => res.json())
//       .then((data) => setTemoignages(data));
//   }, []);

//   // Ajouter témoignage
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:5000/api/temoignages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ nom, profession, commentaire, image }),
//     });
//     const data = await res.json();
//     setTemoignages([data, ...temoignages]); // Ajoute en haut
//     setNom("");
//     setProfession("");
//     setCommentaire("");
//     setImage("");
//     setFormVisible(false);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto my-12">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">💬 Témoignages</h2>
//         <button
//           onClick={() => setFormVisible(!formVisible)}
//           className="bg-[#160216] text-white px-4 py-2 rounded-full hover:bg-purple-700"
//         >
//           {formVisible ? "Fermer" : "Laisser votre témoignage"}
//         </button>
//       </div>

//       {/* Formulaire */}
//       {formVisible && (
//         <form
//           onSubmit={handleSubmit}
//           className="mb-6 bg-gray-50 p-4 rounded-lg flex flex-col gap-2"
//         >
//           <input
//             type="text"
//             placeholder="Votre nom"
//             value={nom}
//             onChange={(e) => setNom(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Votre profession"
//             value={profession}
//             onChange={(e) => setProfession(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//           <textarea
//             placeholder="Votre témoignage"
//             value={commentaire}
//             onChange={(e) => setCommentaire(e.target.value)}
//             className="border p-2 w-full rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="URL de votre image (facultatif)"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Envoyer
//           </button>
//         </form>
//       )}

//       {/* Liste témoignages */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {temoignages.length > 0 ? (
//           temoignages.map((t) => (
//             <div key={t._id} className="border rounded-lg p-4 shadow flex flex-col">
//               {t.image && (
//                 <img
//                   src={t.image}
//                   alt={t.nom}
//                   className="w-16 h-16 rounded-full object-cover mb-2"
//                 />
//               )}
//               <h4 className="font-bold">{t.nom}</h4>
//               {t.profession && <p className="text-sm text-gray-500">{t.profession}</p>}
//               <p className="text-gray-700 mt-1">{t.commentaire}</p>
//               <p className="text-xs text-gray-500 mt-auto">
//                 {new Date(t.date).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 italic">
//             Aucun témoignage pour le moment.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Temoignages;


import React, { useEffect, useState } from "react";

function Temoignages() {
    const [temoignages, setTemoignages] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [nom, setNom] = useState("");
    const [profession, setProfession] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const [imageFile, setImageFile] = useState(null);

    // Charger témoignages
    useEffect(() => {
        fetch("http://localhost:5000/api/temoignages")
            .then((res) => res.json())
            .then((data) => setTemoignages(data));
    }, []);

    // Ajouter témoignage
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nom", nom);
        formData.append("profession", profession);
        formData.append("commentaire", commentaire);
        if (imageFile) formData.append("image", imageFile);

        const res = await fetch("http://localhost:5000/api/temoignages", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setTemoignages([data, ...temoignages]); // Ajoute en haut
        setNom("");
        setProfession("");
        setCommentaire("");
        setImageFile(null);
        setFormVisible(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto my-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">💬 Témoignages</h2>
                <button
                    onClick={() => setFormVisible(!formVisible)}
                    className="bg-[#160216] text-white px-4 py-2 rounded-full hover:bg-purple-700"
                >
                    {formVisible ? "Fermer" : "Laisser votre témoignage"}
                </button>
            </div>

            {formVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="mb-6 bg-gray-50 p-4 rounded-lg flex flex-col gap-2"
                >
                    <input
                        type="text"
                        placeholder="Votre nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Votre profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    <textarea
                        placeholder="Votre témoignage"
                        value={commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="border p-2 w-full rounded"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Envoyer
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {temoignages.map((t) => (
                    <div key={t._id} className="border rounded-lg p-4 shadow flex flex-col">
                        {t.image && (
                            <img
                                src={`http://localhost:5000/public/temoins/${t.image}`}
                                alt={t.nom}
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />

                        )}

                        <h4 className="font-bold">{t.nom}</h4>
                        {t.profession && <p className="text-sm text-gray-500">{t.profession}</p>}
                        <p className="text-gray-700 mt-1">{t.commentaire}</p>
                        <p className="text-xs text-gray-500 mt-auto">
                            {new Date(t.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Temoignages;

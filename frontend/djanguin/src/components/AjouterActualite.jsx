
// import React, { useState } from 'react';

// const ActualiteForm = () => {
//   const [formData, setFormData] = useState({
//     titre: '',
//     categorie: '',
//     description: '',
//     extrait: '',
//     // La valeur de 'image' ne sera plus une URL ici, mais un objet File
//     publiePar: '',
//     dateEvenement: '',
//     heure: '',
//     lieu: '',
//     tempsDeLecture: ''
//   });

//   // On crée un état séparé pour le fichier de l'image
//   const [imageFile, setImageFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     // Met à jour l'état du fichier avec le fichier sélectionné
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Création d'un objet FormData pour envoyer les données et le fichier
//     const form = new FormData();
//     // On ajoute toutes les paires clé-valeur du formulaire
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }
//     // On ajoute le fichier d'image
//     if (imageFile) {
//       form.append('image', imageFile);
//     }
    
//     try {
//       // Le header 'Content-Type' est géré automatiquement par le navigateur avec FormData
//       const response = await fetch("http://localhost:5000/api/actualites", {
//         method: 'POST',
//         body: form
//       });

//       if (response.ok) {
//         console.log('Actualité ajoutée avec succès !');
//         // Réinitialiser le formulaire
//         setFormData({
//           titre: '',
//           categorie: '',
//           description: '',
//           extrait: '',
//           publiePar: '',
//           dateEvenement: '',
//           heure: '',
//           lieu: '',
//           tempsDeLecture: ''
//         });
//         setImageFile(null); // Réinitialiser le fichier d'image
//         // Gérer le succès (ex: afficher un message, rediriger)
//       } else {
//         console.error('Erreur lors de l\'ajout de l\'actualité.');
//         // Gérer l'erreur
//       }
//     } catch (error) {
//       console.error('Erreur réseau:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une Actualité</h2>
//       <form onSubmit={handleSubmit}>
        
//         {/* Titre */}
//         <div className="mb-4">
//           <label htmlFor="titre" className="block text-gray-700 font-semibold mb-2">Titre</label>
//           <input
//             type="text"
//             id="titre"
//             name="titre"
//             value={formData.titre}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Entrez le titre de l'actualité"
//           />
//         </div>
        
//         {/* Catégorie */}
//         <div className="mb-4">
//           <label htmlFor="categorie" className="block text-gray-700 font-semibold mb-2">Catégorie</label>
//           <select
//             id="categorie"
//             name="categorie"
//             value={formData.categorie}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Sélectionnez une catégorie</option>
//             <option value="Actualité littéraire">Actualité littéraire</option>
//             <option value="Interview">Interview</option>
//             <option value="Evénement">Événement</option>
//           </select>
//         </div>
        
//         {/* Description */}
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             rows="5"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Le contenu principal de l'actualité..."
//           ></textarea>
//         </div>
        
//         {/* Extrait */}
//         <div className="mb-4">
//           <label htmlFor="extrait" className="block text-gray-700 font-semibold mb-2">Extrait (pour l'accueil)</label>
//           <textarea
//             id="extrait"
//             name="extrait"
//             rows="3"
//             value={formData.extrait}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Un court extrait pour la page d'accueil..."
//           ></textarea>
//         </div>
        
//         {/* Image - CHANGEMENT ICI */}
//         <div className="mb-4">
//           <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*" // Accepte uniquement les fichiers image
//             onChange={handleFileChange}
//             className="w-full text-gray-700"
//           />
//           {imageFile && (
//             <p className="mt-2 text-sm text-gray-500">
//               Fichier sélectionné : {imageFile.name}
//             </p>
//           )}
//         </div>
        
//         {/* Publié par */}
//         <div className="mb-4">
//           <label htmlFor="publiePar" className="block text-gray-700 font-semibold mb-2">Publié par</label>
//           <input
//             type="text"
//             id="publiePar"
//             name="publiePar"
//             value={formData.publiePar}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Nom de l'auteur"
//           />
//         </div>

//         {/* Champs pour l'événement */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label htmlFor="dateEvenement" className="block text-gray-700 font-semibold mb-2">Date de l'événement</label>
//             <input
//               type="date"
//               id="dateEvenement"
//               name="dateEvenement"
//               value={formData.dateEvenement}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="heure" className="block text-gray-700 font-semibold mb-2">Heure</label>
//             <input
//               type="time"
//               id="heure"
//               name="heure"
//               value={formData.heure}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="lieu" className="block text-gray-700 font-semibold mb-2">Lieu</label>
//             <input
//               type="text"
//               id="lieu"
//               name="lieu"
//               value={formData.lieu}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Nom du lieu"
//             />
//           </div>
//         </div>
        
//         {/* Temps de lecture */}
//         <div className="mb-6">
//           <label htmlFor="tempsDeLecture" className="block text-gray-700 font-semibold mb-2">Temps de lecture (en minutes)</label>
//           <input
//             type="number"
//             id="tempsDeLecture"
//             name="tempsDeLecture"
//             value={formData.tempsDeLecture}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         {/* Bouton de soumission */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Ajouter l'actualité
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ActualiteForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActualiteForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    categorie: '',
    description: '',
    extrait: '',
    publiePar: '',
    dateEvenement: '',
    heure: '',
    lieu: '',
    tempsDeLecture: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (imageFile) {
      form.append('image', imageFile);
    }
    
    try {
      const response = await fetch("http://localhost:5000/api/actualites", {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        console.log('Actualité ajoutée avec succès !');
        // Rediriger vers la page précédente après l'ajout
        navigate(-1); 
      } else {
        console.error('Erreur lors de l\'ajout de l\'actualité.');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  // Fonction pour fermer le formulaire et revenir à la page précédente
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une Actualité</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Titre */}
        <div className="mb-4">
          <label htmlFor="titre" className="block text-gray-700 font-semibold mb-2">Titre</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le titre de l'actualité"
          />
        </div>
        
        {/* Catégorie */}
        <div className="mb-4">
          <label htmlFor="categorie" className="block text-gray-700 font-semibold mb-2">Catégorie</label>
          <select
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Actualité littéraire">Actualité littéraire</option>
            <option value="Interview">Interview</option>
            <option value="Evénement">Événement</option>
          </select>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Le contenu principal de l'actualité..."
          ></textarea>
        </div>
        
        {/* Extrait */}
        <div className="mb-4">
          <label htmlFor="extrait" className="block text-gray-700 font-semibold mb-2">Extrait (pour l'accueil)</label>
          <textarea
            id="extrait"
            name="extrait"
            rows="3"
            value={formData.extrait}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Un court extrait pour la page d'accueil..."
          ></textarea>
        </div>
        
        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-700"
          />
          {imageFile && (
            <p className="mt-2 text-sm text-gray-500">
              Fichier sélectionné : {imageFile.name}
            </p>
          )}
        </div>
        
        {/* Publié par */}
        <div className="mb-4">
          <label htmlFor="publiePar" className="block text-gray-700 font-semibold mb-2">Publié par</label>
          <input
            type="text"
            id="publiePar"
            name="publiePar"
            value={formData.publiePar}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom de l'auteur"
          />
        </div>

        {/* Champs pour l'événement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="dateEvenement" className="block text-gray-700 font-semibold mb-2">Date de l'événement</label>
            <input
              type="date"
              id="dateEvenement"
              name="dateEvenement"
              value={formData.dateEvenement}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="heure" className="block text-gray-700 font-semibold mb-2">Heure</label>
            <input
              type="time"
              id="heure"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lieu" className="block text-gray-700 font-semibold mb-2">Lieu</label>
            <input
              type="text"
              id="lieu"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du lieu"
            />
          </div>
        </div>
        
        {/* Temps de lecture */}
        <div className="mb-6">
          <label htmlFor="tempsDeLecture" className="block text-gray-700 font-semibold mb-2">Temps de lecture (en minutes)</label>
          <input
            type="number"
            id="tempsDeLecture"
            name="tempsDeLecture"
            value={formData.tempsDeLecture}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Boutons d'action */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Fermer
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ajouter l'actualité
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualiteForm;


import React, { useState } from "react";
function AjouterUser() {
  const [formData, setFormData] = useState({
    prenoms: "",
    nom: "",
    email: "",
    motDePasse: "",
    role: "en_attente",
    telephone: "",
    dateNaissance: "",
    biographie: "",
    genrePrefere: "Autre",
    imageFile: null,       // fichier réel sélectionné
    imagePreview: "",      // aperçu avant upload
    imageProfil: "",       // URL après upload
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Gestion des inputs texte
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de l'image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file), // aperçu immédiat
      });
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        if (key === "imageFile" && formData.imageFile) {
          formDataToSend.append("imageProfil", formData.imageFile);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de la création de l'utilisateur");
      } else {
        setMessage(data.message);

        // Mise à jour pour l'aperçu après upload
        setFormData({
          prenoms: "",
          nom: "",
          email: "",
          motDePasse: "",
          role: "en_attente",
          telephone: "",
          dateNaissance: "",
          biographie: "",
          genrePrefere: "Autre",
          imageFile: null,
          imagePreview: "",
          imageProfil: data.user.imageProfil
            ? `http://localhost:5000${data.user.imageProfil}`
            : "",
        });
      }
    } catch (err) {
      setError("Erreur serveur. Veuillez réessayer.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un utilisateur</h2>

      {message && <p className="bg-green-100 text-green-800 p-3 mb-4 rounded">{message}</p>}
      {error && <p className="bg-red-100 text-red-800 p-3 mb-4 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* Prénoms */}
        <div>
          <label className="block font-medium mb-1">Prénoms</label>
          <input type="text" name="prenoms" value={formData.prenoms} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>

        {/* Nom */}
        <div>
          <label className="block font-medium mb-1">Nom</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block font-medium mb-1">Mot de passe</label>
          <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block font-medium mb-1">Téléphone</label>
          <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block font-medium mb-1">Date de naissance</label>
          <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Genre préféré */}
        <div>
          <label className="block font-medium mb-1">Genre préféré</label>
          <select name="genrePrefere" value={formData.genrePrefere} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400">
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science Fiction</option>
            <option>Fantasy</option>
            <option>Mystère</option>
            <option>Biographie</option>
            <option>Histoire</option>
            <option>Science</option>
            <option>Autre</option>
          </select>
        </div>

        {/* Image Profil */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Image Profil</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" />
          
          {/* Aperçu avant upload */}
          {formData.imagePreview && (
            <img src={formData.imagePreview} alt="Aperçu" className="mt-2 w-32 h-32 object-cover rounded" />
          )}

          {/* Aperçu après upload */}
          {!formData.imagePreview && formData.imageProfil && (
            <img src={formData.imageProfil} alt="Aperçu serveur" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        {/* Biographie */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Biographie</label>
          <textarea name="biographie" value={formData.biographie} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Bouton submit */}
        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">Ajouter</button>
        </div>
      </form>
    </div>
  );
}

export default AjouterUser;



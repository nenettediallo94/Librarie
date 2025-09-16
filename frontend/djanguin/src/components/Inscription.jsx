import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Inscription() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        prenoms: "",
        nom: "",
        email: "",
        motDePasse: "",
        role: "abonné", // Rôle par défaut
        telephone: "",
        dateNaissance: "",
        biographie: "",
        genrePrefere: "Autre",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            // Ajoute tous les champs texte
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            // Ajoute le fichier image s'il existe
            if (imageFile) {
                formDataToSend.append("imageProfil", imageFile);
            }

            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription.");
            }

            setMessage("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
            setTimeout(() => {
                navigate("/connexion"); // Redirige vers la page de connexion après 2 secondes
            }, 2000);

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

            {message && <p className="bg-green-100 text-green-800 p-3 mb-4 rounded">{message}</p>}
            {error && <p className="bg-red-100 text-red-800 p-3 mb-4 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénoms */}
                <div>
                    <label className="block font-medium mb-1">Prénoms</label>
                    <input type="text" name="prenoms" value={formData.prenoms} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>

                {/* Nom */}
                <div>
                    <label className="block font-medium mb-1">Nom</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>

                {/* Mot de passe */}
                <div>
                    <label className="block font-medium mb-1">Mot de passe</label>
                    <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>

                {/* Rôle */}
                <div>
                    <label className="block font-medium mb-1">Je suis un...</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
                        <option value="abonné">Abonné</option>
                        <option value="auteur">Auteur</option>
                    </select>
                </div>

                {/* Téléphone */}
                <div>
                    <label className="block font-medium mb-1">Téléphone (Optionnel)</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" />
                </div>

                {/* Biographie (uniquement pour les auteurs) */}
                {formData.role === 'auteur' && (
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Biographie (Optionnel)</label>
                        <textarea name="biographie" value={formData.biographie} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" rows="4" />
                    </div>
                )}

                {/* Image de profil */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Photo de profil (Optionnel)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded" />
                    {imagePreview && (
                        <div className="mt-4">
                            <p>Aperçu :</p>
                            <img src={imagePreview} alt="Aperçu du profil" className="w-32 h-32 object-cover rounded-full mt-2" />
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 flex flex-col items-center gap-4 mt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? "Inscription en cours..." : "S'inscrire"}
                    </button>
                    <p className="text-sm">
                        Déjà un compte ? <Link to="/connexion" className="text-blue-600 hover:underline">Connectez-vous</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Inscription;

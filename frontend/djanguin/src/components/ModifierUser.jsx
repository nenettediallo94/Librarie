import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL_USERS = "http://localhost:5000/api/users";

function ModifierUser() {
    const navigate = useNavigate();
    const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL

    const [formData, setFormData] = useState({
        prenoms: "",
        nom: "",
        email: "",
        role: "abonné",
        telephone: "",
        dateNaissance: "",
        biographie: "",
        genrePrefere: "Autre",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`${API_URL_USERS}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Utilisateur non trouvé");
                }

                const data = await res.json();
                const user = data.user;

                // Formater la date pour l'input type="date"
                const formattedDate = user.dateNaissance
                    ? new Date(user.dateNaissance).toISOString().split('T')[0]
                    : "";

                setFormData({
                    prenoms: user.prenoms || "",
                    nom: user.nom || "",
                    email: user.email || "",
                    role: user.role || "abonné",
                    telephone: user.telephone || "",
                    dateNaissance: formattedDate,
                    biographie: user.biographie || "",
                    genrePrefere: user.genrePrefere || "Autre",
                });
                setImagePreview(user.imageProfil ? `http://localhost:5000/${user.imageProfil}` : "");
            } catch (err) {
                setError("Erreur lors de la récupération des données de l'utilisateur.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

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

        try {
            const formDataToSend = new FormData();

            // Ajoute les champs texte au FormData
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            // Ajoute le fichier image s'il a été modifié
            if (imageFile) {
                formDataToSend.append("imageProfil", imageFile);
            }

            const response = await fetch(`${API_URL_USERS}/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: formDataToSend, // Utilise FormData pour l'envoi
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Erreur lors de la mise à jour.");
            } else {
                setMessage("Utilisateur mis à jour avec succès !");
                setTimeout(() => navigate("/DashboardAdmin"), 1500); // Redirige après un court délai
            }
        } catch (err) {
            setError("Erreur serveur. Veuillez réessayer.");
            console.error(err);
        }
    };

    if (loading) {
        return <div className="text-center mt-20">Chargement du formulaire...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Modifier l'utilisateur</h2>

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

                {/* Rôle */}
                <div>
                    <label className="block font-medium mb-1">Rôle</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
                        <option value="abonné">Abonné</option>
                        <option value="auteur">Auteur</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Téléphone */}
                <div>
                    <label className="block font-medium mb-1">Téléphone</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" />
                </div>

                {/* Date de naissance */}
                <div>
                    <label className="block font-medium mb-1">Date de naissance</label>
                    <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" />
                </div>

                {/* Genre préféré */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Genre littéraire préféré</label>
                    <select name="genrePrefere" value={formData.genrePrefere} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded">
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

                {/* Biographie */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Biographie</label>
                    <textarea name="biographie" value={formData.biographie} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" rows="4" />
                </div>

                {/* Image de profil */}
                <div className="md:col-span-2">
                    <label className="block font-medium mb-1">Photo de profil</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 p-2 rounded" />
                    {imagePreview && (
                        <div className="mt-4">
                            <p>Aperçu :</p>
                            <img src={imagePreview} alt="Aperçu du profil" className="w-32 h-32 object-cover rounded-full mt-2" />
                        </div>
                    )}
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/DashboardAdmin")}
                        className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        Mettre à jour
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ModifierUser;
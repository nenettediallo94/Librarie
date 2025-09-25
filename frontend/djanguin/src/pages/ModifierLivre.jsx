import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLivreById, updateLivre } from "../services/bookService";
import { getAuteurs } from "../services/auteurService";

function ModifierLivre() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livre, setLivre] = useState(null);
    const [auteurs, setAuteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const livreData = await getLivreById(id);
                setLivre({
                    ...livreData,
                    auteur: livreData.auteur?._id || "", // S'assurer que c'est l'ID
                });

                const auteursData = await getAuteurs({ page: 1, limit: 1000 });
                if (auteursData && auteursData.auteurs) {
                    setAuteurs(auteursData.auteurs);
                }
            } catch (err) {
                setError("Impossible de charger les données du livre ou des auteurs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLivre(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setLivre(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        // Ajouter tous les champs du state `livre` au FormData
        for (const key in livre) {
            if (key === 'imageCouverture' || key === 'documentLivre') {
                if (livre[key] instanceof File) {
                    formData.append(key, livre[key]);
                }
            } else if (livre[key] !== null && livre[key] !== undefined) {
                formData.append(key, livre[key]);
            }
        }

        try {
            await updateLivre(id, formData);
            alert("Livre mis à jour avec succès !");
            navigate("/admin/dashboard");
        } catch (err) {
            setError("Erreur lors de la mise à jour du livre.");
            console.error(err);
        }
    };

    if (loading) return <div className="text-center py-10">Chargement...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
    if (!livre) return <div className="text-center py-10">Livre non trouvé.</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
            <h1 className="text-3xl font-bold mb-6">Modifier le livre : {livre.titre}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Titre */}
                <div>
                    <label className="block font-medium">Titre</label>
                    <input type="text" name="titre" value={livre.titre || ''} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>

                {/* Auteur */}
                <div>
                    <label className="block font-medium">Auteur</label>
                    <select name="auteur" value={livre.auteur || ''} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Sélectionnez un auteur</option>
                        {auteurs.map(auteur => (
                            <option key={auteur._id} value={auteur._id}>
                                {auteur.prenoms} {auteur.nom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea name="description" value={livre.description || ''} onChange={handleChange} rows="4" className="w-full border p-2 rounded"></textarea>
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-medium">Genre</label>
                    <input type="text" name="genre" value={livre.genre || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                {/* Image de couverture */}
                <div>
                    <label className="block font-medium">Changer l'image de couverture</label>
                    <input type="file" name="imageCouverture" onChange={handleFileChange} className="w-full border p-2 rounded" />
                    {livre.imageCouverture && typeof livre.imageCouverture === 'string' && (
                        <img src={`http://localhost:5000/${livre.imageCouverture}`} alt="Couverture actuelle" className="w-32 mt-2" />
                    )}
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Mettre à jour
                    </button>
                    <Link to="/admin/dashboard" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
                        Annuler
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ModifierLivre;
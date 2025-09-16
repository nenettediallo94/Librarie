import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Connexion() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        motDePasse: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Échec de la connexion.");
            }

            // Stocker le token
            localStorage.setItem("token", data.token);

            // Décoder le token pour obtenir le rôle
            const payload = JSON.parse(atob(data.token.split(".")[1]));
            
            // Rediriger en fonction du rôle
            if (payload.user.role === 'admin') {
                navigate("/DashboardAdmin");
            } else {
                navigate("/"); // Rediriger les autres utilisateurs vers l'accueil
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
            {error && <p className="bg-red-100 text-red-800 p-3 mb-4 rounded text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>
                <div>
                    <label className="block font-medium mb-1">Mot de passe</label>
                    <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400" disabled={loading}>
                    {loading ? "Connexion en cours..." : "Se connecter"}
                </button>
                <p className="text-sm text-center">
                    Pas encore de compte ? <Link to="/inscription" className="text-blue-600 hover:underline">Inscrivez-vous</Link>
                </p>
            </form>
        </div>
    );
}

export default Connexion;
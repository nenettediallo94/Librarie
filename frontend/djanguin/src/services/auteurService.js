// auteurService.js
const API_URL = "http://localhost:5000/api/auteurs";

export const getAuteurs = async (params = {}) => {
  try {
    // Construit l'URL avec les paramètres (page, limit, etc.)
    const url = new URL(API_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Ajout du token pour les routes protégées
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des auteurs");
    }

    const data = await res.json();
    // Renvoie directement la réponse du backend
    return data;

  } catch (err) {
    console.error("Erreur récupération auteurs:", err);
    throw err; // Propage l'erreur pour que le composant appelant puisse la gérer
  }
};

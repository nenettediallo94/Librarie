// auteurService.js
const API_URL = "http://localhost:5000/api/auteurs";

export const getAuteurs = async (page = 1, limit = 8) => {
  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Erreur lors de la récupération des auteurs");
    }
    const data = await res.json();
    // on s'assure que ça renvoie un objet avec auteurs et totalPages
    return {
      auteurs: data.auteurs || [],
      totalPages: data.totalPages || 1,
    };
  } catch (err) {
    console.error("Erreur récupération auteurs:", err);
    return { auteurs: [], totalPages: 1 };
  }
};

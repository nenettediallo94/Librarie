// src/services/temoignageService.js
const API_URL = "http://localhost:5000/api/temoignages";

// ✅ Récupérer tous les témoignages
export const getTemoignages = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erreur lors de la récupération des témoignages");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// ✅ Créer un témoignage
export const addTemoignage = async (temoignage) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temoignage),
    });
    if (!res.ok) throw new Error("Erreur lors de l’ajout du témoignage");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ✅ Supprimer un témoignage
export const deleteTemoignage = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression du témoignage");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

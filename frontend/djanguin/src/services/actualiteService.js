// services/actualiteService.js

const API_URL = "http://localhost:5000/api/actualites";

// Fonction pour récupérer toutes les actualités
export const getActualites = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des actualités: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur dans getActualites :", error);
    throw error;
  }
};

// Fonction pour récupérer une seule actualité par son ID
export const getActualiteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'actualité ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur dans getActualiteById pour l'ID ${id}:`, error);
    throw error;
  }
};
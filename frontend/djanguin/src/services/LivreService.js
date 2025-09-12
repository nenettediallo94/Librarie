// src/services/livreService.js

// Assurez-vous d'avoir une URL de base correcte pour votre API
const API_BASE_URL = "http://localhost:5000";

// Fonction pour récupérer les livres d'un auteur par son ID
export const getLivresByAuteurId = async (auteurId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/livres/auteur/${auteurId}`);
    if (!response.ok) {
      throw new Error("Erreur réseau lors de la récupération des livres");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
    throw error;
  }
};
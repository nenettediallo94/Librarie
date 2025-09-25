
// src/services/bookService.js
export const API_URL = "http://localhost:5000/api/livres";

// Créer un livre (texte + fichiers)
export const createLivre = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData
  });
  if (!response.ok) throw new Error("Erreur lors de la création du livre");
  return await response.json();
};

// Récupérer tous les livres
export const getLivres = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erreur lors de la récupération des livres");
  return await response.json();
};

// Récupérer un livre par ID
export const getLivreById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Livre non trouvé");
  return await response.json();
};

// Mettre à jour un livre
export const updateLivre = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la mise à jour du livre");
  }

  return await response.json();
};

// Supprimer un livre
export const deleteLivre = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erreur lors de la suppression du livre");

  return await response.json();
};

// src/pages/ActualiteDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getActualiteById } from "../services/actualiteService";

function ActualiteDetail() {
  const { id } = useParams(); // 👈 Récupère l'ID de l'URL
  const [actualite, setActualite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActualite = async () => {
      try {
        const data = await getActualiteById(id);
        setActualite(data);
      } catch (err) {
        console.error("Erreur lors du chargement de l'actualité :", err);
        setError("Actualité introuvable ou erreur de chargement.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchActualite();
  }, [id]); // 👈 Le useEffect se déclenche à chaque fois que l'ID change

  if (isLoading) {
    return <div className="text-center mt-20 text-lg">Chargement de l'actualité...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {actualite ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <img
            src={`http://localhost:5000/${actualite.image}`}
            alt={actualite.titre}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-6 md:p-10">
            <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {actualite.categorie}
              </span>
              <span className="italic">
                Publié le {new Date(actualite.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#160216]">{actualite.titre}</h1>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed text-lg mb-6">
              <p className="font-semibold text-xl">{actualite.extrait}</p>
              {/* Utilisez dangerouslySetInnerHTML si la description peut contenir du HTML */}
              <div dangerouslySetInnerHTML={{ __html: actualite.description }} />
            </div>

            <div className="mt-8 border-t pt-6 text-gray-600">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Détails de l'événement</h3>
                <p><strong>Date :</strong> {new Date(actualite.dateEvenement).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Heure :</strong> {actualite.heure || 'Non spécifiée'}</p>
                <p><strong>Lieu :</strong> {actualite.lieu || 'Non spécifié'}</p>
                <p><strong>Temps de lecture estimé :</strong> {actualite.tempsDeLecture} minutes</p>
            </div>

            <div className="mt-8 text-center">
                <Link to="/ActualitesPage" className="text-blue-600 hover:underline font-semibold">
                    &larr; Retour à toutes les actualités
                </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ActualiteDetail;
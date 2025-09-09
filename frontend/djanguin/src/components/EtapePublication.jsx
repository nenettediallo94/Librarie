import React from "react";
import "./EtapePublication.css";

const EtapePublication = ({ formData, onPrev, onSubmit }) => {
  return (
    <div className="info-generales">
      <h2>Publication du livre</h2>

      {/* Résumé du livre */}
      <div className="publication-summary">
        <div className="cover-preview">
          {formData.cover ? (
            <img
              src={URL.createObjectURL(formData.cover)}
              alt="Couverture"
              className="cover-img"
            />
          ) : (
            <div className="cover-placeholder">📚</div>
          )}
        </div>
        <div className="details-summary">
          <h3>{formData.title}</h3>
          <p>Auteur : {formData.author}</p>
          {formData.coauthors && <p>Co-auteurs : {formData.coauthors}</p>}
          <p>Genre : {formData.genre}</p>
          <p>Langue : {formData.language}</p>
          <p>Nombre de pages : {formData.pages}</p>
          <p>Année : {formData.year}</p>
          <p>Disponibilité : {formData.availability}</p>
          {formData.excerpt && <p>Résumé / extrait : {formData.excerpt}</p>}
        </div>
      </div>

      {/* Boutons */}
      <div className="form-buttons">
        <button type="button" className="draft-btn" onClick={onPrev}>
          ← Précédent
        </button>
        <button type="button" className="next-btn" onClick={onSubmit}>
          Publier le livre
        </button>
      </div>
    </div>
  );
};

export default EtapePublication;


import React from "react";


const EtapeContenu = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  return (
    <div className="info-generales"> {/* 👈 même classe que InformationsGenerales */}
      <h2>Contenu du livre</h2>

      <div className="info-form">
        <label>
          Fichier du livre (PDF / EPUB) :
          <input
            type="file"
            name="file"
            accept=".pdf,.epub"
            onChange={handleChange}
          />
        </label>

        <label>
          Résumé ou extrait :
          <textarea
            name="excerpt"
            placeholder="Rédigez un court extrait ou résumé du livre..."
            value={formData.excerpt || ""}
            onChange={handleChange}
          />
        </label>
      </div>

      {/* Paramètres de lecture */}
      <div className="reading-settings">
        <h3>Paramètres de lecture</h3>

        <label>
          <input
            type="checkbox"
            name="allowDownload"
            checked={formData.allowDownload}
            onChange={handleChange}
          />
          Autoriser le téléchargement
        </label>

        <label>
          <input
            type="checkbox"
            name="allowCopy"
            checked={formData.allowCopy}
            onChange={handleChange}
          />
          Autoriser la copie de texte
        </label>

        <label>
          <input
            type="checkbox"
            name="allowComments"
            checked={formData.allowComments}
            onChange={handleChange}
          />
          Activer les commentaires
        </label>
      </div>

      <div className="form-buttons">
        <button type="button" className="draft-btn" onClick={onPrev}>
          ← Précédent
        </button>
        <button type="button" className="next-btn" onClick={onNext}>
          Continuer vers la publication →
        </button>
      </div>
    </div>
  );
};

export default EtapeContenu;

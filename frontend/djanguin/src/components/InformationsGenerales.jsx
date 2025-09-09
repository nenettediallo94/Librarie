import React from "react";
import "./InformationsGenerales.css";

const InformationsGenerales = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="info-generales">
      <h2>Informations générales</h2>

      <form className="info-form">
        <div className="title-subtitle">
          <label>
            Titre :
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Sous-titre :
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="author-coauthor">
          <label>
            Auteur principal :
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>

          <label>
            Co-auteurs :
            <input
              type="text"
              name="coauthors"
              value={formData.coauthors}
              onChange={handleChange}
              placeholder="séparés par des virgules"
            />
          </label>
        </div>

        <div className="genre-language">
          <label>
            Genre :
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </label>

          <label>
            Langue :
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Description :
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Mots-clés :
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="séparés par des virgules"
          />
        </label>

        <label>
          Couverture du livre :
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleChange}
          />
        </label>

        <div className="pages-year-availability">
          <label>
            Nombre de pages :
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </label>

          <label>
            Année de publication :
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
          </label>

          <label>
            Disponibilité :
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="gratuit">Gratuit</option>
              <option value="abonnement">Abonnement</option>
            </select>
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" className="draft-btn">
            Sauvegarder comme brouillon
          </button>
          <button type="button" className="next-btn" onClick={onNext}>
            Continuer vers le contenu →
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformationsGenerales;

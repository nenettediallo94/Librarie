import React from "react";
import "./BookPreview.css";

const BookPreview = ({ formData }) => {
    return (
        <div className="book-preview">
            <h3>Aperçu du livre</h3>
            <div className="preview-card">
                <div className="cover">
                    {formData.cover ? (
                        <img
                            src={URL.createObjectURL(formData.cover)}
                            alt="Couverture"
                            className="cover-img"
                        />
                    ) : (
                        <div className="cover-placeholder">📚</div>
                    )}
                    {/* Texte superposé en bas */}
                    <div className="cover-text">
                        <h4>{formData.title || "Titre du livre"}</h4>
                        <p>{formData.author || "Nom de l’auteur"}</p>
                        <p>
                            {formData.genre || "Genre"} - {formData.language || "Langue"}
                        </p>
                        <p className="desc">
                            {formData.description
                                ? formData.description.substring(0, 100) + "..."
                                : "Description du livre..."}
                        </p>
                        <p className="status">{formData.availability || "Disponibilité"}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookPreview;

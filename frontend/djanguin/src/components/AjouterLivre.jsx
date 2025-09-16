

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InformationsGenerales from "./InformationsGenerales";
import EtapeContenu from "./EtapeContenu";
import EtapePublication from "./EtapePublication";
import BookPreview from "./BookPreview";
import TipsSection from "./TipsSection";
import StepIndicator from "./StepIndicator";
import { createLivre } from "../services/bookService";
import {getAuteurs} from "../services/auteurService";
import "./AjouterLivre.css";

const BookForm = () => {
  const navigate = useNavigate();
  const [auteurs, setAuteurs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    author: "", // ID de l'auteur sélectionné
    coauthors: "",
    genre: "",
    language: "",
    description: "",
    keywords: "",
    cover: null,
    file: null,
    pages: "",
    year: "",
    isbn: "",
    availability: "gratuit",
    allowDownload: false,
    allowCopy: false,
    allowComments: false,
    excerpt: ""
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Récupérer la liste des auteurs au chargement du composant
  useEffect(() => {
    const fetchAuteurs = async () => {
      try {
        // Assurez-vous d'avoir une fonction dans votre service qui récupère TOUS les auteurs
        const data = await getAuteurs({ page: 1, limit: 1000 }); // Récupère un grand nombre d'auteurs
        if (data && data.auteurs) {
          setAuteurs(data.auteurs);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des auteurs:", error);
      }
    };
    fetchAuteurs();
  }, []);



  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("titre", formData.title);
      data.append("soustitre", formData.subtitle);
      data.append("auteur", formData.author);
      data.append("coauteurs", formData.coauthors);
      data.append("annee", formData.year);
      data.append("genre", formData.genre);
      data.append("langue", formData.language);
      data.append("description", formData.description);
      data.append("motscles", JSON.stringify(formData.keywords ? formData.keywords.split(",") : []));
      data.append("pages", formData.pages);
      data.append("isbn", formData.isbn);
      data.append("disponibilite", formData.availability);

      data.append("allowDownload", formData.allowDownload ? "true" : "false");
      data.append("allowCopy", formData.allowCopy ? "true" : "false");
      data.append("allowComments", formData.allowComments ? "true" : "false");

      if (formData.cover) data.append("imageCouverture", formData.cover);
      if (formData.file) data.append("documentLivre", formData.file);

      const createdBook = await createLivre(data);
      console.log("Livre créé :", createdBook);
      alert("Livre ajouté avec succès !");
      navigate("/CataloguePage"); // renvoie automatiquement au catalogue
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ajout du livre.");
    }
  };

  return (
    <div className="book-form-container">
      <div className="form-header">
        <h1 className="form-title">Ajouter un nouveau livre</h1>
        <Link to="/DashboardAdmin">
          <button className="back-btn">← Retour au tableau de bord</button>
        </Link>
      </div>

      <StepIndicator currentStep={currentStep} />

      <div className="form-layout">
        {currentStep === 1 && (
          <InformationsGenerales
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(2)}
            auteurs={auteurs} // ✅ Passer la liste des auteurs en prop
          />
        )}
        {currentStep === 2 && (
          <EtapeContenu formData={formData} setFormData={setFormData} onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />
        )}
        {currentStep === 3 && (
          <EtapePublication formData={formData} setFormData={setFormData} onPrev={() => setCurrentStep(2)} onSubmit={handleSubmit} />
        )}

        <div className="form-right">
          <BookPreview formData={formData} />
          <TipsSection />
        </div>
      </div>
    </div>
  );
};

export default BookForm;

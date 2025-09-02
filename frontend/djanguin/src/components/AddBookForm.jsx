import React, { useState, useRef } from "react";



const GENRES = [
  "Roman", "Nouvelle", "Poésie", "Théâtre", "Essai", "Biographie",
  "Littérature jeunesse", "Conte traditionnel", "Autre"
];
const LANGUES = [
  "Français", "Anglais", "Arabe", "Swahili", "Hausa", "Yoruba",
  "Amharique", "Wolof", "Bambara", "Autre"
];

function AddBookForm() {
  const [step, setStep] = React.useState(1);
  const [progress, setProgress] = React.useState(33);
  const [book, setBook] = React.useState({
    titre: "",
    soustitre: "",
    auteur: "",
    coauteurs: "",
    genre: "",
    langue: "",
    description: "",
    motcles: [],
    coverFile: null,
    coverPreview: null,
    pages: "",
    annee: "",
    isbn: "",
    prix: "",
    disponibilite: "gratuit",
  });
  const [tagInput, setTagInput] = React.useState("");
  const [dragOver, setDragOver] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showPublish, setShowPublish] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [publishProgress, setPublishProgress] = React.useState(0);
  const [publishStatus, setPublishStatus] = React.useState("Vérification des informations...");
  const coverInputRef = React.useRef();

  // Handlers génériques
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // Tags
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (
        !book.motcles.includes(tagInput.trim()) &&
        book.motcles.length < 10
      ) {
        setBook((prev) => ({
          ...prev,
          motcles: [...prev.motcles, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };
  const removeTag = (tag) => {
    setBook((prev) => ({
      ...prev,
      motcles: prev.motcles.filter((t) => t !== tag),
    }));
  };

  // Couverture
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBook((prev) => ({ ...prev, coverFile: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setBook((prev) => ({ ...prev, coverPreview: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };
  const handleCoverDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setBook((prev) => ({ ...prev, coverFile: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setBook((prev) => ({ ...prev, coverPreview: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  // Étapes
  const validateStep1 = () =>
    book.titre && book.auteur && book.genre && book.langue && book.description;
  const validateStep2 = () => book.coverFile;
  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
    setProgress(step === 1 ? 66 : 100);
  };
  const handlePrev = () => {
    setStep(step - 1);
    setProgress(step === 2 ? 33 : 66);
  };

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  // Publication
  const handlePublish = () => {
    setPublishing(true);
    setShowPublish(true);
    setPublishProgress(0);
    setPublishStatus("Vérification des informations...");
    let progress = 0;
    const statuses = [
      "Vérification des informations...",
      "Traitement de la couverture...",
      "Indexation du contenu...",
      "Configuration des paramètres...",
      "Finalisation de la publication...",
    ];
    const interval = setInterval(() => {
      progress += 20;
      setPublishProgress(progress);
      setPublishStatus(statuses[Math.floor(progress / 20)] || statuses[statuses.length - 1]);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setPublishing(false), 1200);
      }
    }, 800);
  };

  // Aperçu prix
  const getPrix = () => {
    if (book.disponibilite === "gratuit") return "Gratuit";
    if (book.disponibilite === "abonnement") return "Abonnés uniquement";
    if (book.prix) return `${parseInt(book.prix).toLocaleString()} FCFA`;
    return "Prix";
  };

  // UI
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center space-x-4">
              <div
                className={`step-indicator w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${step === n ? "active bg-gradient-to-br from-indigo-500 to-purple-600 text-white" : ""}
                  ${step > n ? "completed bg-green-500 text-white" : ""}
                  ${step < n ? "bg-gray-200 text-gray-500" : ""}
                `}
              >
                {step > n ? "✓" : n}
              </div>
              <span className={step === n ? "text-gray-600" : "text-gray-400"}>
                {n === 1 ? "Informations générales" : n === 2 ? "Contenu" : "Publication"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="progress-bar h-2 rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              transition: "width 0.3s",
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Formulaire principal */}
        <div className="w-full lg:w-2/3 flex justify-start">
          <div className="card-gradient rounded-2xl p-8 shadow-lg w-full max-w-2xl">
            {step === 1 && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Ajouter un <span className="text-gradient">Nouveau Livre</span>
                  </h2>
                  <p className="text-gray-600">Partagez votre œuvre avec la communauté Dianguin</p>
                </div>
                {/* Titre et Sous-titre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Titre du livre *</label>
                    <input
                      type="text"
                      name="titre"
                      required
                      value={book.titre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Entrez le titre de votre livre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sous-titre</label>
                    <input
                      type="text"
                      name="soustitre"
                      value={book.soustitre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Sous-titre (optionnel)"
                    />
                  </div>
                </div>
                {/* Auteur et Co-auteurs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Auteur principal *</label>
                    <input
                      type="text"
                      name="auteur"
                      required
                      value={book.auteur}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Nom de l'auteur"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Co-auteurs</label>
                    <input
                      type="text"
                      name="coauteurs"
                      value={book.coauteurs}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Noms des co-auteurs (séparés par des virgules)"
                    />
                  </div>
                </div>
                {/* Genre et Langue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Genre *</label>
                    <select
                      name="genre"
                      required
                      value={book.genre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                    >
                      <option value="">Sélectionnez un genre</option>
                      {GENRES.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Langue *</label>
                    <select
                      name="langue"
                      required
                      value={book.langue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                    >
                      <option value="">Sélectionnez une langue</option>
                      {LANGUES.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={book.description}
                    onChange={handleChange}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus resize-none"
                    placeholder="Décrivez votre livre, son intrigue, ses thèmes principaux..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {book.description.length}/500 caractères
                  </div>
                </div>
                {/* Mots-clés */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mots-clés</label>
                  <div className="tag-input flex flex-wrap gap-2 px-3 py-2 border border-gray-300 rounded-lg min-h-[48px]">
                    {book.motcles.map((tag) => (
                      <span key={tag} className="tag bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 bg-white bg-opacity-30 rounded-full w-5 h-5 flex items-center justify-center">
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      className="flex-1 border-none outline-none bg-transparent"
                      placeholder="Ajoutez des mots-clés et appuyez sur Entrée"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Ajoutez des mots-clés pour aider les lecteurs à découvrir votre livre</p>
                </div>
                {/* Upload de couverture */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Couverture du livre *</label>
                  <div
                    className={`file-upload-area rounded-lg p-8 text-center cursor-pointer border-2 border-dashed ${dragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
                    onClick={() => coverInputRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleCoverDrop}
                  >
                    {book.coverPreview ? (
                      <img src={book.coverPreview} alt="Aperçu couverture" className="mx-auto h-40 w-32 object-cover rounded-lg shadow-md" />
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-gray-600 mb-2">Cliquez pour télécharger ou glissez-déposez</p>
                        <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={coverInputRef}
                      onChange={handleCoverChange}
                    />
                  </div>
                </div>
                {/* Infos supplémentaires */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de pages</label>
                    <input
                      type="number"
                      name="pages"
                      min="1"
                      value={book.pages}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Ex: 250"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Année de publication</label>
                    <input
                      type="number"
                      name="annee"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={book.annee}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Ex: 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN (optionnel)</label>
                    <input
                      type="text"
                      name="isbn"
                      value={book.isbn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Ex: 978-2-123456-78-9"
                    />
                  </div>
                </div>
                {/* Prix et disponibilité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (FCFA)</label>
                    <input
                      type="number"
                      name="prix"
                      min="0"
                      step="100"
                      value={book.prix}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Ex: 2500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilité</label>
                    <select
                      name="disponibilite"
                      value={book.disponibilite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus"
                    >
                      <option value="gratuit">Gratuit</option>
                      <option value="payant">Payant</option>
                      <option value="abonnement">Réservé aux abonnés</option>
                      <option value="preview">Aperçu gratuit</option>
                    </select>
                  </div>
                </div>
                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300"
                  >
                    Sauvegarder comme brouillon
                  </button>
                  <button
                    type="button"
                    className="flex-1 btn-primary text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleNext}
                  >
                    Continuer vers le contenu
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Contenu du <span className="text-gradient">Livre</span>
                  </h2>
                  <p className="text-gray-600">Ajoutez le contenu de votre livre et organisez vos chapitres</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300"
                    onClick={handlePrev}
                  >
                    ← Retour aux informations
                  </button>
                  <button
                    type="button"
                    className="flex-1 btn-primary text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handleNext}
                  >
                    Continuer vers la publication →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Publication du <span className="text-gradient">Livre</span>
                  </h2>
                  <p className="text-gray-600">Finalisez les paramètres de publication et partagez votre œuvre</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">📋 Récapitulatif</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Titre:</span>
                      <span className="font-medium ml-2">{book.titre || "-"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Auteur:</span>
                      <span className="font-medium ml-2">{book.auteur || "-"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Genre:</span>
                      <span className="font-medium ml-2">{book.genre || "-"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Prix:</span>
                      <span className="font-medium ml-2">{getPrix()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300"
                    onClick={handlePrev}
                  >
                    ← Retour au contenu
                  </button>
                  <button
                    type="button"
                    className="flex-1 btn-primary text-white font-semibold py-3 px-6 rounded-lg"
                    onClick={handlePublish}
                  >
                    🚀 Publier le livre
                  </button>
                </div>
              </div>
            )}

            {/* Modal succès */}
            {showSuccess && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center success-animation">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Informations sauvegardées !</h3>
                  <p className="text-gray-600 mb-6">Vous pouvez maintenant passer à l'étape suivante pour ajouter le contenu de votre livre.</p>
                  <button
                    className="btn-primary text-white font-semibold py-3 px-6 rounded-lg w-full"
                    onClick={() => { setShowSuccess(false); setStep(2); setProgress(66); }}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Modal publication */}
            {showPublish && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                  {publishing ? (
                    <>
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-purple-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Publication en cours...</h2>
                      <p className="text-gray-600 mb-6">Nous préparons votre livre pour la publication</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-purple-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${publishProgress}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-500">{publishStatus}</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 success-animation">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Félicitations !</h2>
                      <p className="text-xl text-gray-600 mb-6">Votre livre a été publié avec succès sur Dianguin !</p>
                      <button
                        className="btn-primary text-white font-semibold py-3 px-6 rounded-lg w-full"
                        onClick={() => { setShowPublish(false); setStep(1); setProgress(33); setBook({ ...book, titre: "", auteur: "", genre: "", langue: "", description: "", motcles: [], coverFile: null, coverPreview: null, pages: "", annee: "", isbn: "", prix: "", disponibilite: "gratuit" }); }}
                      >
                        ➕ Ajouter un autre livre
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Aperçu */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="preview-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aperçu du livre</h3>
              <div className="space-y-4">
                {/* Couverture preview */}
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  {book.coverPreview ? (
                    <img src={book.coverPreview} alt="Aperçu couverture" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  )}
                </div>
                {/* Infos preview */}
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{book.titre || "Titre du livre"}</h4>
                  <p className="text-gray-600">{book.auteur || "Nom de l'auteur"}</p>
                  <p className="text-sm text-gray-500 mt-2">{(book.genre || "Genre") + " • " + (book.langue || "Langue")}</p>
                  <p className="text-sm text-gray-700 mt-3 line-clamp-3">{book.description || "Description du livre..."}</p>
                  <div className="mt-3">
                    <span className="text-lg font-bold text-purple-600">{getPrix()}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Conseils */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">💡 Conseils pour votre livre</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Choisissez un titre accrocheur et mémorable</li>
                <li>• Rédigez une description captivante de 200-300 mots</li>
                <li>• Utilisez une couverture de haute qualité</li>
                <li>• Ajoutez des mots-clés pertinents pour la recherche</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookForm;

const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: false,
    trim: true,
  },
  categorie: {
    type: String,
    enum: ['Actualité littéraire', 'Interview', 'Evénement'], // Liste de catégories prédéfinies
    required: false,
  },
  description: { // L'équivalent de votre champ "contenu"
    type: String,
    required: false,
  },
  extrait: { // Pour l'affichage en page d'accueil
    type: String,
    required: false,
  },
  image: {
    type: String, // URL ou chemin de l'image
    required: false,
  },
  publiePar: { // L'utilisateur ou l'entité qui publie
    type: String,
    required: false,
  },
   dateEvenement: { // Nom du champ mis à jour
    type: Date, // ✅ Changé en type Date pour plus de fiabilité
    required: true,
  },
  heure: { // Heure de l'événement si applicable
    type: String,
  },
  lieu: { // Lieu de l'événement si applicable
    type: String,
  },
  tempsDeLecture: { // En minutes
    type: Number,
    required: true,
  },
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Actualite = mongoose.model('Actualite', actualiteSchema);

module.exports = Actualite;
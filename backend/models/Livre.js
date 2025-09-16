

const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    soustitre: {
        type: String,
        trim: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId, // Change type to ObjectId
        ref: 'User', // Reference the 'User' model
        required: true,
        trim: true
    },



    coauteurs: {
        type: [String] // Tableau de chaînes de caractères
    },
    annee: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    motscles: {
        type: [String] // Tableau de chaînes de caractères
    },
    pages: {
        type: Number
    },
    isbn: {
        type: String,
        trim: true
    },
    disponibilite: {
        type: String,
        default: 'gratuit',
        enum: ['gratuit', 'abonnement'],
        required: true
    },
    imageCouverture: {
        type: String,
        required: true
    },
    documentLivre: {
        type: String // Chemin vers le fichier PDF/EPUB
    },
    dateAjout: {
        type: Date,
        default: Date.now
    },

    // ✅ Paramètres de lecture
    allowDownload: { type: Boolean, default: false },
    allowCopy: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: false },

    // ✅ Statistiques
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [
        {
            user: String,
            comment: String,
            rating: Number,
            date: { type: Date, default: Date.now }
        }
    ],

    // ✅ Contenu multimédia supplémentaire
    videoIntro: { type: String },
    audioExcerpt: { type: String },

    // ✅ Informations supplémentaires
    publisher: { type: String },
    languageLevel: { type: String }, // ex: Débutant, Intermédiaire, Avancé
    categories: [{ type: String }],
    tags: [{ type: String }],
    
});

module.exports = mongoose.model('Livre', livreSchema);

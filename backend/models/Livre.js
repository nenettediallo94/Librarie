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
        type: String,
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
        type: String // Chemin vers le fichier PDF
    },
    dateAjout: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Livre', livreSchema);
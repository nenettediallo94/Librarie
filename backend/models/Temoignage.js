// models/Temoignage.js
const mongoose = require('mongoose');

const temoignageSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  profession: { type: String },
  commentaire: { type: String, required: true },
  image: { type: String }, // URL vers une photo si souhaité
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Temoignage', temoignageSchema);

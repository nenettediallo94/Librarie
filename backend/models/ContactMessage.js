const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "L'email est requis."],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Le message ne peut pas être vide.'],
  },
  dateEnvoi: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
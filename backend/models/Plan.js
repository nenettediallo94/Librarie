// models/Plan.js
const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    enum: ["Mensuel", "Hebdomadaire"], // pour limiter aux 2
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  duree: {
    type: Number, // en jours
    required: true,
  },
  actif: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Plan", PlanSchema);

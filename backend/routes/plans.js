// routes/plans.js
const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

// Récupérer tous les plans actifs
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find({ actif: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Ajouter un plan (ex: Mensuel ou Hebdomadaire)
router.post("/", async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ message: "Erreur ajout plan", error });
  }
});

module.exports = router;

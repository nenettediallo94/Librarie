// routes/search.js
const express = require("express");
const router = express.Router();
const Livre = require("../models/Livre");
const Auteur = require("../models/User");

// Route GET /api/search?q=terme
router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Aucun terme fourni" });

  try {
    // Chercher les auteurs qui correspondent
    const auteurs = await Auteur.find({
  role: "auteur",
  nom: { $regex: query, $options: "i" }
});


    // Chercher les livres qui correspondent
    const livres = await Livre.find({ titre: { $regex: query, $options: "i" } });

    // Chercher les genres (ici, on suppose qu’ils sont stockés dans les livres)
    const genres = await Livre.find({ genre: { $regex: query, $options: "i" } });

    res.json({ auteurs, livres, genres });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

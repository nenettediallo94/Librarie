// backend/routes/auteurs.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ GET /api/auteurs?page=1&limit=8
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // page actuelle
    const limit = parseInt(req.query.limit) || 8; // max d’auteurs par page
    const skip = (page - 1) * limit;

    // Récupère uniquement les auteurs approuvés
    const auteurs = await User.find({ role: 'auteur', estApprouve: true })
      .select('prenoms nom imageProfil biographie') // champs utiles seulement
      .skip(skip)
      .limit(limit);

    // Compter le total des auteurs approuvés
    const total = await User.countDocuments({ role: 'auteur', estApprouve: true });

    res.json({
      auteurs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Livre = require('../models/Livre'); // Assurez-vous que le chemin est correct
const User = require('../models/User');   // Assurez-vous que le chemin est correct

/**
 * @route   GET /api/stats
 * @desc    Récupérer les statistiques globales (nombre de livres et d'utilisateurs)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Compter le nombre total de documents dans chaque collection
    const totalLivres = await Livre.countDocuments();
    const totalUtilisateurs = await User.countDocuments();

    res.json({
      livres: totalLivres,
      utilisateurs: totalUtilisateurs,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Livre = require('../models/Livre');
const User = require('../models/User');

// @route   GET api/search
// @desc    Rechercher des livres, auteurs, et genres
// @access  Public
router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.q ? req.query.q.trim() : '';

        if (!searchTerm) {
            return res.status(400).json({ message: 'Le terme de recherche ne peut pas être vide.' });
        }

        const regex = new RegExp(searchTerm, 'i'); // 'i' pour insensible à la casse

        // Recherche parallèle
        const [livres, auteurs] = await Promise.all([
            // Recherche de livres par titre ou genre
            Livre.find({
                $or: [
                    { titre: regex },
                    { genre: regex }
                ]
            }).limit(10),

            // Recherche d'auteurs par nom ou prénoms
            User.find({
                role: 'auteur',
                $or: [{ nom: regex }, { prenoms: regex }]
            }).limit(10)
        ]);

        res.json({ livres, auteurs });

    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
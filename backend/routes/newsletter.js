const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const authAdmin = require('../middleware/auth')('administrateur'); // ✅ CORRECTION: Utiliser le rôle 'administrateur'

// @route   POST api/newsletter/subscribe
// @desc    Inscrire un nouvel email à la newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Veuillez fournir une adresse email.' });
    }

    try {
        let subscriber = await Newsletter.findOne({ email });

        if (subscriber) {
            return res.status(400).json({ message: 'Cet email est déjà inscrit à notre newsletter.' });
        }

        subscriber = new Newsletter({ email });
        await subscriber.save();

        res.status(201).json({ message: 'Merci ! Vous êtes maintenant inscrit à notre newsletter.' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue. Veuillez réessayer.', error: error.message });
    }
});

// @route   GET api/newsletter/subscribers
// @desc    Récupérer tous les inscrits à la newsletter
// @access  Private (Admin)
router.get('/subscribers', authAdmin, async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ dateInscription: -1 });
        res.json(subscribers);
    } catch (error) {
        console.error('Erreur lors de la récupération des inscrits:', error);
        res.status(500).send('Erreur serveur');
    }
});


module.exports = router;
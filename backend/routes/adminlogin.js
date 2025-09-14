const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ROUTE : Connexion administrateur
router.post('/', async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // 1. Vérifier si l'utilisateur existe
        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // 2. Vérifier que c'est bien un administrateur
        if (admin.role !== 'administrateur') {
            return res.status(403).json({ message: 'Accès refusé. Vous n’êtes pas administrateur.' });
        }

        // 3. Comparer le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // 4. Générer le token JWT
        const payload = {
            user: {
                id: admin._id,
                role: admin.role,
                email: admin.email
            }
        };

        const token = jwt.sign(payload, 'votre_secret_token_jwt', { expiresIn: '24h' });

        // 5. Envoyer le token et les infos de l’admin
        res.json({
            message: 'Connexion réussie.',
            token,
            admin: {
                id: admin._id,
                prenoms: admin.prenoms,
                nom: admin.nom,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'public', 'profil');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('imageProfil'), async (req, res) => {
    // Tous les champs, y compris 'role', sont extraits de req.body
    const { prenoms, nom, email, motDePasse, confirmationMotDePasse, role } = req.body;
    
    const imageProfilPath = req.file ? `/profil/${req.file.filename}` : null;

    try {
        if (motDePasse !== confirmationMotDePasse) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
        }
        
        // La validation vérifie que le champ 'role' est bien présent
        if (!prenoms || !nom || !email || !motDePasse || !role) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
        }

        let user = await User.findOne({ email });
        if (user) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
        }

        user = new User({
            prenoms,
            nom,
            email,
            motDePasse,
            role, 
            imageProfil: imageProfilPath
        });

        await user.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });

    } catch (err) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }

        const isMatch = await user.comparePassword(motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }
        
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            'votre_secret_token_jwt',
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, '..', 'public', 'profil');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// router.post('/register', upload.single('imageProfil'), async (req, res) => {
//     // Tous les champs, y compris 'role', sont extraits de req.body
//     const { prenoms, nom, email, motDePasse, confirmationMotDePasse, role } = req.body;
    
//     const imageProfilPath = req.file ? `/profil/${req.file.filename}` : null;

//     try {
//         if (motDePasse !== confirmationMotDePasse) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
//         }
        
//         // La validation vérifie que le champ 'role' est bien présent
//         if (!prenoms || !nom || !email || !motDePasse || !role) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
//         }

//         let user = await User.findOne({ email });
//         if (user) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
//         }

//         user = new User({
//             prenoms,
//             nom,
//             email,
//             motDePasse,
//             role, 
//             imageProfil: imageProfilPath
//         });

//         await user.save();

//         res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });

//     } catch (err) {
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, motDePasse } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Identifiants invalides.' });
//         }

//         const isMatch = await user.comparePassword(motDePasse);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Identifiants invalides.' });
//         }
        
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             'votre_secret_token_jwt',
//             { expiresIn: '24h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// module.exports = router; approbation par l'adm

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authMiddleware = require('../middleware/auth');

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = path.join(__dirname, '..', 'public', 'profil');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// // 1. ROUTE D'INSCRIPTION : Crée un utilisateur en attente d'approbation
// router.post('/register', upload.single('imageProfil'), async (req, res) => {
//     // Les champs 'role' et 'confirmationMotDePasse' ne sont plus nécessaires dans la requête
//     const { prenoms, nom, email, motDePasse } = req.body;
    
//     const imageProfilPath = req.file ? `/profil/${req.file.filename}` : null;

//     try {
//         if (!prenoms || !nom || !email || !motDePasse) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
//         }

//         let user = await User.findOne({ email });
//         if (user) {
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
//         }

//         // Création de l'utilisateur avec un statut 'en_attente' et 'estApprouve: false'
//         user = new User({
//             prenoms,
//             nom,
//             email,
//             motDePasse,
//             // Ces deux champs sont gérés par le modèle Mongoose
//             // role: 'en_attente' et estApprouve: false
//             imageProfil: imageProfilPath
//         });

//         await user.save();

//         res.status(201).json({ message: 'Inscription réussie. Votre compte est en attente d\'approbation.' });

//     } catch (err) {
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // 2. ROUTE DE CONNEXION : Vérifie l'approbation avant de générer un token
// router.post('/login', async (req, res) => {
//     const { email, motDePasse } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Identifiants invalides.' });
//         }

//         // Vérification de l'approbation de l'utilisateur
//         if (!user.estApprouve) {
//             return res.status(403).json({ message: 'Votre compte n\'est pas encore approuvé.' });
//         }

//         const isMatch = await user.comparePassword(motDePasse);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Identifiants invalides.' });
//         }
        
//         const payload = {
//             user: {
//                 id: user.id,
//                 role: user.role
//             }
//         };

//         jwt.sign(
//             payload,
//             'votre_secret_token_jwt',
//             { expiresIn: '24h' },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             }
//         );

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // Route temporaire pour tester le token
// router.get('/test-token', authMiddleware('administrateur'), (req, res) => {
//     res.json({ message: 'Le token est valide !', user: req.user });
// });

// // NOUVELLE ROUTE : Lire les informations d'un seul utilisateur
// router.get('/admin/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-motDePasse');

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         // Si l'ID n'est pas valide (format incorrect), renvoyer 404 au lieu de 500
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE D'ADMINISTRATION : Pour approuver un utilisateur
// // Ajoutez le middleware avant la fonction de la route
// router.put('/admin/approve-user/:id', authMiddleware('administrateur'), async (req, res) => {
//     // L'ID de l'administrateur qui fait la requête est dans req.user.id
//     const { id } = req.params;
//     const { role } = req.body;

//     try {
//         if (!role || !['abonné', 'auteur', 'administrateur'].includes(role)) {
//             return res.status(400).json({ message: 'Rôle invalide.' });
//         }

//         const user = await User.findByIdAndUpdate(
//             id,
//             { estApprouve: true, role },
//             { new: true, runValidators: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ message: 'Utilisateur approuvé avec succès.', user });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// module.exports = router;

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

// Route d'inscription
router.post('/register', upload.single('imageProfil'), async (req, res) => {
    const { prenoms, nom, email, motDePasse } = req.body;
    const imageProfilPath = req.file ? `/profil/${req.file.filename}` : null;
    try {
        if (!prenoms || !nom || !email || !motDePasse) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires.' });
        }
        let user = await User.findOne({ email });
        if (user) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
        }
        user = new User({
            prenoms,
            nom,
            email,
            motDePasse,
            imageProfil: imageProfilPath
        });
        await user.save();
        res.status(201).json({ message: 'Inscription réussie. Votre compte est en attente d\'approbation.' });
    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }
        if (!user.estApprouve) {
            return res.status(403).json({ message: 'Votre compte n\'est pas encore approuvé.' });
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

// ROUTE DE DÉCONNEXION
// Envoie une réponse de succès pour que le client supprime son token.
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie. Le client doit maintenant supprimer son token.' });
});

module.exports = router;
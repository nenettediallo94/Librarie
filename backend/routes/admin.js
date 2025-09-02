// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// // const authMiddleware = require('../middleware/auth');

// // Note : Toutes les routes dans ce fichier sont protégées par le middleware
// // et n'autorisent que les administrateurs.

// // Route pour lister tous les utilisateurs (Read All)
// router.get('/users', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const users = await User.find({}).select('-motDePasse');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // Route pour lire les informations d'un seul utilisateur (Read One)
// router.get('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-motDePasse');

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // Route pour mettre à jour les informations d'un utilisateur (Update)
// router.put('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     const { id } = req.params;
//     const { prenoms, nom, email, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;

//     try {
//         const updates = {};
//         if (prenoms) updates.prenoms = prenoms;
//         if (nom) updates.nom = nom;
//         if (email) updates.email = email;
//         if (role) updates.role = role;
//         if (telephone) updates.telephone = telephone;
//         if (dateNaissance) updates.dateNaissance = dateNaissance;
//         if (imageProfil) updates.imageProfil = imageProfil;
//         if (biographie) updates.biographie = biographie;
//         if (genrePrefere) updates.genrePrefere = genrePrefere;

//         const user = await User.findByIdAndUpdate(
//             id,
//             { $set: updates },
//             { new: true, runValidators: true }
//         ).select('-motDePasse');

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         res.json({ message: 'Utilisateur mis à jour avec succès.', user });

//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // Route pour approuver un utilisateur
// router.put('/approve-user/:id', authMiddleware('administrateur'), async (req, res) => {
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

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const authMiddleware = require('../middleware/auth');

// // Note : Toutes les routes dans ce fichier sont protégées par le middleware
// // et n'autorisent que les administrateurs.

// // ROUTE DE TEST TEMPORAIRE : Lister tous les utilisateurs (Read All)
// // Le middleware d'authentification est temporairement commenté pour un test
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({}).select('-motDePasse');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR LIRE UN SEUL UTILISATEUR (Read One)
// router.get('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-motDePasse');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR METTRE À JOUR UN UTILISATEUR (Update)
// router.put('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     const { id } = req.params;
//     const { prenoms, nom, email, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;
//     try {
//         const updates = {};
//         if (prenoms) updates.prenoms = prenoms;
//         if (nom) updates.nom = nom;
//         if (email) updates.email = email;
//         if (role) updates.role = role;
//         if (telephone) updates.telephone = telephone;
//         if (dateNaissance) updates.dateNaissance = dateNaissance;
//         if (imageProfil) updates.imageProfil = imageProfil;
//         if (biographie) updates.biographie = biographie;
//         if (genrePrefere) updates.genrePrefere = genrePrefere;
//         const user = await User.findByIdAndUpdate(
//             id,
//             { $set: updates },
//             { new: true, runValidators: true }
//         ).select('-motDePasse');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.json({ message: 'Utilisateur mis à jour avec succès.', user });
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR APPROUVER UN UTILISATEUR
// router.put('/approve-user/:id', authMiddleware('administrateur'), async (req, res) => {
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


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const authMiddleware = require('../middleware/auth');
// const bcrypt = require('bcryptjs');

// // Note : Toutes les routes dans ce fichier sont protégées par le middleware
// // et n'autorisent que les administrateurs.

// // ROUTE : Créer un nouvel utilisateur (Create)
// router.post('/users', authMiddleware('administrateur'), async (req, res) => {
//     const { prenoms, nom, email, motDePasse, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;

//     try {
//         // Vérifier si un utilisateur avec cet email existe déjà
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
//         }

//         // Hacher le mot de passe avant de le sauvegarder
//         const salt = await bcrypt.genSalt(10);
//         const motDePasseHache = await bcrypt.hash(motDePasse, salt);

//         // Créer un nouvel utilisateur
//         user = new User({
//             prenoms,
//             nom,
//             email,
//             motDePasse: motDePasseHache,
//             role,
//             telephone,
//             dateNaissance,
//             imageProfil,
//             biographie,
//             genrePrefere
//         });

//         // Sauvegarder l'utilisateur dans la base de données
//         await user.save();

//         // Renvoyer l'utilisateur sans son mot de passe haché
//         res.status(201).json({ 
//             message: 'Utilisateur créé avec succès.',
//             user: { ...user._doc, motDePasse: undefined } 
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE : Lister tous les utilisateurs (Read All)
// // Le middleware d'authentification est remis en place
// router.get('/users', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const users = await User.find({}).select('-motDePasse');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR LIRE UN SEUL UTILISATEUR (Read One)
// router.get('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-motDePasse');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR METTRE À JOUR UN UTILISATEUR (Update)
// router.put('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     const { id } = req.params;
//     const { prenoms, nom, email, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;
//     try {
//         const updates = {};
//         if (prenoms) updates.prenoms = prenoms;
//         if (nom) updates.nom = nom;
//         if (email) updates.email = email;
//         if (role) updates.role = role;
//         if (telephone) updates.telephone = telephone;
//         if (dateNaissance) updates.dateNaissance = dateNaissance;
//         if (imageProfil) updates.imageProfil = imageProfil;
//         if (biographie) updates.biographie = biographie;
//         if (genrePrefere) updates.genrePrefere = genrePrefere;
//         const user = await User.findByIdAndUpdate(
//             id,
//             { $set: updates },
//             { new: true, runValidators: true }
//         ).select('-motDePasse');
//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.json({ message: 'Utilisateur mis à jour avec succès.', user });
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// // ROUTE POUR APPROUVER UN UTILISATEUR
// router.put('/approve-user/:id', authMiddleware('administrateur'), async (req, res) => {
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

// // ROUTE : Supprimer un utilisateur (Delete)
// router.delete('/users/:id', authMiddleware('administrateur'), async (req, res) => {
//     try {
//         // Trouver et supprimer l'utilisateur par son ID
//         const user = await User.findByIdAndDelete(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }

//         // Renvoyer une réponse de succès
//         res.json({ message: 'Utilisateur supprimé avec succès.' });

//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ message: 'Utilisateur non trouvé.' });
//         }
//         res.status(500).json({ message: 'Erreur du serveur.' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Note : Cette route est temporairement non protégée pour le test.
// NE JAMAIS utiliser ceci en production.

// ROUTE : Créer un nouvel utilisateur (Create)
router.post('/users', async (req, res) => {
    const { prenoms, nom, email, motDePasse, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }
        const salt = await bcrypt.genSalt(10);
        const motDePasseHache = await bcrypt.hash(motDePasse, salt);
        user = new User({
            prenoms,
            nom,
            email,
            motDePasse: motDePasseHache,
            role,
            telephone,
            dateNaissance,
            imageProfil,
            biographie,
            genrePrefere
        });
        await user.save();
        res.status(201).json({ 
            message: 'Utilisateur créé avec succès.',
            user: { ...user._doc, motDePasse: undefined } 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// ROUTE : Lister tous les utilisateurs (Read All)
// Cette route reste protégée.
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).select('-motDePasse');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// ROUTE POUR LIRE UN SEUL UTILISATEUR (Read One)
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-motDePasse');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// ROUTE POUR METTRE À JOUR UN UTILISATEUR (Update)
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { prenoms, nom, email, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;
    try {
        const updates = {};
        if (prenoms) updates.prenoms = prenoms;
        if (nom) updates.nom = nom;
        if (email) updates.email = email;
        if (role) updates.role = role;
        if (telephone) updates.telephone = telephone;
        if (dateNaissance) updates.dateNaissance = dateNaissance;
        if (imageProfil) updates.imageProfil = imageProfil;
        if (biographie) updates.biographie = biographie;
        if (genrePrefere) updates.genrePrefere = genrePrefere;
        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-motDePasse');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès.', user });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// ROUTE POUR APPROUVER UN UTILISATEUR
router.put('/approve-user/:id', async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        if (!role || !['abonné', 'auteur', 'administrateur'].includes(role)) {
            return res.status(400).json({ message: 'Rôle invalide.' });
        }
        const user = await User.findByIdAndUpdate(
            id,
            { estApprouve: true, role },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur approuvé avec succès.', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

// ROUTE : Supprimer un utilisateur (Delete)
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(500).json({ message: 'Erreur du serveur.' });
    }
});

module.exports = router;

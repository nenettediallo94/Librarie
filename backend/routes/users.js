// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');

// // Exemple : création d'un utilisateur
// router.post('/', async (req, res) => {
//     try {
//         const { prenoms, nom, email, motDePasse, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere } = req.body;

//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: 'Email déjà utilisé' });

//         user = new User({ prenoms, nom, email, motDePasse, role, telephone, dateNaissance, imageProfil, biographie, genrePrefere });
//         await user.save();

//         res.status(201).json({ message: 'Utilisateur créé avec succès', user: { ...user._doc, motDePasse: undefined } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erreur du serveur' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

// Configuration multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profil'); // dossier où seront stockées les images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route POST pour créer un utilisateur avec upload d'image
router.post('/', upload.single('imageProfil'), async (req, res) => {
  try {
    const { prenoms, nom, email, motDePasse, role, telephone, dateNaissance, biographie, genrePrefere } = req.body;

    // Vérifier si l'email existe déjà
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash(motDePasse, salt);

    // URL de l'image si upload
    const imageProfilUrl = req.file ? `public/profil/${req.file.filename}` : '';

    // Création de l'utilisateur
    user = new User({
      prenoms,
      nom,
      email,
      motDePasse: motDePasseHache,
      role,
      telephone,
      dateNaissance,
      biographie,
      genrePrefere,
      imageProfil: imageProfilUrl,
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: { ...user._doc, motDePasse: undefined } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Route GET pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Construction du filtre
    const filtre = {};
    if (req.query.role) {
      filtre.role = req.query.role;
    }
    if (req.query.statut) {
      filtre.estApprouve = req.query.statut === 'approuve';
    }

    const users = await User.find(filtre)
      .select('-motDePasse')
      .sort({ dateCreation: -1 }) // Trier par date de création décroissante
      .skip(skip)
      .limit(limit);
      
    const total = await User.countDocuments(filtre);
    res.status(200).json({ utilisateurs: users, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route GET pour les statistiques des utilisateurs
router.get('/stats', async (req, res) => {
  try {
    const total = await User.countDocuments();
    const parRole = await User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]);
    const parStatut = await User.aggregate([{ $group: { _id: '$estApprouve', count: { $sum: 1 } } }]);

    res.status(200).json({ total, parRole, parStatut });
  } catch (err) {
    console.error("Erreur stats utilisateurs:", err);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
});

// Route GET pour récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasse');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur' });
  }
});

// Route PUT pour mettre à jour un utilisateur (y compris l'approbation)
router.patch('/:id', upload.single('imageProfil'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.imageProfil = `public/profil/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true }).select('-motDePasse');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// Route PATCH pour approuver un utilisateur
router.patch('/approve/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.estApprouve = true;
    // Optionnel : vous pouvez aussi assigner un rôle par défaut ici si nécessaire
    // user.role = 'abonné'; 
    await user.save();

    res.status(200).json({ message: 'Utilisateur approuvé avec succès', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'approbation de l\'utilisateur' });
  }
});

// Route DELETE pour supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    await user.deleteOne(); // Utiliser deleteOne() ou remove()
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

module.exports = router;

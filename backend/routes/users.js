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
    const users = await User.find().select('-motDePasse'); // on exclut le mot de passe
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
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


module.exports = router;


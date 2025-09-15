// const express = require('express');
// const router = express.Router();
// const Actualite = require('../models/Actualite');

// // @route   GET /api/actualites
// // @desc    Récupérer toutes les actualités
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     // On trie les actualités par date d'événement la plus récente
//     // Le -1 signifie un ordre décroissant
//     const actualites = await Actualite.find().sort({ dateEvenement: -1 });
//     res.json(actualites);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // @route   POST /api/actualites
// // @desc    Créer une nouvelle actualité
// // @access  Privé (généralement)
// router.post('/', async (req, res) => {
//   const {
//     titre,
//     categorie,
//     description,
//     extrait,
//     image,
//     publiePar,
//     dateEvenement,
//     heure,
//     lieu,
//     tempsDeLecture,
//   } = req.body;

//   // Création d'une nouvelle instance du modèle Actualite
//   const nouvelleActualite = new Actualite({
//     titre,
//     categorie,
//     description,
//     extrait,
//     image,
//     publiePar,
//     dateEvenement,
//     heure,
//     lieu,
//     tempsDeLecture,
//   });

//   try {
//     // Sauvegarde dans la base de données
//     const actualiteSauvegardee = await nouvelleActualite.save();
//     res.status(201).json(actualiteSauvegardee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Actualite = require('../models/Actualite');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs'); // Pour vérifier et créer les dossiers

// // S'assurer que le dossier de destination existe
// const uploadDir = 'public/actualites';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configuration du stockage de Multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); // Le dossier de destination
//     },
//     filename: (req, file, cb) => {
//         // Crée un nom de fichier unique et sécurisé
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     },
// });

// // Création de l'instance d'upload
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // Limite de 5 MB
//     },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb(new Error('Le fichier doit être une image (jpeg, jpg, png, gif)'));
//     },
// });

// // --- Route GET : Récupérer toutes les actualités ---
// // @route   GET /api/actualites
// // @desc    Récupère toutes les actualités, triées par date d'événement
// // @access  Public
// router.get('/', async (req, res) => {
//     try {
//         const actualites = await Actualite.find().sort({ dateEvenement: -1 });
//         res.json(actualites);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // --- Route POST : Créer une nouvelle actualité ---
// // @route   POST /api/actualites
// // @desc    Crée une nouvelle actualité et stocke l'image associée
// // @access  Privé (nécessite une authentification en production)
// router.post('/', upload.single('image'), async (req, res) => {
//     // Vérifie si un fichier a été uploadé
//     if (!req.file) {
//         return res.status(400).json({ message: 'Aucune image fournie.' });
//     }

//     const {
//         titre,
//         categorie,
//         description,
//         extrait,
//         publiePar,
//         dateEvenement,
//         heure,
//         lieu,
//         tempsDeLecture,
//     } = req.body;

//     // Construit le chemin de l'image pour le stockage dans la DB
//     const imagePath = req.file.path.replace(/\\/g, "/");

//     const nouvelleActualite = new Actualite({
//         titre,
//         categorie,
//         description,
//         extrait,
//         image: imagePath,
//         publiePar,
//         dateEvenement,
//         heure,
//         lieu,
//         tempsDeLecture,
//     });

//     try {
//         const actualiteSauvegardee = await nouvelleActualite.save();
//         res.status(201).json(actualiteSauvegardee);
//     } catch (err) {
//         // En cas d'erreur de validation Mongoose, supprime l'image
//         fs.unlink(req.file.path, (unlinkErr) => {
//             if (unlinkErr) console.error('Erreur lors de la suppression du fichier:', unlinkErr);
//         });
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Actualite = require('../models/Actualite');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose'); // 👈 Importez mongoose pour la gestion des IDs

// S'assurer que le dossier de destination existe
const uploadDir = 'public/actualites';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Le dossier de destination
    },
    filename: (req, file, cb) => {
        // Crée un nom de fichier unique et sécurisé
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Création de l'instance d'upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite de 5 MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Le fichier doit être une image (jpeg, jpg, png, gif)'));
    },
});

// --- Route GET : Récupérer toutes les actualités ---
// @route   GET /api/actualites
// @desc    Récupère toutes les actualités, triées par date d'événement
// @access  Public
router.get('/', async (req, res) => {
    try {
        const actualites = await Actualite.find().sort({ dateEvenement: -1 });
        res.json(actualites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/// ### Nouvelle route pour récupérer une actualité par son ID

// --- Route GET : Récupérer une actualité par son ID ---
// @route   GET /api/actualites/:id
// @desc    Récupère une actualité spécifique par son ID
// @access  Public
router.get('/:id', async (req, res) => {
  // Vérifie si l'ID est valide pour éviter les erreurs de Mongoose
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Actualité introuvable.' });
  }

  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité introuvable.' });
    }
    res.json(actualite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// --- Route POST : Créer une nouvelle actualité ---
// @route   POST /api/actualites
// @desc    Crée une nouvelle actualité et stocke l'image associée
// @access  Privé (nécessite une authentification en production)
router.post('/', upload.single('image'), async (req, res) => {
    // Vérifie si un fichier a été uploadé
    if (!req.file) {
        return res.status(400).json({ message: 'Aucune image fournie.' });
    }

    const {
        titre,
        categorie,
        description,
        extrait,
        publiePar,
        dateEvenement,
        heure,
        lieu,
        tempsDeLecture,
    } = req.body;

    // Construit le chemin de l'image pour le stockage dans la DB
    const imagePath = req.file.path.replace(/\\/g, "/");

    const nouvelleActualite = new Actualite({
        titre,
        categorie,
        description,
        extrait,
        image: imagePath,
        publiePar,
        dateEvenement,
        heure,
        lieu,
        tempsDeLecture,
    });

    try {
        const actualiteSauvegardee = await nouvelleActualite.save();
        res.status(201).json(actualiteSauvegardee);
    } catch (err) {
        // En cas d'erreur de validation Mongoose, supprime l'image
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error('Erreur lors de la suppression du fichier:', unlinkErr);
        });
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
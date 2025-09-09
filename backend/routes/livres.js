// const express = require('express');
// const router = express.Router();
// const Livre = require('../models/Livre');
// const multer = require('multer');
// const fs = require('fs');

// // Configuration de multer pour le stockage des fichiers
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Redirige les fichiers vers des dossiers différents en fonction de leur type
//         if (file.fieldname === 'imageCouverture') {
//             cb(null, 'public/images/covers/'); 
//         } else if (file.fieldname === 'documentLivre') {
//             cb(null, 'public/books/');
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // GET /api/livres : Récupérer tous les livres
// router.get('/', async (req, res) => {
//     try {
//         const livres = await Livre.find();
//         res.json(livres);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // POST /api/livres : Ajouter un nouveau livre
// // Utilisation de `upload.fields()` pour gérer plusieurs fichiers
// router.post('/', upload.fields([{ name: 'imageCouverture', maxCount: 1 }, { name: 'documentLivre', maxCount: 1 }]), async (req, res) => {
//     const {
//         titre, soustitre, auteur, coauteurs, annee, genre, langue, description, motscles, pages, isbn, disponibilite
//     } = req.body;

//     let imageCouverturePath = null;
//     if (req.files && req.files['imageCouverture']) {
//         imageCouverturePath = req.files['imageCouverture'][0].path.replace(/\\/g, '/');
//     }

//     let documentLivrePath = null;
//     if (req.files && req.files['documentLivre']) {
//         documentLivrePath = req.files['documentLivre'][0].path.replace(/\\/g, '/');
//     }

//     const nouveauLivre = new Livre({
//         titre,
//         soustitre,
//         auteur,
//         coauteurs: coauteurs ? coauteurs.split(',').map(s => s.trim()) : [],
//         annee,
//         genre,
//         langue,
//         description,
//         motscles: motscles ? JSON.parse(motscles) : [],
//         pages,
//         isbn,
//         disponibilite,
//         imageCouverture: imageCouverturePath,
//         documentLivre: documentLivrePath
//     });

//     try {
//         const livreSauve = await nouveauLivre.save();
//         res.status(201).json(livreSauve);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // GET /api/livres/:id : Récupérer un livre par son ID
// router.get('/:id', getLivre, (req, res) => {
//     res.json(res.livre);
// });

// // PATCH /api/livres/:id : Mettre à jour un livre par son ID
// router.patch('/:id', getLivre, upload.fields([{ name: 'imageCouverture', maxCount: 1 }, { name: 'documentLivre', maxCount: 1 }]), async (req, res) => {
//     const {
//         titre, soustitre, auteur, coauteurs, annee, genre, langue, description, motscles, pages, isbn, disponibilite
//     } = req.body;

//     // Mise à jour de tous les champs
//     if (titre != null) res.livre.titre = titre;
//     if (soustitre != null) res.livre.soustitre = soustitre;
//     if (auteur != null) res.livre.auteur = auteur;
//     if (coauteurs != null) res.livre.coauteurs = coauteurs.split(',').map(s => s.trim());
//     if (annee != null) res.livre.annee = annee;
//     if (genre != null) res.livre.genre = genre;
//     if (langue != null) res.livre.langue = langue;
//     if (description != null) res.livre.description = description;
//     if (motscles != null) res.livre.motscles = JSON.parse(motscles);
//     if (pages != null) res.livre.pages = pages;
//     if (isbn != null) res.livre.isbn = isbn;
//     if (disponibilite != null) res.livre.disponibilite = disponibilite;
    
//     // NOUVEAU: Gérer l'upload de l'image de couverture
//     if (req.files && req.files['imageCouverture']) {
//         // Supprimer l'ancienne image si elle existe
//         if (res.livre.imageCouverture) {
//             fs.unlink(res.livre.imageCouverture, (err) => {
//                 if (err) console.error('Erreur lors de la suppression de l\'ancienne image:', err);
//             });
//         }
//         res.livre.imageCouverture = req.files['imageCouverture'][0].path.replace(/\\/g, '/');
//     }

//     // NOUVEAU: Gérer l'upload du document du livre
//     if (req.files && req.files['documentLivre']) {
//         // Supprimer l'ancien document si il existe
//         if (res.livre.documentLivre) {
//             fs.unlink(res.livre.documentLivre, (err) => {
//                 if (err) console.error('Erreur lors de la suppression de l\'ancien document:', err);
//             });
//         }
//         res.livre.documentLivre = req.files['documentLivre'][0].path.replace(/\\/g, '/');
//     }

//     try {
//         const livreMisAJour = await res.livre.save();
//         res.json(livreMisAJour);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // DELETE /api/livres/:id : Supprimer un livre par son ID
// router.delete('/:id', getLivre, async (req, res) => {
//     try {
//         await res.livre.deleteOne();
//         res.json({ message: 'Livre supprimé' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Middleware pour récupérer un livre par son ID et gérer les erreurs
// async function getLivre(req, res, next) {
//     let livre;
//     try {
//         livre = await Livre.findById(req.params.id);
//         if (livre == null) {
//             return res.status(404).json({ message: 'Livre non trouvé' });
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
//     res.livre = livre;
//     next();
// }

// module.exports = router;


const express = require('express');
const router = express.Router();
const Livre = require('../models/Livre');
const multer = require('multer');
const fs = require('fs');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'imageCouverture') cb(null, 'public/images/covers/');
    else if (file.fieldname === 'documentLivre') cb(null, 'public/books/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// GET /api/livres : Récupérer tous les livres
router.get('/', async (req, res) => {
  try {
    const livres = await Livre.find();
    res.json(livres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/livres : Ajouter un nouveau livre
router.post(
  '/',
  upload.fields([{ name: 'imageCouverture', maxCount: 1 }, { name: 'documentLivre', maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        titre,
        soustitre,
        auteur,
        coauteurs,
        annee,
        genre,
        langue,
        description,
        motscles,
        pages,
        isbn,
        disponibilite,
        allowDownload,
        allowCopy,
        allowComments,
        publisher,
        languageLevel,
        categories,
        tags,
        price
      } = req.body;

      const imageCouverturePath = req.files['imageCouverture']
        ? req.files['imageCouverture'][0].path.replace(/\\/g, '/')
        : null;

      const documentLivrePath = req.files['documentLivre']
        ? req.files['documentLivre'][0].path.replace(/\\/g, '/')
        : null;

      const nouveauLivre = new Livre({
        titre,
        soustitre,
        auteur,
        coauteurs: coauteurs ? coauteurs.split(',').map(s => s.trim()) : [],
        annee,
        genre,
        langue,
        description,
        motscles: motscles ? JSON.parse(motscles) : [],
        pages,
        isbn,
        disponibilite,
        imageCouverture: imageCouverturePath,
        documentLivre: documentLivrePath,
        allowDownload: allowDownload === 'true',
        allowCopy: allowCopy === 'true',
        allowComments: allowComments === 'true',
        publisher,
        languageLevel,
        categories: categories ? JSON.parse(categories) : [],
        tags: tags ? JSON.parse(tags) : [],
        price: price ? Number(price) : 0
      });

      const livreSauve = await nouveauLivre.save();
      res.status(201).json(livreSauve);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// GET /api/livres/:id : Récupérer un livre par son ID
router.get('/:id', getLivre, (req, res) => {
  res.json(res.livre);
});

// PATCH /api/livres/:id : Mettre à jour un livre
router.patch(
  '/:id',
  getLivre,
  upload.fields([{ name: 'imageCouverture', maxCount: 1 }, { name: 'documentLivre', maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        titre,
        soustitre,
        auteur,
        coauteurs,
        annee,
        genre,
        langue,
        description,
        motscles,
        pages,
        isbn,
        disponibilite,
        allowDownload,
        allowCopy,
        allowComments,
        publisher,
        languageLevel,
        categories,
        tags,
        price
      } = req.body;

      // Mise à jour des champs si fournis
      if (titre != null) res.livre.titre = titre;
      if (soustitre != null) res.livre.soustitre = soustitre;
      if (auteur != null) res.livre.auteur = auteur;
      if (coauteurs != null) res.livre.coauteurs = coauteurs.split(',').map(s => s.trim());
      if (annee != null) res.livre.annee = annee;
      if (genre != null) res.livre.genre = genre;
      if (langue != null) res.livre.langue = langue;
      if (description != null) res.livre.description = description;
      if (motscles != null) res.livre.motscles = JSON.parse(motscles);
      if (pages != null) res.livre.pages = pages;
      if (isbn != null) res.livre.isbn = isbn;
      if (disponibilite != null) res.livre.disponibilite = disponibilite;

      if (allowDownload != null) res.livre.allowDownload = allowDownload === 'true';
      if (allowCopy != null) res.livre.allowCopy = allowCopy === 'true';
      if (allowComments != null) res.livre.allowComments = allowComments === 'true';

      if (publisher != null) res.livre.publisher = publisher;
      if (languageLevel != null) res.livre.languageLevel = languageLevel;
      if (categories != null) res.livre.categories = JSON.parse(categories);
      if (tags != null) res.livre.tags = JSON.parse(tags);
      if (price != null) res.livre.price = Number(price);

      // Gestion des fichiers
      if (req.files['imageCouverture']) {
        if (res.livre.imageCouverture) fs.unlink(res.livre.imageCouverture, () => {});
        res.livre.imageCouverture = req.files['imageCouverture'][0].path.replace(/\\/g, '/');
      }
      if (req.files['documentLivre']) {
        if (res.livre.documentLivre) fs.unlink(res.livre.documentLivre, () => {});
        res.livre.documentLivre = req.files['documentLivre'][0].path.replace(/\\/g, '/');
      }

      const livreMisAJour = await res.livre.save();
      res.json(livreMisAJour);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// DELETE /api/livres/:id : Supprimer un livre
router.delete('/:id', getLivre, async (req, res) => {
  try {
    await res.livre.deleteOne();
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware pour récupérer un livre par son ID
async function getLivre(req, res, next) {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.livre = livre;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;

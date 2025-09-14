
// // backend/routes/auteurs.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // ✅ GET /api/auteurs
// router.get('/', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 8;
//     const skip = (page - 1) * limit;

//     // Récupère uniquement les auteurs approuvés
//     const auteurs = await User.find({ role: 'auteur', estApprouve: true })
//       .select('prenoms nom email imageProfil biographie genrePrefere estApprouve dateCreation')
//       .skip(skip)
//       .limit(limit);

//     // Compter le total des auteurs approuvés
//     const total = await User.countDocuments({ role: 'auteur', estApprouve: true });

//     // ✅ Mise à jour de la réponse sans le champ "revenus"
//     const auteursFormates = auteurs.map(auteur => ({
//       ...auteur._doc,
//       statut: auteur.estApprouve ? 'Actif' : 'En attente',
//     }));

//     res.json({
//       auteurs: auteursFormates,
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// });

// module.exports = router;


// backend/routes/auteurs.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Livre = require('../models/Livre');

// GET /api/auteurs - Récupère la liste des auteurs avec le nombre de livres
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // Pipeline d'agrégation
    const pipeline = [
      { $match: { role: 'auteur', estApprouve: true } }, // auteurs approuvés
      {
        $lookup: {
          from: 'livres',      // collection livres
          localField: '_id',   // champ _id dans User
          foreignField: 'auteur', // champ auteur dans Livre
          as: 'livres_auteur'  // tableau temporaire
        }
      },
      {
        $addFields: {
          nombreDeLivres: { $size: '$livres_auteur' },
          statut: { $cond: { if: '$estApprouve', then: 'Actif', else: 'En attente' } },
          revenus: 0 // temporaire
        }
      },
      {
        $project: {
          prenoms: 1,
          nom: 1,
          email: 1,
          imageProfil: 1,
          genrePrefere: 1,
          dateCreation: 1,
          nombreDeLivres: 1,
          statut: 1,
          revenus: 1
        }
      },
      { $skip: skip },
      { $limit: limit }
    ];

    const auteurs = await User.aggregate(pipeline);
    const total = await User.countDocuments({ role: 'auteur', estApprouve: true });

    res.json({
      auteurs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

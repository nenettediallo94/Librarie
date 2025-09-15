const express = require('express');
const router = express.Router();
const Temoignage = require('../models/Temoignage');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker les images dans public/temoins
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temoins');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ✅ Récupérer tous les témoignages
router.get('/', async (req, res) => {
  try {
    const temoignages = await Temoignage.find().sort({ date: -1 });
    res.json(temoignages);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des témoignages", error: err.message });
  }
});

// ✅ Créer un nouveau témoignage avec image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { nom, profession, commentaire } = req.body;
    let image = null;
    if (req.file) image = req.file.filename;

    const temoignage = new Temoignage({ nom, profession, commentaire, image });
    await temoignage.save();
    res.status(201).json(temoignage);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du témoignage", error: err.message });
  }
});

// ✅ Supprimer un témoignage par ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Temoignage.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Témoignage non trouvé" });
    res.json({ message: "Témoignage supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du témoignage", error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/auth'); // Assurez-vous que le chemin est correct

/**
 * @route   POST /api/contact/send
 * @desc    Envoyer un message de contact
 * @access  Public
 */
router.post('/send', async (req, res) => {
  const { nom, email, message } = req.body;

  try {
    const nouveauMessage = new ContactMessage({ nom, email, message });
    await nouveauMessage.save();

    // --- Envoi de l'e-mail à l'administrateur ---
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Djanguin Contact" <${process.env.EMAIL_USER}>`, // Expéditeur
      to: process.env.ADMIN_EMAIL, // Destinataire (l'admin)
      subject: `Nouveau message de contact de ${nom}`,
      html: `
        <h2>Nouveau message reçu depuis le site Djanguin</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p style="padding: 10px; border-left: 3px solid #ccc;">${message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Erreur lors de l'envoi de l'email:", error);
      else console.log("Email de notification envoyé:", info.response);
    });

    res.status(201).json({ message: 'Votre message a bien été envoyé. Nous vous répondrons bientôt !' });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    // Renvoyer les erreurs de validation du modèle
    res.status(400).json({ message: 'Erreur lors de l\'envoi du message.', details: error.message });
  }
});

/**
 * @route   GET /api/contact/messages
 * @desc    Récupérer tous les messages de contact
 * @access  Private (Admin)
 */
router.get('/messages', authMiddleware('administrateur'), async (req, res) => {
  try {
    // Récupérer les messages, les plus récents en premier
    const messages = await ContactMessage.find().sort({ dateEnvoi: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
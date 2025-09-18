const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const ContactMessage = require('../models/ContactMessage');
const User = require('../models/User');
const Newsletter = require('../models/Newsletter');

/**
 * @route   GET /api/notifications
 * @desc    Récupérer toutes les notifications non lues pour l'admin
 * @access  Private (Admin)
 */
router.get('/', authMiddleware('administrateur'), async (req, res) => {
    try {
        // 1. Récupérer les messages de contact non lus
        // Pour l'instant, on récupère tous les messages. Idéalement, on filtrerait sur un champ `read: false`
        const contactMessages = await ContactMessage.find().sort({ dateEnvoi: -1 });
        const contactNotifications = contactMessages.map(msg => ({
            id: `contact-${msg._id}`,
            message: `Nouveau message de contact reçu de ${msg.nom}.`,
            read: false,
            date: msg.dateEnvoi,
            type: 'message'
        }));

        // 2. Récupérer les utilisateurs en attente d'approbation
        const pendingUsers = await User.find({ estApprouve: false }).sort({ dateCreation: -1 });
        const userNotifications = pendingUsers.map(user => ({
            id: `user-${user._id}`,
            message: `Nouvel utilisateur en attente d'approbation : ${user.prenoms} ${user.nom}.`,
            read: false,
            date: user.dateCreation,
            type: 'user'
        }));

        // 3. Récupérer les nouveaux inscrits à la newsletter
        const newsletterSubscribers = await Newsletter.find().sort({ dateInscription: -1 });
        const newsletterNotifications = newsletterSubscribers.map(sub => ({
            id: `newsletter-${sub._id}`,
            message: `Nouvel abonné à la newsletter : ${sub.email}.`,
            read: false,
            date: sub.dateInscription,
            type: 'newsletter'
        }));

        // 3. Combiner et trier toutes les notifications
        const allNotifications = [...contactNotifications, ...userNotifications, ...newsletterNotifications];
        allNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(allNotifications);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Gardé pour les requêtes HTTP classiques
const http = require('http'); // Importé pour créer le serveur
const { Server } = require('socket.io'); // Importé pour les WebSockets
const livresRoutes = require('./routes/livres');
const authRouter = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const auteursRoutes = require('./routes/auteurs');
const usersRoutes = require('./routes/users');
const plansRoutes = require('./routes/plans');
const searchRoutes = require('./routes/search');
const adminloginRoutes = require('./routes/adminlogin');
const actualitesRoutes = require('./routes/actualites');
const temoignagesRoutes = require('./routes/temoignages');
const newsletterRoutes = require('./routes/newsletter');
const statsRoutes = require('./routes/statsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const notificationRoutes = require('./routes/notifications'); // ✅ Ajouter la route des notifications



dotenv.config();
const app = express();
const server = http.createServer(app); // Création du serveur HTTP à partir de l'app Express

// Configuration de Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Autorise les connexions depuis votre frontend React
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 5000;

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // Les options useNewUrlParser et useUnifiedTopology sont dépréciées mais ne causent pas d'erreur.
    // Vous pouvez les garder ou les enlever.
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

// Middleware pour rendre `io` accessible dans toutes les routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté via WebSocket:', socket.id);
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/livres', livresRoutes);
app.use('/api/auteurs', auteursRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/adminlogin', require('./routes/adminlogin')); // Réactivation de la route
app.use('/api/actualites', actualitesRoutes);
app.use('/api/temoignages', temoignagesRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes); // ✅ Utiliser la nouvelle route


// route dynamique pour oeuvres

server.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));

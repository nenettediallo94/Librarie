const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const livresRoutes = require('./routes/livres');
const authRouter = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // Importez le nouveau routeur

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB', err);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Servir le dossier public pour les images et fichiers PDF
app.use('/public', express.static('public'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes); // Montez le nouveau routeur ici
app.use('/api/livres', livresRoutes);

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});

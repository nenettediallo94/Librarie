
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
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


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/livres', livresRoutes);
app.use('/api/auteurs', auteursRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/adminlogin', adminloginRoutes);
app.use('/api/actualites', actualitesRoutes);
app.use('/api/temoignages', temoignagesRoutes);

// route dynamique pour oeuvres

app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));

const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT et le rôle
module.exports = function(roleRequis) {
    return function(req, res, next) {
        // 1. Récupérer le token depuis l'en-tête de la requête
        const token = req.header('x-auth-token');

        // AJOUTEZ CETTE LIGNE POUR LE DÉBOGAGE
        console.log('Token reçu sur le serveur :', token);

        // Vérifier si un token existe
        if (!token) {
            return res.status(401).json({ message: 'Accès refusé. Pas de token fourni.' });
        }

        try {
            // 2. Vérifier et décoder le token
            const decoded = jwt.verify(token, 'votre_secret_token_jwt');

            // 3. Vérifier le rôle de l'utilisateur
            if (decoded.user.role !== roleRequis) {
                return res.status(403).json({ message: 'Accès non autorisé. Rôle insuffisant.' });
            }

            // 4. Ajouter l'utilisateur décodé à l'objet de la requête
            req.user = decoded.user;
            
            // Poursuivre vers la route
            next();

        } catch (err) {
            res.status(401).json({ message: 'Token invalide.' });
        }
    };
};
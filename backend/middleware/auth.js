const jwt = require('jsonwebtoken');

module.exports = function(role) {
    return function(req, res, next) {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
        }

        try {
            const decoded = jwt.verify(token, 'votre_secret_token_jwt');
            req.user = decoded.user;

            // Vérification du rôle
            if (role && req.user.role !== role) {
                return res.status(403).json({ message: 'Accès non autorisé pour ce rôle.' });
            }

            next();
        } catch (ex) {
            res.status(400).json({ message: 'Token invalide.' });
        }
    }
};
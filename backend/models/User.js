// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     prenoms: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     nom: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     motDePasse: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['abonné', 'auteur', 'administrateur'],
//        required: true
//     },
//     telephone: {
//         type: String,
//         required: false,
//         trim: true
//     },
//     dateNaissance: {
//         type: Date,
//         required: false
//     },
//     imageProfil: {
//         type: String,
//         required: false
//     },
//     biographie: {
//         type: String,
//         required: false
//     },
//     genrePrefere: {
//         type: String,
//         enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystère', 'Biographie', 'Histoire', 'Science', 'Autre'],
//         required: false
//     },
//     dateCreation: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Middleware Mongoose pour hacher le mot de passe avant de sauvegarder le document
// userSchema.pre('save', async function(next) {
//     // Ne pas hacher le mot de passe s'il n'a pas été modifié
//     if (!this.isModified('motDePasse')) {
//         return next();
//     }
    
//     // Hacher le mot de passe
//     const salt = await bcrypt.genSalt(10);
//     this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    
//     next();
// });

// // Méthode de l'instance pour comparer les mots de passe
// userSchema.methods.comparePassword = async function(motDePasse) {
//     return await bcrypt.compare(motDePasse, this.motDePasse);
// };

// module.exports = mongoose.model('User', userSchema); ici je veux l'approbation par l'ad

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    prenoms: {
        type: String,
        required: true,
        trim: true
    },
    nom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['en_attente', 'abonné', 'auteur', 'administrateur'],
        // Le rôle n'est plus requis ici, il sera attribué par un admin plus tard.
        required: false,
        default: 'en_attente' // Valeur par défaut pour les utilisateurs non encore assignés
    },
    // Le nouveau champ pour gérer l'état d'approbation de l'utilisateur
    estApprouve: {
        type: Boolean,
        default: false
    },
    telephone: {
        type: String,
        required: false,
        trim: true
    },
    dateNaissance: {
        type: Date,
        required: false
    },
    imageProfil: {
        type: String,
        required: false
    },
    biographie: {
        type: String,
        required: false
    },
    genrePrefere: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystère', 'Biographie', 'Histoire', 'Science', 'Autre'],
        required: false
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

// Middleware Mongoose pour hacher le mot de passe avant de sauvegarder le document
userSchema.pre('save', async function(next) {
    if (!this.isModified('motDePasse')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    
    next();
});

// Méthode de l'instance pour comparer les mots de passe
userSchema.methods.comparePassword = async function(motDePasse) {
    return await bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);
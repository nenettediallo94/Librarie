const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire.'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Veuillez entrer une adresse email valide.'
        ]
    },
    dateInscription: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);
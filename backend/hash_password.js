const bcrypt = require('bcryptjs');

const plainTextPassword = 'nenette@3'; // Remplacez ceci
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
    } else {
        console.log('Mot de passe haché :');
        console.log(hash);
    }
});
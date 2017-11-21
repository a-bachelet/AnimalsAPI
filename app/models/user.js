/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma */
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username property is required.'],
        unique: true,
        minlength: [3, 'Username property should be 3 characters long at least.'],
        maxlength: [255, 'Username property should be 255 characters long at maximum.']
    },
    password: {
        type: String,
        required: [true, 'Password property is required.'],
        unique: false,
        minlength: [8, 'Password property should be 8 characters long at least.']
    },
    authToken: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        index: true
    },
    validUntil: {
        type: Date,
        required: false,
        unique: false
    }
});

/** On exporte le modèle */
module.exports = mongoose.model('User', userSchema);
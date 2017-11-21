/** On importe les librairies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** On déclare le schéma de l'animal */
const animalSchema = new Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    legsNumber: { type: Number },
    activities: [{ 
        name: { type: String, required: true }
    }]
});

/** Exportation */
module.exports = mongoose.model('Animal', animalSchema);
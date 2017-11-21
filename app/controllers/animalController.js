/** On importe les modèles */
const Animal = require('../models/animal');

/** On déclare les fonctions liées aux animaux */

const getAnimals = (req, res) => {

    Animal.find({}, (err, animals) => {
        if (err) throw err;

        res.status(200).send({ success: true, animals: animals });
    });

};

const postAnimals = (req, res) => {

    Animal.create(req.body, (err, animal) => {
        if (err) throw err;

        res.status(201).send({ success: true, animal: animal });
    });

};

/** On exporte le controller */
module.exports = {
    getAnimals: getAnimals,
    postAnimals: postAnimals
};
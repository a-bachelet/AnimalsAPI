/** On importe les librairies */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/** On instancie l'application */
const app = express();

/** On applique des middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** On charge le modèle */
const animalModel = require('./app/models/animal');

/** Routing */
app.post('/animals', (req, res) => {

    const body = req.body;

    animalModel.create({
        name: body.name,
        color: body.color,
        legsNumber: body.legsNumber || null,
        activities: body.activities
    }, (err, animal) => {
        if (err) throw err;

        res.status(201).send({ success: true, animal: animal });
    });

});

app.get('/animals', (req, res) => {
    const animals = animalModel.find({}, (err, animals) => {
        if (err) throw err;

        res.status(200).send({ success: true, animals: animals });
    });
});


/** Connexion à la base MongoDB */
mongoose.connect('mongodb://localhost/AnimalsAPI', { useMongoClient: true }, (err) => {
    if (err) throw err;
    console.log('Connexion établie à la base de données');
});

/** On démarre l'application */
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});
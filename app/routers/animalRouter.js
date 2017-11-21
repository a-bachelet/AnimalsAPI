/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const animalController = require('../controllers/animalController');

/** On déclare notre router */
const animalRouter = express.Router();

/** On déclare les routes */
animalRouter.get('/', animalController.getAnimals);
animalRouter.post('/', animalController.postAnimals);

/** On exporte le router */
module.exports = animalRouter;
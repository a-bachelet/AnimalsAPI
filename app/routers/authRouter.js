/** On importe les librairies */
const express = require('express');

/** On importe les controllers */
const authController = require('../controllers/authController');

/** On déclare notre router */
const authRouter = express.Router();

/** On déclare les routes */
authRouter.post('/login', authController.login);

/** On exporte le router */
module.exports = authRouter;
/** On importe les librairies */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/** On importe fichiers de configuration */
const databaseConfig = require('./app/config/database');

/** On instancie l'application */
const app = express();

/** On applique des middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** On importe les routers */
const animalRouter = require('./app/routers/animalRouter');
const authRouter = require('./app/routers/authRouter');
const userRouter = require('./app/routers/userRouter');

/** On créé le router API */
const apiRouter = express.Router();

apiRouter.use('/animals', animalRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

/** On implémente le router API */

app.use('/api', apiRouter);


/** Connexion à la base MongoDB */
mongoose.connect(databaseConfig.url, { useMongoClient: true }, (err) => {
    if (err) throw err;
    console.log('Connexion établie à la base de données');
});

/** On démarre l'application */
app.listen(3000, () => {
    console.log('Le serveur écoute sur le port 3000');
});
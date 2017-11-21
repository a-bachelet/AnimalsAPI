/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

/** On importe les fichiers de configuration */
const jwtConfig = require('../config/jwt');

/** On importe les modèles */
const User = require('../models/user');

/** On déclare les fonctions liées aux animaux */
const login = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || username === '' || password === '') {
        res.status(400).send({ success: false, message: 'Both of Username and Password fields are required.' });
    } else {

        User.findOne({ username: username }, (err, user) => {

            if (err) throw err;

            if (!user) {
                res.status(400).send({ success: false, message: 'Wrong Username or Password.' });
            } else {

                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    res.status(400).send({ success: false, message: 'Wrong Username or Password.' });
                } else {

                    jwt.sign({
                        username: username
                    }, jwtConfig.secret, {}, (err, authToken) => {

                        if (err) throw err;

                        User.findOneAndUpdate({ _id: user._id }, {
                            authToken: authToken,
                            validUntil: new Date((new Date()).setHours((new Date()).getHours() + 1))
                        }, { new: true }, (err, user) => {

                            if (err) throw err;

                            res.status(200).send({ success: true, authToken: authToken });

                        })

                    });

                }

            }

        });

    }

};

/** On exporte le controller */
module.exports = {
    login: login
};
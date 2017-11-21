/** On importe les librairies */
const bcrypt = require('bcrypt-nodejs');

/** On importe les modèles */
const User = require('../models/user');

/** On déclare les fonctions liées aux animaux */

const getUsers = (req, res) => {

    User.find({}, (err, users) => {
        if (err) throw err;

        res.status(200).send({ success: true, users: users });
    });

};

const postUsers = (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, null);

    User.create(req.body, (err, user) => {
        if (err) {
            res.status(400).send({ success: false, error: err });
        } else {
            res.status(201).send({ success: true, user: user });
        }
    });

};

/** On exporte le controller */
module.exports = {
    getUsers: getUsers,
    postUsers: postUsers
};
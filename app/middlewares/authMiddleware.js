/** On importe les librairies */
const jwt = require('jsonwebtoken');

/** On importe les fichiers de configuration */
const jwtConfig = require('../config/jwt');

/** On importe les modèles */
const User = require('../models/user');

/** On créée le Middleware */
const authMiddleware = (req, res, next) => {

    const authToken = req.headers['x-auth-token'];

    if (!authToken) {
        res.status(401).send({ success: false, message: 'Authentication required.' });
    } else {

        User.findOne({ authToken: authToken }, (err, user) => {

            if (err) throw err;

            if (!user) {
                res.status(401).send({ success: false, message: 'Invalid token.' });
            } else {
                const actualTime = (new Date()).getTime();
                const userTime = (new Date(user.validUntil)).getTime();
    
                if (userTime < actualTime) {
                    res.status(401).send({ success: false, message: 'Expired token.' });
                } else {
                    jwt.verify(authToken, jwtConfig.secret, {}, (err, decoded) => {
                        if (err) {
                            res.status(401).send({ success: false, message: 'Invalid token' });
                        } else {
                            User.findOneAndUpdate({ _id: user._id }, { 
                                validUntil: new Date((new Date()).setHours((new Date()).getHours() + 1)) 
                            }, { new: true }, (err, user) => {
                                if (err) throw err;
        
                                next();
                            });
                        }
                    });
                }
            }

        });

    }

};

/** On exporte le Middleware */
module.exports = authMiddleware;
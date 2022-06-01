// Import de JSONWEBTOKEN
const jwt = require('jsonwebtoken');

// Module de RANDOMTOKEN à la connexion
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = JSON.stringify(decodedToken.userId);  
        console.log(req.body.Grade)
        req.auth = { userId };
        if (req.params.id && req.params.id !== userId ) {
            throw 'Identifiant incorrect !';
        } 
        else if (req.params.grade == 'admin') {
            next();
        } else {
           next();
              }
    } catch {
        res.status(401).json({
            error: new Error('Requête incorrecte!')
        });
    }
};
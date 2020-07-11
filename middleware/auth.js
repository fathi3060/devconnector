const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // GET token en entete
    const token = req.header('x-auth-token');

    //on va checher si ce n'est pas un token
    if(!token) {
        return res.status(401).json({msg: "Pas de token, autorisation refusée."});
    }

    //Vérification du token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token non valide."});
    }
}
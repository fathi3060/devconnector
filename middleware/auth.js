const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // GET token en entete
    const token = req.header('x-auth-token');
}
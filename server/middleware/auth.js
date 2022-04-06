const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send("A token is required");
    }
    try {
        const decoded = jwt.verify(token, 'jwtsecret');
        req.user = decoded;
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
    return next();
}

module.exports = verifyToken;
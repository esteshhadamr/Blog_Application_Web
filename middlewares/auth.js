const createError = require('http-errors');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/user');

// Authenticated LoggedIn
exports.authenticated = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw createError(401);
        req.user = { id: decoded.id, name: decoded.name, email: decoded.email };
        next();
    });
};

// Authenticated Guest
exports.guest = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next();
        throw createError(403);
    });
};

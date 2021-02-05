const User = require('../models/user');
const createError = require('http-errors');

// Create User
exports.create = (req, res, next) => {
    let data = { name, email, password } = req.body;

    User.create({
        data

    }).then(user => {
        res.json(user);
    })
        .catch(next);
};

//get users list
exports.list = (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(next);
};

//show user
exports.show = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) throw createError(404, "User not found.");
            res.json(user);
        })
        .catch(next);
};


// Update User
exports.update = (req, res, next) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    User.findByIdAndUpdate(req.params.id, data)
        .then(updatedUser => {
            if (!updatedUser) throw createError(404, "User not found.");
            res.json();
        })
        .catch(next);
};

//Delete Users
exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(deleted => {
            if (!deleted) throw createError(404, "User not found.");
            res.json({ message: "User deleted" });
        })
        .catch(next);
};

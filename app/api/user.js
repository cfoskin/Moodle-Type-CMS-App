'use strict';
const User = require('../models/User');

exports.signUp = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(newUser => {
            return res.status(201).json(newUser);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'error creating user',
                error: err
            });
        })
};

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (user != null) {
                return res.status(200).json(user)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'user not found',
                error: err
            });
        })
};

exports.getUsers = (req, res) => {
    User.find({}).exec()
        .then(users => {
            return res.status(200).json(users);
        })
};

exports.deleteUser = (req, res) => {
    User.remove({ _id: req.params.id })
        .then(user => {
            return res.status(204).json({
                message: 'user deleted',
                user: user
            });
        })
        .catch(err => {
            return res.status(404).json({
                message: 'user not found',
                error: err
            });
        });
};

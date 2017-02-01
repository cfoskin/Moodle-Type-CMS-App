'use strict';
const User = require('../models/User');

exports.login = (req, res) => {
    const user = req.body;
    User.findOne({ username: user.username })
        .then(foundUser => {
            if (foundUser && foundUser.password === foundUser.password) {
                return res.status(201).json(foundUser);
            } else {
                return res.status(401).json({
                    message: 'wrong data',
                    error: err
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: 'user not found',
                error: err
            });
        })
};

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
    const user = req.body;
    User.findOne({ id: user._id })
        .then(foundUser => {
            return res.status(201).json(foundUser);
        }).catch(err => {
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
    console.log(req.params)
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

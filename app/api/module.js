'use strict';
const Module = require('../models/module');

exports.addModule = (req, res) => {
    const module = new Module(req.body);
    module.save()
        .then(newModule => {
            return res.status(201).json(newModule);
        })
        .catch(err => {
             return res.status(500).json({
                message: 'error adding module',
                error: err
            });
        })
};

exports.getModule = (req, res) => {
    const module = req.body;
    Module.findOne({ id: module._id })
        .then(foundModule => {
               return res.status(201).json(foundModule);
        }).catch(err => {
            return res.status(404).json({
                message: 'module not found',
                error: err
            });
        })
};

exports.getModules = (req, res) => {
    Module.find({}).exec()
        .then(modules => {
            return res.status(200).json(modules);
        })
};
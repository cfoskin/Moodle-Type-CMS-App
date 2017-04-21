'use strict';
const Module = require('../models/Module');

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
    Module.findOne({ _id: req.params.id })
        .then(module => {
            if (module != null) {
                return res.status(200).json(module)
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'id not found',
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

exports.updateModule = (req, res) => {
    Module.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(module => {
            if (module != null) {
                return res.status(200).json(module);
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: 'module not found',
                error: err
            });
        })
};

exports.deleteModule = (req, res) => {
    Module.remove({ _id: req.params.id })
        .then(module => {
            return res.status(204).json(module);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'module not found',
                error: err
            });
        });
};
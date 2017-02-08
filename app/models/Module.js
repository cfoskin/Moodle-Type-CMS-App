'use strict';

const mongoose = require('mongoose');
const ModuleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        require: false
    },
    userId: {
        type: String,
        require: false
    },
    files: [{
        name: String,
        url: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'file'
        }
    }]
});

const Module = mongoose.model('module', ModuleSchema);
module.exports = Module;

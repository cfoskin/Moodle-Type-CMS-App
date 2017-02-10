'use strict';

const mongoose = require('mongoose');
const FileSchema = mongoose.Schema({
	name:{
		type: String
	},
    url: {
        type: String,
        required: true
    },
      modules: [{
        name: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'module'
        },
        required: false
    }]
});

const File = mongoose.model('file', FileSchema);
module.exports = File;

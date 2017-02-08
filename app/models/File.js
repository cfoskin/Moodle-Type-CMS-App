'use strict';

const mongoose = require('mongoose');
const FileSchema = mongoose.Schema({
	name:{
		type: String
	},
    url: {
        type: String,
        required: true
    }
});

const File = mongoose.model('file', FileSchema);
module.exports = File;

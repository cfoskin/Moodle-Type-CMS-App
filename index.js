'use strict';

const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
mongoose.Promise = global.Promise;
const config = require('./config/config');
const multipart = require('connect-multiparty');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(multipart({
    uploadDir: config.tmp
}));

app.use('/', express.static(path.join(__dirname, './public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var db;
var port;

if (process.env.NODE_ENV === 'test') {
    port = 5000;
    db = config.test;
} else {
    port = process.env.SERVER_PORT || 4000;
    db = process.env.MONGO_URL || config.database;
}

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

mongoose.connect(db, { server: { auto_reconnect: true } }, function(err) {
    if (err) {
        console.log("Error ", err);
    } else {
        console.log('Connected to database');
    }
});

var api = require('./routesApi');
app.use('/api', api);

module.exports = app;

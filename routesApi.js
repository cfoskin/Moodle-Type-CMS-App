const express = require('express');
const UserApi = require('./app/api/user');
const ModuleApi = require('./app/api/module');

module.exports = (function() {
    'use strict';
    const api = express.Router();

    //api.post('/logIn', UserApi.login);
    api.post('/signUp', UserApi.signUp);
    api.get('/users', UserApi.getUsers);
    api.delete('/users/:id', UserApi.deleteUser);
    api.get('/users/:id', UserApi.getUser);

    api.post('/modules', ModuleApi.addModule);
    api.get('/modules', ModuleApi.getModules);
    api.get('/modules/:id', ModuleApi.getModule);
    api.put('/modules/:id', ModuleApi.updateModule);
    api.delete('/modules/:id', ModuleApi.deleteModule);

    return api;
})();

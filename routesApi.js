const express = require('express');
const UserApi = require('./app/api/user');
const ModuleApi = require('./app/api/module');
const FileApi = require('./app/api/file');

module.exports = (function() {
    'use strict';
    const api = express.Router();

    api.post('/signUp', UserApi.signUp);
    api.get('/users', UserApi.getUsers);
    api.delete('/users/:id', UserApi.deleteUser);
    api.get('/users/:id', UserApi.getUser);

    api.post('/modules', ModuleApi.addModule);
    api.get('/modules', ModuleApi.getModules);
    api.get('/modules/:id', ModuleApi.getModule);
    api.put('/modules/:id', ModuleApi.updateModule);
    api.delete('/modules/:id', ModuleApi.deleteModule);

    api.post('/upload', FileApi.uploadToS3);
    api.post('/files', FileApi.createFile);
    api.get('/files', FileApi.getFiles);

    return api;
})();

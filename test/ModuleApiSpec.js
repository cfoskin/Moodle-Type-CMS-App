'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const expect = require('chai').expect;

const modulesApi = '/api/modules/';

const mongoose = require('mongoose');
var moduleId ;

describe('Module API Integration Tests', () => {

    before((done) => {
        mongoose.connection.collections['modules'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should create a new module', (done) => {
        var user = {"name": "test module",
        "code": "kjhfge78"}

        supertest(app)
            .post(modulesApi)
            .send(user)
            .end((err, res) => {
                expect(res.body).to.have.property("name", "test module");
                expect(res.body).to.have.property("code", "kjhfge78");
                expect(res.statusCode).to.be.equal(201);
                moduleId = res.body._id;
                done();
            });
    });

       it('Should not create a bad new module', (done) => {
        var badModule = {
        "wrong field": "bad"
    }
        supertest(app)
            .post(modulesApi)
            .send(badModule)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

     it('Should get one module', (done) => {
        supertest(app)
            .get(modulesApi + moduleId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

     it('Should get all modules', (done) => {
        supertest(app)
            .get(modulesApi)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete a module', (done) => {
        supertest(app)
            .delete(modulesApi + moduleId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });

});

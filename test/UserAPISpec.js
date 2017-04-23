'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const expect = require('chai').expect;

const usersApi = '/api/users/';
const signUp = '/api/signUp/';

const mongoose = require('mongoose');
var userId ;

describe('User API Integration Tests', () => {

    before((done) => {
        mongoose.connection.collections['users'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should create a new user', (done) => {
        var user = {"username": "tim",
        "password": "123"}

        supertest(app)
            .post(signUp)
            .send(user)
            .end((err, res) => {
                expect(res.body).to.have.property("username", "tim");
                expect(res.body).to.have.property("password", "123");
                expect(res.statusCode).to.be.equal(201);
                userId = res.body._id;
                done();
            });
    });

       it('Should not create a bad new user', (done) => {
        var badUser = {
        "wrong field": "bob"
    }
        supertest(app)
            .post(signUp)
            .send(badUser)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

     it('Should get one user', (done) => {
        supertest(app)
            .get(usersApi + userId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

     it('Should get all users', (done) => {
        supertest(app)
            .get(usersApi)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete a user', (done) => {
        supertest(app)
            .delete(usersApi + userId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });

});

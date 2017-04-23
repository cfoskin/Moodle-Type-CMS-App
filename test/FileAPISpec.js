'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const expect = require('chai').expect;

const fileApi = '/api/files/';
const S3Api = '/api/upload/';

const mongoose = require('mongoose');
var fileId;

describe('File API Integration Tests', () => {

    before((done) => {
        mongoose.connection.collections['files'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should create a new File', (done) => {
        var file = {
            fileUrl: "http://testurl.com",
            fileName: 'test file'
        }
        supertest(app)
            .post(fileApi)
            .send(file)
            .end((err, res) => {
                expect(res.body.file).to.have.property("name", "test file");
                expect(res.body.file).to.have.property("url", "http://testurl.com");
                expect(res.statusCode).to.be.equal(201);
                fileId = res.body.file._id;
                done();
            });
    });

    it('Should not create a bad new file', (done) => {
        var badFile = {
            "bad file field": "bad"
        }
        supertest(app)
            .post(fileApi)
            .send(badFile)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

    it('Should return one file', (done) => {
        supertest(app)
            .get(fileApi + fileId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should get all files', (done) => {
        supertest(app)
            .get(fileApi)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete a file', (done) => {
        supertest(app)
            .delete(fileApi + fileId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });




});

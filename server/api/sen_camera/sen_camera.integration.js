'use strict';

var app = require('../..');
import request from 'supertest';

var newSenCamera;

describe('SenCamera API:', function() {

  describe('GET /api/sen_cameras', function() {
    var senCameras;

    beforeEach(function(done) {
      request(app)
        .get('/api/sen_cameras')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          senCameras = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      senCameras.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sen_cameras', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sen_cameras')
        .send({
          name: 'New SenCamera',
          info: 'This is the brand new senCamera!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSenCamera = res.body;
          done();
        });
    });

    it('should respond with the newly created senCamera', function() {
      newSenCamera.name.should.equal('New SenCamera');
      newSenCamera.info.should.equal('This is the brand new senCamera!!!');
    });

  });

  describe('GET /api/sen_cameras/:id', function() {
    var senCamera;

    beforeEach(function(done) {
      request(app)
        .get('/api/sen_cameras/' + newSenCamera._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          senCamera = res.body;
          done();
        });
    });

    afterEach(function() {
      senCamera = {};
    });

    it('should respond with the requested senCamera', function() {
      senCamera.name.should.equal('New SenCamera');
      senCamera.info.should.equal('This is the brand new senCamera!!!');
    });

  });

  describe('PUT /api/sen_cameras/:id', function() {
    var updatedSenCamera;

    beforeEach(function(done) {
      request(app)
        .put('/api/sen_cameras/' + newSenCamera._id)
        .send({
          name: 'Updated SenCamera',
          info: 'This is the updated senCamera!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSenCamera = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSenCamera = {};
    });

    it('should respond with the updated senCamera', function() {
      updatedSenCamera.name.should.equal('Updated SenCamera');
      updatedSenCamera.info.should.equal('This is the updated senCamera!!!');
    });

  });

  describe('DELETE /api/sen_cameras/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sen_cameras/' + newSenCamera._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when senCamera does not exist', function(done) {
      request(app)
        .delete('/api/sen_cameras/' + newSenCamera._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

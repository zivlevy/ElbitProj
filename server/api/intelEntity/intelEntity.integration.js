'use strict';

var app = require('../..');
import request from 'supertest';

var newIntelEntity;

describe('IntelEntity API:', function() {

  describe('GET /api/intelEntitys', function() {
    var intelEntitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/intelEntitys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          intelEntitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      intelEntitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/intelEntitys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/intelEntitys')
        .send({
          name: 'New IntelEntity',
          info: 'This is the brand new intelEntity!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIntelEntity = res.body;
          done();
        });
    });

    it('should respond with the newly created intelEntity', function() {
      newIntelEntity.name.should.equal('New IntelEntity');
      newIntelEntity.info.should.equal('This is the brand new intelEntity!!!');
    });

  });

  describe('GET /api/intelEntitys/:id', function() {
    var intelEntity;

    beforeEach(function(done) {
      request(app)
        .get('/api/intelEntitys/' + newIntelEntity._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          intelEntity = res.body;
          done();
        });
    });

    afterEach(function() {
      intelEntity = {};
    });

    it('should respond with the requested intelEntity', function() {
      intelEntity.name.should.equal('New IntelEntity');
      intelEntity.info.should.equal('This is the brand new intelEntity!!!');
    });

  });

  describe('PUT /api/intelEntitys/:id', function() {
    var updatedIntelEntity;

    beforeEach(function(done) {
      request(app)
        .put('/api/intelEntitys/' + newIntelEntity._id)
        .send({
          name: 'Updated IntelEntity',
          info: 'This is the updated intelEntity!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIntelEntity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIntelEntity = {};
    });

    it('should respond with the updated intelEntity', function() {
      updatedIntelEntity.name.should.equal('Updated IntelEntity');
      updatedIntelEntity.info.should.equal('This is the updated intelEntity!!!');
    });

  });

  describe('DELETE /api/intelEntitys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/intelEntitys/' + newIntelEntity._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when intelEntity does not exist', function(done) {
      request(app)
        .delete('/api/intelEntitys/' + newIntelEntity._id)
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

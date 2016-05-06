'use strict';

var app = require('../..');
import request from 'supertest';

var newEntPath;

describe('EntPath API:', function() {

  describe('GET /api/ent_paths', function() {
    var entPaths;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_paths')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPaths = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entPaths.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_paths', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_paths')
        .send({
          name: 'New EntPath',
          info: 'This is the brand new entPath!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntPath = res.body;
          done();
        });
    });

    it('should respond with the newly created entPath', function() {
      newEntPath.name.should.equal('New EntPath');
      newEntPath.info.should.equal('This is the brand new entPath!!!');
    });

  });

  describe('GET /api/ent_paths/:id', function() {
    var entPath;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_paths/' + newEntPath._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPath = res.body;
          done();
        });
    });

    afterEach(function() {
      entPath = {};
    });

    it('should respond with the requested entPath', function() {
      entPath.name.should.equal('New EntPath');
      entPath.info.should.equal('This is the brand new entPath!!!');
    });

  });

  describe('PUT /api/ent_paths/:id', function() {
    var updatedEntPath;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_paths/' + newEntPath._id)
        .send({
          name: 'Updated EntPath',
          info: 'This is the updated entPath!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntPath = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntPath = {};
    });

    it('should respond with the updated entPath', function() {
      updatedEntPath.name.should.equal('Updated EntPath');
      updatedEntPath.info.should.equal('This is the updated entPath!!!');
    });

  });

  describe('DELETE /api/ent_paths/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_paths/' + newEntPath._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entPath does not exist', function(done) {
      request(app)
        .delete('/api/ent_paths/' + newEntPath._id)
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

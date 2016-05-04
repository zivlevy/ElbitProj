'use strict';

var app = require('../..');
import request from 'supertest';

var newEntRoute;

describe('EntRoute API:', function() {

  describe('GET /api/ent_routes', function() {
    var entRoutes;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_routes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entRoutes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entRoutes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_routes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_routes')
        .send({
          name: 'New EntRoute',
          info: 'This is the brand new entRoute!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntRoute = res.body;
          done();
        });
    });

    it('should respond with the newly created entRoute', function() {
      newEntRoute.name.should.equal('New EntRoute');
      newEntRoute.info.should.equal('This is the brand new entRoute!!!');
    });

  });

  describe('GET /api/ent_routes/:id', function() {
    var entRoute;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_routes/' + newEntRoute._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      entRoute = {};
    });

    it('should respond with the requested entRoute', function() {
      entRoute.name.should.equal('New EntRoute');
      entRoute.info.should.equal('This is the brand new entRoute!!!');
    });

  });

  describe('PUT /api/ent_routes/:id', function() {
    var updatedEntRoute;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_routes/' + newEntRoute._id)
        .send({
          name: 'Updated EntRoute',
          info: 'This is the updated entRoute!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntRoute = {};
    });

    it('should respond with the updated entRoute', function() {
      updatedEntRoute.name.should.equal('Updated EntRoute');
      updatedEntRoute.info.should.equal('This is the updated entRoute!!!');
    });

  });

  describe('DELETE /api/ent_routes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_routes/' + newEntRoute._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entRoute does not exist', function(done) {
      request(app)
        .delete('/api/ent_routes/' + newEntRoute._id)
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

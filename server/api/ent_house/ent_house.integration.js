'use strict';

var app = require('../../index.js');
import request from 'supertest';

var newEntHouse;

describe('EntHouse API:', function() {

  describe('GET /api/ent_houses', function() {
    var entHouses;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_houses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entHouses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entHouses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_houses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_houses')
        .send({
          name: 'New EntHouse',
          info: 'This is the brand new entHouse!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntHouse = res.body;
          done();
        });
    });

    it('should respond with the newly created entHouse', function() {
      newEntHouse.name.should.equal('New EntHouse');
      newEntHouse.info.should.equal('This is the brand new entHouse!!!');
    });

  });

  describe('GET /api/ent_houses/:id', function() {
    var entHouse;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_houses/' + newEntHouse._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entHouse = res.body;
          done();
        });
    });

    afterEach(function() {
      entHouse = {};
    });

    it('should respond with the requested entHouse', function() {
      entHouse.name.should.equal('New EntHouse');
      entHouse.info.should.equal('This is the brand new entHouse!!!');
    });

  });

  describe('PUT /api/ent_houses/:id', function() {
    var updatedEntHouse;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_houses/' + newEntHouse._id)
        .send({
          name: 'Updated EntHouse',
          info: 'This is the updated entHouse!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntHouse = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntHouse = {};
    });

    it('should respond with the updated entHouse', function() {
      updatedEntHouse.name.should.equal('Updated EntHouse');
      updatedEntHouse.info.should.equal('This is the updated entHouse!!!');
    });

  });

  describe('DELETE /api/ent_houses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_houses/' + newEntHouse._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entHouse does not exist', function(done) {
      request(app)
        .delete('/api/ent_houses/' + newEntHouse._id)
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

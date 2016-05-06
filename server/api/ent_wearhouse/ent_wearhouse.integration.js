'use strict';

var app = require('../../index.js');
import request from 'supertest';

var newEntWearhouse;

describe('EntWearhouse API:', function() {

  describe('GET /api/ent_wearhouses', function() {
    var entWearhouses;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_wearhouses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entWearhouses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entWearhouses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_wearhouses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_wearhouses')
        .send({
          name: 'New EntWearhouse',
          info: 'This is the brand new entWearhouse!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntWearhouse = res.body;
          done();
        });
    });

    it('should respond with the newly created entWearhouse', function() {
      newEntWearhouse.name.should.equal('New EntWearhouse');
      newEntWearhouse.info.should.equal('This is the brand new entWearhouse!!!');
    });

  });

  describe('GET /api/ent_wearhouses/:id', function() {
    var entWearhouse;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_wearhouses/' + newEntWearhouse._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entWearhouse = res.body;
          done();
        });
    });

    afterEach(function() {
      entWearhouse = {};
    });

    it('should respond with the requested entWearhouse', function() {
      entWearhouse.name.should.equal('New EntWearhouse');
      entWearhouse.info.should.equal('This is the brand new entWearhouse!!!');
    });

  });

  describe('PUT /api/ent_wearhouses/:id', function() {
    var updatedEntWearhouse;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_wearhouses/' + newEntWearhouse._id)
        .send({
          name: 'Updated EntWearhouse',
          info: 'This is the updated entWearhouse!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntWearhouse = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntWearhouse = {};
    });

    it('should respond with the updated entWearhouse', function() {
      updatedEntWearhouse.name.should.equal('Updated EntWearhouse');
      updatedEntWearhouse.info.should.equal('This is the updated entWearhouse!!!');
    });

  });

  describe('DELETE /api/ent_wearhouses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_wearhouses/' + newEntWearhouse._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entWearhouse does not exist', function(done) {
      request(app)
        .delete('/api/ent_wearhouses/' + newEntWearhouse._id)
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

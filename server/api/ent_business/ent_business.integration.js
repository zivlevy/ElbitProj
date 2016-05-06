'use strict';

var app = require('../../index.js');
import request from 'supertest';

var newEntBusiness;

describe('EntBusiness API:', function() {

  describe('GET /api/ent_businesss', function() {
    var entBusinesss;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_businesss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entBusinesss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entBusinesss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_businesss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_businesss')
        .send({
          name: 'New EntBusiness',
          info: 'This is the brand new entBusiness!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntBusiness = res.body;
          done();
        });
    });

    it('should respond with the newly created entBusiness', function() {
      newEntBusiness.name.should.equal('New EntBusiness');
      newEntBusiness.info.should.equal('This is the brand new entBusiness!!!');
    });

  });

  describe('GET /api/ent_businesss/:id', function() {
    var entBusiness;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_businesss/' + newEntBusiness._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      entBusiness = {};
    });

    it('should respond with the requested entBusiness', function() {
      entBusiness.name.should.equal('New EntBusiness');
      entBusiness.info.should.equal('This is the brand new entBusiness!!!');
    });

  });

  describe('PUT /api/ent_businesss/:id', function() {
    var updatedEntBusiness;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_businesss/' + newEntBusiness._id)
        .send({
          name: 'Updated EntBusiness',
          info: 'This is the updated entBusiness!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntBusiness = {};
    });

    it('should respond with the updated entBusiness', function() {
      updatedEntBusiness.name.should.equal('Updated EntBusiness');
      updatedEntBusiness.info.should.equal('This is the updated entBusiness!!!');
    });

  });

  describe('DELETE /api/ent_businesss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_businesss/' + newEntBusiness._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entBusiness does not exist', function(done) {
      request(app)
        .delete('/api/ent_businesss/' + newEntBusiness._id)
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

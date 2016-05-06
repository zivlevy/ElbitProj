'use strict';

var app = require('../../index.js');
import request from 'supertest';

var newEntPerson;

describe('EntPerson API:', function() {

  describe('GET /api/ent_persons', function() {
    var entPersons;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_persons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPersons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entPersons.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_persons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_persons')
        .send({
          name: 'New EntPerson',
          info: 'This is the brand new entPerson!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntPerson = res.body;
          done();
        });
    });

    it('should respond with the newly created entPerson', function() {
      newEntPerson.name.should.equal('New EntPerson');
      newEntPerson.info.should.equal('This is the brand new entPerson!!!');
    });

  });

  describe('GET /api/ent_persons/:id', function() {
    var entPerson;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_persons/' + newEntPerson._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPerson = res.body;
          done();
        });
    });

    afterEach(function() {
      entPerson = {};
    });

    it('should respond with the requested entPerson', function() {
      entPerson.name.should.equal('New EntPerson');
      entPerson.info.should.equal('This is the brand new entPerson!!!');
    });

  });

  describe('PUT /api/ent_persons/:id', function() {
    var updatedEntPerson;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_persons/' + newEntPerson._id)
        .send({
          name: 'Updated EntPerson',
          info: 'This is the updated entPerson!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntPerson = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntPerson = {};
    });

    it('should respond with the updated entPerson', function() {
      updatedEntPerson.name.should.equal('Updated EntPerson');
      updatedEntPerson.info.should.equal('This is the updated entPerson!!!');
    });

  });

  describe('DELETE /api/ent_persons/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_persons/' + newEntPerson._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entPerson does not exist', function(done) {
      request(app)
        .delete('/api/ent_persons/' + newEntPerson._id)
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

'use strict';

var app = require('../..');
import request from 'supertest';

var newEntPhone;

describe('EntPhone API:', function() {

  describe('GET /api/ent_phones', function() {
    var entPhones;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_phones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPhones = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entPhones.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_phones', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_phones')
        .send({
          name: 'New EntPhone',
          info: 'This is the brand new entPhone!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntPhone = res.body;
          done();
        });
    });

    it('should respond with the newly created entPhone', function() {
      newEntPhone.name.should.equal('New EntPhone');
      newEntPhone.info.should.equal('This is the brand new entPhone!!!');
    });

  });

  describe('GET /api/ent_phones/:id', function() {
    var entPhone;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_phones/' + newEntPhone._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entPhone = res.body;
          done();
        });
    });

    afterEach(function() {
      entPhone = {};
    });

    it('should respond with the requested entPhone', function() {
      entPhone.name.should.equal('New EntPhone');
      entPhone.info.should.equal('This is the brand new entPhone!!!');
    });

  });

  describe('PUT /api/ent_phones/:id', function() {
    var updatedEntPhone;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_phones/' + newEntPhone._id)
        .send({
          name: 'Updated EntPhone',
          info: 'This is the updated entPhone!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntPhone = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntPhone = {};
    });

    it('should respond with the updated entPhone', function() {
      updatedEntPhone.name.should.equal('Updated EntPhone');
      updatedEntPhone.info.should.equal('This is the updated entPhone!!!');
    });

  });

  describe('DELETE /api/ent_phones/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_phones/' + newEntPhone._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entPhone does not exist', function(done) {
      request(app)
        .delete('/api/ent_phones/' + newEntPhone._id)
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

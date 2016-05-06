'use strict';

var app = require('../../index.js');
import request from 'supertest';

var newEntCar;

describe('EntCar API:', function() {

  describe('GET /api/ent_cars', function() {
    var entCars;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_cars')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entCars = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      entCars.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ent_cars', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ent_cars')
        .send({
          name: 'New EntCar',
          info: 'This is the brand new entCar!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEntCar = res.body;
          done();
        });
    });

    it('should respond with the newly created entCar', function() {
      newEntCar.name.should.equal('New EntCar');
      newEntCar.info.should.equal('This is the brand new entCar!!!');
    });

  });

  describe('GET /api/ent_cars/:id', function() {
    var entCar;

    beforeEach(function(done) {
      request(app)
        .get('/api/ent_cars/' + newEntCar._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          entCar = res.body;
          done();
        });
    });

    afterEach(function() {
      entCar = {};
    });

    it('should respond with the requested entCar', function() {
      entCar.name.should.equal('New EntCar');
      entCar.info.should.equal('This is the brand new entCar!!!');
    });

  });

  describe('PUT /api/ent_cars/:id', function() {
    var updatedEntCar;

    beforeEach(function(done) {
      request(app)
        .put('/api/ent_cars/' + newEntCar._id)
        .send({
          name: 'Updated EntCar',
          info: 'This is the updated entCar!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEntCar = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEntCar = {};
    });

    it('should respond with the updated entCar', function() {
      updatedEntCar.name.should.equal('Updated EntCar');
      updatedEntCar.info.should.equal('This is the updated entCar!!!');
    });

  });

  describe('DELETE /api/ent_cars/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ent_cars/' + newEntCar._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when entCar does not exist', function(done) {
      request(app)
        .delete('/api/ent_cars/' + newEntCar._id)
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

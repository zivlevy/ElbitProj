'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entPersonCtrlStub = {
  index: 'entPersonCtrl.index',
  show: 'entPersonCtrl.show',
  create: 'entPersonCtrl.create',
  update: 'entPersonCtrl.update',
  destroy: 'entPersonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entPersonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_person.controller': entPersonCtrlStub
});

describe('EntPerson API Router:', function() {

  it('should return an express router instance', function() {
    entPersonIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_persons', function() {

    it('should route to entPerson.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entPersonCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_persons/:id', function() {

    it('should route to entPerson.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entPersonCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_persons', function() {

    it('should route to entPerson.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entPersonCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_persons/:id', function() {

    it('should route to entPerson.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entPersonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_persons/:id', function() {

    it('should route to entPerson.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entPersonCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_persons/:id', function() {

    it('should route to entPerson.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entPersonCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

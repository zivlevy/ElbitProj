'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entWearhouseCtrlStub = {
  index: 'entWearhouseCtrl.index',
  show: 'entWearhouseCtrl.show',
  create: 'entWearhouseCtrl.create',
  update: 'entWearhouseCtrl.update',
  destroy: 'entWearhouseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entWearhouseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_wearhouse.controller': entWearhouseCtrlStub
});

describe('EntWearhouse API Router:', function() {

  it('should return an express router instance', function() {
    entWearhouseIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_wearhouses', function() {

    it('should route to entWearhouse.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entWearhouseCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_wearhouses/:id', function() {

    it('should route to entWearhouse.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entWearhouseCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_wearhouses', function() {

    it('should route to entWearhouse.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entWearhouseCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_wearhouses/:id', function() {

    it('should route to entWearhouse.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entWearhouseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_wearhouses/:id', function() {

    it('should route to entWearhouse.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entWearhouseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_wearhouses/:id', function() {

    it('should route to entWearhouse.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entWearhouseCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entHouseCtrlStub = {
  index: 'entHouseCtrl.index',
  show: 'entHouseCtrl.show',
  create: 'entHouseCtrl.create',
  update: 'entHouseCtrl.update',
  destroy: 'entHouseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entHouseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_house.controller': entHouseCtrlStub
});

describe('EntHouse API Router:', function() {

  it('should return an express router instance', function() {
    entHouseIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_houses', function() {

    it('should route to entHouse.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entHouseCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_houses/:id', function() {

    it('should route to entHouse.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entHouseCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_houses', function() {

    it('should route to entHouse.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entHouseCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_houses/:id', function() {

    it('should route to entHouse.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entHouseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_houses/:id', function() {

    it('should route to entHouse.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entHouseCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_houses/:id', function() {

    it('should route to entHouse.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entHouseCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

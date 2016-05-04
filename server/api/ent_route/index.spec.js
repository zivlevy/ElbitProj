'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entRouteCtrlStub = {
  index: 'entRouteCtrl.index',
  show: 'entRouteCtrl.show',
  create: 'entRouteCtrl.create',
  update: 'entRouteCtrl.update',
  destroy: 'entRouteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entRouteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_route.controller': entRouteCtrlStub
});

describe('EntRoute API Router:', function() {

  it('should return an express router instance', function() {
    entRouteIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_routes', function() {

    it('should route to entRoute.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entRouteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_routes/:id', function() {

    it('should route to entRoute.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entRouteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_routes', function() {

    it('should route to entRoute.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entRouteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_routes/:id', function() {

    it('should route to entRoute.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entRouteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_routes/:id', function() {

    it('should route to entRoute.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entRouteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_routes/:id', function() {

    it('should route to entRoute.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entRouteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

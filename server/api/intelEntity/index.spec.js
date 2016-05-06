'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var intelEntityCtrlStub = {
  index: 'intelEntityCtrl.index',
  show: 'intelEntityCtrl.show',
  create: 'intelEntityCtrl.create',
  update: 'intelEntityCtrl.update',
  destroy: 'intelEntityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var intelEntityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './intelEntity.controller': intelEntityCtrlStub
});

describe('IntelEntity API Router:', function() {

  it('should return an express router instance', function() {
    intelEntityIndex.should.equal(routerStub);
  });

  describe('GET /api/intelEntitys', function() {

    it('should route to intelEntity.controller.index', function() {
      routerStub.get
        .withArgs('/', 'intelEntityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/intelEntitys/:id', function() {

    it('should route to intelEntity.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'intelEntityCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/intelEntitys', function() {

    it('should route to intelEntity.controller.create', function() {
      routerStub.post
        .withArgs('/', 'intelEntityCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/intelEntitys/:id', function() {

    it('should route to intelEntity.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'intelEntityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/intelEntitys/:id', function() {

    it('should route to intelEntity.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'intelEntityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/intelEntitys/:id', function() {

    it('should route to intelEntity.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'intelEntityCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

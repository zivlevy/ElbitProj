'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var infoCtrlStub = {
  index: 'infoCtrl.index',
  show: 'infoCtrl.show',
  create: 'infoCtrl.create',
  update: 'infoCtrl.update',
  destroy: 'infoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var infoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './info.controller': infoCtrlStub
});

describe('Info API Router:', function() {

  it('should return an express router instance', function() {
    infoIndex.should.equal(routerStub);
  });

  describe('GET /api/infos', function() {

    it('should route to info.controller.index', function() {
      routerStub.get
        .withArgs('/', 'infoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/infos/:id', function() {

    it('should route to info.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'infoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/infos', function() {

    it('should route to info.controller.create', function() {
      routerStub.post
        .withArgs('/', 'infoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/infos/:id', function() {

    it('should route to info.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'infoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/infos/:id', function() {

    it('should route to info.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'infoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/infos/:id', function() {

    it('should route to info.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'infoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

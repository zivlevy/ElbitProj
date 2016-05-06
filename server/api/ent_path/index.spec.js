'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entPathCtrlStub = {
  index: 'entPathCtrl.index',
  show: 'entPathCtrl.show',
  create: 'entPathCtrl.create',
  update: 'entPathCtrl.update',
  destroy: 'entPathCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entPathIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_path.controller': entPathCtrlStub
});

describe('EntPath API Router:', function() {

  it('should return an express router instance', function() {
    entPathIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_paths', function() {

    it('should route to entPath.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entPathCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_paths/:id', function() {

    it('should route to entPath.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entPathCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_paths', function() {

    it('should route to entPath.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entPathCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_paths/:id', function() {

    it('should route to entPath.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entPathCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_paths/:id', function() {

    it('should route to entPath.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entPathCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_paths/:id', function() {

    it('should route to entPath.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entPathCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

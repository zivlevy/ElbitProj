'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entBusinessCtrlStub = {
  index: 'entBusinessCtrl.index',
  show: 'entBusinessCtrl.show',
  create: 'entBusinessCtrl.create',
  update: 'entBusinessCtrl.update',
  destroy: 'entBusinessCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entBusinessIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_business.controller': entBusinessCtrlStub
});

describe('EntBusiness API Router:', function() {

  it('should return an express router instance', function() {
    entBusinessIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_businesss', function() {

    it('should route to entBusiness.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entBusinessCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_businesss/:id', function() {

    it('should route to entBusiness.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entBusinessCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_businesss', function() {

    it('should route to entBusiness.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entBusinessCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_businesss/:id', function() {

    it('should route to entBusiness.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entBusinessCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_businesss/:id', function() {

    it('should route to entBusiness.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entBusinessCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_businesss/:id', function() {

    it('should route to entBusiness.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entBusinessCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

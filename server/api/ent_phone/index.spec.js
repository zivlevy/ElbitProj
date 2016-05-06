'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entPhoneCtrlStub = {
  index: 'entPhoneCtrl.index',
  show: 'entPhoneCtrl.show',
  create: 'entPhoneCtrl.create',
  update: 'entPhoneCtrl.update',
  destroy: 'entPhoneCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entPhoneIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_phone.controller': entPhoneCtrlStub
});

describe('EntPhone API Router:', function() {

  it('should return an express router instance', function() {
    entPhoneIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_phones', function() {

    it('should route to entPhone.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entPhoneCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_phones/:id', function() {

    it('should route to entPhone.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entPhoneCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_phones', function() {

    it('should route to entPhone.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entPhoneCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_phones/:id', function() {

    it('should route to entPhone.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entPhoneCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_phones/:id', function() {

    it('should route to entPhone.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entPhoneCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_phones/:id', function() {

    it('should route to entPhone.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entPhoneCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

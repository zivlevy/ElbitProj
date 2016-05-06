'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var entCarCtrlStub = {
  index: 'entCarCtrl.index',
  show: 'entCarCtrl.show',
  create: 'entCarCtrl.create',
  update: 'entCarCtrl.update',
  destroy: 'entCarCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var entCarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ent_car.controller': entCarCtrlStub
});

describe('EntCar API Router:', function() {

  it('should return an express router instance', function() {
    entCarIndex.should.equal(routerStub);
  });

  describe('GET /api/ent_cars', function() {

    it('should route to entCar.controller.index', function() {
      routerStub.get
        .withArgs('/', 'entCarCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ent_cars/:id', function() {

    it('should route to entCar.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'entCarCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ent_cars', function() {

    it('should route to entCar.controller.create', function() {
      routerStub.post
        .withArgs('/', 'entCarCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ent_cars/:id', function() {

    it('should route to entCar.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'entCarCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ent_cars/:id', function() {

    it('should route to entCar.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'entCarCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ent_cars/:id', function() {

    it('should route to entCar.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'entCarCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

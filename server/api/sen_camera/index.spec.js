'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var senCameraCtrlStub = {
  index: 'senCameraCtrl.index',
  show: 'senCameraCtrl.show',
  create: 'senCameraCtrl.create',
  update: 'senCameraCtrl.update',
  destroy: 'senCameraCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var senCameraIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sen_camera.controller': senCameraCtrlStub
});

describe('SenCamera API Router:', function() {

  it('should return an express router instance', function() {
    senCameraIndex.should.equal(routerStub);
  });

  describe('GET /api/sen_cameras', function() {

    it('should route to senCamera.controller.index', function() {
      routerStub.get
        .withArgs('/', 'senCameraCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sen_cameras/:id', function() {

    it('should route to senCamera.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'senCameraCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sen_cameras', function() {

    it('should route to senCamera.controller.create', function() {
      routerStub.post
        .withArgs('/', 'senCameraCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sen_cameras/:id', function() {

    it('should route to senCamera.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'senCameraCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sen_cameras/:id', function() {

    it('should route to senCamera.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'senCameraCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sen_cameras/:id', function() {

    it('should route to senCamera.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'senCameraCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

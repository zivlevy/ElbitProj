'use strict';

describe('Service: info', function () {

  // load the service's module
  beforeEach(module('elbitApp'));

  // instantiate service
  var info;
  beforeEach(inject(function (_info_) {
    info = _info_;
  }));

  it('should do something', function () {
    expect(!!info).toBe(true);
  });

});

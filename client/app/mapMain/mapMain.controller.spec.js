'use strict';

describe('Component: MapMainComponent', function () {

  // load the controller's module
  beforeEach(module('elbitApp'));

  var MapMainComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MapMainComponent = $componentController('MapMainComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

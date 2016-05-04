'use strict';

describe('Component: PersonComponent', function () {

  // load the controller's module
  beforeEach(module('elbitApp'));

  var PersonComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PersonComponent = $componentController('PersonComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

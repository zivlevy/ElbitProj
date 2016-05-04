'use strict';

describe('Directive: zivDcgraph', function () {

  // load the directive's module and view
  beforeEach(module('elbitApp.zivDcgraph'));
  beforeEach(module('app/zivDcgraph/zivDcgraph.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ziv-dcgraph></ziv-dcgraph>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the zivDcgraph directive');
  }));
});

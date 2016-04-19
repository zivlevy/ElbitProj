'use strict';

angular.module('elbitApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mapMain', {
        url: '/mapMain',
        template: '<map-main></map-main>'
      });
  });

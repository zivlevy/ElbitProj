'use strict';

angular.module('elbitApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mapMain', {
        url: '/',
        template: '<map-main></map-main>'
      });
  });

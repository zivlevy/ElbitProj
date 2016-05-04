'use strict';

angular.module('elbitApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('person', {
        url: '/person',
        template: '<person></person>'
      });
  });

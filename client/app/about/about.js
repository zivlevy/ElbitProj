'use strict';

angular.module('elbitApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        template: '<about></about>'
      });
  });

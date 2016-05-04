'use strict';

angular.module('elbitApp', [
    'elbitApp.auth',
    'elbitApp.admin',
    'elbitApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngFileUpload',
    'angularDc',
    'underscore',
    'ui.grid',
    'ui-leaflet'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  });

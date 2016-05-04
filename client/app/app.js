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
    'leaflet-directive',
    'ngFileUpload',
    'angularDc',
    'underscore',
    'ui.grid'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

  });

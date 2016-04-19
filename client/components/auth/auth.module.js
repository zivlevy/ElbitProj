'use strict';

angular.module('elbitApp.auth', [
  'elbitApp.constants',
  'elbitApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

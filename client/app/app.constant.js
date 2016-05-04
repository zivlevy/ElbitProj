(function (angular, undefined) {
  'use strict';

  angular.module('elbitApp.constants', [])

    .constant('appConfig', {
      appName: 'Elbit Intel Pro',
      appVersion: '0.0.1',
      userRoles: ['guest', 'user', 'admin'],
      mapCenter: {
        lat: 32.06250082836163,
        lng: 34.79513347148895,
        zoom: 13
      }

    })

  ;
})(angular);

(function(angular, undefined) {
'use strict';

angular.module('elbitApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],appName:'Elbit Intel Pro',appVersion:'0.0.1',center:{lat:32.06250082836163,lng:34.79513347148895,zoom:13}})

;
})(angular);
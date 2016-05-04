'use strict';
(function () {

  class AboutComponent {
    constructor(dataStore, $window, appConfig) {
      this.appName = appConfig.appName;
      this.appVersion = appConfig.appVersion;
      /*******************************************
       Resize to screen width and height
       ******************************************/
      angular.element($window).on("resize", resizeScreenAdjustments).trigger("resize");

      function resizeScreenAdjustments() {
        $('.bg').height(angular.element($window).height() - 60);

      }


    }
  }

  angular.module('elbitApp')
    .component('about', {
      templateUrl: 'app/about/about.html',
      controller: AboutComponent
    });

})();

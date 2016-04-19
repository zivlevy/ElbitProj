'use strict';
(function(){

  class MapMainComponent {
    constructor($scope,$window,leafletData) {
      /*******************************************
       Resize leaflet to screen width and height
       ******************************************/
      angular.element($window).on("resize", resizeScreenAdjustments).trigger("resize");

      function resizeScreenAdjustments() {
        $('[name="map"]').height(angular.element($window).height()-80).width(angular.element($window).width());
        leafletData.getMap().then(function(map) {
          map.invalidateSize();
        });
      }

      /*******************************************
       Next Function
       ******************************************/

    }
  }

  angular.module('elbitApp')
    .component('mapMain', {
      templateUrl: 'app/mapMain/mapMain.html',
      controller: MapMainComponent
    });

})();

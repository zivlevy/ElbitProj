'use strict';
(function(){

  class MapMainComponent {
    constructor($scope,$window,leafletData,dataStore,info) {
      this.$scope=$scope;
      this.dataStore = dataStore;
      this.leafletData = leafletData;
      this.info = info;

      console.log("const");
      /*******************************************
       Resize leaflet to screen width and height
       ******************************************/
      angular.element($window).on("resize", resizeScreenAdjustments).trigger("resize");

      function resizeScreenAdjustments() {
        $('.leftbar').height(angular.element($window).height()-80);
        $('[name="map"]').height(angular.element($window).height()-80).width($('.mapcol').width());

        leafletData.getMap().then(function(map) {
          map.invalidateSize();
        });
      }



      /*******************************************
       set map center for new position on refresh
       or previous visited
       ******************************************/
      if (dataStore.center){
        $scope.center = dataStore.center;
      } else {
        $scope.center = {
          lat: 30.76,
          lng: 34.68,
          zoom: 12
        }
        dataStore.center = $scope.center;
      }
      angular.extend($scope, {
        defaults: {
          scrollWheelZoom: false
        },
        events: {
          map: {
            enable: ['zoomstart', 'drag', 'click', 'mousemove'],
            logic: 'emit'
          }
        }
      });
      // map init



      /*******************************************
       Next Function
       ******************************************/

    }

    $onInit (){
      var localThis=this;
      this.info.list().then(result=>{
        console.log(result[0]);
        this.infos=result;
        var heatInfos = [];
        for  (var infor in this.infos) {

          var i = [this.infos[infor].latitude,this.infos[infor].longitude, this.infos[infor].severity];
          heatInfos.push(i);
        }

        this.leafletData.getMap().then(map=> {
          this.map=map;
          var heat = L.heatLayer(heatInfos, {radius: 10}).addTo(this.map);
        });
      });
      console.log("here now ///////");



      this.$scope.$on('leafletDirectiveMap.mousemove',function(event,args) {
        localThis.$scope.eventDetected = "MouseMove";
        //
        console.log(args.leafletEvent.latlng);
      });

    }
  }

  angular.module('elbitApp')
    .component('mapMain', {
      templateUrl: 'app/mapMain/mapMain.html',
      controller: MapMainComponent
    });

})();

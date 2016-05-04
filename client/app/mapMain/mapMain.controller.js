'use strict';
(function () {

  class MapMainComponent {
    constructor(appConfig, $scope, $window, $http, dataStore, info, leafletData, leafletMapEvents) {
      this.appConfig = appConfig;
      this.$scope = $scope;
      this.$http = $http;
      this.dataStore = dataStore;
      this.info = info;
      this.leafletData = leafletData;
      this.leafletMapEvents = leafletMapEvents;

      /*******************************************
       Resize leaflet to screen width and height
       ******************************************/
      angular.element($window).on("resize", resizeScreenAdjustments).trigger("resize");

      function resizeScreenAdjustments() {
        $('.leftbar').height(angular.element($window).height() - 60);
        $('#mymap').height(angular.element($window).height() - 60).width($('.mapcol').width());
      }

    };

    $onInit() {
      var localThis = this;

      //init map
      this.initMap();

      //setup map events
      this.setMapEvents();

      //this.info.list().then(result=> {
      //  console.log(result[0]);
      //  this.infos = result;
      //  var heatInfos = [];
      //  for (var infor in this.infos) {
      //
      //    var i = [this.infos[infor].latitude, this.infos[infor].longitude, this.infos[infor].severity];
      //    heatInfos.push(i);
      //  }
      //  this.leafletData.getMap('mymap').then(map=> {
      //    var heat = L.heatLayer(heatInfos, {radius: 10}).addTo(map);
      //  });
      //});


    };

    initMap() {
      angular.extend(this.$scope, {
        events: {
          map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
          }
        },
        center: this.appConfig.mapCenter,
        defaults: {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          minZoom: 5,
          tileLayerOptions: {
            detectRetina: true,
            reuseTiles: true,
          },
          scrollWheelZoom: true
        }
      });
    };

    setMapEvents() {
      var localThis = this;
      this.leafletData.getMap('mymap').then(map=> {
        console.log("dasdfasdfasdf");
        map.on('click', function (e) {
          var point = {name: 'cam12345', geometry: {type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}};
          var pJson = angular.toJson(point);
          console.log(pJson);
          localThis.$http.post('/api/sen_cameras', pJson).then(res=> {
            console.log(res.data);
          });
        });
      });
    }
  }


  angular.module('elbitApp')
    .component('mapMain', {
      templateUrl: 'app/mapMain/mapMain.html',
      controller: MapMainComponent
    });

})();

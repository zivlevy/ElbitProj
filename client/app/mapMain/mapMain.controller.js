'use strict';
(function () {

  class MapMainComponent {
    constructor(appConfig, $scope, $window, $http, dataStore, info, leafletData, leafletMapEvents, _) {
      this.appConfig = appConfig;
      this.$scope = $scope;
      this.$http = $http;
      this.dataStore = dataStore;
      this.info = info;
      this.leafletData = leafletData;
      this.leafletMapEvents = leafletMapEvents;
      this._ = _;
      this.markers = {};
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
      //this.markers = {
      //  osloMarker: {
      //    lat: 59.91,
      //    lng: 10.75,
      //    message: "I want to travel here!",
      //    focus: true,
      //    draggable: false
      //  }
      //};

      var localThis = this;
      var myMarkers = {};
      //init info markers
      this.info.list().then(result=> {
        this._.each(result, function (element, index, list) {


          var toInsert = {
              lat: element.coordinates.coordinates[1],
              lng: element.coordinates.coordinates[0],
              draggable: true
          }
          var markerName = 'mark' + index;

          myMarkers[markerName] = toInsert;
          console.log(myMarkers);
        });
        this.$scope.markers = myMarkers;
      });

      angular.extend(this.$scope, {
        events: {
          map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
          }
        },
        defaults: {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          minZoom: 0,
          tileLayerOptions: {
            detectRetina: true,
            reuseTiles: false,
          },
          scrollWheelZoom: true
        },
        markers: this.markers,
        center: {
          lat: 32.06250082836163,
          lng: 34.79513347148895,
          zoom: 13
        },
        layers: {
          baselayers: {
            osm: {
              name: 'OpenStreetMap',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              type: 'xyz'
            },
            satellite: {
              name: 'Satellite',
              url: 'https://1.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=cNjOx0DxhSTwsngVa9My&app_code=CQ45DHJ3KvXpHjUoLwjTVg',
              type: 'xyz',
              layerOptions: {}
            },
            grayscale: {
              name: 'Grayscale',
              url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
              type: 'xyz',
              layerOptions: {}
            }
          },
          overlays: {
            lines: {
              name: 'Lines',
              type: 'group',
              visible: true
            },
            shapes: {
              name: 'Shapes',
              type: 'group',
              visible: false
            },
            fire: {
              name: 'OpenFireMap',
              type: 'xyz',
              url: 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
              layerOptions: {
                attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                continuousWorld: true
              }

            }
            ,


          }
        },
        paths: {
          //p1: {
          //  color: '#008000',
          //  weight: 4,
          //  latlngs: [markers.London, markers.Manchester],
          //  layer: 'lines'
          //},
          //p2: {
          //  weight: 3,
          //  opacity: 0.5,
          //  latlngs: [
          //    [markers.London, markers.Lincoln],
          //    [markers.Manchester, markers.Worcester]
          //  ],
          //  type: 'multiPolyline',
          //  layer: 'lines'
          //
          //},
          //c1: {
          //  weight: 2,
          //  color: '#ff612f',
          //  latlngs: markers.Northhampton,
          //  radius: 10000,
          //  type: 'circle',
          //  layer: 'shapes'
          //},
          //c2: {
          //  weight: 2,
          //  color: '#ff612f',
          //  latlngs: markers.Lincoln,
          //  radius: 50,
          //  type: 'circleMarker',
          //  layer: 'shapes'
          //},
          //pg1: {
          //  latlngs: [markers.London, markers.Worcester, markers.Lincoln],
          //  stroke: false,
          //  fillColor: '#ff69b4',
          //  type: 'polygon',
          //  layer: 'shapes'
          //},
          //pg2: {
          //  weight: 1,
          //  color: '#2e3974',
          //  latlngs: [
          //    [markers.London, markers.Worcester, markers.Northhampton],
          //    [markers.Manchester, markers.Lincoln, markers.York]
          //  ],
          //  type: 'multiPolygon',
          //  layer: 'shapes'
          //},
          //r1: {
          //  latlngs: [markers.Lincoln, markers.York],
          //  type: 'rectangle',
          //  layer: 'shapes'
          //}
        }
      });


      this.leafletData.getMap('mymap').then(map=> {


      });


    };

    setMapEvents() {
      var localThis = this;
      this.leafletData.getMap('mymap').then(map=> {
        console.log("dasdfasdfasdf");
        map.on('click', function (e) {
          //var point = {name: 'cam12345', coordinates: {type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat]}};
          //var pJson = angular.toJson(point);
          //
          //
          //console.log(pJson);
          //localThis.$http.get('/api/sensors/random').then(res=>{
          //  console.log(res);
          //});
          //localThis.$http.post('/api/sen_cameras', pJson).then(res=> {
          //  console.log(res.data);
          //});
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

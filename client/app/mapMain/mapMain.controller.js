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

      this.data = {};

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
    };


    initMap() {
      var leafletView = new PruneClusterForLeaflet(60);
      var localThis = this;

      //build cluater and heat map layers
      angular.extend(this.$scope, {
        events: {
          map: {
            enable: ['click', 'drag', 'blur', 'touchstart'],
            logic: 'emit'
          },
          marker: {
            enable: [],
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
        watchOptions: {
          markers: {
            type: null,
            individual: {
              type: null
            }
          }
        },
        markers: {
          testMarker: {
            layer: 'markersOverlay',
            lat: -22.911948,
            lng: -43.232162,
            focus: false,
            message: 'My Marker on Leaflet',
            compileMessage: true
          }
        },
        center: this.appConfig.center,
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

            markersOverlay: {
              name: 'Markers',
              type: 'group',
              visible: true
            },
            heat: {
              name: 'Heat Map',
              type: 'heat',
              data: [],
              layerOptions: {
                radius: 10,
                blur: 10
              },
              visible: false
            }
          }
        },
        paths: {}
      });


// Add Prune on map Layer
      // Make Variable List of Object

      // Make Variable List of Object
      var markers = {};


      // Add Prune on map Layer


        this.info.list().then(result=> {

          function addPoint(uid, latitude, longitude) {
            var marker = new PruneCluster.Marker(latitude, longitude);
            marker.category = 5;
            marker.weight = 4;
            // Make Object List
            markers[uid] = marker;

            leafletView.RegisterMarker(marker);

          }

          this._.each(result, function (element, index, list) {

            addPoint('dd', element.coordinates.coordinates[1], element.coordinates.coordinates[0]);
            //heatmaps
            var heatmapsToInsert = [
              element.coordinates.coordinates[1],
              element.coordinates.coordinates[0],
              10
            ]
            localThis.$scope.layers.overlays.heat.data.push(heatmapsToInsert);


          });
        });

      this.leafletData.getMap('mymap').then(function (map) {
        map.addLayer(leafletView);
        leafletView.ProcessView();
      });
    }


      setMapEvents()
      {
        return;
        var localThis = this;
        this.leafletData.getMap('mymap').then(map=> {
          map.on('viewreset', function () {
            var zoom = this.getZoom();

            if (zoom > 14) {

            } else {


            }
          }, map);
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


    angular
  .
    module(

    'elbitApp'
  )
  .
    component(

    'mapMain'
  , {
    templateUrl:
    'app/mapMain/mapMain.html'
  ,
    controller:MapMainComponent
  }
  )
  ;

})();

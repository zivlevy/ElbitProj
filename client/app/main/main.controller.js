'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    console.log("constract");
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.sensors =[];
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    console.log("init");
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });
    this.$http.get('/api/sensors').then(response => {
      this.sensors = response.data;
      console.log(response.data);

    });
    console.log("end");
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('elbitApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();

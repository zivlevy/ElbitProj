'use strict';

angular.module('elbitApp')
  .factory('info', function ($http,$q) {
    // Service data



    'use strict';

// crossfilter service


      var exports = {};
      var cf;
      // crossfilter object: browser side analytics library, holds array type data (w/incremental updates).
      // dimensions are fast queries on data, e.g. view sorted by followers_count or retweet_count of the original message

    exports.severity = function (){
      var deferred=$q.defer();
      $http.get('/api/infos').then(response => {
        cf = crossfilter(response.data);
        var severityDim = cf.dimension(function(d) { return d.severity; });
        var severityGroup = severityDim.group().reduceCount(function(d) {return d.severity;});
        var dateDim = cf.dimension(function(d) { return d.createdAt });
        //var dateDim = cf.dimension(function(d) {return d.updatedAt;});
        //print_filter(dateDim);
        //print_filter("severityDim");
        deferred.resolve({dimension:severityDim, group:severityGroup, x:dateDim});


        function print_filter(filter){
          var f=eval(filter);
          if (typeof(f.length) != "undefined") {}else{}
          if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
          if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
          console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        }

      });
      return deferred.promise;
    };






    // list all
    exports.list = function () {

      var deferred=$q.defer();
      if (infos ){
        console.log("saved you ...");
        deferred.resolve(infos);
      } else {
        $http.get('/api/infos').then(response => {
          infos = response.data;
          deferred.resolve(infos);

        });
      }

      return deferred.promise;

    };

      return exports;


    ///////////////
    var infos = [];
    //
    ////Service logic
    //
    //
    //
    //
    //// Public API
    //return {
    //  list: function () {
    //    var deferred=$q.defer();
    //    $http.get('/api/infos').then(response => {
    //      console.log(response);
    //      infos = response.data;
    //      deferred.resolve(infos);
    //
    //    });
    //    return deferred.promise;
    //
    //  }
    //};
  });

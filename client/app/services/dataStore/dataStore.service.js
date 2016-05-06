'use strict';

angular.module('elbitApp')
  .factory('dataStore', function (socket,_,$http,$q,Upload) {
    // Service logic

    var persons =[];
    var isLoaded = false;

    //---------  Public API -----------------
    return {

      /********************
       * list of all
       *********************/
      list: function () {
        var deferred=$q.defer();
        if (!isLoaded){
          $http.get('/api/ent_persons').then(response => {
            isLoaded = true;
            persons = response.data;
            deferred.resolve(persons);

            //---------  socket support -----------------
            socket.syncUpdates('entPerson',persons, function(event, person, personslist) {

            });

          });
        } else {
          deferred.resolve(persons);
        }
        return deferred.promise;
      },

      /********************
       * delete
       *********************/
      delete:function(person){
        console.log('=============');
        var deferred=$q.defer();
        $http.delete('/api/ent_persons/' +person._id)
          .then(
            function(response){
              console.log('----------00000000');
              deferred.resolve(response.data);
            },
            function(response){
              // failure call back
            }
          );
        return deferred.promise;
      },

      /********************
       * add
       *********************/
      addNew : function(person){
        var deferred=$q.defer();
        delete person._id;
        delete person.__v;
        console.log(person);
        Upload.upload({
          url: '/api/ent_persons',
          data: person,
        }).then (res=>{
          console.log(res);
          deferred.resolve(res.data);
        });
        return deferred.promise;
      },

    update : function(person){
      var deferred=$q.defer();
      console.log(person);
      Upload.upload({
        url: '/api/ent_persons/' +person._id,
        data: person,
        method:'PUT'
      }).then (res=>{
        deferred.resolve(res.data);

      });
      return deferred.promise;
    }


  };
  });

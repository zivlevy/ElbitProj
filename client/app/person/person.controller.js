'use strict';
(function(){

  class PersonComponent {
    constructor($http,$window, Upload, dataStore,info, _) {
      this.message = 'Hello';
      this.$http=$http;
      this.persons ;                   // all persons
      this.defaultPerson = {'iff':"enemy"}; // default setup for person
      this.person = {};
      this.personIndex;// the current selected person
      this.cashedParson={};                    // new Person
      this.$window=$window;
      this.picFile =null;
      this.Upload = Upload;
      this.dataStore=dataStore;
      this.chartObject;
      this.chartGroup;
      this.xAxis;
      this.info=info;


      this.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { field: 'thumbImageURL',enableColumnMenu: false,enableSorting: false,resizable:true, minWidth:50,displayName: "", width: '50', cellTemplate:"<img width=\"60px\" height=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
          { field: 'name' , enableColumnMenu: false},
          { field: 'description' , enableColumnMenu: false},
          { field: 'address', enableColumnMenu: false},
          { field: 'iff', enableColumnMenu: false}
        ],
        rowHeight:50,

        //onRegisterApi: function( gridApi ) {
        //  $scope.grid1Api = gridApi;
        //}
      };

      /*******************************************
       Resize when screen width / height changes
       ******************************************/
      angular.element($window).on("resize", resizeScreenAdjustments).trigger("resize");

      function resizeScreenAdjustments() {
        $('.table-fixed tbody').height(angular.element($window).height()-160);
      }

    }
    $onInit() {

      this.dataStore.list().then(result=>{
        this.persons= result;
        this.gridOptions.data = this.persons;

      });
      var myThis = this;
      var promise =this.info.severity();
      promise.then(result=>{
        this.chartObject = result.dimension;
        this.chartGroup = result.group;
        this.xAxis=result.x;

      });
    };

    clicked(person){
      console.log(person);
      this.person=angular.copy(person);
      this.cashedParson = person;

    }

    /*****************************
     * CRUD
     * **************************/

    addNew = function(){

      this.dataStore.addNew(this.person).then(res=>{
        this.person=this.defaultPerson;

      });;
    };

    uploadPerson (){
      this.dataStore.update(this.person).then(res=>{

      });

    };

    deletePerson(person){
      this.dataStore.delete(person).then(res=>{
       this.person=this.defaultPerson;
      });;
    };

    toggleEdit = function(index){
      this.persons[index].edit = !this.persons[index].edit;
    };

    cancel(index){
      this.person=self.defaultPerson;
    };
  }

  angular.module('elbitApp')
    .component('person', {
      templateUrl: 'app/person/person.html',
      controller: PersonComponent
    });

})();

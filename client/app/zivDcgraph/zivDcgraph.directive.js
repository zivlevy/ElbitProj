'use strict';

angular.module('elbitApp')
  .directive('zivDcgraph', function () {
    return {
      templateUrl: 'app/zivDcgraph/zivDcgraph.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        //scope.$watch(scope.dimension, function(newValue, oldValue) {
        //  if (newValue)
        //    console.log("I see a data change!");
        //}, true);
        //var paragraph = element.children()[0];
        //$(paragraph).on("click", function() {
        //  $(this).css({ "background-color": "red" });
        //});

        var chart1 = dc.barChart("#ziv");
        chart1
          .width(500).height(100)
          .dimension(scope.dimension)
          .group(scope.group)
          .x(d3.scale.linear().domain([0, 12]))
          .yAxis().ticks(0);
        chart1.render();

      },
      scope: { dimension: '=',
                group:'=',
                xAxis:'='}
    };
  });

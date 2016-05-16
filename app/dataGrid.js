;(function() {
  'use strict';

  angular
    .module('app')
    .directive('gridGrid', dataGrid);

  function dataGrid() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var grid = element[0],
        tables = [].slice.call(grid.querySelectorAll('.data-table')),
        head = grid.querySelector('.data-grid__scroll'),
        body = grid.querySelector('.data-grid__body');

        function setSize() {
          tables.forEach( function(item) {
            item.style.width = '';
          });

          var width = tables[0].offsetWidth;

          tables.forEach( function(item) {
            item.style.width = width + 'px';
          });
        };

        setSize();

        body.addEventListener('scroll', function() {
          var scroll = body.scrollLeft;
          head.style.transform = 'translateX(' + -scroll +'px)';
        });

        // window.addEventListener('resize', function() {
        //   setSize();
        // });
      }
    }
  };

})();

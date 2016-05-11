;(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngSanitize',
      'firebase'
    ])
    // .value('restURL', 'https://luminous-heat-9446.firebaseio.com')
    // .service('firebaseRef', function(restURL) {
    //   return new Firebase(restURL)
    // })
    .config(RouteConfig);


    RouteConfig.$inject = ['$routeProvider', '$locationProvider'];

    function RouteConfig($routeProvider, $locationProvider) {
      // $routeProvider.otherwise({
      //   redirectTo: '/'
      // });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
})();

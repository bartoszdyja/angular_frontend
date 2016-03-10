var frontendPage = angular.module('frontendPage',['ngRoute'])

frontendPage.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/show.html'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);

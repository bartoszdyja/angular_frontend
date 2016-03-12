var frontendPage = angular.module('frontendPage',['ngRoute', 'ngSanitize'])

frontendPage.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'FinanceCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/show.html'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);

  frontendPage.controller('FinanceCtrl', function($scope, $http) {
    $scope.someMessage = '<b>abs</b> asdfas'
    $http.get('http://www.bdfinanse.pl/bd_site/api/testimonials.php')
         .then(function(res){
            $scope.testimonials = res.data.records;
          });
    $http.get('http://www.bdfinanse.pl/bd_site/api/articles.php')
         .then(function(res){
            $scope.articles = res.data.articles;
          });
  });

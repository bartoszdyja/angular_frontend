var frontendPage = angular.module('frontendPage',['ngRoute', 'ngSanitize'])

frontendPage.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'FinanceCtrl'
      }).
      when('/article/:articleId', {
        templateUrl: 'partials/article.html',
        controller: 'ArticleCtrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);



  frontendPage.controller('FinanceCtrl', function($scope, $http) {
    $http.get('http://www.bdfinanse.pl/bd_site/api/testimonials.php')
         .then(function(res){
            $scope.testimonials = res.data.records;
          });
    $http.get('http://www.bdfinanse.pl/bd_site/api/articles.php')
         .then(function(res){
            $scope.articles = res.data.articles;
          });
  });


  frontendPage.controller('ArticleCtrl', function ($routeParams, $scope, $http) {
    $http.get("http://www.bdfinanse.pl/bd_site/api/article.php?id="+$routeParams.articleId)
         .then(function(res){
            $scope.article = res.data.articles[0];
          });
    $scope.articleId = $routeParams.articleId;
});

frontendPage.controller('ContactCtrl', function ($scope, $http) {
    console.log('In cont');
    $scope.submit = function(contactform) {
      console.log('In func');
      if (contactform.$valid) {
        console.log('Form valid');
      }

    }

});

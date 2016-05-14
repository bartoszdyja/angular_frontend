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
      when('/team', {
        templateUrl: 'partials/team.html'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      });
      // otherwise({
      //   redirectTo: '/'
      // });
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
  $scope.result = 'hidden'
  $scope.resultMessage;
  $scope.formData;
  $scope.submitted = true;
  $scope.submitButtonDisabled = false;
    console.log('In cont');
    $scope.submit = function(contactform) {
      console.log('In func');
      if (contactform.$valid) {
        console.log('Form valid');
        $http({
          method: 'POST',
          url: 'contact-form.php',
          data: $.param($scope.formData),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data){
          console.log(data);
          if (data.success) { //success comes from the return json object
            $scope.submitButtonDisabled = true;
            $scope.resultMessage = data.message;
            $scope.result='bg-success';
          } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = data.message;
            $scope.result='bg-danger';
          }
        });

      }

    }

});

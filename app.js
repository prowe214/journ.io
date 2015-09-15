var app = angular.module('journio', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'EventsController'
    })
});

app.controller('EventsController', ['$scope', function ($scope) {
  $scope.message = 'TEST MESSAGE'
}]);

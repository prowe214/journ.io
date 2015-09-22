
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'EventsController'
    })
    .when('/events', {
      templateUrl: 'partials/events.html',
      controller: 'EventsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

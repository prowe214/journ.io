myApp.controller('EventsController', [
    '$scope',
    '$window',
    'facebookService',
    '$location',
    '$firebaseObject',
  function ($scope, $window, facebookService, $location, $firebaseObject) {
    var ref = new Firebase("https://journio.firebaseio.com");
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, 'storedUserData');

  $scope.storedUserData = [];
  $scope.startDate = 0;
  $scope.endDate = 0;
  $scope.collapsed = true;
  $scope.message = 'TEST MESSAGE';
  $scope.pullEvents = function () {
    console.log('PULLING EVENTS');
          facebookService.getEvents()
            .then(function (data) {
              console.log('DATA =', data);
              $scope.checkSettings(data);
              $scope.FBevents = data.events.data;
              $scope.FBevents.forEach($scope.changeFbDate);
              console.log('EVENTS - ', $scope.FBevents);
          });
  };

  $scope.checkSettings = function (userData) {
    console.log('USER DATA =', userData);
    console.log('ALL STORED DATA = ', $scope.storedUserData);
    for (var i = 0; i < $scope.storedUserData.length; i++) {
      if ($scope.storedUserData[i].id === userData.id) {
        console.log('MATCHED USER!');
      } else {
        $scope.storedUserData.$add(userData.id);
        console.log('NO MATCH');
      }
    }
  };
  $scope.logout = function () {
    FB.logout();
  };
  $scope.changeFbDate = function (fbEvent) {
    var newDate = new Date(fbEvent.start_time).getTime();
    fbEvent.start_time = newDate;
    if (fbEvent.start_time < Date.now()) {
      fbEvent.visible = false;
    } else {
      fbEvent.visible = true;
    }
  };
  $scope.parseDateFrom = function (dateFrom) {
    $scope.startDate = dateFrom.getTime();
    console.log('START DATE = ', $scope.startDate);
  };
  $scope.parseDateTo = function (dateTo) {
    $scope.endDate= dateTo.getTime();
    console.log('END DATE = ', $scope.endDate);
  };

    //FACEBOOK API CALL
      // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
        if (response.status === 'connected') {
          $scope.pullEvents();
          $scope.checkSettings();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook to use this application.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
      }

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1675771156002308',
          cookie     : true,  // enable cookies to allow the server to access
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.2' // use version 2.2
        });

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

  // END FACEBOOK API CALL


}]);

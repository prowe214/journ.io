myApp.controller('EventsController', [
    '$scope',
    '$window',
    'facebookService',
    '$location',
  function ($scope, $window, facebookService, $location) {

    //FACEBOOK API CALL
      // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        // console.log('AUTH OBJECT =', response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          testAPI();
          $location.path('/');
          console.log('CONNECTING');
          $scope.pullEvents();
          // $scope.getEvents();
          // $scope.events = myEvents;
          // $window.location.href = '#/events';
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
      }

      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          console.log("FB LOGIN RESPONSE =", response);
          statusChangeCallback(response);
        });
      }

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1675771156002308',
          cookie     : true,  // enable cookies to allow the server to access
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.2' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

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

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
      }
  // END FACEBOOK API CALL

  $scope.pullEvents = function () {
    console.log('PULLING EVENTS');
          facebookService.getEvents()
            .then(function (data) {
              $scope.FBevents = data.events.data;
              $scope.FBevents.forEach($scope.changeFbDate);
              console.log('EVENTS FOR REAL =', $scope.FBevents);
          });
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
    console.log('VISIBLE? = ', fbEvent.visible);
  };
  $scope.parseDateFrom = function (dateFrom) {
    // CHANGE   Wed Sep 16 2015 00:00:00 GMT-0600 (MDT)
    // TO       2015-10-31T19:00:00-0600
    $scope.startDate = dateFrom.getTime();
    console.log('START DATE = ', $scope.startDate);
    // $scope.startDate = result;
  };
  $scope.parseDateTo = function (dateTo) {
    // CHANGE   Wed Sep 16 2015 00:00:00 GMT-0600 (MDT)
    // TO       2015-10-31T19:00:00-0600
    $scope.endDate= dateTo.getTime();
    console.log('END DATE = ', $scope.endDate);
    // $scope.endDate = result;
  };
  $scope.startDate = 0;
  $scope.endDate = 0;
  $scope.message = 'TEST MESSAGE';

}]);

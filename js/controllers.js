myApp.controller('EventsController', [
    '$scope',
    '$window',
    'facebookService',
    '$location',
    '$firebaseArray',
    '$sce',
  function ($scope, $window, facebookService, $location, $firebaseArray, $sce) {
    var ref = new Firebase("https://journio.firebaseio.com");

    $scope.storedUserData = $firebaseArray(ref); // Firebase data comes in as an array w/ id properties
    $scope.startDate = 0;
    $scope.endDate = 0;
    $scope.collapsed = true;
    $scope.currentUser = '';
    console.log('EVENTS =', $scope.FBevents);
    $scope.pullEvents = function () {
            facebookService.getEvents()
              .then(function (data) {
                $scope.currentUser = data;
                $scope.checkSettings(data);
                document.getElementById('status').innerHTML =
                  'Thanks for logging in, ' + data.name + '!';
                $scope.FBevents = data.events.data;
                $scope.FBevents.forEach($scope.changeFbDate);
            });
    };
    $scope.checkSettings = function (userData) {
      console.log('CHECKING SETTINGS');
      console.log('USER DATA = ', userData);
      console.log('CURRENT START DATE', $scope.startDate);
      console.log('CURRENT END DATE', $scope.endDate);
      for (var i = 0; i < $scope.storedUserData.length; i++) {
        if ($scope.storedUserData[i].userId == userData.id) {
          $scope.startDate = $scope.storedUserData[i].startDate;
          console.log('ADJUSTED START DATE', $scope.startDate);
          $scope.endDate = $scope.storedUserData[i].endDate;
          console.log('ADJUSTED END DATE', $scope.endDate);
          return;
        }
      }
      $scope.storedUserData.$add({userId: userData.id});
    };
    $scope.updateSettings = function (userData) {
      for (var i = 0; i < $scope.storedUserData.length; i++) {
        if ($scope.storedUserData[i].userId == userData.id) {
          $scope.currentRecord = $scope.storedUserData[i].$id;
          $scope.storedUserData[i].startDate = $scope.startDate;
          $scope.storedUserData[i].endDate = $scope.endDate;
          $scope.storedUserData.$save($scope.storedUserData[i]);
          console.log('NEW: ', $scope.storedUserData[i]);
          return;
        }
      }
      $scope.storedUserData.$add({userId: userData.id});
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
      $scope.updateSettings($scope.currentUser);
    };
    $scope.parseDateTo = function (dateTo) {
      $scope.endDate= dateTo.getTime();
      $scope.updateSettings($scope.currentUser);
      console.log('USER DATA =', $scope.storedUserData);
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

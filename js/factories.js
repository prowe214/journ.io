
myApp.factory('facebookService', function($q) {
  return {
    getEvents: function() {
        var deferred = $q.defer();
        FB.api('/me', {
            fields: 'id,name,events'
        }, function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }
  };
});

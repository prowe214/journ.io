
myApp.filter('richText', ['$sce', function ($sce) {
  return function (text) {
    text = text.split('↵'); //\u21b5
    console.log('TEXT -', text);
  };
}]);

myApp.filter('dateFilter', function () {
  return function (input, scope) {
    var results = [];
    input.forEach(function (item) {
      if (item.start_time > Date.now()) {
        if (item.start_time > scope.startDate && item.start_time < scope.endDate) {
          results.push(item);
        }
      }
    });
    return results;
  };
});

myApp.filter('fileFilter', function () {
  return function (files, e) {
    var results = [];
    for (var i = 0; i < files.length; i++) {
      if (files[i].eventId === e.id) {
        results.push(files[i]);
      }
    }
    return results;
  };
});

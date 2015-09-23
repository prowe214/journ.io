
myApp.filter('richText', function () {
  return function (text) {
    return text.split('↵');
  };
});

myApp.filter('dateFilter', function () {
  return function (input) {
    console.log('INPUT', input);
    return;
  };
});


app.filter('richText', function () {
  return function (text) {
    return text.split('↵');
  };
});

app.filter('dateFilter', function () {
  return function (e, dateFrom, dateTo) {
    console.log('DATE FROM =', dateFrom);
    console.log('DATE TO =', dateTo);
    console.log('EVENT =', e);
    return e;
  };
});

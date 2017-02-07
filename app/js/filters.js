angular.module('tweetTimeLine')

//filter to sort the tweets based on the creation date/time
.filter('sortTweets', [function () {

    return function (input) {
        return input.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        });

    };
}])

//filter to remove &amp; if present in the tweet message
.filter('tweetText',[function () {
  return function (input) {
    var out=input;

    if(out.indexOf('&amp;')!=-1)
      out=out.replace(/&amp;/g, '&');

    return out;
  };
}]);

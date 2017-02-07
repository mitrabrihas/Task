angular.module('tweetTimeLine')

.factory('shareUserDataService', [function () {
    var data = {
        username: '',
    };

    var serviceReturnObj={
      getUser:getUser,
      setUser:setUser
    };

    return serviceReturnObj;

        function getUser() {
            return data;
        }

        function setUser(user) {
            data.username = user;
        }

}])

.factory('tweetsService', ['$http', function ($http) {

var service={
  getTweets:getTweets,
  postTweet:postTweet
};
return service;

        function getTweets(user) {
            //construct URL
            var url = "/user_timeline/" + user;

            var promise = $http({
                    method: "GET",
                    url: url
                })
                .then(
                    function success(response) {
                        return response.data;
                    },
                    function failure(response) {
                        console.log(response);
                    });

            return promise;

        }
        
        function postTweet(tweetText) {
            var tweetObj = {
                tweetText: tweetText
            };
            var url = "/postTweet";

            //$http returns a promise which is handled in the controller
            return $http({
                method: "POST",
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: tweetObj
            });
        }


}]);

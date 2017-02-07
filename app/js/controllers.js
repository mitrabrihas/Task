angular.module('tweetTimeLine')

.controller('listControl', ['$scope', 'shareUserDataService', '$location', function ($scope, shareUserDataService, $location) {

    //push the usernames in an array to show it in the drop down list
    //add new user here to see it in the drop down list
    $scope.listOfOptions = ['uchiha_brihas', 'ESPNcricinfo', 'SproutSocial'];

    $scope.user = shareUserDataService.getUser();

    //set the user in the service object to share it with other controllers
    $scope.setUserInService = function (user) {
        shareUserDataService.setUser(user);
        $location.path('/getTweets/' + user);
    };
}])

.controller('userControl', ['$scope', 'shareUserDataService', 'tweetsService', 'sortTweetsFilter','$location', function ($scope, shareUserDataService, tweetsService, sortTweetsFilter,$location) {

    $scope.userSelected = shareUserDataService.getUser().username;
    $scope.msgVisible = false;
    $scope.openDivBool = false;
    $scope.tweetDetails = {};
    $scope.tweetSuccess = false;
    $scope.showComposeDiv=false;
    $scope.hasOEmbed=false;

    $scope.openDiv = function () {
        $scope.openDivBool = true;
    };

    $scope.showUsersList=function () {
      $location.path('/');
    };

    //compose new tweet
    $scope.composeTweet = function (tweetText) {

        tweetsService.postTweet(tweetText).then(function success(response) {
          if(response.data.message){
            $scope.msgVisible = true;
            $scope.tweetSuccess = false;
            }
            else{
              $scope.msgVisible = false;
              $scope.tweetSuccess = true;
              //Call the getTweets function to update the tweets
              tweetsService.getTweets(response.data.user)
              .then(function success(response) {
                  //call the filter to sort the tweets in a desending order(latest should shown first in the list)
                  $scope.tweets = sortTweetsFilter(response);
              },function failure(response) {
                console.log(response);
              });
            }

        }, function failure(response) {
            $scope.msgVisible = true;
            $scope.tweetSuccess = false;

        });

    };


    //Need to work with the then function as the response can be asynchronous
    tweetsService.getTweets($scope.userSelected)
    .then(function success(response) {
        //call the filter to sort the tweets in a desending order(latest should shown first in the list)
        $scope.tweets = sortTweetsFilter(response);
        $scope.showComposeDiv=true;
    },function failure(response) {
      console.log(response);
      $scope.showComposeDiv=false;
    });

}]);

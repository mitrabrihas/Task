(function () {

    'use strict';

    //Create new module with dependencies in the main file--app.js
    angular.module('tweetTimeLine', ['ngSanitize', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        //set the html5Mode to remove the '#' from the link and to support html5Mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        //configure the routes
        $routeProvider
            .when('/', {
                controller: 'listControl',
                templateUrl: '../views/userSelection.html'

            })
            .when('/getTweets/:user', {
                controller: 'userControl',
                templateUrl: '../views/tweetList.html',

            });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

    }]);


})();

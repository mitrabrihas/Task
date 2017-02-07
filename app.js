var express = require('express');
var app = express();
var Twit = require('twit');
var config = require('./config');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var MAX_WIDTH = 305;
var port = process.env.PORT || 5000;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';
var TWEET_COUNT = 5;

// instantiate Twit module
var twitter = new Twit(config.twitter);

app.get('/user_timeline/:user', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var tweets = [],
        oEmbedTweets = [];

    params = {
        screen_name: req.params.user, // the user id passed in as part of the route
        count: TWEET_COUNT // how many tweets to return
    };

    // request data
    twitter.get(USER_TIMELINE_URL, params, function (err, data, resp) {

        tweets = data;
        // console.log(data);
        var i = 0,
            len = tweets.length;

        for (i; i < len; i++) {
            getOEmbed(tweets[i]);
        }
    });

    //get oEmbed details
    function getOEmbed(tweet) {

        // oEmbed request params
        var params = {
            "id": tweet.id_str,
            "maxwidth": MAX_WIDTH,
            "hide_thread": true,
            "omit_script": true
        };

        // request data
        twitter.get(OEMBED_URL, params, function (err, data, resp) {
            tweet.oEmbed = data;
            oEmbedTweets.push(tweet);

            // check if we have oEmbed HTML for all Tweets
            if (oEmbedTweets.length == tweets.length) {
                res.setHeader('Content-Type', 'application/json');
                res.send(oEmbedTweets);
            }
        });
    }

});

//Post a tweet
//You can only post a tweet if you have configured app in your twitter account
app.post('/postTweet', function (req, res) {

    twitter.post('statuses/update', {
        status: req.body.tweetText
    }, function (err, data, response) {
      res.setHeader('Content-Type', 'application/json');

      if(err){
        res.send(err);
      }
      else{
        res.send(data);
      }

    });
});


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/app/index.html");
});

app.use(express.static(__dirname + '/app'));

app.listen(port, function () {
    console.log('Listening on ' + port);
});

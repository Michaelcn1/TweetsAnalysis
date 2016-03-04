
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var politician = require('./routes/politician');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	console.log(app.get('env'));
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/list', politician.list);
app.get('/politicians', politician.list);
app.get('/followersCounts', politician.followerCounts);
app.get('/followotherparty', politician.followotherparty);
app.get('/followallparty', politician.followallparty);
app.get('/tweetsCounts', politician.tweetsCounts);
app.get('/friendsCounts', politician.friendsCounts);
app.get('/tweetsbyparty', politician.tweetsbyparty);
app.get('/retweetCounts', politician.retweetCounts);
app.get('/politicians/:politicianId', politician.show);
app.get('/followedBy', politician.followedBy);
app.get('/weekdayReport', politician.weekdayReport);
app.get('/tweetSourceReport',politician.tweetSourceReport);
app.get('/firstTweetReport',politician.firstTweetReport);
app.get('/tweetHourReport',politician.tweetHourReport);
app.get('/frequentWordsByName',politician.frequentWordsByName);
app.get('/frequentWords',politician.frequentWords);
app.get('/hashtagsByName',politician.hashtagsByName);
app.get('/mentionedPeopleByName',politician.mentionedPeopleByName);
app.get('/tweetHourByNameReport',politician.tweetHourByNameReport);
app.get('/trendyTopic',politician.trendyTopic);
app.get('/tweetSentimentByKeyword',politician.tweetSentimentByKeyword);
app.get('/tweetSentimentByKeyPublic',politician.tweetSentimentByKeyPublic);
app.get('/tweetSentiment2ByKeyword',politician.tweetSentiment2ByKeyword);
app.get('/geoLocation',politician.geoLocation);
app.get('/geoLocationMax',politician.geoLocationMax);


app.param('politicianId', politician.politician);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

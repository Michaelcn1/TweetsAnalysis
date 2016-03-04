/*
 * GET users listing.
 */

var dbName = 'politician_info';

var nano = require('nano')('http://127.0.0.1:5984');
var politicianInfoDB = nano.use(dbName);
var politicians = [];
var natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    _ = require('underscore');

var liberalPoliticians = ['LouiseAsherMP','TedBaillieu','BradBattinMP','DonnaBauerMP','GaryBlackwoodMP','NealeBurgess','RobertClarkMP','martindixonmp','michaelgidley',
    'MatthewGuyMP','DavidHodgettMP','andrewkatosmp','WendyLovellMP','CindyMcLeishMP','AmandaMillarMP','EMillerMP','TerryMulderMP','Vic_Premier','clemnewtonbrown',
    'michaelobrienmp','ODonohueMLC','CraigOndarchie','IngaPeulichMP','RichPhillipsMLC','AndrewRonaldsMP','DeeRyall','RyanSmithMP','SouthwickMP','billtilleymla',
    'heidivic','NickWakelingMP','GrahamWattMP','KimWellsMP','Mary_Wooldridge','lorrainewreford'
];

var laborPoliticians = ['JacintaAllanMP','DanielAndrewsMP','ColinBrooksMP','CCampbellMP','ACarbinesMP','BenCarrollMP','LilyDAmbrosioMP','LukeDonnellan',
    'mareeedwardsmp','EidehKhalil','johnerenmp','MartinFoleyMP','Jane_GarrettMP','DanielleGreenMP','JillHennessyMP','SteveHerbertMP','NatHutchins','GavinJennings',
    'MarleneKairouz','JenniferKanis','SharonKnightMP','ShaunLeaneMP','JohnLendersMP','honglim_mp','JMaddenMP','Frank_McGuire',
    'CesarMelhem','JamesMerlinoMP','JennyMikakos','DonNardella','LisanevilleMP','wadenoonan','MartinPakulaMP',
    'timpallas','JudePerera1','JaalaPulford','RichardsonFiona','AdemSomyurek','BrianTeeMP','MarshaThomsonMP','rwynnemp','Bronwyn_Pike'
];

var greenPoliticians = ['GregMLC','ColleenHartland','sueMLC'];

var nationalsPoliticians = ['TimBullMP','PCrispMildura','HughDelahunty','DDrumMP','Tim_McCurdy','RussellNortheMP',
    'DannyOBrienMP','peterryanMP','BillSykesMP','PeterWalshMP','paulwellerMLA','JPowellMP'];

exports.list = function (req, res) {
    var params = {include_docs: true};
    politicianInfoDB.list(params, function (err, body) {
        if (!err) {
            console.log(body.rows.length);
            body.rows.forEach(function (doc) {
                if (doc.doc._id != '_design/analysis') {
                    politicians.push(doc.doc);
                }

            });

        } else {
            console.log(err);
        }
        res.send(200, {politicians: politicians});
    });


};


exports.followerCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'followers_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });


};


exports.tweetsCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'tweets_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
exports.tweetsbyparty = function (req, res) {
    var params = {group_level:1};
    politicianInfoDB.view('analysis', 'tweets_by_party', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, followers.length);
            console.log(slicedFollows);
            slicedFollows.sort(function (a, b) {
                return (b.value - a.value);
            });

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.friendsCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'friends_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.followotherparty = function (req, res) {
    console.log('followotherparty');
    var params = {group_level:1};
    var politicianRelationshipDB = nano.use('politician_relationship');
    politicianRelationshipDB.view('analysis', 'followotherparty', params, function (err, body) {
        var followers = [];
        if (!err) {

            followers = body.rows;
            
            console.log(followers);
            var slicedFollows = followers.slice(0, followers.length);
            console.log(slicedFollows);
            slicedFollows.sort(function (a, b) {
                return (b.value - a.value);
            });

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.followallparty = function (req, res) {
    console.log('followallparty');
    var params = {group_level:1};
    var politicianRelationshipDB = nano.use('politician_relationship');
    politicianRelationshipDB.view('analysis', 'followallparty', params, function (err, body) {
        var followers = [];
        if (!err) {

            followers = body.rows;
            
            console.log(followers);
            var slicedFollows = followers.slice(0, followers.length);
            console.log(slicedFollows);
            slicedFollows.sort(function (a, b) {
                return (b.value - a.value);
            });

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.retweetCounts = function (req, res) {
    var params = {descending: true};
    politicianInfoDB.view('analysis', 'retweet_count', params, function (err, body) {
        var followers = [];
        if (!err) {
            followers = body.rows;

            console.log(followers);
            var slicedFollows = followers.slice(0, 10);
            console.log(slicedFollows);

            res.send(200, slicedFollows);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.politician = function (req, res, next, id) {
    console.log('id=' + id);
    politicianInfoDB.get(id, function (err, body) {

        if (err) return next(err);
        if (!body) return next(new Error('Failed to load politician ' + id));
        req.politician = body;
        next();

    });
};

function findImage(screenName, party) {
    if (politicians.length == 0) {
        var params = {include_docs: true};
        politicianInfoDB.list(params, function (err, body) {
            if (!err) {
                console.log(body.rows.length);
                body.rows.forEach(function (doc) {
                    if (doc.doc._id != '_design/analysis') {
                        politicians.push(doc.doc);
                    }

                });

            } else {
                console.log(err);
            }
        });
    }
    for (var i = 0; i < politicians.length; i++) {
        if (screenName == politicians[i].screen_name) {
            var polName = politicians[i].name;
            if (party != politicians[i].party) {
                polName = '<div style="color:red">' + politicians[i].name + '</div>';
            }
            return {v: politicians[i].screen_name, f: polName + '<div><img src="' + politicians[i].profile_image_url + '"></div>'};
        }
    }

};

function firstTweetReportImage(screenName, party) {
    if (politicians.length == 0) {
        var params = {include_docs: true};
        politicianInfoDB.list(params, function (err, body) {
            if (!err) {
                console.log(body.rows.length);
                body.rows.forEach(function (doc) {
                    if (doc.doc._id != '_design/analysis') {
                        politicians.push(doc.doc);
                    }

                });

            } else {
                console.log(err);
            }
        });
    }
    for (var i = 0; i < politicians.length; i++) {
        if (screenName == politicians[i].screen_name) {
            var polName = politicians[i].name;
            if (party != politicians[i].party) {
                polName = '<div style="color:red">' + politicians[i].name + '</div>';
            }
            return {v: politicians[i].screen_name, f: polName + '<div><img src="' + politicians[i].profile_image_url + '"></div>'};
        }
    }

};


exports.followedBy = function (req, res) {
    //console.log('screen_name=' + req.query.screen_name + ' party=' + req.query.party);
    var screenName = req.query.screen_name;
    var params = {key: [screenName, req.query.party]};
    var politicianRelationshipDB = nano.use('politician_relationship');
    politicianRelationshipDB.view('analysis', 'followed_by', params, function (err, body) {
        var followers = [];
        if (!err) {

            var name = findImage(screenName, req.query.party);
            followers.push([name, '', req.query.party]);
            body.rows.forEach(function (doc) {
                var follower = doc.value[0];
                var followerName = findImage(follower, req.query.party);
                followers.push([followerName, screenName, doc.value[1]]);
            });
            //console.log(followers);
            res.send(200, followers);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.following = function (req, res) {
   console.log('screen_name=' + req.query.screen_name + ' party=' + req.query.party);
   var screenName = req.query.screen_name;
   var params = {key: [screenName, req.query.party]};
   var politicianRelationshipDB = nano.use('politician_relationship');
   politicianRelationshipDB.view('analysis', 'following', params, function (err, body) {
       var followers = [];
       if (!err) {

           var name = findImage(screenName, req.query.party);
           followers.push([name, '', req.query.party]);
           body.rows.forEach(function (doc) {
               var follower = doc.value[0];
               var followerName = findImage(follower, req.query.party);
               followers.push([followerName, screenName, doc.value[1]]);
           });
           //console.log(followers);
           res.send(200, followers);
       } else {
           console.log(err);
           res.send(200, []);
       }
   });
};


exports.weekdayReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'ActivenessDuringWeek', params, function (err, body) {
        var weekdays = [];
        if (!err) {
            weekdays = body.rows;

            //console.log(weekdays);


            res.send(200, weekdays);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.firstTweetReport = function (req, res) {
    var params = {limit: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'first_tweet', params, function (err, body) {
        var firsttweet = [];
        // var name = findImage(screenName, req.query.party);
        if (!err) {
            firsttweet = body.rows;

            console.log(firsttweet);


            res.send(200, firsttweet);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetSourceReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'tweet_source', params, function (err, body) {
        var tweetSource = [];
        if (!err) {
            tweetSource = body.rows;

            res.send(200, tweetSource);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetHourReport = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'tweet_time', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.tweetHourByNameReport = function (req, res) {
    var screenName = req.query.screen_name;
    var params = {group_level: 2, startkey: [screenName, 0],  endkey: [screenName, 23]};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'tweet_time_by_name', params, function (err, body) {
        var list = [];
        if (!err) {
            list = body.rows;

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};
exports.frequentWords = function (req, res) {
    var screenName = req.query.screen_name;
    var params = {key: screenName};
    var politicianRelationshipDB = nano.use('politician');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {
            //console.log('body.rows=' + body.rows);
            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
            '1', '2', '3', '4','5','6','7','8','9','0', 'in', 'at', 'rt', 'on','amp'];
            natural.LancasterStemmer.attach();
            // var hashtagRegexp = /^[a-zA-Z0-9]([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                // var temp = doc.value.match(hashtagRegexp);
                var temp = doc.value.tokenizeAndStem();
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {
                    if (!_.contains(stopWords, word.toLowerCase())) {
                        if (word.toLowerCase() in wordsMap) {
                            wordsMap[word.toLowerCase()] += 1;
                        } else {
                            wordsMap[word.toLowerCase()] = 1;
                        }
                    }

                });

            });
            var tuples =[];
            var list =[];
            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);


            tuples.sort(function (a, b) {
                console.log(a[1]);
                console.log(b[1]);
                return (b[1] - a[1]);
            });
            // _.each(tuples, function (i,item) {

            //     console.log(item);

            //     if (i > 50){return false}
            // });
            var n = 0;
            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];

                if(value > 1) {
                    console.log(key);
                    console.log(value);
                    n++;
                    list.push([key]);
                   
                }
                if (n>5){break;}
            }

            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};



exports.frequentWordsByName = function (req, res) {

    var screenName = req.query.screen_name;
    // var params = {key: screenName};
    var params = {key: 'landeryou'}
    // modified 2016-02-01
    var nano = require('nano')('http://115.146.92.199:5984');
    var politicianRelationshipDB = nano.use('lander');
    // var politicianRelationshipDB = nano.use('politician');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {
            //console.log('body.rows=' + body.rows);
            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
            '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on','https','he','she','no','not','is','are','am','yes','how','when','why','what',
            'via','think','let','day','wil','if','go','ask','tell','off','amp','back','good','say','speak','read','that','which','want','from','ok','about',
            'please','need','we','now'];
            natural.LancasterStemmer.attach();
            body.rows.forEach(function (doc) {
                var temp = doc.value.tokenizeAndStem();
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {
                    if (!_.contains(stopWords, word.toLowerCase())) {
                        if (word.toLowerCase() in wordsMap) {
                            wordsMap[word.toLowerCase()] += 1;
                        } else {
                            wordsMap[word.toLowerCase()] = 1;
                        }
                    }

                });

            });

            //console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                if(value > 1) {
                    list.push({name: key, size: value});
                    n++;
                }

                if (n % 10 == 0) {
                    m++;
                    list0.push({name: 'group' + m, children: list});
                    console.log(list);
                    list = [];
                }
                if (i == 200) {
                    break;
                }
            }
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

            console.log(list0);
            if(list0.length == 0) {
                res.send(200, []);
            } else {
                res.send(200, {name: 'flare', children: list0});
            }
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};



exports.hashtagsByName = function (req, res) {

    var screenName = req.query.screen_name;
    // var params = {key: screenName};
    var params = {key: 'landeryou'}
    // modified 2016-02-01
    var nano = require('nano')('http://115.146.92.199:5984');
    var politicianRelationshipDB = nano.use('lander');
    // var politicianRelationshipDB = nano.use('politician');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {

            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
            natural.LancasterStemmer.attach();
            var hashtagRegexp = /#([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                var temp = doc.value.match(hashtagRegexp);
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {

                        if (word.toLowerCase() in wordsMap) {
                            wordsMap[word.toLowerCase()] += 1;
                        } else {
                            wordsMap[word.toLowerCase()] = 1;
                        }


                });

            });

            //console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                if(value > 1) {
                    list.push({name: key, size: value});
                    n++;
                }

                if (n % 2 == 0) {
                    m++;
                    list0.push({name: 'group' + m, children: list});
                    console.log(list);
                    list = [];
                }
                if (i == 1000) {
                    break;
                }
            }
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

            console.log(list0);
            if(list0.length == 0) {
                res.send(200, []);
            } else {
                res.send(200, {name: 'flare', children: list0});
            }

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};



exports.mentionedPeopleByName = function (req, res) {

    var screenName = req.query.screen_name;
    // var params = {key: screenName};
    var params = {key: 'landeryou'}
    // modified 2016-02-01
    var nano = require('nano')('http://115.146.92.199:5984');
    var politicianRelationshipDB = nano.use('lander');
    // var politicianRelationshipDB = nano.use('politician');
    politicianRelationshipDB.view('analysis', 'tweets_by_name', params, function (err, body) {

        var wordsMap = {};
        if (!err) {

//            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
//                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
            natural.LancasterStemmer.attach();
            var mentionRegexp = /@([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                var temp = doc.value.match(mentionRegexp);
                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {

                    if (word.toLowerCase() in wordsMap) {
                        wordsMap[word.toLowerCase()] += 1;
                    } else {
                        wordsMap[word.toLowerCase()] = 1;
                    }


                });

            });

            console.log('wordsMap=' + wordsMap);
            var n = 0, m = 0;
            var list0 = [];
            var list = [];

            var tuples = [];

            for (var key in wordsMap) tuples.push([key, wordsMap[key]]);

            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];

                return a < b ? 1 : (a > b ? -1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                var key = tuples[i][0];
                var value = tuples[i][1];
                list.push(key);
//                if(value > 1) {
//                   // list.push({name: key, size: value});
//                    list.push(key);
//                    n++;
//                }

//                if (n % 2 == 0) {
//                    m++;
//                    list0.push({name: 'group' + m, children: list});
//                    console.log(list);
//                    list = [];
//                }
                if (i == 500) {
                    break;
                }
            }
//            _.each(sortedWordsMap, function (count, word) {
//
//            });

            console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetSentiment2ByKeyword = function (req, res) {
    var keyword = req.query.keyword;
   // var params = {group_level: 1};
    var politicianDB = nano.use('politician');


    politicianDB.view('analysis', 'tweets_sentiment', function (err, body) {

        var positive = {};
        var negative = {};
        var list = [];
        if (!err) {

            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    var year = doc.value[1];
                    var screenName = doc.value[0];
                    list.push([doc.key, year, screenName]);
                }
            });

            natural.BayesClassifier.load('classifier1.json', null, function(err, classifier) {
                _.each(list, function(text){

                    var party = '';
                    var temp = _.find(liberalPoliticians, function (key) {
                        return (key.toLowerCase() === text[2].toLowerCase());
                    });
                    if (temp != undefined) {
                        party = 'liberal';
                    }

                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(laborPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'labor';
                        }
                    }




                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(greenPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'green';
                        }

                    }

                    if(party ==='') {
                        temp = undefined;
                        temp = _.find(greenPoliticians, function (key) {
                            return (key.toLowerCase() === text[2].toLowerCase());
                        });
                        if (temp != undefined) {
                            party = 'nationals';
                        }
                    }
                   // console.log('party=' + party);
                    if (party != '') {

                        if(classifier.classify(text[0]) == 1 ) {
                           // console.log('party=' + party);
                            var yearExists = false;
                            _.find(positive, function (value, key) {
                               // console.log("key=" + key + " year=" + text[1]);
                                if (key === text[1]) {
                                    yearExists = true;
                                }

                            });
                            if(yearExists) {
                                positive[text[1]][party] += 1;

                            } else {
                                positive[text[1]] = {'liberal': 0, 'labor': 0, 'green':0, 'nationals': 0};
                                positive[text[1]][party] += 1;

                            }

                        } else {
                            var yearExists = false;
                            _.find(negative, function (value, key) {
                                if (key === text[1])
                                     yearExists = true;
                            });
                            if(yearExists) {
                                negative[text[1]][party] += 1;
                                //console.log("negative +1=" + text[1]);
                            } else {
                                negative[text[1]] = {'liberal': 0, 'labor': 0, 'green':0, 'nationals': 0};
                                negative[text[1]][party] += 1;
                                //console.log("new 1=" + text[1]);
                            }
                        }
                    }

                });
                console.log({positive:positive, negative: negative});
                res.send(200, {positive:positive, negative: negative});
            });
            //console.log(list);

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.trendyTopic = function (req, res) {
    var keyword = req.query.keyword;

    var politicianDB = nano.use('politician');

    var params = {startkey: [2014, 0, 0]};
    politicianDB.view('analysis', 'tweets_month_date', params, function (err, body) {

        var list = [];
        var wordsCount = {};
        if (!err) {
            console.log("trendyTopic")
            console.log(req.query.keyword);
            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on'];
            natural.LancasterStemmer.attach();
            var hashtagRegexp = /#([a-zA-Z0-9]+)/g;
            body.rows.forEach(function (doc) {
                console.log(doc);
                var months = doc.key[1];
                var temp = doc.value.match(hashtagRegexp);
                console.log(temp);

                //var temp = tokenizer.tokenize(doc.value);
                _.each(temp, function (word) {
                    
                    if (word.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                        if (months in wordsCount){
                            wordsCount[months] += 1;
                        } else {
                            wordsCount[months] = 1;
                        }
                    }
                });
            });
            var tuples =[];
            for (var key in wordsCount) tuples.push([key, wordsCount[key]]);

            list = tuples
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.tweetSentimentByKeyPublic = function (req, res) {
    var keyword = req.query.keyword;
    // var nano = require('nano')('http://115.146.87.43:5984');
    var politicianDB = nano.use('melbournetweets');

    var params = {group_level: 1};
    politicianDB.view('analysis', 'tweets', params, function (err, body) {
        var list = [];
        var positiveNum = 0;
        var negativeNum = 0;
        if (!err) {

            console.log("SentimentByKeyword");
            console.log(keyword);
            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    list.push(doc.key);
                    console.log(doc.key);
                }
            });

            natural.BayesClassifier.load('classifier1.json', null, function(err, classifier) {
                _.each(list, function(text){
                    if(classifier.classify(text) == 1 ) {
                        positiveNum += 1;
                    } else {
                        negativeNum += 1;
                    }
                });
                res.send(200, [["positive",positiveNum],["negative", negativeNum]]);
            });
            //console.log(list);

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.tweetSentimentByKeyword = function (req, res) {
    var keyword = req.query.keyword;
    var politicianDB = nano.use('politician');

    var params = {group_level: 1};
    politicianDB.view('analysis', 'tweets', params, function (err, body) {
        var list = [];
        var positiveNum = 0;
        var negativeNum = 0;
        if (!err) {

            console.log("SentimentByKeyword");
            console.log(keyword);
            body.rows.forEach(function (doc) {
                //console.log(doc);
                if(doc.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    list.push(doc.key);
                    console.log(doc.key);
                }
            });

            natural.BayesClassifier.load('classifier1.json', null, function(err, classifier) {
                _.each(list, function(text){
                    if(classifier.classify(text) == 1 ) {
                        positiveNum += 1;
                    } else {
                        negativeNum += 1;
                    }
                });
                res.send(200, [["positive",positiveNum],["negative", negativeNum]]);
            });
            //console.log(list);

        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};


exports.geoLocation = function (req, res) {
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'geolocation',  function (err, body) {
        var list = [];
        if (!err) {
            body.rows.forEach(function (doc) {
                list.push({lat:doc.key[0][0], lng:doc.key[0][1], name:doc.key[1], content:doc.value});
            });

            //console.log(list);
            res.send(200, list);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

exports.geoLocationMax = function (req, res) {
    var keyword = req.query.keyword;
    var params = {group_level: 1};
    var politicianDB = nano.use('politician');
    politicianDB.view('analysis', 'geolocation',  function (err, body) {
        var list = [];
        var list0= [];
        var name_max = '';
        var number_max = 0;
        var name ='';
        var found = 0;
        
        if (!err) {
            console.log("keyword=" + keyword);
            var stopWords = ['i', 'and', 'you', ',', '.', '?', 'will', 'just', 'http', 'co', 'it', 'the', 'a', 'so', 'today',
                '1', '2', '3', '4','25','10','12', '6', 'in', 'at', 'rt', 'on','amp'];
            natural.LancasterStemmer.attach();
            var hashtagRegexp = /([a-zA-Z0-9]+)/g;
            var wordCount ={};
            body.rows.forEach(function (doc) {
                found = 0;   
                var temp = doc.value.match(hashtagRegexp);
                name = doc.key[1];
                console.log("name=" + name);
                //var temp = tokenizer.tokenize(doc.value);
                // if (keyword.toLowerCase() in temp){
                _.each(temp, function (word) {
                    if (word.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {

                        console.log("word=" + word);
                        found = 1;
                        
                        if (name in wordCount) {

                            wordCount[name] += 1;
                        } else {
                            wordCount[name] = 1;
                        }
                    }
                        
                });
                if (found == 1){
                    console.log("doc found=" + doc.value);
                    list0.push({lat:doc.key[0][0], lng:doc.key[0][1], name:doc.key[1], content:doc.value});
                }

                

                // _.each(temp, function (word) {
                    
                //     if (word.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                //         if (months in wordsCount){
                //             wordsCount[months] += 1;
                //         } else {
                //             wordsCount[months] = 1;
                //         }
                //     }
                // });
            });
            
            // wordCount.sort(function (a, b) {
            //     return (b.value - a.value);
            // });
            // for (var key in wordCount){
            //     if ( wordCount[key] > number_max){
            //         name_max = key;
            //         number_max = wordCount[key];        
            //     }
            // }
            // console.log("name_max=" + name_max);

            // // body.rows.forEach(function (doc) {
            // _.each(list0, function(item){
            //     console.log('item=' + item.lat + ' ' + item.lng + ' '+ item.name + ' '+ item.content);
            //     console.log('item name=' + item.name);
            //     if (name_max == item.name ){
            //         // list.push({lat:doc.key[0][0], lng:doc.key[0][1], name:doc.key[1], content:doc.value});
            //         console.log('inside item=' + item.lat + ' ' + item.lng + ' '+ item.name + ' '+ item.content);
            //         list.push({lat:item.lat, lng:item.lng, name:item.name, content:item.content});
                    
            //     }
            // });

            //console.log(list);
            res.send(200, list0);
        } else {
            console.log(err);
            res.send(200, []);
        }
    });
};

/**
 * Show an politician
 */
exports.show = function (req, res) {
    res.send(201, {politician: req.politician});
};

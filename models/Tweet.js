var mongoose = require('mongoose');

// Create a new Schema for our tweet data
var schema = new mongoose.Schema({
  twid       : String,
  active     : Boolean,
  author     : String,
  avatar     : String,
  body       : String,
  date       : Date,
  screenname : String
});

// Create a static getTweets method to return tweets from db
schema.statics.getTweets = function (page, skip, callback) {
  var tweets = [],
      start  = (page * 10) + skip;

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({}, 'twid active author avatar body date screenname', {skip: start, limit: 10}).sort(date: 'desc').exec(function(err,docs){
    if (!err) {
      tweets = docs;
      tweets.forEach(function(tweet) {
        tweet.active = true;
      });
    }

    callback(tweets);
  });
};

module.exports = Tweet = mongoose.model('Tweet', schema);

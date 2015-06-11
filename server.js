// Dependencies
var express  = require("express")
  , exphbs   = require("express-handlebars")
  , http     = require("http")
  , mongoose = require("mongoose")
  , twitter  = require("ntwitter")


  , routes        = require("./routes")
  , config        = require("./config")
  , streamHandler = require("./utils/streamHandler");

var app  = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.disable('etag');
mongoose.connect('mongodb://localhost/react-tweets');
var twit = new twitter(config.twitter);

app.get('/', routes.index);
app.get('/page/:page/:skip');

app.use('/', express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function () {
  console.log('Express listening on port ' + port);
});

var io = require('socket.io').listen(server);

twit.stream('statuses/filter', { track: 'scotch_io, #scotchio'}, function (stream) {
  streamHandler(stream,io);
});

var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var stylus = require('stylus');

var env = process.env.NODE_EVN = process.env.NODE_EVN || 'development';

var app = express();
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

if (env === 'development') {
	mongoose.connect('mongodb://localhost/multivision');
} else {
	mongoose.connect(process.env.MONGOHQ_URL);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error..'));
db.once('open', function() {
	console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({
	message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(error, messageDoc) {
	mongoMessage = messageDoc.message;
});

function compile(string, path) {
	return stylus(string).set('filename', path);
}

app.get('/partials/:partialPath', function(request, response) {
	response.render('partials/' + request.params.partialPath);
});

app.get('*', function(request, response) {
	response.render('index', {
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
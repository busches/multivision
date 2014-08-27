var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.use(morgan('dev'));

var config = {
	rootPath: __dirname
};

require('./server/config/express')(app, config);

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

app.get('/partials/*', function(request, response) {
	console.log(request.params);
	response.render('../../public/app/' + request.params[0]);
});

app.get('*', function(request, response) {
	response.render('index', {});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
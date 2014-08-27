var express = require('express');
var morgan = require('morgan');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.use(morgan('dev'));

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

app.get('/partials/*', function(request, response) {
	console.log(request.params);
	response.render('../../public/app/' + request.params[0]);
});

app.get('*', function(request, response) {
	response.render('index', {});
});

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
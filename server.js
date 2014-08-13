 var express = require('express');

 var env = process.env.NODE_EVN  = process.env.NODE_EVN || 'development';

var app = express();
 app.configure(function() {
 	app.set('views', __dirname + '/server/views');
 	app.set('view_engine', 'jade');
 });

 app.get('*', function(request, response) {
 	response.render('index');
 });
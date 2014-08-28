var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var stylus = require('stylus');

module.exports = function(app, config) {
	function compile(string, path) {
		return stylus(string).set('filename', path);
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(cookieParser());
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: 'multi vision unicorns'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(express.static(config.rootPath + '/public'));
};
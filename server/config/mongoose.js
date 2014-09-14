var mongoose = require('mongoose');
var courseModel = require('../models/Course');
var userModel = require('../models/User');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error..'));
	db.once('open', function() {
		console.log('multivision db opened');
	});

	courseModel.createDefaultCourses();
	userModel.createDefaultUsers();
};
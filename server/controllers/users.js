var encryption = require('../utilities/encryption');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(request, response, next) {
	var userData = request.body;
	userData.userName = userData.userName.toLowerCase();
	userData.salt = encryption.createSalt();
	userData.hashedPassword = encryption.hashPassword(userData.salt, userData.password);
	User.create(userData, function(error, user) {
		if (error) {
			if (error.toString().indexOf('E11000') > -1) {
				error = new Error('Duplicate Username');
			}
			response.status(400);
			return response.send({
				reason: error.toString()
			});
		}
		request.login(user, function(error) {
			if (error) {
				return next(error);
			}
			response.send(user);
		})
	})
};

exports.getUsers = function(request, response) {
	User.find({}).exec(function(error, collection) {
		response.send(collection);
	});
};
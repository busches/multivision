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

exports.updateUser = function(request, response) {
	var userUpdates = request.body;
	if (request.user._id != userUpdates._id && !request.user.hasRole('admin')) {
		response.status('403');
		return response.end();
	}

	request.user.firstName = userUpdates.firstName;
	request.user.lastName = userUpdates.lastName;
	request.user.userName = userUpdates.userName;
	if (userUpdates.password && userUpdates.password.length) {
		request.user.salt = encryption.createSalt();
		request.user.hashedPassword = encryption.hashPassword(request.user.salt, userUpdates.password);
	}

	request.user.save(function(error) {
		if (error) {
			response.status(400);
			return response.send({
				reason: error.toString()
			});
		}
		response.send(request.user);
	});
};
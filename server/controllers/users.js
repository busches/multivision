var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getUsers = function(request, response) {
	User.find({}).exec(function(error, collection) {
		response.send(collection);
	});
};
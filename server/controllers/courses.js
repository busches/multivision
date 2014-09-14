var Course = require('mongoose').model('Course');

exports.getCourseById = function(request, response) {
	Course.findOne({
		_id: request.params.id
	}).exec(function(error, course) {
		response.send(course);
	});
};

exports.getCourses = function(request, response) {
	Course.find({}).exec(function(error, collection) {
		response.send(collection);
	});
};
var passport = require('passport');

exports.authenticate = function(request, response, next) {
	var auth = passport.authenticate('local', function(error, user) {
		if (error) {
			return next(error);
		}
		if (!user) {
			response.send({
				success: false
			});
		}
		request.logIn(user, function(error) {
			if (error) {
				return next(error);
			}
			response.send({
				success: true,
				user: user
			});
		});
	});
	auth(request, response, next);
};

exports.requiresApiLogin = function(request, response, next) {
	if (!request.isAuthenticated()) {
		response.status(403);
		response.end();
	} else {
		response.next();
	}
};
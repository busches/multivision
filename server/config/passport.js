var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = function() {
	passport.use(new LocalStrategy(
		function(username, password, done) {
			User.findOne({
				userName: username
			}).exec(function(error, user) {
				if (user && user.authenticate(password)) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
	));

	passport.serializeUser(function(user, done) {
		if (user) {
			done(null, user._id);
		}
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}).exec(function(error, user) {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	});
};
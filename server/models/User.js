var encryption = require('../utilities/encryption');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstName: String,
	hashedPassword: String,
	lastName: String,
	roles: [String],
	salt: String,
	userName: String
});
userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encryption.hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
	}
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(error, collection) {
		if (collection.length === 0) {
			var hash;
			var salt = encryption.createSalt();
			hash = encryption.hashPassword(salt, 'joe');
			User.create({
				firstName: 'Joe',
				hashedPassword: hash,
				lastName: 'Eames',
				roles: ['admin'],
				salt: salt,
				userName: 'joe'
			});
			salt = encryption.createSalt();
			hash = encryption.hashPassword(salt, 'john');
			User.create({
				firstName: 'John',
				hashedPassword: hash,
				lastName: 'Papa',
				roles: [],
				salt: salt,
				userName: 'john'
			});
			salt = encryption.createSalt();
			hash = encryption.hashPassword(salt, 'dan');
			User.create({
				firstName: 'Dan',
				hashedPassword: hash,
				lastName: 'Wahlin',
				salt: salt,
				userName: 'dan'
			});
		}
	});
}

exports.createDefaultUsers = createDefaultUsers;
var crypto = require('crypto');
var mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error..'));
	db.once('open', function() {
		console.log('multivision db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		hashedPassword: String,
		lastName: String,
		salt: String,
		userName: String
	});
	userSchema.methods = {
		authenticate: function(passwordToMatch) {
			return hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
		}
	};

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(error, collection) {
		if (collection.length === 0) {
			var hash;
			var salt = createSalt();
			hash = hashPassword(salt, 'joe');
			User.create({
				firstName: 'Joe',
				hashedPassword: hash,
				lastName: 'Eames',
				salt: salt,
				userName: 'joe'
			});
			salt = createSalt();
			hash = hashPassword(salt, 'john');
			User.create({
				firstName: 'John',
				hashedPassword: hash,
				lastName: 'Papa',
				salt: salt,
				userName: 'john'
			});
			salt = createSalt();
			hash = hashPassword(salt, 'dan');
			User.create({
				firstName: 'Dan',
				hashedPassword: hash,
				lastName: 'Wahlin',
				salt: salt,
				userName: 'dan'
			});
		}
	});
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(password).digest('hex');
}
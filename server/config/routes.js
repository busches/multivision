var auth = require('./auth');
var users = require('../controllers/users');

module.exports = function(app) {
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

	app.post('/api/users', users.createUser);

	app.put('/api/users', users.updateUser);

	app.get('/partials/*', function(request, response) {
		response.render('../../public/app/' + request.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(request, response) {
		request.logout();
		response.end();
	});

	app.get('*', function(request, response) {
		response.render('index', {
			bootstrapedUser: request.user
		});
	});
};
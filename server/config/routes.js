module.exports = function(app) {
	app.get('/partials/*', function(request, response) {
		response.render('../../public/app/' + request.params[0]);
	});

	app.get('*', function(request, response) {
		response.render('index', {});
	});
};
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl'
		})
		.when('/admin/users', {
			templateUrl: '/partials/admin/user-list',
			controller: 'mvUserListCtrl',
			resolve: {
				auth: function(mvAuth) {
					return mvAuth.authorizeCurrentUserForRoute('admin');
				}
			}
		});
});

angular.module('app').run(function($location, $rootScope) {
	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
		if (rejection == 'not authorized') {
			$location.path('/');
		}
	});
});
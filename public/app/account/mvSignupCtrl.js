'use strict';

angular.module('app').controller('mvSignupCtrl', ['mvAuth', 'mvNotifier', '$location', '$scope',
	function(mvAuth, mvNotifier, $location, $scope) {
		$scope.signup = function() {
			var newUserData = {
				userName: $scope.email,
				password: $scope.password,
				firstName: $scope.firstName,
				lastName: $scope.lastName
			};

			mvAuth.createUser(newUserData).then(function() {
				mvNotifier.notify('User account created!');
				$location.path('/');
			}, function(reason) {
				mvNotifier.error(reason);
			});
		};
	}
]);
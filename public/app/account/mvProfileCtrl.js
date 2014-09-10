angular.module('app').controller('mvProfileCtrl', ['mvAuth', 'mvIdentity', 'mvNotifier', '$scope',
	function(mvAuth, mvIdentity, mvNotifier, $scope) {
		console.log(mvIdentity.currentUser);
		$scope.email = mvIdentity.currentUser.userName;
		$scope.firstName = mvIdentity.currentUser.firstName;
		$scope.lastName = mvIdentity.currentUser.lastName;

		$scope.update = function() {
			var newUserData = {
				userName: $scope.email,
				firstName: $scope.firstName,
				lastName: $scope.lastName
			};

			if ($scope.password && $scope.password.length > 0) {
				newUserData.password = $scope.password;
			}

			mvAuth.updateCurrentUser(newUserData).then(function() {
				mvNotifier.notify('Your user account has been updated');
			}, function(reason) {
				mvNotifier.error(reason);
			});
		};
	}
])
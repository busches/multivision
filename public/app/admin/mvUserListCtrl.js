angular.module('app').controller('mvUserListCtrl', ['mvUser', '$scope',
	function(mvUser, $scope) {
		$scope.users = mvUser.query();
	}
]);
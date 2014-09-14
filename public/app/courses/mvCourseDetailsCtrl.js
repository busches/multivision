angular.module('app').controller('mvCourseDetailsCtrl', ['mvCourse', '$routeParams', '$scope',
	function(mvCourse, $routeParams, $scope) {
		$scope.course = mvCourse.get({
			_id: $routeParams.id
		});
	}
]);
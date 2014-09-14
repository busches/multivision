angular.module('app').controller('mvCourseDetailsCtrl', ['mvCachedCourses', '$routeParams', '$scope',
	function(mvCachedCourses, $routeParams, $scope) {
		mvCachedCourses.query().$promise.then(function(collection) {
			collection.some(function(course) {
				if (course._id === $routeParams.id) {
					$scope.course = course;
					return true;
				}
			});
		});
	}
]);
'use strict';

angular.module('app').controller('mvCourseListCtrl', ['mvCourse', '$scope',
	function(mvCourse, $scope) {
		$scope.courses = mvCourse.query();
	}
]);
'use strict';

angular.module('app').controller('mvCourseListCtrl', ['mvCourse', '$scope',
	function(mvCourse, $scope) {
		$scope.courses = mvCourse.query();
		$scope.sortOptions = [{
			value: 'title',
			text: 'Sort by Title'
		}, {
			value: 'published',
			text: 'Sort by Published Date'
		}];
		$scope.sortOrder = $scope.sortOptions[0].value;
	}
]);
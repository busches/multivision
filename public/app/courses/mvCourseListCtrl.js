'use strict';

angular.module('app').controller('mvCourseListCtrl', ['mvCachedCourses', '$scope',
	function(mvCachedCourses, $scope) {
		$scope.courses = mvCachedCourses.query();
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
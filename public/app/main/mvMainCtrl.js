angular.module('app').controller('mvMainCtrl', function(mvCachedCourses, $scope) {
	$scope.courses = mvCachedCourses.query();
});
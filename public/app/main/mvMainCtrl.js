angular.module('app').controller('mvMainCtrl', function(mvCourse, $scope) {
	$scope.courses = mvCourse.query();
});
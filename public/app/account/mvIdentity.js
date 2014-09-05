angular.module('app').factory('mvIdentity', function(mvUser, $window) {
	var currentUser;
	if (!!$window.bootstrapedUserObject) {
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrapedUserObject);
	}
	return {
		currentUser: currentUser,
		isAuthenticated: function() {
			return !!this.currentUser;
		},
		isAuthorized: function(role) {
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
		}
	};
});
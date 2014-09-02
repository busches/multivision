angular.module('app').factory('mvIdentity', function($window) {
	return {
		currentUser: $window.bootstrapedUserObject || undefined,
		isAuthenticated: function() {
			return !!this.currentUser;
		}
	};
});
'use strict';

angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr) {
	return {
		error: function(msg) {
			mvToastr.error(msg);
			console.log(msg);
		},
		notify: function(msg) {
			mvToastr.success(msg);
			console.log(msg);
		}
	};
});
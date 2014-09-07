var expect = chai.expect;

describe('mvUser', function() {
	beforeEach(module('app'));

	describe('isAdmin', function() {
		it('should return false if the roles array does not have an admin entry', inject(['mvUser',
			function(mvUser) {
				var user = new mvUser();
				user.roles = ['not admin'];
				expect(user.isAdmin()).to.equal(false);
			}
		]));

		it('should return true if the roles array has an admin entry', inject(['mvUser',
			function(mvUser) {
				var user = new mvUser();
				user.roles = ['admin'];
				expect(user.isAdmin()).to.equal(true);
			}
		]));
	});
});
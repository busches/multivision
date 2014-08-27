var path = require('path');
var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		port: process.env.PORT || 3030,
		rootPath: rootPath
	},
	production: {
		db: process.env.MONGOHQ_URL,
		port: process.env.PORT || 80,
		rootPath: rootPath
	}
};
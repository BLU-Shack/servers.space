const structures = require('./structures/');

module.exports = {
	...structures,
	Client: require('./Client.js'),
	version: require('../package.json').version,
};
const Guild = require('./structures/Guild.js');
const User = require('./structures/User.js');
const Upvote = require('./structures/Upvote.js');
const Stats = require('./structures/Stats.js');

module.exports = {
	Guild, User, Upvote, Stats,
	Client: require('./Client.js'),
	version: require('../package.json').version,
};
const Options = require('./options.js');

module.exports = {
	...Options,
	get Ratelimit() { return require('./errors/Ratelimit.js'); },
	get FetchError() { return require('./errors/FetchError.js'); },
	get Base() { return require('./Base.js'); },
	get Stats() { return require('./Stats.js'); },
	get Guild() { return require('./Guild.js'); },
	get User() { return require('./User.js'); },
	get Upvote() { return require('./Upvote.js'); },
};
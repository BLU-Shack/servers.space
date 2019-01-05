const Base = require('./Base.js');

/**
 * serverlist.space Statistics.
 * @extends {Base}
 */
class Stats extends Base {
	/**
	 * @param {object} obj
	 */
	constructor(obj) {
		super(obj);

		/**
		 * The total number of guilds listed on the site.
		 * @type {number}
		 */
		this.guilds = obj.servers;

		/**
		 * The total number of users listed on the site.
		 * @type {number}
		 */
		this.users = obj.users;

		/**
		 * The total number of available tags to choose from.
		 * @type {number}
		 */
		this.tags = obj.tags;
	}

	/**
	 * The total number of guilds and users combined.
	 * @type {number}
	 */
	get guildUserTotal() {
		return this.guilds + this.users;
	}
}

module.exports = Stats;
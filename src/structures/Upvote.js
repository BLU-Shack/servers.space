const Base = require('./Base.js');
const User = require('./User.js');

/**
 * Resembles an upvote from the `/servers/:id/upvotes` endpoint.
 * @extends {Base}
 */
class Upvote extends Base {
	/**
	 * @param {object} obj
	 * @param {string} id
	 */
	constructor(obj, id) {
		super(obj);

		/**
		 * The guild ID of the upvote.
		 * @type {string}
		 */
		this.guildID = id;

		/**
		 * The timestamp in which the upvote took place.
		 * @type {number}
		 */
		this.timestamp = obj.timestamp;

		/**
		 * The user that upvoted.
		 * @type {User}
		 */
		this.user = new User(obj.user);
	}

	/**
	 * Returns text that Discord recognizes as a user mention.
	 * @type {string}
	 */
	toString() {
		return `<@${this.user.id}>`;
	}
}

module.exports = Upvote;
const Base = require('./Base.js');
const User = require('./User.js');
const Store = require('@ired_me/red-store');

/**
 * Represents a guild (server) on serverlist.space
 * @extends {Base}
 */
class Guild extends Base {
	/**
	 * @param {object} obj
	 */
	constructor(obj) {
		super(obj);

		/**
		 * Whether or not the guild is complied to show emojis on the site.
		 * @type {boolean}
		 */
		this.compliance = obj.compliance;

		/**
		 * The timestamp of when the guild was established on Discord.
		 * @type {number}
		 */
		this.createdTimestamp = obj.created_at;

		/**
		 * The guild's full description on serverlist.space
		 * @type {?string}
		*/
		this.fullDescription = obj.full_description;

		/**
		 * The server's Discord icon.
		 * @type {string}
		 */
		this.icon = obj.icon;

		/**
		 * Whether or not the guild's icon is child friendly.
		 * @type {boolean}
		 */
		this.childFriendlyIcon = obj.icon_child_friendly;

		/**
		 * The guild's Discord ID.
		 * @type {string}
		 */
		this.id = obj.id;

		/**
		 * The amount of members in the guild.
		 * @type {number}
		 */
		this.memberCount = obj.member_count;

		/**
		 * The guild's name on Discord.
		 * @type {string}
		 */
		this.name = obj.name;

		/**
		 * Whether or not the guild is listed publicly on serverlist.space; Usually not public if the server invite has expired.
		 * @type {boolean}
		 */
		this.public = obj.public;

		/**
		 * The guild's short description on serverlist.space
		 * @type {string}
		 */
		this.shortDescription = obj.short_description;

		/**
		 * All tags that the guild represents.
		 * @type {string[]}
		 */
		this.tags = obj.tags;

		/**
		 * The timestamp of the latest guild update on serverlist.space
		 * @type {number}
		 */
		this.lastUpdateTimestamp = obj.updated_at;

		/**
		 * The guild's vanity code.
		 * @type {?string}
		 */
		this.vanityCode = obj.vanity;
	}

	/**
	 * The guild's main owner. This is not always the guild owner.
	 * @readonly
	 * @type {User}
	 */
	get owner() {
		return this.owners[0];
	}

	/**
	 * The guild's owners, both primary and secondary.
	 * @readonly
	 * @type {User[]}
	 */
	get owners() {
		return this.raw.owners.map(user => new User(user));
	}

	/**
	 * The owners of the guild, mapped by their IDs.
	 * @readonly
	 * @type {Store<string, User>}
	 */
	get ownersMap() {
		return new Store(this.owners.map(u => [u.id, u]));
	}

	/**
	 * The secondary owners of the guild.
	 * @readonly
	 * @type {User[]}
	 */
	get secondaryOwners() {
		return this.owners.slice(1);
	}

	/**
	 * The guild's page on serverlist.space
	 * @readonly
	 * @type {string}
	 */
	get pageURL() {
		return `https://serverlist.space/server/${this.id}`;
	}

	/**
	 * The guild's vanity URL on serverlist.space
	 * @readonly
	 * @type {string}
	 */
	get vanityURL() {
		if (!this.vanityCode) return null;
		else return `https://serverlist.space/server/${this.vanityCode}`;
	}

	/**
	 * Returns the guild's name.
	 * @returns {string}
	 * @example TextChannel.send(`${guild} is nice.`); // GuildName is nice.
	 */
	toString() {
		return this.name;
	}
}

module.exports = Guild;
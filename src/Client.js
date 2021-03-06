const Fetch = require('node-fetch').default,
	util = require('util'); // eslint-disable-line no-unused-vars

/**
 * @external Store
 * @see {@link https://github.com/iREDMe/red-store}
 */
const Store = require('@ired_me/red-store');

const Guild = require('./structures/Guild.js');
const User = require('./structures/User.js');
const Upvote = require('./structures/Upvote.js');
const Stats = require('./structures/Stats.js');
const { Ratelimit, FetchError } = require('./structures/errors.js');
const { ClientOpts, FetchOpts, MultiFetchOpts } = require('./structures/options.js');

const isObject = obj => !Array.isArray(obj) && obj === Object(obj);
const check = require('./util/check.js');

const ok = /2\d\d/;

/**
 * The Client for interacting with serverlist.space
 */
class Client {
	/**
	 * @param {ClientOptions} [options={}] Options to pass.
	 */
	constructor(options = {}) {
		/**
		 * The options.
		 * @type {ClientOptions}
		 */
		this.options = ClientOpts;

		this.edit(options, true);

		/**
		 * Every guild cached, mapped by their ID.
		 * @type {Store<string, Guild>}
		 */
		this.guilds = new Store();

		/**
		 * Every user cached, mapped by their ID.
		 * @type {Store<string, User>}
		 */
		this.users = new Store();

		/**
		 * An array of the latest fetched Statistics, from oldest to newest.
		 * @type {Stats[]}
		 */
		this.stats = [];
	}

	/**
	 * The API URL of serverlist.space. Version is missing.
	 * @type {string}
	 */
	get endpoint() {
		return 'https://api.serverlist.space/v';
	}

	async get(point, version, headers = {}) {
		let endpoint = this.endpoint + version + point;
		endpoint += Object.entries(headers).map((e, i) => (i ? '&' : '?') + e[0] + '=' + e[1]).join('');
		const i = await Fetch(endpoint);
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		else return contents;
	}

	async authGet(point, version, Authorization, headers = {}) {
		let endpoint = this.endpoint + version + point;
		endpoint += Object.entries(headers).map((e, i) => (i ? '&' : '?') + e[0] + '=' + e[1]).join('');
		const i = await Fetch(endpoint, {
			headers: {
				Authorization: Authorization
			}
		});
		if (i.status === 429) throw new Ratelimit(i.headers, version + point);
		const contents = await i.json();
		if (contents.code && !ok.test(contents.code)) throw new FetchError(i, contents.message);
		else return contents;
	}

	/**
	 * Edits ClientOptions.
	 * @param {ClientOptions} options Options to pass.
	 * @param {boolean} [preset=false] Whether or not to use the default ClientOptions. Otherwise uses [this.client.options]({@link Client#options})
	 * @returns {ClientOptions} The new ClientOptions.
	 * @example
	 * SpaceClient.edit({ guildID: 123 }); // TypeError: options.guildID must be a string
	 * SpaceClient.edit({ guildID: '123' }); // { ..., guildID: '123', ... };
	 */
	edit(options, preset = false) {
		if (typeof options === 'undefined') throw new ReferenceError('No options to pass for editing?');
		if (!isObject(options)) throw new TypeError('options must be an object.');
		const opts = check.edit(Object.assign(preset ? ClientOpts : this.options, options));

		if (opts.statsLimit < this.options.statsLimit) while (this.stats.length > opts.statsLimit) this.stats.shift();

		FetchOpts.cache = MultiFetchOpts.cache = opts.cache;
		FetchOpts.version = MultiFetchOpts.version = opts.version;
		FetchOpts.guildToken = MultiFetchOpts.guildToken = opts.guildToken;

		return this.options = opts;
	}

	/**
	 * Fetches a page of guilds from serverlist.space
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Guild[] | Store<string, Guild>>}
	 */
	async fetchGuilds(options = {}) {
		const revised = check.fetch(Object.assign(MultiFetchOpts, options));
		const { cache, mapify, page, version, raw, reverse, sortBy } = Object.assign(MultiFetchOpts, revised);
		if (typeof page !== 'number') throw new TypeError('page must be a number.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get('/servers', version, {
			page: page,
			reverseSort: reverse,
			sortBy: sortBy,
		});
		if (cache) for (const guild of contents.servers) this.guilds.set(guild.id, new Guild(guild));
		if (mapify) return new Store(contents.servers.map(guild => [guild.id, raw ? guild : new Guild(guild)]));
		else return raw ? contents : contents.servers.map(guild => new Guild(guild));
	}

	/**
	 * Fetches a single guild from serverlist.space
	 * @param {string | FetchOptions} [id=this.options.guildID] A guild ID listed on serverlist.space to fetch.
	 * Can also be FetchOptions; Uses [this.options.guildID]({@link ClientOptions#guildID}) for the ID if so.
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Guild>}
	 */
	async fetchGuild(id = this.options.guildID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.guildID;
		}
		const { cache, raw, version } = Object.assign(FetchOpts, options);

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/servers/${id}`, version);
		if (cache) this.guilds.set(contents.id, new Guild(contents));
		return raw ? contents : new Guild(contents);
	}

	/**
	 * Fetches a page of guilds that a user lists on serverlist.space
	 * @param {string} id The ID of a user to get guilds from.
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Guild[] | Store<string, Guild>>}
	 * @example
	 * SpaceClient.fetchGuildsOfUser('235593018332282884')
	 * 	 .then(guilds => {
	 *     console.log(`All Guilds that User 235593018332282884 Owns:\n\n${guilds.map(g => g.name).join('\n')}`);
	 * 	 })
	 * 	 .catch(console.error);
	 */
	async fetchGuildsOfUser(id, options = {}) {
		const { cache, raw, version, mapify, page } = Object.assign(MultiFetchOpts, options);
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}/servers`, version, {
			page: page,
		});
		if (cache) for (const g of contents.servers) this.guilds.set(g.id, new Guild(g));
		if (mapify) return new Store(contents.servers.map(guild => [guild.id, raw ? guild : new Guild(guild)]));
		else return raw ? contents : contents.servers.map(g => new Guild(g));
	}

	/**
	 * serverlist.space Statistics
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Stats>}
	 */
	async fetchStats(options = {}) {
		const { cache, raw, version } = Object.assign(FetchOpts, options);
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get('/statistics', version);
		if (cache) this.stats.push(new Stats(contents));
		while (this.stats.length > this.options.statsLimit) this.stats.shift();
		return raw ? contents : new Stats(contents);
	}

	/**
	 * Fetches a guild's upvotes in the current month; Requires a Bot Token.
	 * @param {string | MultiFetchOptions} [id=this.options.guildID] A guild ID to check upvotes of.
	 * Can also be MultiFetchOptions; Uses [this.options.guildID]({@link ClientOptions#guildID}) for the ID if so.
	 * @param {MultiFetchOptions} [options={}] Options to pass.
	 * @returns {Promise<Upvote[] | Store<string, Upvote>>}
	 * @example
	 * async () => {
	 *   const upvotes = await SpaceClient.fetchUpvotes('guildID', { botToken: 'someAPIToken', mapify: false });
	 * 	 for (const { user } of upvotes) console.log(`${user.tag} has upvoted this month!`);
	 * }
	 */
	async fetchUpvotes(id = this.options.guildID, options = {}) {
		if (isObject(id)) {
			options = id;
			id = this.options.guildID;
		}

		const { cache, raw, version, guildToken, page, mapify } = Object.assign(MultiFetchOpts, options);
		if (!guildToken) throw new ReferenceError('options.guildToken must be defined.');

		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string' && !isObject(id)) throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.authGet(`/servers/${id}/upvotes`, version, guildToken, {
			page: page,
		});
		if (cache) for (const c of contents.upvotes) this.users.set(c.user.id, new User(c.user));
		if (mapify) return new Store(contents.upvotes.map(c => [c.user.id, raw ? c : new Upvote(c, id)]));
		else return raw ? contents : contents.upvotes.map(c => new Upvote(c, id));
	}

	/**
	 * Fetches a user on serverlist.space
	 * @param {string} id A user ID to get properties of
	 * @param {FetchOptions} [options={}] Options to pass.
	 * @returns {Promise<User>}
	 */
	async fetchUser(id, options = {}) {
		const { cache, raw, version } = Object.assign(FetchOpts, options);
		if (typeof id === 'undefined' || id === null) throw new ReferenceError('id must be defined.');
		if (typeof id !== 'string') throw new TypeError('id must be a string.');
		if (!isObject(options)) throw new TypeError('options must be an object.');

		const contents = await this.get(`/users/${id}`, version);
		if (cache) this.users.set(contents.id, new User(contents));
		return raw ? contents : new User(contents);
	}
}

module.exports = Client;
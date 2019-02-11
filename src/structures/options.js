/**
 * @typedef {object} ClientOptions The options supplied on instantiating the client.
 * @property {string} [guildToken] The guild's API Token from the site. Required for some endpoints.
 * @property {string} [guildID] The guild's ID.
 * @property {boolean} [cache=false] Whether or not to cache guilds/users on fetch.
 * @property {number} [version=1] The default version of the API to use when fetching and posting.
 */
exports.ClientOpts = {
	guildToken: null,
	guildID: null,
	cache: false,
	version: 1
};

/**
 * @typedef {object} FetchOptions Options available to pass when fetching something, etc. a guild.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store.
 * Corrosponds to {@link ClientOptions#cache} when not present while fetching.
 * @property {boolean} [version=this.options.version] The version to use to fetch an endpoint.
 * Corrosponds to {@link ClientOptions#version} when not present.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {string} [guildToken=this.options.guildToken] One of your guild's authorization token from the site.
 * The token should be related to the guild ID of fetch. Uses {@link ClientOptions#guildToken} if omitted.
 */
exports.FetchOpts = {
	cache: false,
	raw: false,
	version: 1,
	guildToken: null,
};

/**
 * @typedef {object} MultiFetchOptions Options when a given output is an array.
 * @property {boolean} [cache=this.options.cache] When set to true, caches the fetched object into a Store/Set value.
 * Corrosponds to {@link ClientOptions#cache} when not present while fetching.
 * @property {boolean} [raw=false] When set to true, returns the raw fetched object.
 * @property {boolean} [version=this.options.version] The API version to use for GETting.
 * Corrosponds to {@link ClientOptions#version} when not present.
 * @property {boolean} [mapify=true] When set to true, the fetched value will be in a Store, mapped by their IDs.
 * @property {string} [guildToken=this.options.guildToken] One of your guild's authorization token from the site.
 * The token should be related to the guild ID of fetch. Uses {@link ClientOptions#guildToken} if omitted.
 * @property {number} [page=1] The section of the endpoint to take.
 * @property {boolean} [reverse=false] When set to true, reverses the output. Only works with `v1/servers` and `v1/users/:id/servers`,
 * or `Client.fetchBots()` and `Client.fetchBotsOfUser()` respectively. Requires {@link MultiFetchOptions#sortBy} to have value.
 * Example: `created_at`: It will reverse the response order, now sorting from oldest to newest.
 * @property {string} [sortBy=null] A raw bot object's property to sort by. This should not be the Class' property.
 * To see a raw object's property, check [here](https://docs.botlist.space/bl-docs/bots), under the Response tab.
 * Example: `created_at`; It will sort the response by the guild from newest to oldest.
 */
exports.MultiFetchOpts = {
	...exports.FetchOpts,
	mapify: true,
	page: 1,
	reverse: false,
	sortBy: null,
};
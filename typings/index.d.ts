// Type definitions for servers.space 1.0.0
// Project: servers.space
// Definitions by: iREDMe (https://github.com/iREDMe)

declare module 'servers.space' {
	import { Response, Headers } from 'node-fetch';
	import Store from '@ired_me/red-store';
	export const version: string;

	//#region Classes
	export class Base {
		constructor(obj: object);
		public readonly raw: object;
	}

	export class Client {
		constructor(options?: ClientOptions);

		public options: ClientOptions;
		public guilds: Store<string, Guild>;
		public users: Store<string, User>;
		public readonly endpoint: string;

		public edit(options: ClientOptions, preset?: boolean): ClientOptions;
		public fetchGuilds(options?: MultiFetchOptions): Promise<Guild[] | Store<string, Guild>>;
		public fetchGuild(id?: string | FetchOptions, options?: FetchOptions): Promise<Guild>;
		public fetchGuildsOfUser(id: string, options?: MultiFetchOptions): Promise<Guild[] | Store<string, Guild>>;
		public fetchStats(options?: FetchOptions): Promise<Stats>;
		public fetchUpvotes(id?: string | MultiFetchOptions, options?: MultiFetchOptions): Promise<Upvote[] | Store<string, Upvote>>;
		public fetchUser(id: string, options?: FetchOptions): Promise<User>;
	}

	export class FetchError extends Error {
		constructor(i: Response, message: string);

		public message: string;
		public readonly name: 'FetchError';

		public toString(): string;
	}

	export class Guild extends Base {
		constructor(obj: object);

		public childFriendlyIcon: boolean;
		public compliance: boolean;
		public createdTimestamp: number;
		public fullDescription?: string;
		public icon: string;
		public id: string;
		public lastUpdateTimestamp: number;
		public memberCount: number;
		public name: string;
		public public: boolean;
		public shortDescription: string;
		public tags: string[];
		public readonly emojis: string;
		public readonly owner: User;
		public readonly owners: User[];
		public readonly ownersMap: Store<string, User>;
		public readonly secondaryOwners: User[];
		public readonly pageURL: string;
		public readonly vanityURL?: string;

		public toString(): string;
	}

	export class Ratelimit extends Error {
		constructor(headers: Headers, endpoint: string);

		public readonly name: string;
		public readonly message: string;
		public readonly headers: Headers;
		public readonly limit: number;
		public readonly retryAfter: number;

		public toString(): string;
	}

	export class Stats extends Base {
		constructor(obj: object);

		public guilds: number;
		public users: number;
		public tags: number;
		public readonly guildUserTotal: number;
	}

	export class Upvote extends Base {
		constructor(obj: object, id: string);

		public guildID: string;
		public timestamp: number;
		public user: User;

		public toString(): string;
	}

	export class User extends Base {
		constructor(obj: object);
		
		public avatar: string;
		public description?: string;
		public discriminator: string;
		public id: string;
		public username: string;
		public readonly pageURL: string;
		public readonly tag: string;

		public toString(): string;
	}
	//#endregion

	//#region Typedefs
	export type ClientOptions = {
		cache?: boolean;
		guildToken?: string;
		guildID?: string;
		version?: number;
	}

	export type FetchOptions = {
		cache: boolean;
		guildToken?: string;
		raw: boolean;
		version: boolean;
	}

	export type MultiFetchOptions = FetchOptions & {
		mapify?: boolean;
		page?: number;
	}
	//#endregion
}
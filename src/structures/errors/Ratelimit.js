/**
 * @external Headers
 * @see {@link https://github.com/bitinn/node-fetch/blob/master/src/headers.js}
 */

class Ratelimit extends Error {
	/**
	 * @param {Headers} headers
	 * @param {string} endpoint
	 */
	constructor(headers, endpoint) {
		super();
		Error.captureStackTrace(this, Ratelimit);

		// It has to be in here, otherwise the error output emits an object >:(
		Object.defineProperties(this, {
			/**
		 	 * The Ratelimit Name ('Ratelimit')
			 * @name Ratelimit#name
			 * @readonly
			 * @type {string}
			 */
			name: {
				value: 'Ratelimit',
			},
			/**
			 * The Ratelimit Headers.
			 * @name Ratelimit#headers
			 * @readonly
			 * @type {Headers}
			 */
			headers: {
				value: headers,
			},
			/**
			 * The Ratelimit Message.
			 * @name Ratelimit#message
			 * @readonly
			 * @type {string}
			 */
			message: {
				value: `Endpoint /v${endpoint} Ratelimited, ${this.limit} times per ${this.retryAfter} second${this.retryAfter === 1 ? '' : 's'}`,
			}
		});
	}

	/**
	 * The number of times you can call an endpoint before you get ratelimited.
	 * @type {number}
	 */
	get limit() {
		return parseInt(this.headers.get('x-ratelimit-limit'));
	}

	/**
	 * The number of seconds you can wait until the Ratelimit is relieved.
	 * @type {number}
	 */
	get retryAfter() {
		return parseInt(this.headers.get('retry-after'));
	}

	/**
	 * The endpoint of the Ratelimit.
	 * @type {string}
	 */
	toString() {
		return this.messages.split(' ')[1];
	}
}

module.exports = Ratelimit;
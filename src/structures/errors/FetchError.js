/**
 * FetchError
 * @extends {Error}
 */
class FetchError extends Error {
	/**
     * @param {Response} i
	 * @param {string} message
     */
	constructor(i, message) {
		super(`${i.status} ${message}`);
		/**
		 * The name of the FetchError ('FetchError')
		 * @name FetchError#name
		 * @readonly
		 * @type {string}
		 */
		Object.defineProperty(this, 'name', { value: 'FetchError' });
		if (Error.captureStackTrace) Error.captureStackTrace(this, FetchError);

		/**
		 * The error message.
		 * @name FetchError#message
		 * @type {string}
		 */
	}

	/**
	 * The error message.
	 * @type {string}
	 */
	toString() {
		return this.message;
	}
}

module.exports = FetchError;
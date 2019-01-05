/**
 * The universal base of all classes.
 */
class Base {
	/**
	 * @param {object} obj
	 */
	constructor(obj) {
		/**
		 * The raw object of the class, giving the class properties value.
		 * @name Base#raw
		 * @readonly
		 * @type {object}
		 */
		Object.defineProperty(this, 'raw', { value: obj });
	}
}

module.exports = Base;
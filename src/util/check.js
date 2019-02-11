/* eslint-disable curly */

exports.edit = options => {
	if ('userToken' in options) process.emitWarning('options#userToken - Obsolete in its use.', 'DeprecationWarning');
	if (typeof options.guildToken !== 'string' && options.guildToken !== null)
		throw new TypeError('options.guildToken must be a string.');
	else if (typeof options.guildID !== 'string' && options.guildID !== null)
		throw new TypeError('options.guildID must be a string.');
	else if (typeof options.cache !== 'boolean')
		throw new TypeError('options.cache must be boolean.');
	else if (typeof options.version !== 'number')
		throw new TypeError('options.version must be a number.');
	else
		return options;
};

exports.fetch = options => {
	if ('userToken' in options) process.emitWarning('options#userToken - Obsolete in its use.', 'DeprecationWarning');
	if (typeof options.cache !== 'boolean')
		throw new TypeError('options.cache must be boolean.');
	else if (typeof options.raw !== 'boolean')
		throw new TypeError('options.raw must be boolean.');
	else if (typeof options.version !== 'number')
		throw new TypeError('options.version must be a number.');
	else if (typeof options.guildToken !== 'string' && options.guildToken !== null)
		throw new TypeError('options.guildToken must be a string.');
	else
		return options;
};

exports.multi = options => {
	exports.fetch(options);

	if (typeof options.mapify !== 'boolean')
		throw new TypeError('options.mapify must be boolean.');
	else if (typeof options.page !== 'number')
		throw new TypeError('options.page must be a number.');
	else if (typeof options.reverse !== 'boolean')
		throw new TypeError('options.reverse must be boolean.');
	else if (typeof options.sortBy !== 'string' && options.sortBy !== null)
		throw new TypeError('options.sortBy must be a string.');
	else
		return options;
};
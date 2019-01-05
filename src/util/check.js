module.exports = (options) => {
	if (typeof options.guildToken !== 'string' && options.guildToken !== null) throw new TypeError('options.guildToken must be a string.');
	else if (typeof options.guildID !== 'string' && options.guildID !== null) throw new TypeError('options.guildID must be a string.');
	else if (typeof options.cache !== 'boolean') throw new TypeError('options.cache must be boolean.');
	else if (typeof options.version !== 'number') throw new TypeError('options.version must be a number.');
	else return options;
};
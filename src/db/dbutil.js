'use strict';

function lowercaseifyKeys(obj, valuesToo) {
	var res = {};
	Object.keys(obj).forEach(function(k) {
		const newk = k.toLowerCase();
		const newv = (valuesToo && typeof obj[k] == 'string') ? obj[k].toLowerCase() : obj[k];
		res[newk] = newv;
	});
	return res;
}

module.exports.lowercaseifyKeys = lowercaseifyKeys;
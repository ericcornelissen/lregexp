const isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

let lRegExp = RegExp;

if (isSupportedRegexpFlag("l")) {
	const RegExp_ = globalThis.RegExp;
	lRegExp = function(pattern, flags="") {
		return new RegExp_(pattern, `${flags}l`);
	};
}

module.exports = lRegExp;

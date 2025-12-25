const isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

const RegExp_ = globalThis.RegExp;

let lRegExp;
if (isSupportedRegexpFlag("l")) {
	lRegExp = function(pattern, flags="") {
		return new RegExp_(pattern, `${flags}l`);
	};
} else {
	lRegExp = function(pattern, flags) {
		return new RegExp_(pattern, flags);
	};
}

module.exports = lRegExp;

// SPDX-License-Identifier: MIT

const isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

let lRegExp = RegExp;

if (isSupportedRegexpFlag("l")) {
	lRegExp = function(pattern, flags="") {
		return new RegExp(pattern, `${flags}l`);
	};
}

module.exports = lRegExp;

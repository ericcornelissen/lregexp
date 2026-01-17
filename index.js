// SPDX-License-Identifier: MIT

import isSupportedRegexpFlag from "is-supported-regexp-flag";

let lRegExp = RegExp;

if (isSupportedRegexpFlag("l")) {
	lRegExp = function(pattern, flags="") {
		return new RegExp(pattern, `${flags}l`);
	};
}

export default lRegExp;

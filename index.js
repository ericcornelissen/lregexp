import isSupportedRegexpFlag from "is-supported-regexp-flag";

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

export default lRegExp;

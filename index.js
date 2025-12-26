import isSupportedRegexpFlag from "is-supported-regexp-flag";

let lRegExp = RegExp;

if (isSupportedRegexpFlag("l")) {
	const RegExp_ = globalThis.RegExp;
	lRegExp = function(pattern, flags="") {
		return new RegExp_(pattern, `${flags}l`);
	};
}

export default lRegExp;

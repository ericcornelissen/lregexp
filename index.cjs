const isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

/**
 * The `RegExp()` constructor creates {@link RegExp} objects.
 *
 * @param {string|RegExp} pattern The text of the regular expression. This can also be another RegExp object.
 * @param {string} [flags] If specified, flags is a string that contains the flags to add. Alternatively, if a RegExp object is supplied for the pattern, the flags string will replace any of that object's flags.
 * @returns {RegExp}
 * @throws {SyntaxError} Thrown in one of the following cases: `pattern` cannot be parsed as a valid regular expression, or `flags` contains repeated characters or any character outside of those allowed.
 */
let lRegExp = RegExp;

if (isSupportedRegexpFlag("l")) {
	const RegExp_ = globalThis.RegExp;
	lRegExp = function(pattern, flags="") {
		return new RegExp_(pattern, `${flags}l`);
	};
}

module.exports = lRegExp;

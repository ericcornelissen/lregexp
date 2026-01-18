import isSupportedRegexpFlag from "is-supported-regexp-flag";

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
	lRegExp = function(pattern, flags) {
		if (flags === undefined) {
			flags = "";
			if (pattern instanceof RegExp && pattern.flags) {
				flags = pattern.flags.replace(/l/g, "");
			}
		}

		return new RegExp(pattern, `${flags}l`);
	};
}

export default lRegExp;

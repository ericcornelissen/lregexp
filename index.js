import isSupportedRegexpFlag from "is-supported-regexp-flag";

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

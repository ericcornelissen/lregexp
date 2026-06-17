// SPDX-License-Identifier: MIT

{
	var mockProperty = require("mock-property");

	var lRegExp = require("./index.cjs");

	/* --- Conditions --------------------------------------------------------- */

	var canSupplyFlagsWhenConstructingRegExpFromAnother = true;
	try {
		new RegExp(/the flag is what matters/g, "m");
	} catch (_) {
		canSupplyFlagsWhenConstructingRegExpFromAnother = false;
	}

	/* --- Duration ----------------------------------------------------------- */

	{
		var duration = time(() => {
			var regexp = new lRegExp("(a*)*$");
			regexp.test("a".repeat(20) + "b");
		});

		if (linearTimeEngine() && duration > 1) {
			throw new Error(`matched unexpectedly slow (${duration}ms) with experimental regexp engine`);
		} else if (!linearTimeEngine() && duration < 1) {
			throw new Error(`matched unexpectedly fast (${duration}ms) with default regexp engine`);
		}
	}

	/* --- Type ----------------------------------------------------------------- */

	{ // With new
		var regexp;

		regexp = new lRegExp("m0NESY");
		if (!(regexp instanceof RegExp)) {
			throw new Error("an lRegExp is not an instance of RegExp");
		}

		regexp = new lRegExp("s1mple");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("an lRegExp is not an instance of lRegExp");
		}

		regexp = new RegExp("b1t");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("a RegExp is not an instance of lRegExp");
		}
	}

	{ // Without new
		var regexp;

		regexp = lRegExp("NiKo");
		if (!(regexp instanceof RegExp)) {
			throw new Error("an lRegExp is not an instance of RegExp");
		}

		regexp = lRegExp("dev1ce");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("an lRegExp is not an instance of lRegExp");
		}

		regexp = RegExp("ScreaM");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("a RegExp is not an instance of lRegExp");
		}

		regexp = /GuardiaN/;
		if (!(regexp instanceof lRegExp)) {
			throw new Error("a RegExp literal is not an instance of lRegExp");
		}
	}

	/* --- Pattern ------------------------------------------------------------ */

	{ // With new
		var got, want;

		got = new lRegExp("from string pattern").source;
		want = new RegExp("from string pattern").source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = new lRegExp(/from literal pattern/).source;
		want = new RegExp(/from literal pattern/).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new RegExp("from RegExp pattern")).source;
		want = new RegExp(new RegExp("from RegExp pattern")).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new lRegExp("from lRegExp pattern")).source;
		want = new RegExp(new lRegExp("from lRegExp pattern")).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}
	}

	{ // Without new
		var got, want;

		got = lRegExp("from string pattern").source;
		want = RegExp("from string pattern").source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = lRegExp(/from literal pattern/).source;
		want = RegExp(/from literal pattern/).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = lRegExp(new RegExp("from RegExp pattern")).source;
		want = RegExp(new RegExp("from RegExp pattern")).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}

		got = lRegExp(new lRegExp("from lRegExp pattern")).source;
		want = RegExp(new lRegExp("from lRegExp pattern")).source;
		if (got !== want) {
			throw new Error(`unexpected pattern (got "${got}", want "${want}")`);
		}
	}

	/* --- Flags -------------------------------------------------------------- */

	{ // 'l' flag
		var regexp = new lRegExp("might or might not have the 'l' flag and linear property");

		if (linearTimeEngine()) {
			if (!flags(regexp).includes("l")) {
				throw new Error("Instance of lRegExp is missing the 'l' flag");
			}

			if (!regexp.linear) {
				throw new Error("Instance of lRegExp is missing the 'linear' property");
			}
		} else {
			if (flags(regexp).includes("l")) {
				throw new Error("Instance of lRegExp unexpectedly has the 'l' flag");
			}

			if (regexp.linear) {
				throw new Error("Instance of lRegExp unexpectedly has the 'linear' property");
			}
		}
	}

	{ // Without flags
		var got, want;

		got = flags(new lRegExp("no flags"));
		want = flags(new RegExp("no flags"));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp("explicit undefined flags", undefined));
		want = flags(new RegExp("explicit undefined flags", undefined));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(/from literal without flags/));
		want = flags(new RegExp(/from literal without flags/));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(/from literal with flags/g));
		want = flags(new RegExp(/from literal with flags/g));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(new RegExp("from RegExp without flags")));
		want = flags(new RegExp(new RegExp("from RegExp without flags")));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(new RegExp("from RegExp with flags", "g")));
		want = flags(new RegExp(new RegExp("from RegExp with flags", "g")));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(new lRegExp("from lRegExp with flags", "g")));
		want = flags(new RegExp(new lRegExp("from lRegExp with flags", "g")));
		if (got !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp(new lRegExp("from lRegExp without flags")));
		want = flags(new RegExp(new lRegExp("from lRegExp without flags")));
		if (got !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = flags(new lRegExp({ flags: "g" }));
		want = flags(new RegExp({ flags: "g" }));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}
	}

	{ // With flags
		var got, want;

		got = flags(new lRegExp("no flags", "m"));
		want = flags(new RegExp("no flags", "m"));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		if (canSupplyFlagsWhenConstructingRegExpFromAnother) {
			got = flags(new lRegExp(/from literal without flags/, "m"));
			want = flags(new RegExp(/from literal without flags/, "m"));
			if (got.replace(/l/g, "") !== want) {
				throw new Error(`unexpected flags (got "${got}", want "${want}")`);
			}
		}

		if (canSupplyFlagsWhenConstructingRegExpFromAnother) {
			got = flags(new lRegExp(/from literal with flags/g, "m"));
			want = flags(new RegExp(/from literal with flags/g, "m"));
			if (got.replace(/l/g, "") !== want) {
				throw new Error(`unexpected flags (got "${got}", want "${want}")`);
			}
		}

		got = flags(new lRegExp(new RegExp("from RegExp without flags", "m")));
		want = flags(new RegExp(new RegExp("from RegExp without flags", "m")));
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		if (canSupplyFlagsWhenConstructingRegExpFromAnother) {
			got = flags(new lRegExp(new RegExp("from RegExp with flags", "g"), "m"));
			want = flags(new RegExp(new RegExp("from RegExp with flags", "g"), "m"));
			if (got.replace(/l/g, "") !== want) {
				throw new Error(`unexpected flags (got "${got}", want "${want}")`);
			}
		}

		if (canSupplyFlagsWhenConstructingRegExpFromAnother) {
			got = flags(new lRegExp(new lRegExp("from lRegExp without flags"), "m"));
			want = flags(new RegExp(new lRegExp("from lRegExp without flags"), "m"));
			if (got.replace(/l/g, "") !== want) {
				throw new Error(`unexpected flags (got "${got}", want "${want}")`);
			}
		}

		if (canSupplyFlagsWhenConstructingRegExpFromAnother) {
			got = flags(new lRegExp(new lRegExp("from lRegExp with flags", "g"), "m"));
			want = flags(new RegExp(new lRegExp("from lRegExp with flags", "g"), "m"));
			if (got.replace(/l/g, "") !== want) {
				throw new Error(`unexpected flags (got "${got}", want "${want}")`);
			}
		}
	}

	/* --- Class properties -------------------------------------------------- */

	{
		const model = RegExp;
		const real = lRegExp;

		for (const prop of Object.getOwnPropertyNames(model)) {
			const got = real[prop];
			const want = model[prop];
			if (got !== want) {
				throw new Error(`value mismatch for property '${prop}' (got "${got}", want "${want}")`);
			}
		}
	}

	/* --- Instance properties ------------------------------------------------ */

	{
		var model = /foobar/g;
		var real = new lRegExp("foobar", "g");

		for (var prop of Object.getOwnPropertyNames(model)) {
			var got = real[prop];
			var want = model[prop];
			if (got !== want) {
				throw new Error(`value mismatch for property '${prop}' (got "${got}", want "${want}")`);
			}
		}

		for (var prop of Object.getOwnPropertyNames(RegExp.prototype)) {
			if (prop === "flags" || prop === "linear") {
				continue; // Tested separately
			}

			var got = real[prop];
			var want = model[prop];
			if (got !== want) {
				throw new Error(`value mismatch for property '${prop}' (got "${got}", want "${want}")`);
			}
		}
	}

	/* --- Edge cases --------------------------------------------------------- */

	{ // no RegExp.prototype.flags
		var restore = mockProperty(RegExp.prototype, "flags", { "delete": true });

		try {
			new lRegExp(/irrelevant/);
		} catch (_) {
			throw new Error("unexpected error without RegExp.prototype.flags");
		} finally {
			restore();
		}
	}

	{ // Unconventional pattern values
		var values = [
			null,
			undefined,
			42,
			3.14,
			[],
			{},
		];

		for (var value of values) {
			var got, want;

			try {
				new lRegExp(value);
				got = false;
			} catch (_) {
				got = true;
			}

			try {
				new RegExp(value);
				want = false;
			} catch (_) {
				want = true;
			}

			if (got != want) {
				var result = got ? "failed" : "succeeded";
				throw new Error(`Unexpectedly ${result} with ${value} as pattern`);
			}
		}
	}
}

/* -------------------------------------------------------------------------- */

{
	/**
	 * MIT License
	 *
	 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	// The above copyright notice is from npm:is-supported-regexp-flag@2.0.0 (see
	// <https://www.npmjs.com/package/is-supported-regexp-flag>), which only has
	// an ESM version of these tests. Below is a CommonJS version, modified to be
	// able to pass on Node.js v5 and earlier.

	var isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

	if (isSupportedRegexpFlag("g") !== true) {
		throw new Error("flag 'g' unexpectedly unsupported");
	}

	if (isSupportedRegexpFlag("m") !== true) {
		throw new Error("flag 'm' unexpectedly unsupported");
	}

	if (isSupportedRegexpFlag("q") !== false) {
		throw new Error("flag 'q' unexpectedly supported");
	}
}

/* -------------------------------------------------------------------------- */

function time(cb) {
	var start = Date.now();
	cb();
	var end = Date.now();

	var duration = end - start;
	return duration;
}

function linearTimeEngine() {
	try {
		new RegExp("", "l");
		return true;
	} catch (_) {
		return false;
	}
}

function flags(regexp) {
	var flags = "";
	if (regexp.dotAll) flags += "s";
	if (regexp.global) flags += "g";
	if (regexp.hasIndices) flags += "d";
	if (regexp.ignoreCase) flags += "i";
	if (regexp.linear) flags += "l";
	if (regexp.multiline) flags += "m";
	if (regexp.unicode) flags += "u";
	if (regexp.unicodeSets) flags += "v";
	if (regexp.sticky) flags += "y";
	return flags;
}

module.exports = { time, linearTimeEngine };

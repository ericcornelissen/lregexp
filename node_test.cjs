// SPDX-License-Identifier: MIT

{
	const mockProperty = require("mock-property");

	const lRegExp = require("./index.cjs");

	/* --- Duration ----------------------------------------------------------- */

	{
		const duration = time(() => {
			const regexp = new lRegExp("(a*)*$");
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
		let regexp;

		regexp = new lRegExp("m0NESY");
		if (!(regexp instanceof RegExp)) {
			throw new Error("an lRegExp is not an instance of RegExp");
		}

		regexp = new lRegExp("s1mple");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("an lRegExp is not an instance of lRegExp");
		}
	}

	{ // Without new
		let regexp;

		regexp = lRegExp("NiKo");
		if (!(regexp instanceof RegExp)) {
			throw new Error("an lRegExp is not an instance of RegExp");
		}

		regexp = lRegExp("dev1ce");
		if (!(regexp instanceof lRegExp)) {
			throw new Error("an lRegExp is not an instance of lRegExp");
		}
	}

	/* --- Pattern ------------------------------------------------------------ */

	{ // With new
		let got, want;

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
		let got, want;

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

	{ // Without flags
		let got, want;

		got = new lRegExp("no flags").flags;
		want = new RegExp("no flags").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp("explicit undefined flags", undefined).flags;
		want = new RegExp("explicit undefined flags", undefined).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(/from literal without flags/).flags;
		want = new RegExp(/from literal without flags/).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(/from literal with flags/g).flags;
		want = new RegExp(/from literal with flags/g).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new RegExp("from RegExp without flags")).flags;
		want = new RegExp(new RegExp("from RegExp without flags")).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new RegExp("from RegExp with flags", "g")).flags;
		want = new RegExp(new RegExp("from RegExp with flags", "g")).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new lRegExp("from lRegExp without flags")).flags;
		want = new RegExp(new lRegExp("from lRegExp without flags")).flags;
		if (got !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new lRegExp("from lRegExp with flags", "g")).flags;
		want = new RegExp(new lRegExp("from lRegExp with flags", "g")).flags;
		if (got !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp({ flags: "g" }).flags;
		want = new RegExp({ flags: "g" }).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}
	}

	{ // With flags
		let got, want;

		got = new lRegExp("no flags", "m").flags;
		want = new RegExp("no flags", "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(/from literal without flags/, "m").flags;
		want = new RegExp(/from literal without flags/, "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(/from literal with flags/g, "m").flags;
		want = new RegExp(/from literal with flags/g, "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new RegExp("from RegExp without flags", "m")).flags;
		want = new RegExp(new RegExp("from RegExp without flags", "m")).flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new RegExp("from RegExp with flags", "g"), "m").flags;
		want = new RegExp(new RegExp("from RegExp with flags", "g"), "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new lRegExp("from lRegExp without flags"), "m").flags;
		want = new RegExp(new lRegExp("from lRegExp without flags"), "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}

		got = new lRegExp(new lRegExp("from lRegExp with flags", "g"), "m").flags;
		want = new RegExp(new lRegExp("from lRegExp with flags", "g"), "m").flags;
		if (got.replace(/l/g, "") !== want) {
			throw new Error(`unexpected flags (got "${got}", want "${want}")`);
		}
	}

	/* --- RegExp.prototype --------------------------------------------------- */

	{ // RegExp.prototype.flags
		const restore = mockProperty(RegExp.prototype, "flags", { "delete": true });

		try {
			new lRegExp(/irrelevant/);
		} catch (_) {
			throw new Error("unexpected error without RegExp.prototype.flags");
		} finally {
			restore();
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
	// an ESM version of the tests. Below is a CommonJS version of that.

	const isSupportedRegexpFlag = require("./is-supported-regexp-flag.cjs");

	if (isSupportedRegexpFlag("g") !== true) {
		throw new Error("flag 'g' unexpectedly unsupported");
	}

	if (isSupportedRegexpFlag("u") !== true) {
		throw new Error("flag 'u' unexpectedly unsupported");
	}

	if (isSupportedRegexpFlag("q") !== false) {
		throw new Error("flag 'q' unexpectedly supported");
	}
}

/* -------------------------------------------------------------------------- */

function time(cb) {
	const start = Date.now();
	cb();
	const end = Date.now();

	const duration = end - start;
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

module.exports = { time, linearTimeEngine };

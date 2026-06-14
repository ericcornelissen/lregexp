// SPDX-License-Identifier: MIT

import { test } from "node:test";

import * as fc from "fast-check";

import lRegExp from "./index.js";

test("--enable-experimental-regexp-engine", () => {
	/ensures that the linear engine is enabled/l;
});

test("case-insensitive", () => {
	const regexp = /ab[c-z]/;
	const regexpi = new RegExp(regexp, "i");
	const regexpl = new lRegExp(regexp);

	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.stringMatching(regexp),
				fc.stringMatching(regexp).map((s) => s.toUpperCase()),
			),
			(s) => regexpi.test(s) === regexpl.test(s.toLowerCase()),
		),
	);
});

test("positive lookahead", () => {
	const regexp = /a(?=b)/;
	const regexpl = new lRegExp(/a(b)/);

	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.stringMatching(/ab/),
				fc.stringMatching(/ac/),
			),
			(s) => s.replace(regexp, "A") === s.replace(regexpl, "A$1"),
		),
	);
});

test("negative lookahead", () => {
	const regexp = /a(?!b)/;
	const regexpl = new lRegExp(/a([^b]|$)/);

	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.stringMatching(/ab/),
				fc.stringMatching(/ac/),
			),
			(s) => s.replace(regexp, "A") === s.replace(regexpl, "A$1"),
		),
	);
});

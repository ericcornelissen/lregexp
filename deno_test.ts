// SPDX-License-Identifier: MIT

import { assert } from "jsr:@std/assert";

import lRegExp from "./index.js";

Deno.test("Linear engine should handle pathological input", () => {
	const start = performance.now();

	const regexp = new lRegExp("(a*)*$");
	regexp.test("a".repeat(20)+"b");

	const end = performance.now();

	const duration = end - start;
	const threshold = 100;
	assert(
		linearTimeEngine()
			? duration < threshold
			: duration > threshold,
		linearTimeEngine()
			? `matched unexpectedly slow (${duration}ms) with experimental regexp engine`
			: `matched unexpectedly fast (${duration}ms) with default regexp engine`,
	);
});

function linearTimeEngine() {
	try {
		new RegExp("", "l");
		return true;
	} catch (_) {
		return false;
	}
}

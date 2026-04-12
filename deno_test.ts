// SPDX-License-Identifier: MIT

import { assert } from "jsr:@std/assert";

import lRegExp from "npm:@ericcornelissen/lregexp";

import { linearTimeEngine } from "./node_test.cjs";

Deno.test("Linear engine should handle pathological input", () => {
	const start = performance.now();

	const regexp = new lRegExp("(a*)*$");
	regexp.test("a".repeat(20)+"b");

	const end = performance.now();

	const duration = end - start;
	assert(
		linearTimeEngine()
			? duration < 1
			: duration > 1,
		linearTimeEngine()
			? `matched unexpectedly slow (${duration}ms) with experimental regexp engine`
			: `matched unexpectedly fast (${duration}ms) with default regexp engine`,
	);
});

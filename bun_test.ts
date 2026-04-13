// SPDX-License-Identifier: MIT

import { test, expect } from "bun:test";

import lRegExp from "@ericcornelissen/lregexp";

test("lRegExp should have no effects", () => {
	const start = performance.now();

	const regexp = new lRegExp("(a*)*$");
	regexp.test("a".repeat(20)+"b");

	const end = performance.now();

	const duration = end - start;
	expect(1).toBeLessThan(duration);
});

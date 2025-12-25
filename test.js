import { time, linearTimeEngine } from "./test.cjs";

import lRegExp from "./index.js";

const duration = time(() => {
	const regexp = new lRegExp("(a*)*$");
	regexp.test("a".repeat(16)+"b");
});

if (linearTimeEngine() && duration > 1) {
	throw new Error(`matched unexpectedly slow (${duration}ms) with experimental regexp engine`);
} else if (!linearTimeEngine() && duration < 1) {
	throw new Error(`matched unexpectedly fast (${duration}ms) with default regexp engine`);
}

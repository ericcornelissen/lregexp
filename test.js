// SPDX-License-Identifier: MIT

import { time, linearTimeEngine } from "./test.cjs";

import lRegExp from "./index.js";

/* --- Duration ------------------------------------------------------------- */

{
	const duration = time(() => {
		const regexp = new lRegExp("(a*)*$");
		regexp.test("a".repeat(20)+"b");
	});

	if (linearTimeEngine() && duration > 1) {
		throw new Error(`matched unexpectedly slow (${duration}ms) with experimental regexp engine`);
	} else if (!linearTimeEngine() && duration < 1) {
		throw new Error(`matched unexpectedly fast (${duration}ms) with default regexp engine`);
	}
}

/* --- Pattern -------------------------------------------------------------- */

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

/* --- Flags ---------------------------------------------------------------- */

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
}

{ // With flags
	let got, want;

	got = new lRegExp("no flags", "s").flags;
	want = new RegExp("no flags", "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(/from literal without flags/, "s").flags;
	want = new RegExp(/from literal without flags/, "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(/from literal with flags/g, "s").flags;
	want = new RegExp(/from literal with flags/g, "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(new RegExp("from RegExp without flags", "s")).flags;
	want = new RegExp(new RegExp("from RegExp without flags", "s")).flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(new RegExp("from RegExp with flags", "g"), "s").flags;
	want = new RegExp(new RegExp("from RegExp with flags", "g"), "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(new lRegExp("from lRegExp without flags"), "s").flags;
	want = new RegExp(new lRegExp("from lRegExp without flags"), "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}

	got = new lRegExp(new lRegExp("from lRegExp with flags", "g"), "s").flags;
	want = new RegExp(new lRegExp("from lRegExp with flags", "g"), "s").flags;
	if (got.replace(/l/g, "") !== want) {
		throw new Error(`unexpected flags (got "${got}", want "${want}")`);
	}
}

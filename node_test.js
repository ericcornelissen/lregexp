// SPDX-License-Identifier: MIT

import mockProperty from "mock-property";

import { time, linearTimeEngine } from "./node_test.cjs";

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

/* --- Type ----------------------------------------------------------------- */

{ // With new
	const regexp = new lRegExp("donk");
	if (!(regexp instanceof RegExp)) {
		throw new Error("an lRegExp is not an instance of RegExp");
	}
}

{ // Without new
	const regexp = lRegExp("ZywOo");
	if (!(regexp instanceof RegExp)) {
		throw new Error("an lRegExp is not an instance of RegExp");
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

{ // 'l' flag
	const regexp = new lRegExp("might or might not have the 'l' flag and linear property");

	if (linearTimeEngine()) {
		if (!regexp.flags.includes("l")) {
			throw new Error("Instance of lRegExp is missing the 'l' flag");
		}

		if (!regexp.linear) {
			throw new Error("Instance of lRegExp is missing the 'linear' property");
		}
	} else {
		if (regexp.flags.includes("l")) {
			throw new Error("Instance of lRegExp unexpectedly has the 'l' flag");
		}

		if (regexp.linear) {
			throw new Error("Instance of lRegExp unexpectedly has the 'linear' property");
		}
	}
}

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

/* --- Instance properties -------------------------------------------------- */

{
	const model = /foobar/g;
	const real = new lRegExp("foobar", "g");

	for (const prop of Object.getOwnPropertyNames(model)) {
		const got = real[prop];
		const want = model[prop];
		if (got !== want) {
			throw new Error(`value mismatch for property '${prop}' (got "${got}", want "${want}")`);
		}
	}

	for (const prop of Object.getOwnPropertyNames(RegExp.prototype)) {
		if (prop === "flags" || prop === "linear") {
			continue; // Tested separately
		}

		const got = real[prop];
		const want = model[prop];
		if (got !== want) {
			throw new Error(`value mismatch for property '${prop}' (got "${got}", want "${want}")`);
		}
	}
}

/* --- RegExp.prototype ----------------------------------------------------- */

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

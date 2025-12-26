import { Bench } from "tinybench";

import lRegExp from "./index.js";

const bench = new Bench();

bench
	.add("/syntax/", () => {
		/foobar/g;
	})
	.add("new RegExp()", () => {
		new RegExp("foobar", "g");
	})
	.add("new lRegExp()", () => {
		new lRegExp("foobar", "g");
	});

await bench.run();

console.table(bench.table());

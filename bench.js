// SPDX-License-Identifier: MIT

import { Bench } from "tinybench";

import lRegExp from "./index.js";

const bench = new Bench();

bench
	.add("/.../", () => {
		/foobar/g;
	})
	.add("new RegExp('...')", () => {
		new RegExp("foobar");
	})
	.add("new lRegExp('...')", () => {
		new lRegExp("foobar");
	})
	.add("new RegExp('...', flags)", () => {
		new RegExp("foobar", "g");
	})
	.add("new lRegExp('...', flags)", () => {
		new lRegExp("foobar", "g");
	})
	.add("new RegExp(/.../)", () => {
		new RegExp(/foobar/);
	})
	.add("new lRegExp(/.../)", () => {
		new lRegExp(/foobar/);
	})
	.add("new RegExp(/.../, flags)", () => {
		new RegExp(/foobar/, "g");
	})
	.add("new lRegExp(/.../, flags)", () => {
		new lRegExp(/foobar/, "g");
	})
	.add("new RegExp(/.../flags)", () => {
		new RegExp(/foobar/g);
	})
	.add("new lRegExp(/.../flags)", () => {
		new lRegExp(/foobar/g);
	})
	.add("new RegExp(/.../flags, flags)", () => {
		new RegExp(/foobar/g, "g");
	})
	.add("new lRegExp(/.../flags, flags)", () => {
		new lRegExp(/foobar/g, "g");
	});

await bench.run();

console.table(bench.table());

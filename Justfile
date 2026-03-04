# Configuration file for Just (https://just.systems/)

[private]
@default:
	just --list

@benchmark:
	echo 'Normal regular expression engine'
	node bench.js
	echo 'Experimental regular expression engine'
	node --enable-experimental-regexp-engine bench.js

test: test-bun test-deno test-node

test-bun: test-bun-normal

[private]
test-bun-normal:
	{{bun}} test bun_test.ts

test-deno: test-deno-linear test-deno-normal

[private]
test-deno-linear $DENO_V8_FLAGS="--enable-experimental-regexp-engine":
	{{deno}} test deno_test.ts --no-check --allow-read
[private]
test-deno-normal:
	{{deno}} test deno_test.ts --no-check --allow-read

test-node: test-node-cjs test-node-esm

[private]
test-node-cjs: test-node-cjs-linear test-node-cjs-normal
[private]
test-node-cjs-linear:
	{{node}} {{experiment_engine_flag}} node_test.cjs
[private]
test-node-cjs-normal:
	{{node}} node_test.cjs

[private]
test-node-esm: test-node-esm-linear test-node-esm-normal
[private]
test-node-esm-linear:
	{{node}} {{experiment_engine_flag}} node_test.js
[private]
test-node-esm-normal:
	{{node}} node_test.js


experiment_engine_flag := if `node --version` =~ "v(12|13|14).+" {
	""
} else {
	"--enable-experimental-regexp-engine"
}

node := if `command -v node || true` =~ ".+" {
	"node"
} else {
	"docker run --rm --entrypoint 'node' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/node:latest"
}

deno := if `command -v deno || true` =~ ".+" {
	"deno"
} else {
	"docker run --rm --entrypoint 'deno' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' --env DENO_V8_FLAGS docker.io/denoland/deno:latest"
}

bun := if `command -v bun || true` =~ ".+" {
	"bun"
} else {
	"docker run --rm --entrypoint 'bun' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/oven/bun:latest"
}

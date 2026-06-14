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
	{{ if node_has_esm_support == true { node + " " + experiment_engine_flag + " node_test.js" } else { "" } }}

[private]
test-node-esm-normal:
	{{ if node_has_esm_support == true { node + " node_test.js" } else { "" } }}

test-node-compatibility: test-node-compatibility-cjs test-node-compatibility-esm

[private]
test-node-compatibility-cjs:
	npx nve '8.0.0,9.0.0,10.0.0,11.0.0,12.0.0,13.0.0,14.0.0,15.0.0,16.0.0,17.0.0,18.0.0,19.0.0,20.0.0,21.0.0,22.0.0,23.0.0,24.0.0,25.0.0,26.0.0' node node_test.cjs

[private]
test-node-compatibility-esm:
	npx nve '15.0.0,16.0.0,17.0.0,18.0.0,19.0.0,20.0.0,21.0.0,22.0.0,23.0.0,24.0.0,25.0.0,26.0.0' node node_test.js

test-rewrite:
	node --test --enable-experimental-regexp-engine rewrite_test.js

test-mutation:
	mutate --mutantDir mutants index.js
	analyze_mutants --mutantDir mutants index.js "just test-node-esm"

true:="true"
false:="false"

node_version:=`command -v node && node --version || true`
node_has_esm_support:=if node_version =~ "v(8|9|10|11|12|13|14)\\..+" { false } else { true }
node_has_linear_regexp_engine_support:=if node_version =~ "v(8|9|10|11|12|13|14)\\..+" { false } else { true }

experiment_engine_flag := if node_has_linear_regexp_engine_support == true {
	"--enable-experimental-regexp-engine"
} else {
	""
}

node := if `command -v node || true` =~ ".+" {
	"node"
} else {
	"docker run --rm --entrypoint 'node' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/node:2.0.0"
}

deno := if `command -v deno || true` =~ ".+" {
	"deno"
} else {
	"docker run --rm --entrypoint 'deno' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' --env DENO_V8_FLAGS docker.io/denoland/deno:2.0.0"
}

bun := if `command -v bun || true` =~ ".+" {
	"bun"
} else {
	"docker run --rm --entrypoint 'bun' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/oven/bun:latest"
}

# Configuration file for Just (https://just.systems/)

[private]
@default:
	just --list

@benchmark:
	echo 'Normal regular expression engine'
	node bench.js
	echo 'Experimental regular expression engine'
	node --enable-experimental-regexp-engine bench.js

mutation: mutation-cjs mutation-esm

[private]
mutation-esm:
	mutate --mutantDir mutants index.js javascript
	analyze_mutants --mutantDir mutants index.js 'just test-node-esm'
	mv killed.txt killed-esm.txt
	mv notkilled.txt notkilled-esm.txt
	if [ -s notkilled-esm.txt ]; then exit 1; fi

[private]
mutation-cjs:
	mutate --mutantDir mutants index.cjs javascript
	analyze_mutants --mutantDir mutants index.cjs 'just test-node-cjs'
	mv killed.txt killed-cjs.txt
	mv notkilled.txt notkilled-cjs.txt
	if [ -s notkilled-cjs.txt ]; then exit 1; fi

test: test-bun test-deno test-node

test-bun: test-bun-normal

[private]
test-bun-normal:
	{{bun}} test bun_test.ts

test-compatibility-bun:
	{{bun_docker}}:1.0.0 test bun_test.ts
	{{bun_docker}}:1.1.0 test bun_test.ts
	{{bun_docker}}:1.2.0 test bun_test.ts
	{{bun_docker}}:1.3.0 test bun_test.ts

test-compatibility-deno:
	{{deno_docker}}:1.40.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:1.41.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:1.42.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:1.43.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:1.44.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.0.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.1.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.2.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.3.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.4.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.5.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.6.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.7.0 test deno_test.ts  --no-check --allow-read
	{{deno_docker}}:2.8.0 test deno_test.ts  --no-check --allow-read

test-compatibility-node: test-compatibility-node-cjs test-compatibility-node-esm

[private]
test-compatibility-node-cjs:
	npx nve '0.8.6,0.9.1,0.10.0,0.11.0,0.12.0,4.0.0,5.0.0,6.0.0,7.0.0,8.0.0,9.0.0,10.0.0,11.0.0,12.0.0,13.0.0,14.0.0,15.0.0,16.0.0,17.0.0,18.0.0,19.0.0,20.0.0,21.0.0,22.0.0,23.0.0,24.0.0,25.0.0,26.0.0' node node_test.cjs

[private]
test-compatibility-node-esm:
	npx nve '15.0.0,16.0.0,17.0.0,18.0.0,19.0.0,20.0.0,21.0.0,22.0.0,23.0.0,24.0.0,25.0.0,26.0.0' node node_test.js


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

test-rewrite:
	node --test --enable-experimental-regexp-engine rewrite_test.js

true:="true"
false:="false"

node_version:=`command -v node && node --version || true`
node_has_esm_support:=if node_version =~ "v(0|4|5|6|7|8|9|10|11|12|13|14)\\..+" { false } else { true }
node_has_linear_regexp_engine_support:=if node_version =~ "v(0|4|5|6|7|8|9|10|11|12|13|14)\\..+" { false } else { true }

experiment_engine_flag := if node_has_linear_regexp_engine_support == true {
	"--enable-experimental-regexp-engine"
} else {
	""
}

node_docker := "docker run --rm --entrypoint 'node' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/node"
node := if `command -v node || true` =~ ".+" { "node" } else { node_docker + ":latest" }

deno_docker := "docker run --rm --entrypoint 'deno' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' --env DENO_V8_FLAGS docker.io/denoland/deno"
deno := if `command -v deno || true` =~ ".+" { "deno" } else { deno_docker + ":latest" }

bun_docker := "docker run --rm --entrypoint 'bun' --workdir '/lregexp' --mount 'type=bind,source=.,target=/lregexp' docker.io/oven/bun"
bun := if `command -v bun || true` =~ ".+" { "bun" } else { bun_docker + ":latest" }

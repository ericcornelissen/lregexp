# Configuration file for Just (https://just.systems/)

node_version := `node --version`
experiment_engine_flag := \
    if node_version =~ "v(12|13|14).+" { "" } \
    else { "--enable-experimental-regexp-engine" }

[private]
@default:
	just --list

@benchmark:
	echo 'Normal regular expression engine'
	node bench.js
	echo 'Experimental regular expression engine'
	node --enable-experimental-regexp-engine bench.js

test: test-deno test-node
test-deno: test-deno-linear test-deno-normal
test-node: test-node-cjs test-node-esm

[private]
test-node-cjs: test-node-cjs-linear test-node-cjs-normal
[private]
test-node-cjs-linear:
	node {{experiment_engine_flag}} node_test.cjs
[private]
test-node-cjs-normal:
	node node_test.cjs

[private]
test-node-esm: test-node-esm-linear test-node-esm-normal
[private]
test-node-esm-linear:
	node {{experiment_engine_flag}} node_test.js
[private]
test-node-esm-normal:
	node node_test.js

[private]
test-deno-linear:
	docker run --rm \
		--entrypoint 'deno' \
		--workdir '/lregexp' \
		--mount 'type=bind,source=.,target=/lregexp' \
		--name 'lregexp-deno-linear' \
		--env DENO_V8_FLAGS="--enable-experimental-regexp-engine"'' \
		docker.io/denoland/deno:2.6.8 \
		test --no-check --allow-read
[private]
test-deno-normal:
	docker run --rm \
		--entrypoint 'deno' \
		--workdir '/lregexp' \
		--mount 'type=bind,source=.,target=/lregexp' \
		--name 'lregexp-deno-normal' \
		docker.io/denoland/deno:2.6.8 \
		test --no-check --allow-read

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

test: test-cjs test-esm

[private]
test-cjs: test-cjs-linear test-cjs-normal
[private]
test-cjs-linear:
	node {{experiment_engine_flag}} test.cjs
[private]
test-cjs-normal:
	node test.cjs

[private]
test-esm: test-esm-linear test-esm-normal
[private]
test-esm-linear:
	node {{experiment_engine_flag}} test.js
[private]
test-esm-normal:
	node test.js

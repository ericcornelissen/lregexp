# Configuration file for Just (https://just.systems/)

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
	node --enable-experimental-regexp-engine test.cjs
[private]
test-cjs-normal:
	node test.cjs

[private]
test-esm: test-esm-linear test-esm-normal
[private]
test-esm-linear:
	node --enable-experimental-regexp-engine test.js
[private]
test-esm-normal:
	node test.js

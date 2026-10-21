<!-- SPDX-License-Identifier: CC0-1.0 -->

# lRegExp

Transparent linear-time ([non-backtracking]) regular expressions for libraries.

[non-backtracking]: https://v8.dev/blog/non-backtracking-regexp

## Usage

This package exports a drop-in replacement for the built-in RegExp ([caveats]
apply).

```javascript
import RegExp from "@ericcornelissen/lregexp";
const re = new RegExp("[linear]{6}");
re.test("is linear time matching possible?");
// ==> true
```

[caveats]: #caveats

### Support

This package is compatible with Node.js, Deno, Bun, and major browsers. It only
takes effect in V8-based runtimes (Node.js, Deno, Chromium-based browsers) when
the experimental linear-time engine is enabled. Otherwise it falls back to the
default `RegExp` constructor.

To enable the linear-time regular expression engine:

- **Node.js**: use `node --enable-experimental-regexp-engine entrypoint.js`
- **Deno**: use `DENO_V8_FLAGS="--enable-experimental-regexp-engine" deno entrypoint.ts`

### Installation

We recommend different installations methods based on the user. [App developers]
should add lRegExp as a dependency whereas [library authors] should add it as an
optional peer dependency.

[app developers]: #for-applications
[library authors]: #for-libraries

#### For Libraries

We recommend library authors to add lRegExp as an optional peer dependency. This
lets application developers opt-in to it when they enable the linear time engine
without bloating the dependency graph of other developers. To do this, run

```shell
npm install --save-peer '@ericcornelissen/lregexp'
npm pkg set --json 'peerDependenciesMeta.@ericcornelissen/lregexp.optional=true'
```

Then, create a local wrapper to import lRegExp with a fallback to RegExp

```javascript
// filename: regexp.js
let regexp;
try {
  regexp = (await import("@ericcornelissen/lregexp")).default;
} catch {
  regexp = RegExp;
}
export default regexp;
```

```javascript
// filename: regexp.cjs
let regexp;
try {
  regexp = require("@ericcornelissen/lregexp");
} catch {
  regexp = RegExp;
}
module.exports = regexp;
```

and import it instead of lRegExp

```diff
- import RegExp from "@ericcornelissen/lregexp";
+ import RegExp from "./regexp.js";
```

#### For Applications

Application developers should add lRegExp as a runtime dependency. If you don't
plan on using it yourself, check if any of your dependencies can use it. To do
this, run

```shell
npm ls --all | grep lregexp
```

and check if the output contains

```log
UNMET OPTIONAL DEPENDENCY @ericcornelissen/lregexp
```

if so, install lRegExp as you would any other runtime dependency

```shell
npm install @ericcornelissen/lregexp
```

and run your application with the `--enable-experimental-regexp-engine` flag.

## Background

### Why

Backtracking regular expressions can take exponential time to evaluate, leading
to the dreaded _ReDoS_ vulnerability. Linear-time regular expressions avoid this
by not backtracking.

In V8-based runtimes, linear-time regular expressions can be created using the
`l` flag provided the `--enable-experimental-regexp-engine` CLI option is used.
This makes it difficult for library authors to tap into. Using this package, a
library can use the RegExp constructor as usual and benefit from the linear time
regular expression engine when its users enable it. If they don't, it gracefully
falls back to the default constructor.

### Caveats

Not all valid JavaScript regular expressions are supported when using the
`--enable-experimental-regexp-engine` CLI option. This package won't tell you if
your regular expressions are incompatible, unless you run it with that CLI
option. If a regular expression is incompatible, the constructor will throw a
[SyntaxError].

To support users of this package in writing compatible regular expressions we're
interested in:

- an ESLint plugin to lint regular expressions and raise warnings for the use of
  regex features not supported by the non-backtracking engine; ([#4])
- a tool (CLI/web) to check a given regular expression for compatibility with
  the non-backtracking engine. ([#21])

[#4]: https://github.com/ericcornelissen/lregexp/issues/4
[#21]: https://github.com/ericcornelissen/lregexp/issues/21
[syntaxerror]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError

### Example

A classic example of a ReDoS-vulnerable regular expression is `(a*)*b`. Using
this with vanilla Node.js on a pathological input string takes quite some time,
test it for yourself with (add an `a` and the runtime doubles):

```shell
node -e '/(a*)*b/.test("aaaaaaaaaaaaaaaaaaaaaaaaac")'
```

When the non-backtracking regular expression engine is enabled, the expression
evaluates instantly:

```shell
node -e '/(a*)*b/l.test("aaaaaaaaaaaaaaaaaaaaaaaaac")' --enable-experimental-regexp-engine
```

## Rewriting

The following are some suggestions for rewriting regular expressions from
JavaScript's standard engine to the linear-time engine. These suggestions are
not universally applicable and careful testing is still required.

- Positive lookahead (`(?=...)`) when _replacing_

  Capture the lookahead and restore it (using `$<n>`) when replacing. For
  example: `replace(/(a(?=b)/, "A")` to `replace(/a(b)/, "A$1")`.

- Negative lookahead (`(?!...)`) when _replacing_

  Capture the lookahead, invert the match, add an end-of-string anchor (`$`),
  and restore it (using `$<n>`) when replacing. For example:
  `replace(/(a(?!b)/, "A")` to `replace(/a([^b]|$)/, "A$1")`.

- `i` flag when _testing_

  Write the regular expression to match lowercase strings and convert strings to
  lowercase (using `.toLowerCase()`) before matching them.

### Testing

We recommend using [differential testing] using [fast-check] when rewriting
regular expressions. You can use the following test example as a template:

```javascript
// Run as: node --test --enable-experimental-regexp-engine rewrite_test.js

import { test } from "node:test";

import lRegExp from "@ericcornelissen/lregexp";
import * as fc from "fast-check";

test("rewritten regular expression", () => {
  const original = /old regular expression/;
  const rewritten = new lRegExp(/new regular expression/);

  fc.assert(
    fc.property(
      fc.oneof(
        // any old string, unlikely to match
        fc.string(), 

        // strings that should match (limited support)
        fc.stringMatching(original), 
      ),
      (s) => original.test(s) === rewritten.test(s)
    ),
  );
});

test("--enable-experimental-regexp-engine", () => {
  /ensures that the linear engine is enabled/l;
});
```

[differential testing]: https://en.wikipedia.org/wiki/Differential_testing
[fast-check]: https://fast-check.dev/

## License

The source code is licensed under the MIT license, see [LICENSE] for the full
license text. The documentation text is licensed under CC0-1.0; code snippets
under the MIT-0 license.

[LICENSE]: ./LICENSE

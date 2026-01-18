<!-- SPDX-License-Identifier: CC0-1.0 -->

# lRegExp

Transparent linear-time ([non-backtracking]) regular expressions for libraries.

[non-backtracking]: https://v8.dev/blog/non-backtracking-regexp

## Usage

This library exports a drop-in replacement for the built-in RegExp ([caveats]
apply).

1. Install

   ```shell
   npm install @ericcornelissen/lregexp
   ```

2. Import

   ```javascript
   import RegExp from "@ericcornelissen/lregexp";
   ```

3. Use

   ```javascript
   new RegExp("[linear]{6}");
   ```

[caveats]: #caveats

## Why

Backtracking regular expressions can take exponential time to evaluate, leading
to the dreaded _ReDoS_ vulnerability. Linear-time regular expressions avoid this
by not backtracking.

In Node.js, linear-time regular expressions can be created using the `l` flag
provided the `--enable-experimental-regexp-engine` CLI option is used. This
makes it difficult for library authors to tap into. Using this package, a
library can use the RegExp constructor as usual and benefit from the linear time
regular expression engine when its users enable it. If they don't, it gracefully
falls back to the default constructor.

## Caveats

Not all valid JavaScript regular expressions are supported when using the
`--enable-experimental-regexp-engine` CLI option. This library won't tell you if
your regular expressions are incompatible, unless you run it with that CLI
option. If a regular expression is incompatible the constructor will throw a
SyntaxError.

To support users of this package in writing compatible regular expressions we're
interested in:

- an ESLint plugin to lint regular expressions and raise warnings for the use of
  regex features not supported by the non-backtracing engine; ([#4])
- a tool (CLI/web) to check a given regular expression for compatibility with
  the non-backtracing engine. ([#21])

[#4]: https://github.com/ericcornelissen/lregexp/issues/4
[#21]: https://github.com/ericcornelissen/lregexp/issues/21

## How

If `--enable-experimental-regexp-engine` is used, the RegExp constructor from
this package automatically adds the `l` flag to all regular expressions it
constructs. If not, the RegExp constructor behavior is unchanged.

## Example

A classic example of a ReDoS-vulnerable regular expression is `(a*)*b`. Using
this with vanilla Node.js on a pathological input string takes some time, test
it for yourself with (add an `a` and the runtime doubles):

```shell
node -e '/(a*)*b/.test("aaaaaaaaaaaaaaaaaaaaaaaaac")'
```

When the non-backtracking regular expression engine is enabled, the expression
evaluates instantly:

```shell
node -e '/(a*)*b/l.test("aaaaaaaaaaaaaaaaaaaaaaaaac")' --enable-experimental-regexp-engine
```

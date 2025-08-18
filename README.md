# lRegExp

Transparently create linear-time ([non-backtracking]) regular expressions.

[non-backtracking]: https://v8.dev/blog/non-backtracking-regexp

## Usage

This library exports a drop-in replacement for the built-in RegExp.

```shell
npm install @ericcornelissen/lregexp
```

```javascript
import RegExp from "@ericcornelissen/lregexp";
new RegExp("[linear]{6}");
```

## Why

Backtracking regular expressions can take exponential time to evaluate, leading
to the dreaded _ReDoS_ vulnerability. Linear-time regular expressions avoid this
by not backtracking.

## Caveats

Not all regular expression constructs are valid in a linear-time regular
expression and this library won't tell you your regular expression is
incompatible unless you run it with the non-backtracking engine, in which
case it throws an error.

# parse-english

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Natural language parser, for the English language, that produces [nlcst][].

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`ParseEnglish()`](#parseenglish)
*   [Algorithm](#algorithm)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package exposes a parser that takes English natural language and produces
a syntax tree.

## When should I use this?

If you want to handle English natural language as syntax trees manually, use
this.

Alternatively, you can use the retext plugin [`retext-english`][retext-english],
which wraps this project to also parse natural language at a higher-level
(easier) abstraction.

For Dutch or most Latin-script languages, you can instead use
[`parse-dutch`][parse-dutch] or [`parse-latin`][parse-latin].

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install parse-english
```

In Deno with [`esm.sh`][esmsh]:

```js
import {ParseEnglish} from 'https://esm.sh/parse-english@7'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {ParseEnglish} from 'https://esm.sh/parse-english@7?bundle'
</script>
```

## Use

```js
import {ParseEnglish} from 'parse-english'
import {inspect} from 'unist-util-inspect'

const tree = new ParseEnglish().parse(
  'Mr. Henry Brown: A hapless but friendly City of London worker.'
)

console.log(inspect(tree))
```

Yields:

```txt
RootNode[1] (1:1-1:63, 0-62)
└─0 ParagraphNode[1] (1:1-1:63, 0-62)
    └─0 SentenceNode[23] (1:1-1:63, 0-62)
        ├─0  WordNode[2] (1:1-1:4, 0-3)
        │    ├─0 TextNode "Mr" (1:1-1:3, 0-2)
        │    └─1 PunctuationNode "." (1:3-1:4, 2-3)
        ├─1  WhiteSpaceNode " " (1:4-1:5, 3-4)
        ├─2  WordNode[1] (1:5-1:10, 4-9)
        │    └─0 TextNode "Henry" (1:5-1:10, 4-9)
        ├─3  WhiteSpaceNode " " (1:10-1:11, 9-10)
        ├─4  WordNode[1] (1:11-1:16, 10-15)
        │    └─0 TextNode "Brown" (1:11-1:16, 10-15)
        ├─5  PunctuationNode ":" (1:16-1:17, 15-16)
        ├─6  WhiteSpaceNode " " (1:17-1:18, 16-17)
        ├─7  WordNode[1] (1:18-1:19, 17-18)
        │    └─0 TextNode "A" (1:18-1:19, 17-18)
        ├─8  WhiteSpaceNode " " (1:19-1:20, 18-19)
        ├─9  WordNode[1] (1:20-1:27, 19-26)
        │    └─0 TextNode "hapless" (1:20-1:27, 19-26)
        ├─10 WhiteSpaceNode " " (1:27-1:28, 26-27)
        ├─11 WordNode[1] (1:28-1:31, 27-30)
        │    └─0 TextNode "but" (1:28-1:31, 27-30)
        ├─12 WhiteSpaceNode " " (1:31-1:32, 30-31)
        ├─13 WordNode[1] (1:32-1:40, 31-39)
        │    └─0 TextNode "friendly" (1:32-1:40, 31-39)
        ├─14 WhiteSpaceNode " " (1:40-1:41, 39-40)
        ├─15 WordNode[1] (1:41-1:45, 40-44)
        │    └─0 TextNode "City" (1:41-1:45, 40-44)
        ├─16 WhiteSpaceNode " " (1:45-1:46, 44-45)
        ├─17 WordNode[1] (1:46-1:48, 45-47)
        │    └─0 TextNode "of" (1:46-1:48, 45-47)
        ├─18 WhiteSpaceNode " " (1:48-1:49, 47-48)
        ├─19 WordNode[1] (1:49-1:55, 48-54)
        │    └─0 TextNode "London" (1:49-1:55, 48-54)
        ├─20 WhiteSpaceNode " " (1:55-1:56, 54-55)
        ├─21 WordNode[1] (1:56-1:62, 55-61)
        │    └─0 TextNode "worker" (1:56-1:62, 55-61)
        └─22 PunctuationNode "." (1:62-1:63, 61-62)
```

## API

This package exports the identifier [`ParseEnglish`][api-parse-english].
There is no default export.

### `ParseEnglish()`

Create a new parser.

`ParseEnglish` extends `ParseLatin`.
See [`parse-latin`][parse-latin] for API docs.

## Algorithm

All of [`parse-latin`][parse-latin] is included, and the following support for
the English natural language:

*   unit abbreviations (`tsp.`, `tbsp.`, `oz.`, `ft.`, and more)
*   time references (`sec.`, `min.`, `tues.`, `thu.`, `feb.`, and more)
*   business Abbreviations (`Inc.` and `Ltd.`)
*   social titles (`Mr.`, `Mmes.`, `Sr.`, and more)
*   rank and academic titles (`Dr.`, `Rep.`, `Gen.`, `Prof.`, `Pres.`, and more)
*   geographical abbreviations (`Ave.`, `Blvd.`, `Ft.`, `Hwy.`, and more)
*   American state abbreviations (`Ala.`, `Minn.`, `La.`, `Tex.`, and more)
*   Canadian province abbreviations (`Alta.`, `Qué.`, `Yuk.`, and more)
*   English county abbreviations (`Beds.`, `Leics.`, `Shrops.`, and more)
*   common elision (omission of letters) (`’n’`, `’o`, `’em`, `’twas`, `’80s`,
    and more)

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by me are compatible with maintained versions of Node.js.

When I cut a new major release, I drop support for unmaintained versions of
Node.
This means I try to keep the current release line, `parse-english@^7`,
compatible with Node.js 16.

## Security

This package is safe.

## Related

*   [`parse-latin`](https://github.com/wooorm/parse-latin)
    — Latin-script natural language parser
*   [`parse-dutch`](https://github.com/wooorm/parse-dutch)
    — Dutch natural language parser

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/parse-english/workflows/main/badge.svg

[build]: https://github.com/wooorm/parse-english/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/parse-english.svg

[coverage]: https://codecov.io/github/wooorm/parse-english

[downloads-badge]: https://img.shields.io/npm/dm/parse-english.svg

[downloads]: https://www.npmjs.com/package/parse-english

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=parse-english

[size]: https://bundlejs.com/?q=parse-english

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[license]: license

[author]: https://wooorm.com

[retext-english]: https://github.com/retextjs/retext/tree/main/packages/retext-english

[nlcst]: https://github.com/syntax-tree/nlcst

[parse-latin]: https://github.com/wooorm/parse-latin

[parse-dutch]: https://github.com/wooorm/parse-dutch

[api-parse-english]: #parseenglish

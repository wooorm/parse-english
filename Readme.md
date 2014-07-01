# parse-english [![Build Status](https://travis-ci.org/wooorm/parse-english.svg?branch=master)](https://travis-ci.org/wooorm/parse-english) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-english.svg)](https://coveralls.io/r/wooorm/parse-english?branch=master)

[![browser support](https://ci.testling.com/wooorm/parse-english.png) ](https://ci.testling.com/wooorm/parse-english)

See [Browser Support](#browser-support) for more information (a.k.a. don’t worry about those grey icons above).

---

**parse-english** is an English language parser in JavaScript. NodeJS, and the browser. Lots of tests (330+), including 630+ assertions. 100% coverage.

Note: This project is **not** an object model for natural languages, or an extensible system for analysing and manipulating natural language, its an algorithm that transforms plain-text natural language into an AST. If you need the above-mentioned functionalities, use the following projects.

* For a pluggable system for analysing and manipulating natural language, see [retext](https://github.com/wooorm/retext "Retext").
* For an object model, see [TextOM](https://github.com/wooorm/textom "TextOM").

## Installation

NPM:
```sh
$ npm install parse-english
```

Component.js:
```sh
$ component install wooorm/parse-english
```

## Usage

````js
var Parser = require('parse-english'),
    parser = new Parser(),
    root;

/* Simple sentence: */
parser.tokenizeRoot('A simple, english sentence.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */

/* Unicode filled sentence: */
parser.tokenizeRoot('The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */
````

## API

### parseEnglish.tokenizeRoot(source?)

```js
var Parser = require('parse-english');

new Parser().tokenizeRoot('A simple sentence.');
/*
 * Object
 * ├─ type: "RootNode"
 * └─ children: Array[1]
 *    └─ 0: Object
 *          ├─ type: "ParagraphNode"
 *          └─ children: Array[1]
 *             └─ 0: Object
 *                   ├─ type: "SentenceNode"
 *                   └─ children: Array[6]
 *                      | ...
 */
```

Tokenize a given document into paragraphs, sentences, words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The english document to parse.

### parseEnglish.tokenizeParagraph(source?)

```js
var Parser = require('parse-english');

new Parser().tokenizeParagraph('A simple sentence.');
/*
 * Object
 * ├─ type: "ParagraphNode"
 * └─ children: Array[1]
 *    └─ 0: Object
 *          ├─ type: "SentenceNode"
 *          └─ children: Array[6]
 *             | ...
 */
```

Tokenize a given paragraph into sentences, words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The english paragraph to parse.

### parseEnglish.tokenizeSentence(source?)

```js
var Parser = require('parse-english');

new Parser().tokenizeSentence('A simple sentence.');
/*
 * Object
 * ├─ type: "SentenceNode"
 * └─ children: Array[6]
 *    ├─ 0: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "A"
 *    ├─ 1: Object
 *    |     ├─ type: "WhiteSpaceNode"
 *    |     └─ value: " "
 *    ├─ 2: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "simple"
 *    ├─ 3: Object
 *    |     ├─ type: "WhiteSpaceNode"
 *    |     └─ value: " "
 *    ├─ 4: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "sentence"
 *    └─ 5: Object
 *          ├─ type: "PunctuationNode"
 *          └─ value: "."
 */
```

Tokenize a given sentence into words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The english sentence to parse.

## Browser Support
Pretty much every browser (available through browserstack) runs all parse-english unit tests.

## Related

  * [retext](https://github.com/wooorm/retext "Retext")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT

# parse-english [![Build Status](https://travis-ci.org/wooorm/parse-english.svg?branch=master)](https://travis-ci.org/wooorm/parse-english) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-english.svg)](https://coveralls.io/r/wooorm/parse-english?branch=master)

[![browser support](https://ci.testling.com/wooorm/parse-english.png) ](https://ci.testling.com/wooorm/parse-english)

See [Browser Support](#browser-support) for more information (a.k.a. don’t worry about those grey icons above).

---

**parse-english** is an English language parser in JavaScript. Build on top of [TextOM](https://github.com/wooorm/textom/). NodeJS, and the browser. Lots of tests (330+), including 630+ assertions. 100% coverage.

Note: This project is **not** an object model for natural languages, or an extensible system for analysing and manipulating natural language, its an algorithm that transforms plain-text natural language into an object model. If you need the above-mentioned functionalities, use the following projects.

* For a pluggable system for analysing and manipulating, see [retext](https://github.com/wooorm/retext "Retext").
* For the object model used in parse-english, see [TextOM](https://github.com/wooorm/textom/ "TextOM");

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
var parse = require('parse-english')(),
    rootNode;

// Simple sentence:
rootNode = parse('A simple, english sentence.');

// Unicode filled sentence:
rootNode = parse('The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.');

// A (plain-text) file:
rootNode = parse(require('fs').readFileSync('./document.txt', 'utf-8'));
````

Note that the exported object is a function, which in turn returns brand-new parser and TextOM objects. There’s whole slew of issues that can arise from extending prototypes like (DOM) Node, NodeList, or Array—this feature however allows for multiple sandboxed environments (i.e., prototypes) without those disadvantages.

## API

### ParseEnglish(source?)

```js
var parse = require('parse-english')(),
    rootNode = parse('A simple sentence.');

rootNode; // RootNode
rootNode.head; // ParagraphNode
rootNode.head.head; // SentenceNode
rootNode.head.head.head; // WordNode
rootNode.head.head.head.toString(); // "A"
rootNode.head.head.tail; // PunctuationNode
rootNode.head.head.tail.toString(); // "."
```

Parses a given (english) string into an object model.

- `source` (`null`, `undefined`, or `String`): The english source to parse.

## Browser Support
Pretty much every browser (available through browserstack) runs all parse-english unit tests; just make sure `JSON` is [polyfill](https://github.com/douglascrockford/JSON-js)’d in browsers that need it.

## Related

  * [retext](https://github.com/wooorm/retext "Retext")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT

# parse-english [![Build Status](https://travis-ci.org/wooorm/parse-english.png)](https://travis-ci.org/wooorm/parse-english)

**parse-english** is an English language parser in JavaScript. Build on top of [TextOM](https://github.com/wooorm/textom/). NodeJS, and the browser. Lots of tests (330+), including 630+ assertions. 100% coverage.

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
var parse = require('parse-english'),
    rootNode;

// Simple sentence:
rootNode = parse('A simple, english sentence.');

// Unicode filled sentence:
rootNode = parse('The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.');

// A (plain-text) file:
rootNode = parse(require('fs').readFileSync('./document.txt', 'utf-8'));
````

## API

### ParseEnglish(source?)

```js
var parse = require('parse-english'),
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

### ParseEnglish.fromAST(ast)

```js
var parse = require('parse-english');

var rootNode = parse.fromAST({"type":"RootNode", "children":[
  {"type":"ParagraphNode", "children": [
    {"type":"SentenceNode", "children": [
      { "type": "WordNode", "value": "A" },
      { "type": "WhiteSpaceNode", "value": " " },
      { "type": "WordNode", "value": "simple" },
      { "type": "WhiteSpaceNode", "value": " " },
      { "type": "WordNode", "value": "sentence" },
      { "type": "PunctuationNode", "value": "." }
    ]}
  ]}
]});

```

This gives the same structure as the example in [`ParseEnglish()`](#parseenglishsource).

Parse a JSON object or string—a (parsed?) result of [`Node#toAST()`](#textomnodetoastdelimeter))—into an object model.

- `ast` (`String` or `Object`): The object to parse into an object model.

### Extensions to TextOM

#### TextOM.Node#toAST(delimiter?)

```js
var parse = require('parse-english'),
    rootNode = parse('A simple sentence.');

rootNode.toAST(); // '{"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[{"type":"WordNode","value":"A"},{"type":"WhiteSpaceNode","value":" "},{"type":"WordNode","value":"simple"},{"type":"WhiteSpaceNode","value":" "},{"type":"WordNode","value":"sentence"},{"type":"PunctuationNode","value":"."}]}]}]}'
```

Stringify an object model into a `JSON.stringify`d AST, can later be passed to [`ParseEnglish.fromAST()`](#parseenglishfromastast).

- `delimeter` (`null`, `Number`, or `String`): Causes the AST to be pretty printed. Passed to `JSON.stringify` (See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space_argument) for docs).

#### TextOM.Parent#prependContent(value)

```js
var parse = require('parse-english'),
    rootNode = parse('simple sentence.');

rootNode.prependContent('A document including a ')
rootNode.toString(); // 'A document including a simple sentence.'
```

Inserts the parsed value at the beginning of the parent.

- `value` (Non-empty `String`): The to-parse and prepend inside content.

#### TextOM.Parent#appendContent(value)

```js
var parse = require('parse-english'),
    rootNode = parse('A document');

rootNode.appendContent(' including a simple sentence');
rootNode.toString(); // 'A document including a simple sentence.'
```

Inserts the parsed value at the end of the parent.

- `value` (Non-empty `String`): The to-parse and append inside content.

#### TextOM.Parent#removeContent()

```js
var parse = require('parse-english'),
    rootNode = parse('A sentence. Another sentence.');

rootNode.head.head.removeContent();
rootNode.toString(); // ' Another sentence.'
```

Removes the current content of the parent.

#### TextOM.Parent#replaceContent(value?)

```js
var parse = require('parse-english'),
    rootNode = parse('A sentence');

rootNode.replaceContent('One sentence. Two sentences.');
rootNode.toString(); // 'One sentence. Two sentences.'
```

Removes the current content of the parent, and replaces it with the parsed value.

- `value` (`String`): The to-parse and insert inside content.

## Related

  * [retext](https://github.com/wooorm/retext "Retext")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT

# parse-english [![Build Status](https://img.shields.io/travis/wooorm/parse-english.svg?style=flat)](https://travis-ci.org/wooorm/parse-english) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-english.svg?style=flat)](https://coveralls.io/r/wooorm/parse-english?branch=master)

An English language parser producing [NLCST](https://github.com/wooorm/nlcst) nodes.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install parse-english
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/parse-english
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install parse-english
```

[Duo](http://duojs.org/#getting-started):

```javascript
var ParseEnglish = require('wooorm/parse-english');
```

## Usage

```javascript
var ParseEnglish = require('parse-english'),
    english = new ParseEnglish();

/**
 * parse-latin would fail helplessly at the full-stop preceding the
 * capital `H`, and would erroneously parse the following as two
 * sentences.
 */
english.parse(
  'Mr. Henry Brown: A hapless but friendly City of London worker.'
);
/*
 * Object
 * ├─ type: "RootNode"
 * └─ children: Array[1]
 *    └─ 0: Object
 *          ├─ type: "ParagraphNode"
 *          └─ children: Array[1]
 *             └─ 0: Object
 *                   ├─ type: "SentenceNode"
 *                   └─ children: Array[23]
 *                      ├─ 0: Object
 *                      |     ├─ type: "WordNode"
 *                      |     └─ children: Array[2]
 *                      |        ├─ 0: Object
 *                      |        |     ├─ type: "TextNode"
 *                      |        |     └─ value: "Mr"
 *                      |        └─ 1: Object
 *                      |              ├─ type: "PunctuationNode"
 *                      |              └─ value: "."
 *                      ├─ 1: Object
 *                      |     ├─ type: "WhiteSpaceNode"
 *                      |     └─ value: " "
 *                      ├─ 2: Object
 *                      |     ├─ type: "WordNode"
 *                      |     └─ children: Array[1]
 *                      |        └─ 0: Object
 *                      |              ├─ type: "TextNode"
 *                      |              └─ value: "Henry"
 *                      ├─ 3: Object
 *                      |     ├─ type: "WhiteSpaceNode"
 *                      |     └─ value: " "
 *                      ├─ 4: Object
 *                      |     ├─ type: "WordNode"
 *                      |     └─ children: Array[1]
 *                      |        └─ 0: Object
 *                      |              ├─ type: "TextNode"
 *                      |              └─ value: "Brown"
 *                      ├─ 5: Object
 *                      |     ├─ type: "PunctuationNode"
 *                      |     └─ value: ":"
 *                      ├─ 6: Object
 *                      |     ├─ type: "WhiteSpaceNode"
 *                      |     └─ value: " "
 *                      ├─ 7: Object
 *                      |     ├─ type: "WordNode"
 *                      |     └─ children: Array[1]
 *                      |        └─ 0: Object
 *                      |              ├─ type: "TextNode"
 *                      |              └─ value: "A"
 *                      ├─ 8: Object
 *                      |     ├─ type: "WhiteSpaceNode"
 *                      |     └─ value: " "
 *                      ├─ 9: Object
 *                      |     ├─ type: "WordNode"
 *                      |     └─ children: Array[1]
 *                      |        └─ 0: Object
 *                      |              ├─ type: "TextNode"
 *                      |              └─ value: "hapless"
 *                      ├─ 10: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 11: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "but"
 *                      ├─ 12: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 13: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "friendly"
 *                      ├─ 14: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 15: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "City"
 *                      ├─ 16: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 17: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "of"
 *                      ├─ 18: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 19: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "London"
 *                      ├─ 20: Object
 *                      |      ├─ type: "WhiteSpaceNode"
 *                      |      └─ value: " "
 *                      ├─ 21: Object
 *                      |      ├─ type: "WordNode"
 *                      |      └─ children: Array[1]
 *                      |         └─ 0: Object
 *                      |               ├─ type: "TextNode"
 *                      |               └─ value: "worker"
 *                      └─ 22: Object
 *                             ├─ type: "PunctuationNode"
 *                             └─ value: "."
 */
```

## API

**parse-english** exposes the same [API as parse-latin](https://github.com/wooorm/parse-latin#api "ParseLatin API"), but returns results better suited for English natural language.

Support includes:

* Unit abbreviations (tsp., tbsp., oz., ft., and more);
* Time references (sec., min., tues., thu., feb., and more);
* Business Abbreviations (Inc. and Ltd);
* Social titles (Mr., Mmes., Sr., and more);
* Rank and academic titles (Dr., Rep., Gen., Prof., Pres., and more);
* Geographical abbreviations (Ave., Blvd., Ft., Hwy., and more);
* American state abbreviations (Ala., Minn., La., Tex., and more);
* Canadian province abbreviations (Alta., Qué., Yuk., and more);
* English county abbreviations (Beds., Leics., Shrops., and more);
* Common elision (omission of letters) (’n’, ’o, ’em, ’twas, ’80s, and more).

## Benchmark

On a MacBook Air, it parses about 2 large books per second.

```text
             english.parse(document);
  1,726 op/s » A paragraph (5 sentences, 100 words)
    213 op/s » A section (10 paragraphs)
     20 op/s » An article (10 sections)
      2 op/s » A (large) book (10 articles)
```

## Related

- [nlcst](https://github.com/wooorm/nlcst)
- [parse-latin](https://github.com/wooorm/parse-latin)
- [parse-english](https://github.com/wooorm/parse-english)
- [retext](https://github.com/wooorm/retext)
- [textom](https://github.com/wooorm/textom)

## License

MIT © [Titus Wormer](http://wooorm.com)

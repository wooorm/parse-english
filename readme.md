# parse-english [![Build Status](https://img.shields.io/travis/wooorm/parse-english.svg)](https://travis-ci.org/wooorm/parse-english) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/parse-english.svg)](https://codecov.io/github/wooorm/parse-english)

An English language parser producing [NLCST](https://github.com/wooorm/nlcst)
nodes.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install parse-english
```

**parse-english** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](parse-english.js) and [compressed](parse-english.min.js).

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

**parse-english** exposes the same [API as parse-latin](https://github.com/wooorm/parse-latin#api),
but returns results better suited for English natural language.

Support includes:

*   Unit abbreviations (tsp., tbsp., oz., ft., and more);
*   Time references (sec., min., tues., thu., feb., and more);
*   Business Abbreviations (Inc. and Ltd);
*   Social titles (Mr., Mmes., Sr., and more);
*   Rank and academic titles (Dr., Rep., Gen., Prof., Pres., and more);
*   Geographical abbreviations (Ave., Blvd., Ft., Hwy., and more);
*   American state abbreviations (Ala., Minn., La., Tex., and more);
*   Canadian province abbreviations (Alta., Qué., Yuk., and more);
*   English county abbreviations (Beds., Leics., Shrops., and more);
*   Common elision (omission of letters) (’n’, ’o, ’em, ’twas, ’80s, and more).

## Related

*   [nlcst](https://github.com/wooorm/nlcst)
*   [retext](https://github.com/wooorm/retext)
*   [parse-latin](https://github.com/wooorm/parse-latin)
*   [parse-dutch](https://github.com/wooorm/parse-dutch)

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)

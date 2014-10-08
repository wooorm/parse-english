# parse-english [![Build Status](https://img.shields.io/travis/wooorm/parse-english.svg)](https://travis-ci.org/wooorm/parse-english) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-english.svg)](https://coveralls.io/r/wooorm/parse-english?branch=master) [![Code Climate](http://img.shields.io/codeclimate/github/wooorm/parse-english.svg)](https://codeclimate.com/github/wooorm/parse-english)

An English language parser producing [NLCST](https://github.com/wooorm/nlcst) nodes.

## Installation

npm:
```sh
$ npm install parse-english
```

Component:
```sh
$ component install wooorm/parse-english
```

Bower:
```sh
$ bower install parse-english
```

## Usage

````js
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
 * ˅ Object
 *      type: "RootNode"
 *    ˅ children: Array[1]
 *       ˅ 0: Object
 *            type: "ParagraphNode"
 *          ˅ children: Array[1]
 *             ˅ 0: Object
 *                  type: "SentenceNode"
 *                ˃ children: Array[24]
 *             ˃ __proto__: Array
 *          ˃ __proto__: Object
 *       ˃ __proto__: Array
 *    ˃ __proto__: Object
 */
````

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

Run the benchmark yourself:

```sh
$ npm run benchmark
```

On a MacBook Air, it parses about 2 large books per second.

```
             english.parse(document);
  1,861 op/s » A paragraph (5 sentences, 100 words)
    233 op/s » A section (10 paragraphs)
     22 op/s » An article (10 sections)
      2 op/s » A (large) book (10 articles)
```

## Related

- [nlcst](https://github.com/wooorm/nlcst)
- [parse-latin](https://github.com/wooorm/parse-latin)
- [parse-english](https://github.com/wooorm/parse-english)
- [retext](https://github.com/wooorm/retext)
- [textom](https://github.com/wooorm/textom)

## License

MIT © Titus Wormer

'use strict';

var Parser, assert, parser;

Parser = require('..');
assert = require('assert');
parser = new Parser();

describe('ParseEnglish', function () {
    it('should be a function', function () {
        assert(typeof Parser === 'function');
    });

    it('should return a newly initialized `Parser` object, when invoked',
        function () {
            assert(new Parser() instanceof Parser);
            /*eslint-disable new-cap */
            assert(Parser() instanceof Parser);
            /*eslint-enable new-cap */
        }
    );
});

describe('Abbreviations: Geographic', function () {
    it('should *not* treat the dot-character succeeding `Ave` ' +
        '(abbreviation for `Avenue`), as a terminal marker', function () {
            /* Note: This paragraph also tests for coverage of early break
             * branches in the `mergeEnglishPrefixExceptions` function.
             * These should probably be tested by running ParseLatin
             * specs.
             */
            var root = parser.tokenizeParagraph(
                'Survey! (Reaffirms). The 5th Ave. Top of the Retail Rent ' +
                'Heap'
            ).children[4];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '5th'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ave'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Top'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Retail'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Rent'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Heap'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Blvd` ' +
        '(abbreviation for `Boulevard`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'A café located on the blvd. of Kusadasi'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'A'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'café'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'located'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'blvd'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Kusadasi'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Mt` ' +
        '(abbreviation for `Mountain`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Like all mountains, Mt. Gay is a large large mass of rock.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Like'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'all'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mountains'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Mt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Gay'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'large'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'large'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mass'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'rock'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rd` ' +
        '(abbreviation for `Road`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'In law, Rd. is an abbreviation of road.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'In'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'law'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Rd'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'an'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'abbreviation'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'road'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Bldg` ' +
        '(abbreviation for `Building`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The many fine Victorian buildings in Wolverhampton.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'many'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'fine'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Victorian'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'buildings'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Wolverhampton'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }

                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Nat` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The Teide Nat. Park in Tenerife, Spain.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Teide'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Nat'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Park'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Tenerife'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Spain'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Natl` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The Teide Natl. Park in Tenerife, Spain.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Teide'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Natl'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Park'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Tenerife'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Spain'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rt` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'U.S. Rt. 66, a historic highway in America.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'U'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'S'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Rt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '66'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'historic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'highway'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'America'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rte` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'U.S. Rte. 66, a historic highway in America.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'U'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'S'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Rte'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '66'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'historic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'highway'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'America'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Co` ' +
        '(abbreviation for `County`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Leicestershire Co. is a landlocked county in the ' +
                'English Midlands.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Leicestershire'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Co'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'landlocked'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'county'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'English'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Midlands'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pk` ' +
        '(abbreviation for `Park`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'St. James\'s Pk. covers 34 ha.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'St'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'James'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '\''
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 's'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pk'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'covers'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '34'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ha'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Sq` ' +
        '(abbreviation for `Square`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'See the attachment for potential Times Sq. sites.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'See'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'attachment'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'potential'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Times'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Sq'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sites'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Dr` ' +
        '(abbreviation for `Drive`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Continue on Pershing Dr. before turning right.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Continue'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pershing'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Dr'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'before'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'turning'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'right'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pt` ' +
        '(abbreviation for `Point` or `Port`), as a terminal marker',
        function () {
            var root = parser.tokenizeParagraph(
                'The Pt. of L.A. is also called Los Angeles Harbor ' +
                'Department.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'L'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'A'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'also'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'called'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Los'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Angeles'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Harbor'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Department'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `St` ' +
        '(abbreviation for `Street` or `State`), as a terminal marker',
        function () {
            var root = parser.tokenizeParagraph(
                'I used to live on 2nd St. in Clinton.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'I'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'used'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'live'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2nd'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'St'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Clinton'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ft` ' +
        '(abbreviation for `Fort`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'As Ft. Knox is no longer “The Home of Armor”, ' +
                'the Patton Museum has also been relocated.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'As'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ft'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Knox'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'no'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'longer'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Home'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Armor'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Patton'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Museum'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'has'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'also'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'been'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'relocated'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pen` ' +
        '(abbreviation for `Peninsula`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Huon Pen. is a large rugged peninsula on the island of ' +
                'New Guinea.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Huon'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pen'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'large'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'rugged'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'peninsula'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'island'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'New'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Guinea'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Terr` ' +
        '(abbreviation for `Territory`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Yukon, formerly Yukon Territory (Yuk. Terr.), is an ' +
                'area of rugged mountains and high plateaus.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Yukon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'formerly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Yukon'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Territory'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Yuk'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Terr'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'an'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'area'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'rugged'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mountains'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'high'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'plateaus'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Hwy` ' +
        '(abbreviation for `Highway`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The Atlantic Hwy. was the direct predecessor to US 1.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Atlantic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Hwy'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'was'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'direct'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'predecessor'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'US'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Fwy` ' +
        '(abbreviation for `Freeway`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The San Diego Fwy. is most commonly called “The 405”.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'San'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Diego'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Fwy'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'most'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'commonly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'called'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '405'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pkwy` ' +
        '(abbreviation for `Parkway`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Blue Ridge Pkwy. is a National Parkway, noted for ' +
                'its scenic beauty.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Blue'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ridge'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pkwy'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'National'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Parkway'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'noted'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'its'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'scenic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'beauty'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding (American) ' +
        'states (e.g., `Ala`, `Ariz`, &c.), as a terminal marker',
        function () {
            var states = (
                    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|' +
                    'Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|' +
                    'Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|' +
                    'Penn|Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo'
                ).split('|'),
                iterator = -1,
                root, state;

            while (states[++iterator]) {
                state = states[iterator];

                root = parser.tokenizeParagraph(
                    'I live in Clinton, ' + state + '. on 2nd street.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'I'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'live'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'in'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Clinton'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : state
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'on'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '2nd'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'street'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding (Canadian) ' +
        'states (e.g., `Alta`, `Man`, &c.), as a terminal marker',
        function () {
            var states = 'Alta|Man|Ont|Qué|Que|Sask|Yuk'.split('|'),
                iterator = -1,
                state, root;

            while (states[++iterator]) {
                state = states[iterator];

                root = parser.tokenizeParagraph(
                    'I\'m from Mount Pleasant, ' + state + '. in Canada.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'I'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '\''
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'm'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'from'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Mount'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Pleasant'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : state
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'in'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Canada'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding (English) ' +
        'counties (e.g., `Beds`, `Berks`, &c.), as a terminal marker',
        function () {
            var counties = ('Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|' +
                    'Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|' +
                    'Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|' +
                    'Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
                    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|' +
                    'Worcs|Yorks'
                ).split('|'),
                iterator = -1,
                root, county;

            while (counties[++iterator]) {
                county = counties[iterator];

                root = parser.tokenizeParagraph(
                    'I\'m from Newton, ' + county + '. in England.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'I'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '\''
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'm'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'from'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Newton'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : county
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'in'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'England'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Title abbreviations', function () {
    it('should *not* treat the dot-character succeeding titles (e.g., ' +
        '`Mr`, `Mrs`, &c.), as a terminal marker', function () {
            var titles = ('Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|' +
                    'Snr|Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|' +
                    'Supt|Rep|Sen|Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|' +
                    'Capt|Lt|Maj|Sgt|Po|Wo|Ph'
                ).split('|'),
                iterator = -1,
                root, title;

            while (titles[++iterator]) {
                title = titles[iterator];

                root = parser.tokenizeParagraph(
                    'You should talk to ' + title +
                    '. Smith about these questions.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'You'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'should'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'talk'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'to'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : title
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Smith'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'about'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'these'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'questions'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        });
});

describe('Abbreviations: Business', function () {
    it('should *not* treat the dot-character succeeding `Inc` ' +
        '(abbreviation for `Incorporation`), as a terminal marker',
        function () {
            var root = parser.tokenizeParagraph(
                'Today, ABC Company, Inc. announced an increase of 100 ' +
                'percent in the last two years.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Today'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ABC'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Company'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Inc'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'announced'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'an'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'increase'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '100'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'percent'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'last'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'two'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'years'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ltd` ' +
        '(abbreviation for `Limited`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'XYZ Associates Ltd. is a member of the confederation.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'XYZ'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Associates'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ltd'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'member'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'confederation'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: English unit abbreviations', function () {
    it('should *not* treat the dot-character succeeding `bbl` ' +
        '(abbreviation for `barrel`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The price for 15 bbls. is unknown to me.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'price'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '15'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'bbls'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'unknown'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'me'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cu` ' +
        '(abbreviation for `cubic`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '12 cu. in. could also be written as 12inch^3.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '12'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cu'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'could'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'also'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'be'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'written'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'as'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '12inch'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '^'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '3'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `doz` ' +
        '(abbreviation for `dozen`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Could you get 2 doz. of eggs?'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Could'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'you'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'get'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'doz'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'eggs'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '?'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` ' +
        '(as in `fl. oz.`, abbreviation for `fluid (ounce)`), ' +
        'as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '1 fl. oz. equals about 28 ml.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'fl'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'oz'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'about'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '28'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ml'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` (abbreviation ' +
        'for `fluid ounce`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '2 oz. equals about 56–57 gr.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'oz'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'about'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '56'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '–'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '57'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gr'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ft` (abbreviation ' +
        'for `foot`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '2 ft. equals exactly 60.96 centimeters.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ft'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'exactly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '60'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : '96'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'centimeters'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gal` ' +
        '(abbreviation for `gallon`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '1 gal. equals 8 pints.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gal'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '8'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pints'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gr` (abbreviation ' +
        'for `grain`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '5 gr. bottle indicates on the back that the ' +
                'dosage is “325 mg.”'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '5'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gr'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'bottle'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'indicates'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'back'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'that'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'dosage'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '325'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mg'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gro` ' +
        '(abbreviation for `gross`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '1 Gro. (a gross) refers to a group of 144 items.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Gro'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gross'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'refers'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'group'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '144'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'items'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `in` (abbreviation ' +
        'for `inch`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'There are 12 in. in a foot.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'There'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'are'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '12'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'foot'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `kt` (abbreviation ' +
        'for `karat or knot`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Items 10-karat or greater are to be stamped with ' +
                'either Kt. or K.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Items'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '10'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '-'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'karat'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'greater'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'are'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'be'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'stamped'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'with'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'either'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Kt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'K'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `lb` (abbreviation ' +
        'for `pound`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'In the imperial systems of measurement, 1 lb. equals ' +
                '0.45359237 kilograms'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'In'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'imperial'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'systems'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'measurement'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'lb'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '0'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : '45359237'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'kilograms'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `mi` ' +
        '(abbreviation for `mile`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'A mile, known as 1 mi. also, is a unit of length most ' +
                'commonly equivalent to 5,280 feet.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'A'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mile'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'known'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'as'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mi'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'also'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'unit'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'length'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'most'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'commonly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equivalent'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '5'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '280'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feet'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` ' +
        '(abbreviation for `ounce`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'In the imperial systems of measurement, 1 oz. equals ' +
                'one sixteenth of a pound.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'In'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'imperial'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'systems'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'measurement'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'oz'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'one'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sixteenth'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pound'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pt` (abbreviation ' +
        'for `pint`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'In the imperial systems of measurement, 1 pt. equals ' +
                'one eighth of a gallon.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'In'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'imperial'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'systems'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'measurement'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'one'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'eighth'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gallon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `qt` ' +
        '(abbreviation for `quart`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'In the imperial systems of measurement, 1 qt. ' +
                'equals one fourth of a gallon.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'In'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'imperial'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'systems'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'measurement'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'qt'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'equals'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'one'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'fourth'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gallon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sq` ' +
        '(abbreviation for `square`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'The large house boasts 29 sq. ft. of living space.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'large'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'house'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'boasts'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '29'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sq'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ft'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'living'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'space'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tbsp` ' +
        '(abbreviation for `tablespoon`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Add 3 tbsp. sea salt flakes.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Add'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '3'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'tbsp'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sea'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'salt'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'flakes'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        });

    it('should *not* treat the dot-character succeeding `tsp` ' +
        '(abbreviation for `teaspoon`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Add 1 tsp. mustard powder.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Add'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'tsp'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'mustard'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'powder'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `yd` ' +
        '(abbreviation for `yard`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                '2 yd. is a fanthom.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'yd'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'fanthom'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Time references', function () {
    it('should *not* treat the dot-character succeeding `sec` ' +
        '(abbreviation for `seconds`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Sprint for 90 sec. more, before you do some stretches.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Sprint'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '90'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sec'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'more'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'before'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'you'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'do'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'some'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'stretches'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `min` ' +
        '(abbreviation for `minutes`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'Continue down the road 8 more min. before turning left ' +
                'at the crossroads.'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Continue'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'down'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'road'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '8'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'more'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'min'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'before'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'turning'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'left'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'at'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'crossroads'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `hr` (abbreviation ' +
        'for `hours`), as a terminal marker', function () {
            var root = parser.tokenizeParagraph(
                'We\'ll be there in 1 hr. I think'
            ).children[0];

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'We'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '\''
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'll'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'be'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'there'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'hr'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'I'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'think'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding days (e.g., ' +
        '`Mon`, `Tue`, &c.), as a terminal marker', function () {
            var days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun'.split('|'),
                iterator = -1,
                day, root;

            while (days[++iterator]) {
                day = days[iterator];

                root = parser.tokenizeParagraph(
                    'Let\'s move the meeting to next ' + day + '. at 10:00.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Let'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '\''
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 's'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'move'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'meeting'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'to'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'next'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : day
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'at'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '10'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ':'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : '00'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding months (e.g., ' +
        '`Jan`, `Feb`, &c.), as a terminal marker', function () {
            var months = ('Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|' +
                    'Nov|Dec'
                ).split('|'),
                iterator = -1,
                month, root;

            while (months[++iterator]) {
                month = months[iterator];

                root = parser.tokenizeParagraph(
                    'My birthday is in ' + month + ' on the 12th.'
                ).children[0];

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'My'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'birthday'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'in'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : month
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'on'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '12th'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Elision', function () {
    it('should treat `o\'` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Lots o\' luck!'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'o'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                }
            ]
        }));
    });

    it('should treat `\'em` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Tell \'em!'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'em'
                }
            ]
        }));
    });

    it('should treat `\'er` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Tell \'er!'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'er'
                }
            ]
        }));
    });

    it('should treat `\'im` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Tell \'im!'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'im'
                }
            ]
        }));
    });

    it('should treat `\'n\'` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Rock \'n\' Roll!'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                }
            ]
        }));
    });

    it('should treat `\'twas` as one word', function () {
        var root = parser.tokenizeParagraph(
            '\'Twas the night before Christmas'
        ).children[0].children[0];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'Twas'
                }
            ]
        }));
    });

    it('should treat `\'tis` as one word', function () {
        var root = parser.tokenizeParagraph(
            '\'Tis the season to'
        ).children[0].children[0];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'Tis'
                }
            ]
        }));
    });

    it('should treat `\'twere` as one word', function () {
        var root = parser.tokenizeParagraph(
            'If \'twere us...'
        ).children[0].children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'twere'
                }
            ]
        }));
    });

    it('should treat `\'80s` as one word', function () {
        var root = parser.tokenizeParagraph(
            'Acceptable in the \'80s.'
        ).children[0].children[6];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : '80s'
                }
            ]
        }));
    });

    it('should NOT treat other words following an apostrophe, as one word',
        function () {
            var root = parser.tokenizeParagraph(
                'For example, a\' or whatevs.'
            ).children[0].children;

            assert(JSON.stringify(root) === JSON.stringify([
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'For'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'example'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'a'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'or'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'whatevs'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]));
        }
    );

    it('should NOT treat other words preceding an apostrophe, as one word',
        function () {
            var root = parser.tokenizeParagraph(
                'For example, \'a or whatevs.'
            ).children[0].children;

            assert(JSON.stringify(root) === JSON.stringify([
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'For'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'example'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'a'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'or'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'whatevs'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]));
        }
    );
});

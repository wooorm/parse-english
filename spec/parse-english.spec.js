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
            assert(Parser() instanceof Parser);
        }
    );
});

describe('new ParseEnglish()', function () {
    it('should have a `tokenizeRoot` method', function () {
        assert(typeof parser.tokenizeRoot === 'function');
    });

    it('should have a `tokenizeParagraph` method', function () {
        assert(typeof parser.tokenizeParagraph === 'function');
    });

    it('should have a `tokenizeSentence` method', function () {
        assert(typeof parser.tokenizeSentence === 'function');
    });
});

describe('Root: Without a value', function () {
    it('should return an empty RootNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parser.tokenizeRoot()) ===
                JSON.stringify({
                    'type' : 'RootNode',
                    'children' : []
                })
            );
        }
    );
});

describe('Root: Given two paragraphs', function () {
    /*
     * Modified first paragraph, split into two, of:
     *    http://en.wikipedia.org/wiki/Paragraph
    */
    var source = 'A paragraph (from the Greek paragraphos, “to write ' +
        'beside” or “written beside”) is a self-contained unit of a ' +
        'discourse in writing dealing with a particular point or idea. A ' +
        'paragraph has 5 types (Br. Anton Heitman).\n\nA paragraph ' +
        'consists of one or more sentences. Though not required by the ' +
        'syntax of any language, paragraphs are usually an expected part ' +
        'of formal writing, used to organize longer prose.';

    it('should equal the test AST', function () {
        var root = parser.tokenizeRoot(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
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
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
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
                                            'value' : 'Greek'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraphos'
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
                                            'value' : '“'
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
                                            'value' : 'write'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'beside'
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
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'beside'
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
                                            'value' : 'self'
                                        }
                                    ]
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
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'contained'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'discourse'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'writing'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'dealing'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'particular'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'point'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'idea'
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
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
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
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'types'
                                        }
                                    ]
                                },
                                {
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
                                            'value' : 'Br'
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
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Anton'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Heitman'
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
                                            'value' : '.'
                                        }
                                    ]
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
                            'value' : '\n\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
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
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'consists'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'sentences'
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
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Though'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'not'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'required'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'by'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'syntax'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'any'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'language'
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
                                            'value' : 'paragraphs'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'usually'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'expected'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'part'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'formal'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'writing'
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
                                            'value' : 'organize'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'prose'
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
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Root: Given a String object', function () {
    it('should tokenize the toString representation of the given object ' +
        'when the given object is an instance of String', function () {
            var source = 'Test.';
            /*eslint-disable no-new-wrappers */
            assert(
                JSON.stringify(parser.tokenizeRoot(new String(source))) ===
                JSON.stringify(parser.tokenizeRoot(source))
            );
            /*eslint-enable no-new-wrappers */
        }
    );
});

describe('Root: Given any other value', function () {
    it('should throw when the object is neither null, undefined, string, ' +
        'nor String object', function () {
            assert.throws(function () {
                parser.tokenizeRoot({});
            });
        }
    );
});

describe('A whitespace only document', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeRoot('\n\n');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n\n'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Paragraph: Without a value', function () {
    it('should return an empty ParagraphNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parser.tokenizeParagraph()) ===
                JSON.stringify({
                    'type' : 'ParagraphNode',
                    'children' : []
                })
            );
        }
    );
});

describe('Sentence: Without a value', function () {
    it('should return an empty SentenceNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parser.tokenizeSentence()) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : []
                })
            );
        }
    );
});

/*
 * Summarised from the first paragraph of: http://en.wikipedia.org/wiki/Ms.
*/
describe('Sentence: Abbreviations followed by a full-stop', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('Like Miss and Mrs. the term ' +
            'Ms. has its origins in English title once used for all women. ' +
            'Various plural forms used are Mss., Mses. and Mmes.');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
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
                                    'value' : 'Miss'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mrs'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'term'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Ms'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'origins'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'title'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'once'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'women'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Various'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'plural'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'forms'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mss'
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
                                    'value' : 'Mses'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mmes'
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
                }
            ]
        }));
    });
});

/*
 * Part of the second sentence of:
 * http://en.wikipedia.org/wiki/Natural_language#
 *   Constructed_languages_and_international_auxiliary_languages
*/
describe('Sentence: Abbreviations with dot characters', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('Esperanto was selectively ' +
            'designed by L.L. Zamenhof from natural languages.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Esperanto'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'selectively'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'designed'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'L'
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
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Zamenhof'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'natural'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'languages'
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
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/Park_Ave.
*/
describe('Sentence: common abbreviations suffixed by a dot', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('Park Ave. was an indie pop ' +
            'band which started in January 1996 in Nebr. (Omaha).');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
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
                            'value' : 'Ave'
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
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'indie'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'pop'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'band'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'which'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'started'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'January'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '1996'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'Nebr'
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
                            'value' : 'Omaha'
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
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Last sentence of the first paragraph of: http://en.wikipedia.org/wiki/.com
*/
describe('Sentence: common abbreviations preceded by a dot', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('However, eventually the ' +
            'distinction was lost when .com, .org and .net were opened ' +
            'for unrestricted registration.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'However'
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
                            'value' : 'eventually'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'distinction'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'lost'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'when'
                        }
                    ]
                },
                {
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
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'com'
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
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'org'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'net'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'were'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'opened'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'unrestricted'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'registration'
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
});

/*
 * Example found on the web.
*/
describe('Sentence: A terminal marker before a closing quote or parenthesis',
    function () {
        it('should equal the test AST', function () {
            var source = '“However,” says my Grade 8 teacher, “the ' +
                'period goes inside quotes.” This is another sentence';

            assert(JSON.stringify(parser.tokenizeParagraph(source)) ===
                JSON.stringify({
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
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
                                            'value' : 'However'
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
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '”'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'says'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'my'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Grade'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'teacher'
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
                                            'value' : '“'
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
                                            'value' : 'period'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'goes'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'inside'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'quotes'
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
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'This'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'another'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'sentence'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            );
        });
    }
);

/*
 * Part of the wikipedia license note.
*/
describe('Sentence: Abbreviations followed by a dot, optional white ' +
    'space, and a comma', function () {
        it('should equal the test AST', function () {
            var root = parser.tokenizeParagraph('Wikipedia® is a ' +
                'registered trademark of the Wikimedia Foundation, Inc., a ' +
                'non-profit organization.');

            assert(JSON.stringify(root.children[0]) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wikipedia'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '®'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'registered'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'trademark'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Wikimedia'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Foundation'
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
                                    'value' : 'non'
                                }
                            ]
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'profit'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'organization'
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
                })
            );
        });
    }
);

describe('Sentence: Starting with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('. . . to be continued.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
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
                            'value' : '.'
                        }
                    ]
                },
                {
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
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'continued'
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
});

describe('Sentence: Starting with ellipsis without spaces', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('...To be continued.');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '...'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'To'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'continued'
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
});

describe('Sentence: With trailing white space', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('A sentence. ');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
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
                                    'value' : 'sentence'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Without terminal marker', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('A sentence');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
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
                            'value' : 'sentence'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Without alphabetic content', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeParagraph('\uD83D\uDC38.');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\uD83D\uDC38'
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
});

describe('White space characters', function () {
    var sentenceStart = 'A',
        sentenceEnd = 'house.',
        iterator = -1,
        whiteSpaceCharacters = [
            '\u0009', // CHARACTER TABULATION
            '\u000A', // LINE FEED (LF)
            '\u000B', // LINE TABULATION
            '\u000C', // FORM FEED (FF)
            '\u000D', // CARRIAGE RETURN (CR)
            '\u0020', // SPACE
            '\u0085', // NEXT LINE (NEL)
            '\u00A0', // NO-BREAK SPACE
            '\u1680', // OGHAM SPACE MARK
            '\u180E', // MONGOLIAN VOWEL SEPARATOR
            '\u2000', // EN QUAD
            '\u2001', // EM QUAD
            '\u2002', // EN SPACE
            '\u2003', // EM SPACE
            '\u2004', // THREE-PER-EM SPACE
            '\u2005', // FOUR-PER-EM SPACE
            '\u2006', // SIX-PER-EM SPACE
            '\u2007', // FIGURE SPACE
            '\u2008', // PUNCTUATION SPACE
            '\u2009', // THIN SPACE
            '\u200A', // HAIR SPACE
            '\u2028', // LINE SEPARATOR
            '\u2029', // PARAGRAPH SEPARATOR
            '\u202F', // NARROW NO-BREAK SPACE
            '\u205F', // MEDIUM MATHEMATICAL SPACE
            '\u3000'  // IDEOGRAPHIC SPACE
        ],
        character;

    while (whiteSpaceCharacters[++iterator]) {
        character = whiteSpaceCharacters[iterator];

        var source = sentenceStart + character + sentenceEnd;

        it('should equal the test AST when using `' + character + '`',
            function () {
                assert(
                    JSON.stringify(parser.tokenizeSentence(source)) ===
                    JSON.stringify({
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
                                        'value' : character
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
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    })
                );
            }
        );
    }
});

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters',
    function () {
        var source = 'The unicode character \uD83D\uDCA9 is pile of poo.';
        it('should equal the test AST', function () {
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
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
                                    'value' : 'unicode'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'character'
                                }
                            ]
                        },
                        {
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
                                    'value' : '\uD83D\uDCA9'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'pile'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'poo'
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
                })
            );
        });
    }
);

/*
 * Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING KEYCAP,
 * together forming a :zero: emoji
 */
describe('Double combining marks', function () {
    it('should equal the test AST', function () {
        var root = parser.tokenizeSentence('He scored 0\uFE0F\u20E3 points.');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'He'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'scored'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '0\uFE0F\u20E3'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'points'
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
});

var diacritics = [
        '\u0300', // COMBINING GRAVE ACCENT (U+0300)
        '\u0301', // COMBINING ACUTE ACCENT (U+0301)
        '\u0302', // COMBINING CIRCUMFLEX ACCENT (U+0302)
        '\u0303', // COMBINING TILDE (U+0303)
        '\u0304', // COMBINING MACRON (U+0304)
        '\u0305', // COMBINING OVERLINE (U+0305)
        '\u0306', // COMBINING BREVE (U+0306)
        '\u0307', // COMBINING DOT ABOVE (U+0307)
        '\u0308', // COMBINING DIAERESIS (U+0308)
        '\u0309', // COMBINING HOOK ABOVE (U+0309)
        '\u030A', // COMBINING RING ABOVE (U+030A)
        '\u030B', // COMBINING DOUBLE ACUTE ACCENT (U+030B)
        '\u030C', // COMBINING CARON (U+030C)
        '\u030D', // COMBINING VERTICAL LINE ABOVE (U+030D)
        '\u030E', // COMBINING DOUBLE VERTICAL LINE ABOVE (U+030E)
        '\u030F', // COMBINING DOUBLE GRAVE ACCENT (U+030F)
        '\u0310', // COMBINING CANDRABINDU (U+0310)
        '\u0311', // COMBINING INVERTED BREVE (U+0311)
        '\u0312', // COMBINING TURNED COMMA ABOVE (U+0312)
        '\u0313', // COMBINING COMMA ABOVE (U+0313)
        '\u0314', // COMBINING REVERSED COMMA ABOVE (U+0314)
        '\u0315', // COMBINING COMMA ABOVE RIGHT (U+0315)
        '\u0316', // COMBINING GRAVE ACCENT BELOW (U+0316)
        '\u0317', // COMBINING ACUTE ACCENT BELOW (U+0317)
        '\u0318', // COMBINING LEFT TACK BELOW (U+0318)
        '\u0319', // COMBINING RIGHT TACK BELOW (U+0319)
        '\u031A', // COMBINING LEFT ANGLE ABOVE (U+031A)
        '\u031B', // COMBINING HORN (U+031B)
        '\u031C', // COMBINING LEFT HALF RING BELOW (U+031C)
        '\u031D', // COMBINING UP TACK BELOW (U+031D)
        '\u031E', // COMBINING DOWN TACK BELOW (U+031E)
        '\u031F', // COMBINING PLUS SIGN BELOW (U+031F)
        '\u0320', // COMBINING MINUS SIGN BELOW (U+0320)
        '\u0321', // COMBINING PALATALIZED HOOK BELOW (U+0321)
        '\u0322', // COMBINING RETROFLEX HOOK BELOW (U+0322)
        '\u0323', // COMBINING DOT BELOW (U+0323)
        '\u0324', // COMBINING DIAERESIS BELOW (U+0324)
        '\u0325', // COMBINING RING BELOW (U+0325)
        '\u0326', // COMBINING COMMA BELOW (U+0326)
        '\u0327', // COMBINING CEDILLA (U+0327)
        '\u0328', // COMBINING OGONEK (U+0328)
        '\u0329', // COMBINING VERTICAL LINE BELOW (U+0329)
        '\u032A', // COMBINING BRIDGE BELOW (U+032A)
        '\u032B', // COMBINING INVERTED DOUBLE ARCH BELOW (U+032B)
        '\u032C', // COMBINING CARON BELOW (U+032C)
        '\u032D', // COMBINING CIRCUMFLEX ACCENT BELOW (U+032D)
        '\u032E', // COMBINING BREVE BELOW (U+032E)
        '\u032F', // COMBINING INVERTED BREVE BELOW (U+032F)
        '\u0330', // COMBINING TILDE BELOW (U+0330)
        '\u0331', // COMBINING MACRON BELOW (U+0331)
        '\u0332', // COMBINING LOW LINE (U+0332)
        '\u0333', // COMBINING DOUBLE LOW LINE (U+0333)
        '\u0334', // COMBINING TILDE OVERLAY (U+0334)
        '\u0335', // COMBINING SHORT STROKE OVERLAY (U+0335)
        '\u0336', // COMBINING LONG STROKE OVERLAY (U+0336)
        '\u0337', // COMBINING SHORT SOLIDUS OVERLAY (U+0337)
        '\u0338', // COMBINING LONG SOLIDUS OVERLAY (U+0338)
        '\u0339', // COMBINING RIGHT HALF RING BELOW (U+0339)
        '\u033A', // COMBINING INVERTED BRIDGE BELOW (U+033A)
        '\u033B', // COMBINING SQUARE BELOW (U+033B)
        '\u033C', // COMBINING SEAGULL BELOW (U+033C)
        '\u033D', // COMBINING X ABOVE (U+033D)
        '\u033E', // COMBINING VERTICAL TILDE (U+033E)
        '\u033F', // COMBINING DOUBLE OVERLINE (U+033F)
        '\u0340', // COMBINING GRAVE TONE MARK (U+0340)
        '\u0341', // COMBINING ACUTE TONE MARK (U+0341)
        '\u0342', // COMBINING GREEK PERISPOMENI (U+0342)
        '\u0343', // COMBINING GREEK KORONIS (U+0343)
        '\u0344', // COMBINING GREEK DIALYTIKA TONOS (U+0344)
        '\u0345', // COMBINING GREEK YPOGEGRAMMENI (U+0345)
        '\u0346', // COMBINING BRIDGE ABOVE (U+0346)
        '\u0347', // COMBINING EQUALS SIGN BELOW (U+0347)
        '\u0348', // COMBINING DOUBLE VERTICAL LINE BELOW (U+0348)
        '\u0349', // COMBINING LEFT ANGLE BELOW (U+0349)
        '\u034A', // COMBINING NOT TILDE ABOVE (U+034A)
        '\u034B', // COMBINING HOMOTHETIC ABOVE (U+034B)
        '\u034C', // COMBINING ALMOST EQUAL TO ABOVE (U+034C)
        '\u034D', // COMBINING LEFT RIGHT ARROW BELOW (U+034D)
        '\u034E', // COMBINING UPWARDS ARROW BELOW (U+034E)
        '\u034F', // COMBINING GRAPHEME JOINER (U+034F)
        '\u0350', // COMBINING RIGHT ARROWHEAD ABOVE (U+0350)
        '\u0351', // COMBINING LEFT HALF RING ABOVE (U+0351)
        '\u0352', // COMBINING FERMATA (U+0352)
        '\u0353', // COMBINING X BELOW (U+0353)
        '\u0354', // COMBINING LEFT ARROWHEAD BELOW (U+0354)
        '\u0355', // COMBINING RIGHT ARROWHEAD BELOW (U+0355)
        '\u0356', // COMBINING RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356)
        '\u0357', // COMBINING RIGHT HALF RING ABOVE (U+0357)
        '\u0358', // COMBINING DOT ABOVE RIGHT (U+0358)
        '\u0359', // COMBINING ASTERISK BELOW (U+0359)
        '\u035A', // COMBINING DOUBLE RING BELOW (U+035A)
        '\u035B', // COMBINING ZIGZAG ABOVE (U+035B)
        '\u035C', // COMBINING DOUBLE BREVE BELOW (U+035C)
        '\u035D', // COMBINING DOUBLE BREVE (U+035D)
        '\u035E', // COMBINING DOUBLE MACRON (U+035E)
        '\u035F', // COMBINING DOUBLE MACRON BELOW (U+035F)
        '\u0360', // COMBINING DOUBLE TILDE (U+0360)
        '\u0361', // COMBINING DOUBLE INVERTED BREVE (U+0361)
        '\u0362', // COMBINING DOUBLE RIGHTWARDS ARROW BELOW (U+0362)
        '\u0363', // COMBINING LATIN SMALL LETTER A (U+0363)
        '\u0364', // COMBINING LATIN SMALL LETTER E (U+0364)
        '\u0365', // COMBINING LATIN SMALL LETTER I (U+0365)
        '\u0366', // COMBINING LATIN SMALL LETTER O (U+0366)
        '\u0367', // COMBINING LATIN SMALL LETTER U (U+0367)
        '\u0368', // COMBINING LATIN SMALL LETTER C (U+0368)
        '\u0369', // COMBINING LATIN SMALL LETTER D (U+0369)
        '\u036A', // COMBINING LATIN SMALL LETTER H (U+036A)
        '\u036B', // COMBINING LATIN SMALL LETTER M (U+036B)
        '\u036C', // COMBINING LATIN SMALL LETTER R (U+036C)
        '\u036D', // COMBINING LATIN SMALL LETTER T (U+036D)
        '\u036E', // COMBINING LATIN SMALL LETTER V (U+036E)
        '\u036F'  // COMBINING LATIN SMALL LETTER X (U+036F)
    ],
    iterator = -1,
    diacritic;

describe('A simple sentence testing for combining diacritical marks',
    function () {
        while (diacritics[++iterator]) {
            diacritic = diacritics[iterator];

            var source = 'This is a' + diacritic + ' house.';
            it('should equal the test AST when using \u25CC' + diacritic,
                function () {
                    assert(
                        JSON.stringify(parser.tokenizeSentence(source)) ===
                        JSON.stringify({
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'This'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                            'value' : 'a' + diacritic
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
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
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        })
                    );
                }
            );
        }
    }
);

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
*/
describe('Simple sentences testing for tie characters', function () {
    it('should equal the test AST, when using the combinding double ' +
        'breve \u25CC\u035D\u25CC', function () {
            var source = 'e.g. the combining double breve o\u035Do.';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o\u035Do'
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
                })
            );
        }
    );

    it('should equal the test AST, when using the combinding double ' +
        'inverted breve \u25CC\u0361\u25CC', function () {
            var source =
                'e.g. the combining double inverted breve /k\u0361p/';

            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'inverted'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
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
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'k\u0361p'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the combinding double breve ' +
        'below \u25CC\u035C\u25CC', function () {
            var source = 'e.g. the combining double breve below /k\u035Cp/';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'below'
                                }
                            ]
                        },
                        {
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
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'k\u035Cp'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the undertie \u203F',
        function () {
            var source = 'e.g. the undertie /vuz\u203Fave/';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'undertie'
                                }
                            ]
                        },
                        {
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
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'vuz'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u203F'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'ave'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the character tie \u2040',
        function () {
            var source = 'e.g. the character tie s\u2040t';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'character'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'tie'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 's'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2040'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 't'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the inverted undertie \u2054',
        function () {
            var source = 'e.g. the inverted undertie o\u2054o';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'inverted'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'undertie'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2054'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );
});

describe('Intelectual property marks', function () {
    it('should equal the test AST, when using the copyright symbol \u00A9',
        function () {
            var source = '\u00A9 2011 John Smith';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u00A9'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '2011'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'John'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the sound recording ' +
        'copyright symbol \u2117', function () {
            var source = 'Designated by \u2117, the sound recording ' +
                'copyright symbol.';

            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Designated'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'by'
                                }
                            ]
                        },
                        {
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
                                    'value' : '\u2117'
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
                                    'value' : 'sound'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'recording'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'copyright'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'symbol'
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
                })
            );
        }
    );

    it('should equal the test AST, when using the registered trademark ' +
        'symbol \u00AE', function () {
            var source = 'Wikipedia\u00AE is a registered trademark.';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wikipedia'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u00AE'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'registered'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'trademark'
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
                })
            );
        }
    );

    it('should equal the test AST, when using the service mark symbol \u2120',
        function () {
            var source = 'ABC Law\u2120 legal services.';
            assert(JSON.stringify(parser.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
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
                                    'value' : 'Law'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2120'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'legal'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'services'
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
                })
            );
        }
    );

    it('should equal the test AST, when using the trademark symbol \u2122',
        function () {
            var root = parser.tokenizeSentence(
                'Mytrademark\u2122 is a trademark.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Mytrademark'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\u2122'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'trademark'
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

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/IPhone_5S
*/
describe('A simple sentence testing for digit-letters', function () {
    var source = 'iPhone 5S is a high-end smartphone developed by Apple.';

    it('should equal the test AST', function () {
        var root = parser.tokenizeSentence(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'iPhone'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '5S'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'high'
                        }
                    ]
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
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'end'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'smartphone'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'developed'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Apple'
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
});

/*
 * Modified sentence from: http://mathiasbynens.be/notes/javascript-unicode
 * Note the combining characters.
*/
describe('A simple sentence testing for grapheme clusters', function () {
    var source = 'Grapheme clusters such as \u0BA8\u0BBF and Hangul made ' +
        'of conjoining Jamo such as \u1101\u1161\u11A8, or other similar ' +
        'symbols.';

    it('should equal the test AST', function () {
        var root = parser.tokenizeSentence(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Grapheme'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'clusters'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'such'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : '\u0BA8\u0BBF'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'Hangul'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'made'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : 'conjoining'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Jamo'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'such'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : '\u1101\u1161\u11A8'
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
                            'value' : 'other'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'similar'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'symbols'
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
});

/*
 * Modified example from: https://github.com/walling/unorm
 * Note both the hexadecimal and Unicode escape sequences.
*/
describe('Unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
        '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length ' +
        '10\u207B\xB9\u2070 m.';

    it('should equal the test AST', function () {
        var root = parser.tokenizeSentence(source);

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
                // NOT a combining ring! Just the unicode
                // A-ring character.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\xC5'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'symbol'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'invented'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
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
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'J'
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
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                // A combining ring and a combining diaereses.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'A\u030Angstro\u0308m'
                        }
                    ]
                },
                {
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
                            'value' : '1814'
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
                // Two combining diaereses.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Lo\u0308gdo\u0308'
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
                // En-dash
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u2013'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '1874'
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
                            'value' : 'denotes'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
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
                            'value' : '10'
                        }
                    ]
                },
                // Superscript minus.
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u207B'
                        }
                    ]
                },
                // Superscript one and superscript two
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\xB9\u2070'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'm'
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
});

describe('Abbreviations: Decimals (affixed by a full-stop)', function () {
    it('should *not* treat the dot-character succeeding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var root,
                digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];
                root = parser.tokenizeSentence('See § ' + digit + '. ¶ 2.');
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
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '§'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : digit
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
                                    'value' : '¶'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

describe('Abbreviations: Geographic', function () {
    it('should *not* treat the dot-character succeeding `Ave` ' +
        '(abbreviation for `Avenue`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'Survey Reaffirms 5th Ave. at Top of the Retail Rent Heap'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Survey'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Reaffirms'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'A café located on the blvd. of Kusadasi'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Like all mountains, Mt. Gay is a large large mass of rock.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'In law, Rd. is an abbreviation of road.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The many fine Victorian buildings in Wolverhampton.'
            );

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
            var root = parser.tokenizeSentence(
                'The Teide Nat. Park in Tenerife, Spain.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The Teide Natl. Park in Tenerife, Spain.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'U.S. Rt. 66, a historic highway in America.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'U'
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'S'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'U.S. Rte. 66, a historic highway in America.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'U'
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'S'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Leicestershire Co. is a landlocked county in the ' +
                'English Midlands.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'St. James\'s Pk. covers 34 ha.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'St'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'See the attachment for potential Times Sq. sites.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Continue on Pershing Dr. before turning right.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The Pt. of L.A. is also called Los Angeles Harbor ' +
                'Department.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'A'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'I used to live on 2nd St. in Clinton.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'As Ft. Knox is no longer “The Home of Armor”, ' +
                'the Patton Museum has also been relocated.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Huon Pen. is a large rugged peninsula on the island of ' +
                'New Guinea.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Yukon, formerly Yukon Territory (Yuk. Terr.), is an ' +
                'area of rugged mountains and high plateaus.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The Atlantic Hwy. was the direct predecessor to US 1.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The San Diego Fwy. is most commonly called “The 405”.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Blue Ridge Pkwy. is a National Parkway, noted for ' +
                'its scenic beauty.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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

                root = parser.tokenizeSentence(
                    'I live in Clinton, ' + state + '. on 2nd street.'
                );

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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

                root = parser.tokenizeSentence(
                    'I\'m from Mount Pleasant, ' + state + '. in Canada.'
                );

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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

                root = parser.tokenizeSentence(
                    'I\'m from Newton, ' + county + '. in England.'
                );

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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

                root = parser.tokenizeSentence(
                    'You should talk to ' + title +
                    '. Smith about these questions.'
                );

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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

describe('Abbreviations: Alphabetical', function () {
    it('should *not* treat the dot-character preceded by a latin letter ' +
        'and whitespace, as a terminal marker (e.g., in ' +
        '`Thomas A. Swift`, or in `e.` when abbreviating east)',
        function () {
            var alphabet = 'abcdefghijklmnopqrstuvwxyz',
                iterator = -1,
                root, character;

            alphabet += alphabet.toUpperCase();
            alphabet = alphabet.split('');

            while (alphabet[++iterator]) {
                character = alphabet[iterator];
                root = parser.tokenizeSentence(
                    'Thomas ' + character + '. Swift'
                );

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Thomas'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : character
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Swift'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Business', function () {
    it('should *not* treat the dot-character succeeding `Inc` ' +
        '(abbreviation for `Incorporation`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'Today, ABC Company, Inc. announced an increase of 100 ' +
                'percent in the last two years.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'XYZ Associates Ltd. is a member of the confederation.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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

describe('Abbreviations: Latin', function () {
    it('should *not* treat the dot-character succeeding `ca` (abbreviation ' +
        'for `circa`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'The antique clock is from ca. 1900.'
            );

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
                                'value' : 'antique'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'clock'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'ca'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1900'
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

    it('should *not* treat the dot-character succeeding `cap` ' +
        '(abbreviation for `chapter`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'Electronic Transactions Ordinance (Cap. 553)'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Electronic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Transactions'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ordinance'
                            }
                        ]
                    },
                    {
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
                                'value' : 'Cap'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '553'
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
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cf` (abbreviation ' +
        'for `bring together`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992)'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'were'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'similar'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'those'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'obtained'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'using'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'different'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'techniques'
                            }
                        ]
                    },
                    {
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
                                'value' : 'cf'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Wilson'
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
                                'value' : '1999'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'Ansmann'
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
                                'value' : '1992'
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
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cp` (abbreviation ' +
        'for `compare`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'were'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'similar'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'those'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'obtained'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'using'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'different'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'techniques'
                            }
                        ]
                    },
                    {
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
                                'value' : 'cf'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Wilson'
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
                                'value' : '1999'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'Ansmann'
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
                                'value' : '1992'
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
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cwt` ' +
        '(abbreviation for `centum weight`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'Hundredweight is abbreviated as cwt. because \'C\' is ' +
                'the Roman symbol for 100.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Hundredweight'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'abbreviated'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'cwt'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'because'
                            }
                        ]
                    },
                    {
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
                                'value' : 'C'
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
                                'value' : 'Roman'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'symbol'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : '100'
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

    it('should *not* treat the dot-character succeeding `ead` ' +
        '(abbreviation for `eadem`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'When quoting a female author, use the feminine form ' +
                'of idem, ead. (eadem).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'When'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'quoting'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'female'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'author'
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
                                'value' : 'use'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'feminine'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'form'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'idem'
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
                                'value' : 'ead'
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
                                'value' : 'eadem'
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
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `al` ' +
        '(abbreviation for `(et) alii`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'These results agree with the ones published by ' +
                'Pelon et al. (2002).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'agree'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'ones'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'published'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'by'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pelon'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'al'
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
                                'value' : '2002'
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
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `etc` ' +
        '(abbreviation for `et cetera`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'Et cetera (abbreviated as etc. or &c.) is a Latin ' +
                'expression that means “and other things”, or “and so ' +
                'forth.”'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cetera'
                            }
                        ]
                    },
                    {
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
                                'value' : 'abbreviated'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'etc'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '&'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'c'
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
                                'value' : 'Latin'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'expression'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'means'
                            }
                        ]
                    },
                    {
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
                                'value' : 'other'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'things'
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
                                'value' : 'so'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'forth'
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

    it('should *not* treat the dot-character succeeding `fl` (abbreviation ' +
        'for `floruit`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'The great author Joseph Someone (fl. 2050-75) was ' +
                'renowned for his erudition.'
            );

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
                                'value' : 'great'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'author'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Joseph'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Someone'
                            }
                        ]
                    },
                    {
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
                                'value' : 'fl'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2050'
                            }
                        ]
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '75'
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
                                'value' : 'renowned'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'his'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'erudition'
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

    it('should *not* treat the dot-character succeeding `ff` ' +
        '(abbreviation for `foliis`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'As such, Hornblower 258f. would refer to pages 258–259 ' +
                'while 258ff. would refer to an undetermined number of ' +
                'pages following page 258.'
            );

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
                                'value' : 'such'
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
                                'value' : 'Hornblower'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258f'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'would'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'refer'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258'
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
                                'value' : '259'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'while'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258ff'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'would'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'refer'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'undetermined'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'number'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'following'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'page'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258'
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

    it('should *not* treat the dot-character succeeding `ibid` ' +
        '(abbreviation for `ibidem`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'Ibid. (Latin, short for ibidem, meaning “in the same ' +
                'place”) is the term used to provide an endnote or ' +
                'footnote citation or reference for a source that was ' +
                'cited in the preceding endnote or footnote.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ibid'
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
                                'value' : 'Latin'
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
                                'value' : 'short'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'ibidem'
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
                                'value' : 'meaning'
                            }
                        ]
                    },
                    {
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
                                'value' : 'same'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'place'
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
                                'value' : 'term'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'provide'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'endnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'footnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'citation'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'reference'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'source'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'cited'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'preceding'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'endnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'footnote'
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

    it('should *not* treat the dot-character succeeding `id` (abbreviation ' +
        'for `idem`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'Id. is particularly used in legal citations.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Id'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'particularly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'legal'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'citations'
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

    it('should *not* treat the dot-character succeeding `nem` and `con` ' +
        '(in `nem. con.`, abbreviation for `nemine contradicente`), as a ' +
        'terminal marker', function () {
            var root = parser.tokenizeSentence(
                'The meaning of nemine contradicente is distinct from ' +
                '“unanimously”; nem. con. simply means that nobody voted ' +
                'against.'
            );

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
                                'value' : 'meaning'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'nemine'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'contradicente'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'distinct'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'unanimously'
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
                                'value' : ';'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'nem'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'con'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'simply'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'means'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'nobody'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'voted'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'against'
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

    it('should *not* treat the dot-character succeeding `op` and `cit` ' +
        '(in `op. cit.`, abbreviation for `opere (citato)`), as a terminal ' +
        'marker', function () {
            var root = parser.tokenizeSentence(
                'As usual with foreign words and phrases, op. cit. is ' +
                'typically given in italics.'
            );

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
                                'value' : 'usual'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'foreign'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'words'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'phrases'
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
                                'value' : 'op'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cit'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'typically'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'given'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'italics'
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

    it('should *not* treat the dot-character succeeding `cent` ' +
        '(abbreviation for `(per) cent`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'The form per cent. is still in use as a part of highly ' +
                'formal language.'
            );

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
                                'value' : 'form'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cent'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'still'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'use'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'part'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'highly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'formal'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'language'
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

    it('should *not* treat the dot-character succeeding `pro` ' +
        '(abbreviation for `(per) procurationem`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'Procuration (per procurationem), or shortly per pro., ' +
                'or simply p.p.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Procuration'
                            }
                        ]
                    },
                    {
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
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'procurationem'
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
                                'value' : 'shortly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pro'
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
                                'value' : 'simply'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'p'
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'p'
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

    it('should *not* treat the dot-character succeeding `tem` ' +
        '(abbreviation for `(pro) tempore`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'Legislative bodies can have one or more pro tem. for ' +
                'the presiding officer.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Legislative'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'bodies'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'can'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'have'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'pro'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'tem'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'presiding'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'officer'
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

    it('should *not* treat the dot-character succeeding `sic` ' +
        '(abbreviation for `sic erat scriptum`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'Sic., or sic erat scriptum, is Latin for “Thus it ' +
                'was written.”'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Sic'
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
                                'value' : 'sic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'erat'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'scriptum'
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
                                'value' : 'Latin'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'Thus'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'it'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'written'
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

    it('should *not* treat the dot-character succeeding `seq` ' +
        '(abbreviation for `(et) sequentia`), as a terminal marker',
        function () {
            var root = parser.tokenizeSentence(
                'The phrase et seq. is used to indicate that ' +
                'the information is continued on the denoted ' +
                'pages or sections.'
            );

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
                                'value' : 'phrase'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'seq'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'indicate'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'information'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'continued'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'denoted'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'sections'
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

    it('should *not* treat the dot-character succeeding `stat` ' +
        '(abbreviation for `statim`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'That patient needs attention, stat.!'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'That'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'patient'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'needs'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'attention'
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
                                'value' : 'stat'
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
                                'value' : '!'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `viz` ' +
        '(abbreviation for `videlicet`), as a terminal marker', function () {
            var root = parser.tokenizeSentence(
                'The noble gases, viz. helium, neon, argon, xenon, ' +
                'krypton and radon, show a non-expected behaviour when ' +
                'exposed to this new element.'
            );

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
                                'value' : 'noble'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gases'
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
                                'value' : 'viz'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'helium'
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
                                'value' : 'neon'
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
                                'value' : 'argon'
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
                                'value' : 'xenon'
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
                                'value' : 'krypton'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'radon'
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
                                'value' : 'show'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'non'
                            }
                        ]
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
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'expected'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'behaviour'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'when'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'exposed'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                                'value' : 'this'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'new'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'element'
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
            var root = parser.tokenizeSentence(
                'The price for 15 bbls. is unknown to me.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '12 cu. in. could also be written as 12inch^3.'
            );
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Could you get 2 doz. of eggs?'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '1 fl. oz. equals about 28 ml.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '2 oz. equals about 56–57 gr.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '2 ft. equals exactly 60.96 centimeters.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WordNode',
                        'children' : [
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
            var root = parser.tokenizeSentence(
                '1 gal. equals 8 pints.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '5 gr. bottle indicates on the back that the ' +
                'dosage is “325 mg.”'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                '1 Gro. (a gross) refers to a group of 144 items.'
            );

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
            var root = parser.tokenizeSentence(
                'There are 12 in. in a foot.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Items 10-karat or greater are to be stamped with ' +
                'either Kt. or K.'
            );
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
                            }
                        ]
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
                        'type' : 'WordNode',
                        'children' : [
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'In the imperial systems of measurement, 1 lb. equals ' +
                '0.45359237 kilograms'
            );
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WordNode',
                        'children' : [
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
            var root = parser.tokenizeSentence(
                'A mile, known as 1 mi. also, is a unit of length most ' +
                'commonly equivalent to 5,280 feet.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'In the imperial systems of measurement, 1 oz. equals ' +
                'one sixteenth of a pound.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'In the imperial systems of measurement, 1 pt. equals ' +
                'one eighth of a gallon.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'In the imperial systems of measurement, 1 qt. ' +
                'equals one fourth of a gallon.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'The large house boasts 29 sq. ft. of living space.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Add 3 tbsp. sea salt flakes.'
            );

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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence('Add 1 tsp. mustard powder.');
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence('2 yd. is a fanthom.');
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Sprint for 90 sec. more, before you do some stretches.'
            );
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'Continue down the road 8 more min. before turning left ' +
                'at the crossroads.'
            );
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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
            var root = parser.tokenizeSentence(
                'We\'ll be there in 1 hr. I think'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'We'
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
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
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

                root = parser.tokenizeSentence(
                    'Let\'s move the meeting to next ' + day + '. at 10:00.'
                );

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Let'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                }
                            ]
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
                            'type' : 'WordNode',
                            'children' : [
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

                root = parser.tokenizeSentence(
                    'My birthday is in ' + month + ' on the 12th.'
                );

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

describe('Abbreviations: Decimals (prefixed by a full-stop)', function () {
    it('should *not* treat the dot-character preceding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];

                var root = parser.tokenizeSentence(
                    'See § .' + digit + ' ¶ 2.'
                );

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
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '§'
                                }
                            ]
                        },
                        {
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
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : digit
                                }
                            ]
                        },
                        {
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
                                    'value' : '¶'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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

describe('Abbreviations: TLD abbreviations', function () {
    it('should *not* treat the dot-character preceding top-level domains ' +
        '(e.g., `aero`, `asia`, `biz`, &c.), as a terminal marker',
        function () {
            var tlds = ('aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|' +
                    'mil|mobi|museum|name|net|org|post|pro|tel|travel|xxx'
                ).split('|'),
                iterator = -1,
                root, domain;

            while (tlds[++iterator]) {
                domain = tlds[iterator];

                root = parser.tokenizeSentence(
                    'The domain .' + domain + ' is a top-level domain.'
                );

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
                                    'value' : 'domain'
                                }
                            ]
                        },
                        {
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
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : domain
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'top'
                                }
                            ]
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'level'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'domain'
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

describe('Terminal markers', function () {
    it('should break sentences ending in a full stop/period', function () {
        var root = parser.tokenizeParagraph(
            'Like Miss and Mrs. the term Ms. has its origins in English ' +
            'title once used for all women. Various plural forms used ' +
            'are Mss., Mses. and Mmes.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
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
                                    'value' : 'Miss'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mrs'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'term'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Ms'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'origins'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'title'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'once'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'women'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Various'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'plural'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'forms'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mss'
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
                                    'value' : 'Mses'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'Mmes'
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
                }
            ]
        }));
    });

    it('should break sentences ending in a question mark', function () {
        var root = parser.tokenizeParagraph(
            'Is it good in form? style? meaning? He responded with yes.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'it'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'good'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'form'
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
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'style'
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
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'meaning'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'He'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'responded'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'yes'
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
                }
            ]
        }));
    });

    it('should break sentences ending in an exclamation mark', function () {
        var root = parser.tokenizeParagraph(
            '“No!” he yelled. “Buy it now!” They have some really(!) ' +
            'low-priced rugs on sale this week.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
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
                                    'value' : 'No'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
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
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'he'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'yelled'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
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
                                    'value' : 'Buy'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'it'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'now'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'They'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'have'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'really'
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
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
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
                                    'value' : 'low'
                                }
                            ]
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
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'priced'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'rugs'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'sale'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'this'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'week'
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
                }
            ]
        }));
    });

    it('should break sentences ending in an interrobang', function () {
        var root = parser.tokenizeParagraph(
            'Say what‽ She\'s pregnant?! Realy!? Wow.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Say'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'what'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '‽'
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
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'She'
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
                                    'value' : 'pregnant'
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
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
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
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Realy'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
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
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wow'
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
                }
            ]
        }));
    });

    it('should break sentences ending in an ellipsis', function () {
        var root = parser.tokenizeRoot(
            'This is rather straightforward... most of the time... ' +
            'She said that you should end a sentence with an ellipsis.'
        );

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'This'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'rather'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'straightforward'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '...'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'time'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '...'
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
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'She'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'said'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'end'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'sentence'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
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
                                    'value' : 'ellipsis'
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
                }
            ]
        }));
    });
});

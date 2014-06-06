var converter = require('..'),
    assert = require('assert');

/*
 * Summarised from the first paragraph of: http://en.wikipedia.org/wiki/Ms.
*/
describe('Sentence: Abbreviations followed by a full-stop', function () {
    it('should equal the test AST', function () {
        var source = 'Like Miss and Mrs. the term Ms. has its origins ' +
            'in English title once used for all women. Various plural ' +
            'forms used are Mss., Mses. and Mmes.';

        assert(converter(source).head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Like'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Miss'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mrs'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'term'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Ms'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'has'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'its'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'origins'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'English'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'title'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'once'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'for'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'all'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'women'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Various'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'plural'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'forms'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'are'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mss'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mses'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mmes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
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
        var source = 'Esperanto was selectively designed by L.L. Zamenhof ' +
            'from natural languages.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Esperanto'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'selectively'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'designed'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Zamenhof'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'from'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'natural'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'languages'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
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
        var source = 'Park Ave. was an indie pop band which started in ' +
            'January 1996 in Nebr. (Omaha).';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Park'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ave'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'an'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'indie'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'pop'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'band'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'which'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'started'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'January'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1996'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Nebr'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '('
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Omaha'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
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
        var source = 'However, eventually the distinction was lost ' +
            'when .com, .org and .net were opened for unrestricted ' +
            'registration.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'However'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'eventually'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'distinction'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'lost'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'when'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'com'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'org'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'net'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'were'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'opened'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'for'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'unrestricted'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'registration'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
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

            assert(converter(source).head.toAST() === JSON.stringify({
                'type' : 'ParagraphNode',
                'children' : [
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'However'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'says'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'my'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'Grade'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : '8'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'teacher'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'the'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'period'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'goes'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'inside'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'quotes'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'This'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'is'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'another'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'sentence'
                            }
                        ]
                    }
                ]
            }));
        });
    }
);

/*
 * Part of the wikipedia license note.
*/
describe('Sentence: Aabbreviations followed by a dot, optional white ' +
    'space, and a comma', function () {
        it('should equal the test AST', function () {
            var source = 'Wikipedia® is a registered trademark of the ' +
                'Wikimedia Foundation, Inc., a non-profit organization.';

            assert(converter(source).head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '®'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'registered'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikimedia'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Foundation'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Inc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'non'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'profit'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'organization'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });
    }
);

describe('Sentence: Starting with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var source = '. . . to be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'to'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Sentence: Starting with ellipsis without spaces', function () {
    it('should equal the test AST', function () {
        var source = '...To be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '...'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'To'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('A simple sentence without alphabetic content', function () {
    it('should equal the test AST', function () {
        var source = '\uD83D\uDC38.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '\uD83D\uDC38'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

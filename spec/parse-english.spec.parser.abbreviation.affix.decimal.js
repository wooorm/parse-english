var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: decimals (affixed by a full-stop)', function () {
    it('should *not* treat the dot-character succeeding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var root;

            '0123456789'.split('').forEach(function (digit) {
                root = converter('See § ' + digit + '. ¶ 2.');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'See'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '§'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : digit
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
                            'value' : '¶'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2'
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
});

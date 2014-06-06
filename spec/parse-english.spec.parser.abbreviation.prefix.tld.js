var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: title abbreviations', function () {
    it('should *not* treat the dot-character preceding top-level domains ' +
        '(e.g., `aero`, `asia`, `biz`, &c.), as a terminal marker',
        function () {
            (
                'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|' +
                'mil|mobi|museum|name|net|org|post|pro|tel|travel|xxx'
            ).split('|').forEach(function (domain) {
                var root = converter(
                    'The domain .' + domain + ' is a top-level domain.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'The'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
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
                            'value' : domain
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
                            'value' : 'top'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '-'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'level'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
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

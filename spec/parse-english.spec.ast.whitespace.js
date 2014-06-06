var converter = require('..'),
    assert = require('assert'),
    sentenceStart = 'A',
    sentenceEnd = 'house.',
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
    ];

describe('White space characters', function () {
    whiteSpaceCharacters.forEach(function (character) {
        var source = sentenceStart + character + sentenceEnd;

        it('should equal the test AST when using `' + character + '`',
            function () {
                assert(
                    converter(source).head.head.toAST() === JSON.stringify({
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'A'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : character
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'house'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            }
                        ]
                    })
                );
            }
        );
    });
});

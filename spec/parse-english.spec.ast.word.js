var converter = require('..'),
    assert = require('assert');

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters',
    function () {
        var source = 'The unicode character \uD83D\uDCA9 is pile of poo.';
        it('should equal the test AST', function () {
            assert(converter(source).head.head.toAST() === JSON.stringify({
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
                        'value' : 'unicode'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDCA9'
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
                        'value' : 'pile'
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
                        'value' : 'poo'
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

/*
 * Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING KEYCAP,
 * together forming a :zero: emoji
 */
describe('Double combining marks', function () {
    var source = 'He scored 0\uFE0F\u20E3 points.';
    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
        'type' : 'SentenceNode',
        'children' : [
            {
                    'type' : 'WordNode',
                    'value' : 'He'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'scored'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '0\uFE0F\u20E3'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'points'
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '.'
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
];

describe('A simple sentence testing for combining diacritical marks',
    function () {
        diacritics.forEach(function (diacritic) {
            var source = 'This is a' + diacritic + ' house.';
            it('should equal the test AST when using \u25CC' + diacritic,
                function () {
                    assert(
                        converter(source).head.head.toAST() ===
                        JSON.stringify({
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
                                    'value' : 'a' + diacritic
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
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
    }
);

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Contraction_(grammar)
*/
describe('A simple sentence testing for common contractions', function () {
    var source = 'Common examples of contractions include: Ain\'t, ' +
        'let\'s, I\'m, we\'re, what\'s, where\'d, and I\'ll.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Common'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'examples'
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
                    'value' : 'contractions'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'include'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ':'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ai'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 't'
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
                    'value' : 'let'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
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
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
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
                    'value' : 'we'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 're'
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
                    'value' : 'what'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
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
                    'value' : 'where'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'd'
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
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'll'
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
 * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
*/
describe('Simple sentences testing for tie characters', function () {
    it('should equal the test AST, when using the combinding double ' +
        'breve \u25CC\u035D\u25CC', function () {
            var source = 'e.g. the combining double breve o\u035Do.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o\u035Do'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double ' +
        'inverted breve \u25CC\u0361\u25CC', function () {
            var source =
                'e.g. the combining double inverted breve /k\u0361p/';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u0361p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double breve ' +
        'below \u25CC\u035C\u25CC', function () {
            var source = 'e.g. the combining double breve below /k\u035Cp/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'below'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u035Cp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the undertie \u203F',
        function () {
            var source = 'e.g. the undertie /vuz\u203Fave/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'vuz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u203F'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ave'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the character tie \u2040',
        function () {
            var source = 'e.g. the character tie s\u2040t';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2040'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 't'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the inverted undertie \u2054',
        function () {
            var source = 'e.g. the inverted undertie o\u2054o';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
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
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2054'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    }
                ]
            }));
        }
    );
});

describe('Intelectual property marks', function () {
    it('should equal the test AST, when using the copyright symbol \u00A9',
        function () {
            var source = '\u00A9 2011 John Smith';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00A9'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2011'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'John'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Smith'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the sound recording ' +
        'copyright symbol \u2117', function () {
            var source =
                'Designated by \u2117, the sound recording copyright symbol.';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Designated'
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
                        'type' : 'PunctuationNode',
                        'value' : '\u2117'
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
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sound'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'recording'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'copyright'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'symbol'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the registered trademark ' +
        'symbol \u00AE', function () {
            var source = 'Wikipedia\u00AE is a registered trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00AE'
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
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the service mark symbol \u2120',
        function () {
            var source = 'ABC Law\u2120 legal services.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'ABC'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Law'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2120'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'legal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'services'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the trademark symbol \u2122',
        function () {
            var source = 'Mytrademark\u2122 is a trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Mytrademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2122'
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
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
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
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'iPhone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '5'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'S'
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
                    'value' : 'high'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '-'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'end'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'smartphone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'developed'
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
                    'value' : 'Apple'
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
 * Modified sentence from: http://mathiasbynens.be/notes/javascript-unicode
 * Note the combining characters.
*/
describe('A simple sentence testing for grapheme clusters', function () {
    var source = 'Grapheme clusters such as \u0BA8\u0BBF and Hangul made ' +
        'of conjoining Jamo such as \u1101\u1161\u11A8, or other similar ' +
        'symbols.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Grapheme'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'clusters'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u0BA8\u0BBF'
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
                    'value' : 'Hangul'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'made'
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
                    'value' : 'conjoining'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Jamo'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u1101\u1161\u11A8'
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
                    'value' : 'or'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'other'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'similar'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbols'
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
 * Modified example from: https://github.com/walling/unorm
 * Note both the hexadecimal and Unicode escape sequences.
*/
describe('A sentence testing for unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
        '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length ' +
        '10\u207B\xB9\u2070 m.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
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
                // NOT a combining ring! Just the unicode
                // A-ring character.
                {
                    'type' : 'WordNode',
                    'value' : '\xC5'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbol'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'invented'
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
                    'value' : 'A'
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
                    'value' : 'J'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // A combining ring and a combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'A\u030Angstro\u0308m'
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
                    'value' : '1814'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // Two combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'Lo\u0308gdo\u0308'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // En-dash
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u2013'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1874'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'denotes'
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
                    'value' : 'length'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '10'
                },
                // Superscript minus.
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u207B'
                },
                // Superscript one and superscript two
                {
                    'type' : 'WordNode',
                    'value' : '\xB9\u2070'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

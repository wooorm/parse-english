var converter = require('..'),
    assert = require('assert');

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters', function () {
    var source = "The unicode character \uD83D\uDCA9 is pile of poo.";
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "The" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "unicode" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "character" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "PunctuationNode", "value": "\uD83D\uDCA9" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "is" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "pile" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "of" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "poo" },
                                { "type": "PunctuationNode", "value": "." }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Modified example from: http://en.wiktionary.org/wiki/mañana
 * Note the combining diacritical mark U+0303, rather than the unicode
 * character U+00F1.
*/
describe('A simple sentence testing for combining diacritical marks', function () {
    var source = "Pasado man\u0303ana is spanish for “the day after tomorrow”.";
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "Pasado" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "man\u0303ana" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "is" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "spanish" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "for" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "PunctuationNode", "value": "“" },
                                { "type": "WordNode", "value": "the" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "day" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "after" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "tomorrow" },
                                { "type": "PunctuationNode", "value": "”" },
                                { "type": "PunctuationNode", "value": "." },
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Contraction_(grammar)
*/
describe('A simple sentence testing for common contractions', function () {
    var source = "Common examples of contractions include: Ain't, let's, I'm, we're, what's, where'd, and I'll.";
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "Common" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "examples" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "of" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "contractions" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "include" },
                                { "type": "PunctuationNode", "value": ":" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "Ai" },
                                { "type": "WordNode", "value": "n" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "t" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "let" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "s" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "I" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "m" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "we" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "re" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "what" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "s" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "where" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "d" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "and" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "I" },
                                { "type": "PunctuationNode", "value": "'" },
                                { "type": "WordNode", "value": "ll" },
                                { "type": "PunctuationNode", "value": "." }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/IPhone_5S
*/
describe('A simple sentence testing for digit-letters', function () {
    var source = "iPhone 5S is a high-end smartphone developed by Apple.";
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "iPhone" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "5" },
                                { "type": "WordNode", "value": "S" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "is" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "a" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "high" },
                                { "type": "PunctuationNode", "value": "-" },
                                { "type": "WordNode", "value": "end" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "smartphone" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "developed" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "by" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "Apple" },
                                { "type": "PunctuationNode", "value": "." }
                            ]
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
    var source = "Grapheme clusters such as \u0BA8\u0BBF and Hangul made of conjoining Jamo such as \u1101\u1161\u11A8, or other similar symbols.";
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "Grapheme" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "clusters" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "such" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "as" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "\u0BA8\u0BBF" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "and" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "Hangul" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "made" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "of" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "conjoining" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "Jamo" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "such" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "as" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "\u1101\u1161\u11A8" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "or" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "other" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "similar" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "symbols" },
                                { "type": "PunctuationNode", "value": "." }
                            ]
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
describe('A sentence testing for unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.';
    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            "type": "RootNode",
            "children": [
                {
                    "type": "ParagraphNode",
                    "children": [
                        {
                            "type": "SentenceNode",
                            "children": [
                                { "type": "WordNode", "value": "The" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                // NOT a combining ring! Just the unicode
                                // A-ring character.
                                { "type": "WordNode", "value": "\xC5" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "symbol" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "invented" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "by" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "A" },
                                { "type": "PunctuationNode", "value": "." },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "J" },
                                { "type": "PunctuationNode", "value": "." },
                                { "type": "WhiteSpaceNode", "value": " " },
                                // A combining ring and a combining diaereses.
                                { "type": "WordNode", "value": "A\u030Angstro\u0308m" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "PunctuationNode", "value": "(" },
                                { "type": "WordNode", "value": "1814" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                // Two combining diaereses.
                                { "type": "WordNode", "value": "Lo\u0308gdo\u0308" },
                                { "type": "PunctuationNode", "value": "," },
                                { "type": "WhiteSpaceNode", "value": " " },
                                // En-dash
                                { "type": "PunctuationNode", "value": "\u2013" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "1874" },
                                { "type": "PunctuationNode", "value": ")" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "denotes" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "the" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "length" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "10" },
                                // Superscript minus.
                                { "type": "PunctuationNode", "value": "\u207B" },
                                // Superscript one and superscript two
                                { "type": "WordNode", "value": "\xB9\u2070" },
                                { "type": "WhiteSpaceNode", "value": " " },
                                { "type": "WordNode", "value": "m" },
                                { "type": "PunctuationNode", "value": "." }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: English unit abbreviations', function () {
    it('should *not* treat the dot-character succeeding `bbl` (abbreviation for `barrel`), as a terminal marker', function () {
        var root = converter('The price for 15 bbls. is unknown to me.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "price" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "for" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "15" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "bbls" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "unknown" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "me" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `cu` (abbreviation for `cubic`), as a terminal marker', function () {
        var root = converter('12 cu. in. could also be written as 12inch^3.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "12" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "cu" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "could" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "also" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "be" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "written" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "as" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "12" },
            { "type": "WordNode", "value": "inch" },
            { "type": "PunctuationNode", "value": "^" },
            { "type": "WordNode", "value": "3" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `doz` (abbreviation for `dozen`), as a terminal marker', function () {
        var root = converter('Could you get 2 doz. of eggs?');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Could" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "you" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "get" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "2" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "doz" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "eggs" },
            { "type": "PunctuationNode", "value": "?" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `fl` (as in `fl. oz.`, abbreviation for `fluid (ounce)`), as a terminal marker', function () {
        var root = converter('1 fl. oz. equals about 28 ml.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "fl" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "oz" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "about" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "28" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "ml" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `oz` (abbreviation for `fluid ounce`), as a terminal marker', function () {
        var root = converter('2 oz. equals about 56–57 gr.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "2" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "oz" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "about" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "56" },
            { "type": "PunctuationNode", "value": "–" },
            { "type": "WordNode", "value": "57" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gr" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `ft` (abbreviation for `foot`), as a terminal marker', function () {
        var root = converter('2 ft. equals exactly 60.96 centimeters.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "2" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "ft" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "exactly" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "60" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WordNode", "value": "96" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "centimeters" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `gal` (abbreviation for `gallon`), as a terminal marker', function () {
        var root = converter('1 gal. equals 8 pints.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gal" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "8" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "pints" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `gr` (abbreviation for `grain`), as a terminal marker', function () {
        var root = converter('5 gr. bottle indicates on the back that the dosage is “325 mg.”');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "5" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gr" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "bottle" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "indicates" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "on" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "back" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "that" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "dosage" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "PunctuationNode", "value": "“" },
            { "type": "WordNode", "value": "325" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mg" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "PunctuationNode", "value": "”" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `gro` (abbreviation for `gross`), as a terminal marker', function () {
        var root = converter('1 Gro. (a gross) refers to a group of 144 items.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Gro" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "PunctuationNode", "value": "(" },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gross" },
            { "type": "PunctuationNode", "value": ")" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "refers" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "group" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "144" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "items" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `in` (abbreviation for `inch`), as a terminal marker', function () {
        var root = converter('There are 12 in. in a foot.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "There" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "are" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "12" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "foot" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `kt` (abbreviation for `karat or knot`), as a terminal marker', function () {
        var root = converter('Items 10-karat or greater are to be stamped with either Kt. or K.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Items" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "10" },
            { "type": "PunctuationNode", "value": "-" },
            { "type": "WordNode", "value": "karat" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "or" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "greater" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "are" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "be" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "stamped" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "with" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "either" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Kt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "or" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "K" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `lb` (abbreviation for `pound`), as a terminal marker', function () {
        var root = converter('In the imperial systems of measurement, 1 lb. equals 0.45359237 kilograms');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "In" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "imperial" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "systems" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "measurement" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "lb" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "0" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WordNode", "value": "45359237" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "kilograms" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `mi` (abbreviation for `mile`), as a terminal marker', function () {
        var root = converter('A mile, known as 1 mi. also, is a unit of length most commonly equivalent to 5,280 feet.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mile" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "known" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "as" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mi" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "also" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "unit" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "length" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "most" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "commonly" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equivalent" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "5" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WordNode", "value": "280" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "feet" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `oz` (abbreviation for `ounce`), as a terminal marker', function () {
        var root = converter('In the imperial systems of measurement, 1 oz. equals one sixteenth of a pound.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "In" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "imperial" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "systems" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "measurement" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "oz" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "one" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sixteenth" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "pound" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `pt` (abbreviation for `pint`), as a terminal marker', function () {
        var root = converter('In the imperial systems of measurement, 1 pt. equals one eighth of a gallon.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "In" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "imperial" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "systems" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "measurement" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "pt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "one" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "eighth" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gallon" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `qt` (abbreviation for `quart`), as a terminal marker', function () {
        var root = converter('In the imperial systems of measurement, 1 qt. equals one fourth of a gallon.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "In" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "imperial" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "systems" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "measurement" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "qt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "equals" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "one" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "fourth" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "gallon" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `sq` (abbreviation for `square`), as a terminal marker', function () {
        var root = converter('The large house boasts 29 sq. ft. of living space.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "large" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "house" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "boasts" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "29" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sq" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "ft" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "living" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "space" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `tbsp` (abbreviation for `tablespoon`), as a terminal marker', function () {
        var root = converter('Add 3 tbsp. sea salt flakes.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Add" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "3" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "tbsp" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sea" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "salt" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "flakes" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `tsp` (abbreviation for `teaspoon`), as a terminal marker', function () {
        var root = converter('Add 1 tsp. mustard powder.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Add" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "tsp" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mustard" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "powder" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `yd` (abbreviation for `yard`), as a terminal marker', function () {
        var root = converter('2 yd. is a fanthom.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "2" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "yd" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "fanthom" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });
});

describe('Abbreviations: time references', function () {
    it('should *not* treat the dot-character succeeding `sec` (abbreviation for `seconds`), as a terminal marker', function () {
        var root = converter('Sprint for 90 sec. more, before you do some stretches.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Sprint" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "for" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "90" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sec" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "more" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "before" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "you" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "do" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "some" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "stretches" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `min` (abbreviation for `minutes`), as a terminal marker', function () {
        var root = converter('Continue down the road 8 more min. before turning left at the crossroads.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Continue" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "down" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "road" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "8" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "more" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "min" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "before" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "turning" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "left" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "at" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "crossroads" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `hr` (abbreviation for `hours`), as a terminal marker', function () {
        var root = converter('We\'ll be there in 1 hr. I think');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "We" },
            { "type": "PunctuationNode", "value": "'" },
            { "type": "WordNode", "value": "ll" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "be" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "there" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "hr" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "I" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "think" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding days (e.g., `Mon`, `Tue`, &c.), as a terminal marker', function () {
        var days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun',
            root;

        days.split('|').forEach(function (day) {
            root = converter('Let\'s move the meeting to next ' + day + '. at 10:00.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "Let" },
                { "type": "PunctuationNode", "value": "\'" },
                { "type": "WordNode", "value": "s" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "move" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "the" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "meeting" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "to" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "next" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": day },
                { "type": "PunctuationNode", "value": "." },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "at" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "10" },
                { "type": "PunctuationNode", "value": ":" },
                { "type": "WordNode", "value": "00" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });

    it('should *not* treat the dot-character succeeding months (e.g., `Jan`, `Feb`, &c.), as a terminal marker', function () {
        var months = 'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec',
            root;

        months.split('|').forEach(function (month) {
            root = converter('My birthday is in ' + month + ' on the 12th.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "My" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "birthday" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "is" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "in" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": month },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "on" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "the" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "12" },
                { "type": "WordNode", "value": "th" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });
});

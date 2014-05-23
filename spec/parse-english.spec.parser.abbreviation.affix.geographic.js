var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: latin', function () {
    it('should *not* treat the dot-character succeeding `Ave` (abbreviation for `Avenue`), as a terminal marker', function () {
        var root = converter('Survey Reaffirms 5th Ave. at Top of the Retail Rent Heap');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Survey" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Reaffirms" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "5th" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Ave" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "at" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Top" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Retail" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Rent" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Heap" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Blvd` (abbreviation for `Boulevard`), as a terminal marker', function () {
        var root = converter('A café located on the blvd. of Kusadasi');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "café" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "located" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "on" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "blvd" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Kusadasi" }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Mt` (abbreviation for `Mountain`), as a terminal marker', function () {
        var root = converter('Like all mountains, Mt. Gay is a large large mass of rock.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Like" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "all" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mountains" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Mt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Gay" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "large" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "large" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mass" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "rock" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Rd` (abbreviation for `Road`), as a terminal marker', function () {
        var root = converter('In law, Rd. is an abbreviation of road.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "In" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "law" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Rd" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "an" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "abbreviation" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "road" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Bldg` (abbreviation for `Building`), as a terminal marker', function () {
        var root = converter('The many fine Victorian buildings in Wolverhampton.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "many" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "fine" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Victorian" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "buildings" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Wolverhampton" },
            { "type": "PunctuationNode", "value": "." }

        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Nat` (abbreviation for `National`), as a terminal marker', function () {
        var root = converter('The Teide Nat. Park in Tenerife, Spain.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Teide" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Nat" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Park" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Tenerife" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Spain" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Natl` (abbreviation for `National`), as a terminal marker', function () {
        var root = converter('The Teide Natl. Park in Tenerife, Spain.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Teide" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Natl" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Park" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Tenerife" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Spain" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Rt` (abbreviation for `Route`), as a terminal marker', function () {
        var root = converter('U.S. Rt. 66, a historic highway in America.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "U" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WordNode", "value": "S" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Rt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "66" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "historic" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "highway" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "America" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Rte` (abbreviation for `Route`), as a terminal marker', function () {
        var root = converter('U.S. Rte. 66, a historic highway in America.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "U" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WordNode", "value": "S" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Rte" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "66" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "historic" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "highway" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "America" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Co` (abbreviation for `County`), as a terminal marker', function () {
        var root = converter('Leicestershire Co. is a landlocked county in the English Midlands.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Leicestershire" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Co" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "landlocked" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "county" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "English" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Midlands" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Pk` (abbreviation for `Park`), as a terminal marker', function () {
        var root = converter('St. James\'s Pk. covers 34 ha.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "St" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "James" },
            { "type": "PunctuationNode", "value": "'" },
            { "type": "WordNode", "value": "s" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Pk" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "covers" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "34" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "ha" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Sq` (abbreviation for `Square`), as a terminal marker', function () {
        var root = converter('See the attachment for potential Times Sq. sites.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "See" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "attachment" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "for" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "potential" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Times" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Sq" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sites" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Dr` (abbreviation for `Drive`), as a terminal marker', function () {
        var root = converter('Continue on Pershing Dr. before turning right.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Continue" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "on" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Pershing" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Dr" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "before" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "turning" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "right" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Pt` (abbreviation for `Point` or `Port`), as a terminal marker', function () {
        var root = converter('The Pt. of L.A. is also called Los Angeles Harbor Department.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Pt" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "L" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WordNode", "value": "A" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "also" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "called" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Los" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Angeles" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Harbor" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Department" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `St` (abbreviation for `Street` or `State`), as a terminal marker', function () {
        var root = converter('I used to live on 2nd St. in Clinton.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "I" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "used" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "live" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "on" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "2nd" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "St" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Clinton" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Ft` (abbreviation for `Fort`), as a terminal marker', function () {
        var root = converter('As Ft. Knox is no longer “The Home of Armor”, the Patton Museum has also been relocated.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "As" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Ft" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Knox" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "no" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "longer" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "PunctuationNode", "value": "“" },
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Home" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Armor" },
            { "type": "PunctuationNode", "value": "”" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Patton" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Museum" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "has" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "also" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "been" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "relocated" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Pen` (abbreviation for `Peninsula`), as a terminal marker', function () {
        var root = converter('Huon Pen. is a large rugged peninsula on the island of New Guinea.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Huon" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Pen" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "large" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "rugged" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "peninsula" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "on" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "island" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "New" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Guinea" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Terr` (abbreviation for `Territory`), as a terminal marker', function () {
        var root = converter('Yukon, formerly Yukon Territory (Yuk. Terr.), is an area of rugged mountains and high plateaus.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Yukon" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "formerly" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Yukon" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Territory" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "PunctuationNode", "value": "(" },
            { "type": "WordNode", "value": "Yuk" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Terr" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "PunctuationNode", "value": ")" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "an" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "area" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "rugged" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "mountains" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "and" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "high" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "plateaus" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Hwy` (abbreviation for `Highway`), as a terminal marker', function () {
        var root = converter('The Atlantic Hwy. was the direct predecessor to US 1.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Atlantic" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Hwy" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "was" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "direct" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "predecessor" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "to" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "US" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "1" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Fwy` (abbreviation for `Freeway`), as a terminal marker', function () {
        var root = converter('The San Diego Fwy. is most commonly called “The 405”.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "San" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Diego" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Fwy" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "most" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "commonly" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "called" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "PunctuationNode", "value": "“" },
            { "type": "WordNode", "value": "The" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "405" },
            { "type": "PunctuationNode", "value": "”" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Pkwy` (abbreviation for `Parkway`), as a terminal marker', function () {
        var root = converter('Blue Ridge Pkwy. is a National Parkway, noted for its scenic beauty.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Blue" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Ridge" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Pkwy" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "National" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Parkway" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "noted" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "for" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "its" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "scenic" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "beauty" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding (American) states (e.g., `Ala`, `Ariz`, &c.), as a terminal marker', function () {
        var states = 'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo',
            root;

        states.split('|').forEach(function (state) {
            root = converter('I live in Clinton, ' + state + '. on 2nd street.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "I" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "live" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "in" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Clinton" },
                { "type": "PunctuationNode", "value": "," },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": state },
                { "type": "PunctuationNode", "value": "." },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "on" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "2nd" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "street" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });

    it('should *not* treat the dot-character succeeding (Canadian) states (e.g., `Alta`, `Man`, &c.), as a terminal marker', function () {
        var states = 'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo',
            root;

        states.split('|').forEach(function (state) {
            root = converter('I\'m from Mount Pleasant, ' + state + '. in Canada.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "I" },
                { "type": "PunctuationNode", "value": "'" },
                { "type": "WordNode", "value": "m" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "from" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Mount" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Pleasant" },
                { "type": "PunctuationNode", "value": "," },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": state },
                { "type": "PunctuationNode", "value": "." },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "in" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Canada" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });

    it('should *not* treat the dot-character succeeding (English) counties (e.g., `Beds`, `Berks`, &c.), as a terminal marker', function () {
        var counties = 'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks',
            root;

        counties.split('|').forEach(function (county) {
            root = converter('I\'m from Newton, ' + county + '. in England.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "I" },
                { "type": "PunctuationNode", "value": "'" },
                { "type": "WordNode", "value": "m" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "from" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Newton" },
                { "type": "PunctuationNode", "value": "," },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": county },
                { "type": "PunctuationNode", "value": "." },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "in" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "England" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });
});

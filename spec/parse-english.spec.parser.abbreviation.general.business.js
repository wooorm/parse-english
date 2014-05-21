var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: latin', function () {
    it('should *not* treat the dot-character succeeding `Inc` (abbreviation for `Incorporation`), as a terminal marker', function () {
        var root = converter('Today, ABC Company, Inc. announced an increase of 100 percent in the last two years.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "Today" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "ABC" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Company" },
            { "type": "PunctuationNode", "value": "," },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Inc" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "announced" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "an" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "increase" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "100" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "percent" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "in" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "last" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "two" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "years" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });

    it('should *not* treat the dot-character succeeding `Ltd` (abbreviation for `Limited`), as a terminal marker', function () {
        var root = converter('XYZ Associates Ltd. is a member of the confederation.');
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "XYZ" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Associates" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "Ltd" },
            { "type": "PunctuationNode", "value": "." },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "is" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "a" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "member" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "of" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "the" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "confederation" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}));
    });
});

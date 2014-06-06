var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: Decimals (prefixed by a full-stop)', function () {
    it('should *not* treat the dot-character preceding decimals (e.g., `1`, `2`, &c.), as a terminal marker', function () {
        var digits = '0123456789',
            root;

        digits.split('').forEach(function (digit) {
            root = converter('See § .' + digit + ' ¶ 2.');
            assert(root.toAST() === JSON.stringify({'type':'RootNode','children':[{'type':'ParagraphNode','children':[{'type':'SentenceNode','children':[
                { 'type': 'WordNode', 'value': 'See' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'PunctuationNode', 'value': '§' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'PunctuationNode', 'value': '.' },
                { 'type': 'WordNode', 'value': digit },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'PunctuationNode', 'value': '¶' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': '2' },
                { 'type': 'PunctuationNode', 'value': '.' }
            ]}]}]}));
        });
    });
});

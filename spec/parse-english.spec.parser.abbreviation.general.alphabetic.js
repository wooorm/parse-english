var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: alphabetical', function () {
    it('should *not* treat the dot-character preceded by a latin letter and whitespace, as a terminal marker (e.g., in `Thomas A. Swift`, or in `e.` when abbreviating east)', function () {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz',
            root;

        alphabet += alphabet.toUpperCase();

        alphabet.split('').forEach(function (character) {
            root = converter('Thomas ' + character + '. Swift');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
              { "type": "WordNode", "value": "Thomas" },
              { "type": "WhiteSpaceNode", "value": " " },
              { "type": "WordNode", "value": character },
              { "type": "PunctuationNode", "value": "." },
              { "type": "WhiteSpaceNode", "value": " " },
              { "type": "WordNode", "value": "Swift" }
            ]}]}]}));
        });
    });
});

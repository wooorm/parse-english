var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: title abbreviations', function () {
    it('should *not* treat the dot-character preceding top-level domains (e.g., `aero`, `asia`, `biz`, &c.), as a terminal marker', function () {
        var domains = 'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|post|pro|tel|travel|xxx',
            root;

        domains.split('|').forEach(function (domain) {
            root = converter('The domain .' + domain + ' is a top-level domain.');
            assert(root.toAST() === JSON.stringify({'type':'RootNode','children':[{'type':'ParagraphNode','children':[{'type':'SentenceNode','children':[
                { 'type': 'WordNode', 'value': 'The' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': 'domain' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'PunctuationNode', 'value': '.' },
                { 'type': 'WordNode', 'value': domain },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': 'is' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': 'a' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': 'top' },
                { 'type': 'PunctuationNode', 'value': '-' },
                { 'type': 'WordNode', 'value': 'level' },
                { 'type': 'WhiteSpaceNode', 'value': ' ' },
                { 'type': 'WordNode', 'value': 'domain' },
                { 'type': 'PunctuationNode', 'value': '.' }
            ]}]}]}));
        });
    });

});

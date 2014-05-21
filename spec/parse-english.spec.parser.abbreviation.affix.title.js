var converter = require('..'),
    assert = require('assert');

describe('Abbreviations: title abbreviations', function () {
    it('should *not* treat the dot-character succeeding titles (e.g., `Mr`, `Mrs`, &c.), as a terminal marker', function () {
        var titles = 'Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph',
            root;

        titles.split('|').forEach(function (title) {
            root = converter('You should talk to ' + title + '. Smith about these questions.');
            assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
                { "type": "WordNode", "value": "You" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "should" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "talk" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "to" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": title },
                { "type": "PunctuationNode", "value": "." },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "Smith" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "about" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "these" },
                { "type": "WhiteSpaceNode", "value": " " },
                { "type": "WordNode", "value": "questions" },
                { "type": "PunctuationNode", "value": "." }
            ]}]}]}));
        });
    });

});

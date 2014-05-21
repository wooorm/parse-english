var converter = require('..'),
    assert = require('assert');

describe('Terminal markers: Full stop, exclamation mark, question mark, and interrobang', function () {
    it('should break sentences ending in a full stop/period', function () {
        var root = converter("Like Miss and Mrs. the term Ms. has its origins in English title once used for all women. Various plural forms used are Mss., Mses. and Mmes.");
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "WordNode", "value": "Like" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Miss" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "and" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Mrs" },
                    { "type": "PunctuationNode", "value": "." },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "the" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "term" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Ms" },
                    { "type": "PunctuationNode", "value": "." },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "has" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "its" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "origins" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "in" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "English" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "title" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "once" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "used" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "for" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "all" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "women" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "Various" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "plural" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "forms" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "used" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "are" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Mss" },
                    { "type": "PunctuationNode", "value": "." },
                    { "type": "PunctuationNode", "value": "," },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Mses" },
                    { "type": "PunctuationNode", "value": "." },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "and" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "Mmes" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            }
        ]}]}));
    });

    it('should break sentences ending in a question mark', function () {
        var root = converter("Is it good in form? style? meaning? He responded with yes.");
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "WordNode", "value": "Is" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "it" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "good" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "in" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "form" },
                    { "type": "PunctuationNode", "value": "?" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "style" },
                    { "type": "PunctuationNode", "value": "?" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "meaning" },
                    { "type": "PunctuationNode", "value": "?" }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "He" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "responded" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "with" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "yes" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            }
        ]}]}));
    });

    it('should break sentences ending in an exclamation mark', function () {
        var root = converter("“No!” he yelled. “Buy it now!” They have some really(!) low-priced rugs on sale this week.");
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "PunctuationNode", "value": "“" },
                    { "type": "WordNode", "value": "No" },
                    { "type": "PunctuationNode", "value": "!" },
                    { "type": "PunctuationNode", "value": "”" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "he" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "yelled" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "PunctuationNode", "value": "“" },
                    { "type": "WordNode", "value": "Buy" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "it" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "now" },
                    { "type": "PunctuationNode", "value": "!" },
                    { "type": "PunctuationNode", "value": "”" }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "They" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "have" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "some" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "really" },
                    { "type": "PunctuationNode", "value": "(" },
                    { "type": "PunctuationNode", "value": "!" },
                    { "type": "PunctuationNode", "value": ")" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "low" },
                    { "type": "PunctuationNode", "value": "-" },
                    { "type": "WordNode", "value": "priced" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "rugs" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "on" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "sale" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "this" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "week" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            }
        ]}]}));
    });

    it('should break sentences ending in an interrobang', function () {
        var root = converter("Say what‽ She's pregnant?! Realy!? Wow.");
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "WordNode", "value": "Say" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "what" },
                    { "type": "PunctuationNode", "value": "‽" }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "She" },
                    { "type": "PunctuationNode", "value": "'" },
                    { "type": "WordNode", "value": "s" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "pregnant" },
                    { "type": "PunctuationNode", "value": "?" },
                    { "type": "PunctuationNode", "value": "!" }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "Realy" },
                    { "type": "PunctuationNode", "value": "!" },
                    { "type": "PunctuationNode", "value": "?" }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children": [
                    { "type": "WordNode", "value": "Wow" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            }
        ]}]}));
    });

    it('should break sentences ending in an ellipsis', function () {
        var root = converter("This is rather straightforward... most of the time... She said that you should end a sentence with an ellipsis.");
        assert(root.toAST() === JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "WordNode", "value": "This" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "is" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "rather" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "straightforward" },
                    { "type": "PunctuationNode", "value": "..." },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "most" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "of" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "the" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "time" },
                    { "type": "PunctuationNode", "value": "..." }
                ]
            },
            { "type": "WhiteSpaceNode", "value": " " },
            {
                "type": "SentenceNode",
                "children":[
                    { "type": "WordNode", "value": "She" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "said" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "that" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "you" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "should" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "end" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "a" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "sentence" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "with" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "an" },
                    { "type": "WhiteSpaceNode", "value": " " },
                    { "type": "WordNode", "value": "ellipsis" },
                    { "type": "PunctuationNode", "value": "." }
                ]
            },
        ]}]}));
    });

});

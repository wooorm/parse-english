/* Two paragraphs */

var converter = require('..'),
    assert = require('assert'),
    source;

/*
 * Modified first paragraph, split into two, of:
 *    http://en.wikipedia.org/wiki/Paragraph
*/
source = "A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph has 5 types (Br. Anton Heitman).\n\nA paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.";

describe('Two paragraphs', function () {
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
                               { "type": "WordNode", "value": "A" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "paragraph" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "PunctuationNode", "value": "(" },
                               { "type": "WordNode", "value": "from" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "the" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "Greek" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "paragraphos" },
                               { "type": "PunctuationNode", "value": "," },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "PunctuationNode", "value": "“" },
                               { "type": "WordNode", "value": "to" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "write" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "beside" },
                               { "type": "PunctuationNode", "value": "”" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "or" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "PunctuationNode", "value": "“" },
                               { "type": "WordNode", "value": "written" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "beside" },
                               { "type": "PunctuationNode", "value": "”" },
                               { "type": "PunctuationNode", "value": ")" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "is" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "a" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "self" },
                               { "type": "PunctuationNode", "value": "-" },
                               { "type": "WordNode", "value": "contained" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "unit" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "of" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "a" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "discourse" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "in" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "writing" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "dealing" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "with" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "a" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "particular" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "point" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "or" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "idea" },
                               { "type": "PunctuationNode", "value": "." }
                           ]
                       },
                       { "type": "WhiteSpaceNode", "value": " " },
                       {
                           "type": "SentenceNode",
                           "children": [
                               { "type": "WordNode", "value": "A" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "paragraph" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "has" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "5" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "types" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "PunctuationNode", "value": "(" },
                               { "type": "WordNode", "value": "Br" },
                               { "type": "PunctuationNode", "value": "." },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "Anton" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "Heitman" },
                               { "type": "PunctuationNode", "value": ")" },
                               { "type": "PunctuationNode", "value": "." }
                           ]
                       }
                   ]
               },
               { "type": "WhiteSpaceNode", "value": "\n\n" },
               {
                   "type": "ParagraphNode",
                   "children": [
                       {
                           "type": "SentenceNode",
                           "children": [
                               { "type": "WordNode", "value": "A" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "paragraph" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "consists" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "of" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "one" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "or" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "more" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "sentences" },
                               { "type": "PunctuationNode", "value": "." }
                           ]
                       },
                       { "type": "WhiteSpaceNode", "value": " " },
                       {
                           "type": "SentenceNode",
                           "children": [
                               { "type": "WordNode", "value": "Though" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "not" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "required" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "by" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "the" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "syntax" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "of" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "any" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "language" },
                               { "type": "PunctuationNode", "value": "," },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "paragraphs" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "are" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "usually" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "an" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "expected" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "part" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "of" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "formal" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "writing" },
                               { "type": "PunctuationNode", "value": "," },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "used" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "to" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "organize" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "longer" },
                               { "type": "WhiteSpaceNode", "value": " " },
                               { "type": "WordNode", "value": "prose" },
                               { "type": "PunctuationNode", "value": "." }
                           ]
                       }
                   ]
               }
           ]
       }));
    });
});

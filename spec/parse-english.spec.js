
var converter = require('..'),
    TextOM = converter.TextOM,
    assert = require('assert');

describe('ParseEnglish()', function () {
    it('should be of type `function`', function () {
        assert(typeof converter === 'function');
    });

    it('should return a newly initialized `RootNode` object, when invoked with string literal or string object', function () {
        assert(converter('') instanceof TextOM.RootNode);
        /*jshint -W053 */
        assert(converter(new String('')) instanceof TextOM.RootNode);
    });

    it('should return a newly initialized `RootNode` object, when invoked with a nully value', function () {
        assert(converter() instanceof TextOM.RootNode);
        assert(converter(null) instanceof TextOM.RootNode);
        assert(converter(undefined) instanceof TextOM.RootNode);
    });

    it('should return a newly initialized `RootNode` object, when invoked with a `Node` object', function () {
        assert(converter(new TextOM.RootNode()) instanceof TextOM.RootNode);
    });

    it('should throw, when something other than a string, null, undefined, or node was given', function () {
        assert.throws(function () { converter(true); }, /true/);
        assert.throws(function () { converter(1); }, /1/);
    });

    it('should return a RootNode containing no paragraphNode, when an empty source is given', function () {
        assert(converter().length === 0);
        assert(converter('').length === 0);
        assert(converter(null).length === 0);
        assert(converter(undefined).length === 0);
        assert(converter(new TextOM.RootNode()).length === 0);
    });
});

describe('ParseEnglish.TextOM.Node#toAST(delimeter)', function () {
    it('should be of type `function`', function () {
        assert(typeof (new TextOM.RootNode()).toAST === 'function');
    });

    it('should throw, when not opperating on a node', function () {
        var root = converter('A document.');
        assert.throws(function () { root.toAST.call(); }, /Illegal invocation/);
    });

    it('should convert a `Node` into a stringified AST', function () {
        var ast = JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "simple" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sentence" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]});

        assert(converter('A simple sentence.').toAST() === ast);
    });

    it('should convert a `Node` into a stringified AST using the given delimeter', function () {
        var ast = JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "simple" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sentence" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]}, null, '\t');

        assert(converter('A simple sentence.').toAST('\t') === ast);

        assert(converter('A simple sentence.').toAST('  ') === ast.replace(/\t/g, '  '));
    });
});

describe('ParseEnglish.fromAST(ast)', function () {
    it('should be of type `function`', function () {
        assert(typeof converter.fromAST === 'function');
    });

    it('should throw, when something other than a string or object is given', function () {
        assert.throws(function () { converter.fromAST(Math); }, /Math/);
        assert.throws(function () { converter.fromAST(1); }, /1/);
        assert.throws(function () { converter.fromAST(); }, /undefined/);
        assert.throws(function () { converter.fromAST(null); }, /null/);
        assert.throws(function () { converter.fromAST(undefined); }, /undefined/);
    });

    it('should throw, when the `JSON.Parse`d value does not contain a `type` attribute', function () {
        assert.throws(function () { converter.fromAST({}); }, /type/);
        assert.throws(function () { converter.fromAST({'a' : 'b'}); }, /type/);
        assert.throws(function () { converter.fromAST({'value' : 'test'}); }, /type/);
        assert.throws(function () { converter.fromAST({'children' : []}); }, /type/);
    });

    it('should throw, when the `JSON.Parse`d value does not contain neither a `children`, nor a `value` attribute', function () {
        assert.throws(function () { converter.fromAST({'type' : 'RootNode'}); }, /children|value/);
    });

    it('should convert a stringified AST into an object model', function () {
        var ast = JSON.stringify({"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "simple" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sentence" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]});

        assert(converter.fromAST(ast).toAST() === ast);

        /*jshint -W053 */
        assert(converter.fromAST(new String(ast)).toAST() === ast);
    });

    it('should convert an AST into an object model', function () {
        var ast = {"type":"RootNode","children":[{"type":"ParagraphNode","children":[{"type":"SentenceNode","children":[
            { "type": "WordNode", "value": "A" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "simple" },
            { "type": "WhiteSpaceNode", "value": " " },
            { "type": "WordNode", "value": "sentence" },
            { "type": "PunctuationNode", "value": "." }
        ]}]}]};

        assert(converter.fromAST(ast).toAST() === JSON.stringify(ast));
    });
});

describe('ParseEnglish.TextOM.Parent#prependContent(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.prependContent === 'function');
    });

    it('should throw, when given an empty value', function () {
        var root = converter('A document.');
        assert.throws(function () { root.prependContent(''); }, /''/);
        assert.throws(function () { root.prependContent(); }, /undefined/);
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');
        assert.throws(function () { root.prependContent.call(); }, /Type Error/);
        assert.throws(function () { root.prependContent.call(new TextOM.WordNode('test')); }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.prependContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first prepended node', function () {
        var root = converter('A document.');
        var range = root.prependContent('A first paragraph.\n\nA second paragraph.\n\n');
        assert(range.startContainer instanceof TextOM.ParagraphNode);
        assert(range.toString() === 'A first paragraph.\n\nA second paragraph.\n\n');
    });

    it('should return a `Range` with a `endContainer` set to the last prepended node', function () {
        var root = converter('A document.');
        var range = root.prependContent('A first paragraph.\n\nA second paragraph.\n\n');
        assert(range.endContainer instanceof TextOM.WhiteSpaceNode);
        assert(range.toString() === 'A first paragraph.\n\nA second paragraph.\n\n');
    });

    it('should prepend one or more `ParagraphNode`s when operating on a `RootNode`', function () {
        var root = converter('A document including a paragraph.');
        root.prependContent('Another paragraph. ');
        assert(root.head instanceof TextOM.ParagraphNode);
        assert(root.toString() === 'Another paragraph. A document including a paragraph.');
    });

    it('should prepend one or more `SentenceNode`s when operating on a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        paragraph.prependContent('A second sentence. A third sentence. ');
        assert(paragraph.head instanceof TextOM.SentenceNode);
        assert(paragraph.toString() === 'A second sentence. A third sentence. A document including a paragraph.');
    });

    it('should prepend one or more of `WordNode`, `PunctuationNode`, and `WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
        var sentence = converter('A sentence.').head.head;
        sentence.prependContent('Some words, whitespace, and punctuation ');
        assert(sentence.head instanceof TextOM.WordNode);
        assert(sentence.toString() === 'Some words, whitespace, and punctuation A sentence.');
    });

    it('should prepend one or more of `WhiteSpaceNode`s, when starting or ending the given value', function () {
        var root = converter('A document including a paragraph.');
        root.prependContent('\n\nAnother paragraph.\n\n');
        assert(root.head instanceof TextOM.WhiteSpaceNode);
        assert(root.toString() === '\n\nAnother paragraph.\n\nA document including a paragraph.');
    });

    it('should throw, when one or more `ParagraphNode`s are prepended into a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        assert.throws(function () {paragraph.prependContent('A second paragraph.\n\nA third paragraph.\n\n'); }, /multiple parents/);
    });

    it('should throw, when one or more `SentenceNode`s are prepended into a `SentenceNode`', function () {
        var sentence = converter('A document including a sentence.').head.head;
        assert.throws(function () {sentence.prependContent('A second sentence. A third sentence. '); }, /multiple parents/);
    });
});

describe('ParseEnglish.TextOM.Parent#appendContent(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.appendContent === 'function');
    });

    it('should throw, when given an empty value', function () {
        var root = converter('A document.');
        assert.throws(function () { root.appendContent(''); }, /''/);
        assert.throws(function () { root.appendContent(); }, /undefined/);
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');
        assert.throws(function () { root.appendContent.call(); }, /Type Error/);
        assert.throws(function () { root.appendContent.call(new TextOM.WordNode('test')); }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.appendContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first appended node', function () {
        var root = converter('A document.');
        var range = root.appendContent('\n\nA first paragraph.\n\nA second paragraph.');
        assert(range.startContainer instanceof TextOM.WhiteSpaceNode);
        assert(range.toString() === '\n\nA first paragraph.\n\nA second paragraph.');
    });

    it('should return a `Range` with a `endContainer` set to the last appended node', function () {
        var root = converter('A document.');
        var range = root.appendContent('\n\nA first paragraph.\n\nA second paragraph.');
        assert(range.endContainer instanceof TextOM.ParagraphNode);
        assert(range.toString() === '\n\nA first paragraph.\n\nA second paragraph.');
    });

    it('should append one or more `ParagraphNode`s when operating on a `RootNode`', function () {
        var root = converter('A document including a paragraph.');
        root.appendContent(' Another paragraph.');
        assert(root.tail instanceof TextOM.ParagraphNode);
        assert(root.toString() === 'A document including a paragraph. Another paragraph.');
    });

    it('should append one or more `SentenceNode`s when operating on a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        paragraph.appendContent(' A second sentence. A third sentence.');
        assert(paragraph.tail instanceof TextOM.SentenceNode);
        assert(paragraph.toString() === 'A document including a paragraph. A second sentence. A third sentence.');
    });

    it('should append one or more of `WordNode`, `PunctuationNode`, and `WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
        var sentence = converter('A sentence').head.head;
        sentence.appendContent(', some words, whitespace, and punctuation.');
        assert(sentence.tail instanceof TextOM.PunctuationNode);
        assert(sentence.toString() === 'A sentence, some words, whitespace, and punctuation.');
    });

    it('should append one or more of `WhiteSpaceNode`s, when starting or ending the given value', function () {
        var root = converter('A document including a paragraph.');
        root.appendContent('\n\nAnother paragraph.\n\n');
        assert(root.tail instanceof TextOM.WhiteSpaceNode);
        assert(root.tail.prev.prev instanceof TextOM.WhiteSpaceNode);
        assert(root.toString() === 'A document including a paragraph.\n\nAnother paragraph.\n\n');
    });

    it('should throw, when one or more `ParagraphNode`s are appended into a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        assert.throws(function () {paragraph.appendContent('A second paragraph.\n\nA third paragraph.\n\n'); }, /multiple parents/);
    });

    it('should throw, when one or more `SentenceNode`s are appended into a `SentenceNode`', function () {
        var sentence = converter('A document including a sentence.').head.head;
        assert.throws(function () {sentence.appendContent('A second sentence. A third sentence. '); }, /multiple parents/);
    });
});

describe('ParseEnglish.TextOM.Parent#replaceContent(value?)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.replaceContent === 'function');
    });

    it('should NOT throw, when given an empty value', function () {
        var root = converter('A document.');
        assert.doesNotThrow(function () { root.replaceContent(''); });
        assert.doesNotThrow(function () { root.replaceContent(); });
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');
        assert.throws(function () { root.replaceContent.call(); }, /Type Error/);
        assert.throws(function () { root.replaceContent.call(new TextOM.WordNode('test')); }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.replaceContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first inserted node', function () {
        var root = converter('A document.');
        var range = root.replaceContent('A first paragraph.\n\nA second paragraph.');
        assert(range.startContainer instanceof TextOM.ParagraphNode);
        assert(range.toString() === 'A first paragraph.\n\nA second paragraph.');
    });

    it('should return a `Range` with a `endContainer` set to the last inserted node', function () {
        var root = converter('A document.');
        var range = root.replaceContent('A first paragraph.\n\nA second paragraph.');
        assert(range.endContainer instanceof TextOM.ParagraphNode);
        assert(range.toString() === 'A first paragraph.\n\nA second paragraph.');
    });

    it('should replace one or more `ParagraphNode`s when operating on a `RootNode`', function () {
        var root = converter('A document including a paragraph.');
        root.replaceContent('Another paragraph.');
        assert(root.head instanceof TextOM.ParagraphNode);
        assert(root.toString() === 'Another paragraph.');
    });

    it('should insert one or more `SentenceNode`s when operating on a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        paragraph.replaceContent('A second sentence. A third sentence.');
        assert(paragraph.head instanceof TextOM.SentenceNode);
        assert(paragraph.tail instanceof TextOM.SentenceNode);
        assert(paragraph.toString() === 'A second sentence. A third sentence.');
    });

    it('should insert one or more of `WordNode`, `PunctuationNode`, and `WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
        var sentence = converter('A sentence').head.head;
        sentence.replaceContent('Some words, whitespace, and punctuation.');
        assert(sentence.head instanceof TextOM.WordNode);
        assert(sentence.tail instanceof TextOM.PunctuationNode);
        assert(sentence.toString() === 'Some words, whitespace, and punctuation.');
    });

    it('should insert one or more of `WhiteSpaceNode`s, when starting or ending the given value', function () {
        var root = converter('A document including a paragraph.');
        root.replaceContent('\n\nAnother paragraph.\n\n');
        assert(root.head instanceof TextOM.WhiteSpaceNode);
        assert(root.tail instanceof TextOM.WhiteSpaceNode);
        assert(root.toString() === '\n\nAnother paragraph.\n\n');
    });

    it('should throw, when one or more `ParagraphNode`s are inserted into a `ParagraphNode`', function () {
        var paragraph = converter('A document including a paragraph.').head;
        assert.throws(function () {paragraph.replaceContent('A second paragraph.\n\nA third paragraph.\n\n'); }, /multiple parents/);
    });

    it('should throw, when one or more `SentenceNode`s are inserted into a `SentenceNode`', function () {
        var sentence = converter('A document including a sentence.').head.head;
        assert.throws(function () {sentence.replaceContent('A second sentence. A third sentence. '); }, /multiple parents/);
    });
});

describe('ParseEnglish.TextOM.Parent#removeContent()', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.removeContent === 'function');
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');
        assert.throws(function () { root.removeContent.call(); }, /Type Error/);
        assert.throws(function () { root.removeContent.call(new TextOM.WordNode('test')); }, /Type Error/);
    });

    it('should remove all `(Paragraph|WhiteSpace)Node`s when when operating on a `RootNode`', function () {
        var root = converter('A document.\n\nContaining two paragraphs.');
        root.removeContent();
        assert(root.toString() === '');
        assert(root.length === 0);
    });

    it('should remove all `(Sentence|WhiteSpace)Node`s when operating on a `ParagraphNode`', function () {
        var paragraph = converter('A document. Containing two paragraphs.\n\nThe first paragraph contains two sentences.').head;
        paragraph.removeContent();
        assert(paragraph.length === 0);
        assert(paragraph.toString() === '');
        assert(paragraph.parent.toString() === '\n\nThe first paragraph contains two sentences.');
    });

    it('should insert one or more of `WordNode`, `PunctuationNode`, and `WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
        var sentence = converter('A document. Containing two paragraphs.\n\nThe first paragraph contains two sentences.').head.head;
        sentence.removeContent();
        assert(sentence.length === 0);
        assert(sentence.toString() === '');
        assert(sentence.parent.parent.toString() === ' Containing two paragraphs.\n\nThe first paragraph contains two sentences.');
    });
});

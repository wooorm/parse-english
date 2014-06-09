'use strict';

var parseEnglish, assert, converter, TextOM;

parseEnglish = require('..');
assert = require('assert');
converter = parseEnglish();
TextOM = converter.TextOM;

describe('ParseEnglish()', function () {
    it('should be of type `function`', function () {
        assert(typeof converter === 'function');
    });

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with string literal or string object', function () {
            assert(converter('') instanceof TextOM.RootNode);
            /*eslint-disable no-new-wrappers */
            assert(converter(new String('')) instanceof TextOM.RootNode);
            /*eslint-enable no-new-wrappers */
        }
    );

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with a nully value', function () {
            assert(converter() instanceof TextOM.RootNode);
            assert(converter(null) instanceof TextOM.RootNode);
            assert(converter(undefined) instanceof TextOM.RootNode);
        }
    );

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with a `Node` object', function () {
            assert(
                converter(new TextOM.RootNode()) instanceof TextOM.RootNode
            );
        }
    );

    it('should throw, when something other than a string, null, undefined, ' +
        'or node was given', function () {
            assert.throws(function () {
                converter(true);
            }, /true/);
            assert.throws(function () {
                converter(1);
            }, /1/);
        }
    );

    it('should return a RootNode containing no paragraphNode, when an ' +
        'empty source is given', function () {
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
        assert.throws(function () {
            root.toAST.call();
        }, /Illegal invocation/);
    });

    it('should convert a `Node` into a stringified AST', function () {
        var ast = JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'simple'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'sentence'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        assert(converter('A simple sentence.').toAST() === ast);
    });

    it('should convert a `Node` into a stringified AST using the given ' +
        'delimeter', function () {
            var ast = JSON.stringify({
                'type' : 'RootNode',
                'children' : [
                    {
                        'type' : 'ParagraphNode',
                        'children' : [
                            {
                                'type' : 'SentenceNode',
                                'children' : [
                                    {
                                        'type' : 'WordNode',
                                        'value' : 'A'
                                    },
                                    {
                                        'type' : 'WhiteSpaceNode',
                                        'value' : ' '
                                    },
                                    {
                                        'type' : 'WordNode',
                                        'value' : 'simple'
                                    },
                                    {
                                        'type' : 'WhiteSpaceNode',
                                        'value' : ' '
                                    },
                                    {
                                        'type' : 'WordNode',
                                        'value' : 'sentence'
                                    },
                                    {
                                        'type' : 'PunctuationNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, null, '\t');

            assert(converter('A simple sentence.').toAST('\t') === ast);

            assert(
                converter('A simple sentence.').toAST('  ') ===
                ast.replace(/\t/g, '  ')
            );
        }
    );
});

describe('ParseEnglish.fromAST(ast)', function () {
    it('should be of type `function`', function () {
        assert(typeof converter.fromAST === 'function');
    });

    it('should throw, when something other than a string or object is given',
        function () {
            assert.throws(function () {
                converter.fromAST(Math);
            }, /Math/);
            assert.throws(function () {
                converter.fromAST(1);
            }, /1/);
            assert.throws(function () {
                converter.fromAST();
            }, /undefined/);
            assert.throws(function () {
                converter.fromAST(null);
            }, /null/);
            assert.throws(function () {
                converter.fromAST(undefined);
            }, /undefined/);
        }
    );

    it('should throw, when the `JSON.Parse`d value does not contain a ' +
        '`type` attribute', function () {
            assert.throws(function () {
                converter.fromAST({});
            }, /type/);

            assert.throws(function () {
                converter.fromAST({
                    'a' : 'b'
                });
            }, /type/);

            assert.throws(function () {
                converter.fromAST({
                    'value' : 'test'
                });
            }, /type/);

            assert.throws(function () {
                converter.fromAST({
                    'children' : []
                });
            }, /type/);
        }
    );

    it('should throw, when the `JSON.Parse`d value does not contain ' +
        'neither a `children`, nor a `value` attribute', function () {
            assert.throws(function () {
                converter.fromAST({
                    'type' : 'RootNode'
                });
            }, /children|value/);
        }
    );

    it('should convert a stringified AST into an object model', function () {
        var ast = JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'simple'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'sentence'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        assert(converter.fromAST(ast).toAST() === ast);

        /*eslint-disable no-new-wrappers */
        assert(converter.fromAST(new String(ast)).toAST() === ast);
        /*eslint-enable no-new-wrappers */
    });

    it('should convert an AST into an object model', function () {
        var ast = {
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'simple'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'sentence'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        assert(converter.fromAST(ast).toAST() === JSON.stringify(ast));
    });
});

describe('ParseEnglish.TextOM.Parent#prependContent(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.prependContent === 'function');
    });

    it('should throw, when given an empty value', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.prependContent('');
        }, /''/);

        assert.throws(function () {
            root.prependContent();
        }, /undefined/);
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.prependContent.call();
        }, /Type Error/);

        assert.throws(function () {
            root.prependContent.call(new TextOM.WordNode('test'));
        }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.prependContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first ' +
        'prepended node', function () {
            var root = converter('A document.'),
                range = root.prependContent(
                    'A first paragraph.\n\nA second paragraph.\n\n'
                );

            assert(
                range.startContainer instanceof TextOM.ParagraphNode
            );
            assert(
                range.toString() ===
                'A first paragraph.\n\nA second paragraph.\n\n'
            );
        }
    );

    it('should return a `Range` with a `endContainer` set to the last ' +
        'prepended node', function () {
            var root = converter('A document.'),
                range = root.prependContent(
                    'A first paragraph.\n\nA second paragraph.\n\n'
                );

            assert(
                range.endContainer instanceof TextOM.WhiteSpaceNode
            );
            assert(
                range.toString() ===
                'A first paragraph.\n\nA second paragraph.\n\n'
            );
        }
    );

    it('should prepend one or more `ParagraphNode`s when operating on ' +
        'a `RootNode`', function () {
            var root = converter('A document including a paragraph.');
            root.prependContent('Another paragraph. ');

            assert(root.head instanceof TextOM.ParagraphNode);
            assert(
                root.toString() ===
                'Another paragraph. A document including a paragraph.'
            );
        }
    );

    it('should prepend one or more `SentenceNode`s when operating on ' +
        'a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            paragraph.prependContent('A second sentence. A third sentence. ');

            assert(paragraph.head instanceof TextOM.SentenceNode);
            assert(
                paragraph.toString() ===
                'A second sentence. A third sentence. A document ' +
                'including a paragraph.'
            );
        }
    );

    it('should prepend one or more of `WordNode`, `PunctuationNode`, ' +
        'and `WhiteSpaceNode`, when operating on a `SentenceNode`',
        function () {
            var sentence = converter('A sentence.').head.head;

            sentence.prependContent(
                'Some words, whitespace, and punctuation '
            );

            assert(sentence.head instanceof TextOM.WordNode);
            assert(
                sentence.toString() ===
                'Some words, whitespace, and punctuation A sentence.'
            );
        }
    );

    it('should prepend one or more of `WhiteSpaceNode`s, when starting or ' +
        'ending the given value', function () {
            var root = converter('A document including a paragraph.');
            root.prependContent('\n\nAnother paragraph.\n\n');

            assert(root.head instanceof TextOM.WhiteSpaceNode);
            assert(
                root.toString() ===
                '\n\nAnother paragraph.\n\nA document including a paragraph.'
            );
        }
    );

    it('should throw, when one or more `ParagraphNode`s are prepended into ' +
        'a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            assert.throws(function () {
                paragraph.prependContent(
                    'A second paragraph.\n\nA third paragraph.\n\n'
                );
            }, /multiple parents/);
        }
    );

    it('should throw, when one or more `SentenceNode`s are prepended into ' +
        'a `SentenceNode`', function () {
            var sentence = converter(
                'A document including a sentence.'
            ).head.head;

            assert.throws(function () {
                sentence.prependContent(
                    'A second sentence. A third sentence. '
                );
            }, /multiple parents/);
        }
    );
});

describe('ParseEnglish.TextOM.Parent#appendContent(value)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.appendContent === 'function');
    });

    it('should throw, when given an empty value', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.appendContent('');
        }, /''/);

        assert.throws(function () {
            root.appendContent();
        }, /undefined/);
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.appendContent.call();
        }, /Type Error/);

        assert.throws(function () {
            root.appendContent.call(new TextOM.WordNode('test'));
        }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.appendContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first ' +
        'appended node', function () {
            var root = converter('A document.'),
                range = root.appendContent(
                    '\n\nA first paragraph.\n\nA second paragraph.'
                );

            assert(range.startContainer instanceof TextOM.WhiteSpaceNode);
            assert(
                range.toString() ===
                '\n\nA first paragraph.\n\nA second paragraph.'
            );
        }
    );

    it('should return a `Range` with a `endContainer` set to the last ' +
        'appended node', function () {
            var root = converter('A document.'),
                range = root.appendContent(
                    '\n\nA first paragraph.\n\nA second paragraph.'
                );

            assert(range.endContainer instanceof TextOM.ParagraphNode);
            assert(
                range.toString() ===
                '\n\nA first paragraph.\n\nA second paragraph.'
            );
        }
    );

    it('should append one or more `ParagraphNode`s when operating on ' +
        'a `RootNode`', function () {
            var root = converter('A document including a paragraph.');
            root.appendContent(' Another paragraph.');

            assert(root.tail instanceof TextOM.ParagraphNode);
            assert(
                root.toString() ===
                'A document including a paragraph. Another paragraph.'
            );
        }
    );

    it('should append one or more `SentenceNode`s when operating on a ' +
        '`ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            paragraph.appendContent(' A second sentence. A third sentence.');

            assert(paragraph.tail instanceof TextOM.SentenceNode);
            assert(
                paragraph.toString() ===
                'A document including a paragraph. A second sentence. A ' +
                'third sentence.'
            );
        }
    );

    it('should append one or more of `WordNode`, `PunctuationNode`, and ' +
        '`WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
            var sentence = converter('A sentence').head.head;

            sentence.appendContent(
                ', some words, whitespace, and punctuation.'
            );

            assert(sentence.tail instanceof TextOM.PunctuationNode);
            assert(
                sentence.toString() ===
                'A sentence, some words, whitespace, and punctuation.'
            );
        }
    );

    it('should append one or more of `WhiteSpaceNode`s, when starting or ' +
        'ending the given value', function () {
            var root = converter('A document including a paragraph.');
            root.appendContent('\n\nAnother paragraph.\n\n');

            assert(root.tail instanceof TextOM.WhiteSpaceNode);
            assert(root.tail.prev.prev instanceof TextOM.WhiteSpaceNode);
            assert(
                root.toString() ===
                'A document including a paragraph.\n\nAnother paragraph.\n\n'
            );
        }
    );

    it('should throw, when one or more `ParagraphNode`s are appended ' +
        'into a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            assert.throws(function () {
                paragraph.appendContent(
                    'A second paragraph.\n\nA third paragraph.\n\n'
                );
            }, /multiple parents/);
        }
    );

    it('should throw, when one or more `SentenceNode`s are appended into ' +
        'a `SentenceNode`', function () {
            var sentence = converter(
                'A document including a sentence.'
            ).head.head;

            assert.throws(function () {
                sentence.appendContent(
                    'A second sentence. A third sentence. '
                );
            }, /multiple parents/);
        }
    );
});

describe('ParseEnglish.TextOM.Parent#replaceContent(value?)', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.replaceContent === 'function');
    });

    it('should NOT throw, when given an empty value', function () {
        var root = converter('A document.');
        assert.doesNotThrow(function () {
            root.replaceContent('');
        });
        assert.doesNotThrow(function () {
            root.replaceContent();
        });
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.replaceContent.call();
        }, /Type Error/);

        assert.throws(function () {
            root.replaceContent.call(new TextOM.WordNode('test'));
        }, /Type Error/);
    });

    it('should return a newly initialized `Range` object', function () {
        var root = converter('A document.');
        assert(root.replaceContent('A paragraph.') instanceof TextOM.Range);
    });

    it('should return a `Range` with a `startContainer` set to the first ' +
        'inserted node', function () {
            var root = converter('A document.'),
                range = root.replaceContent(
                    'A first paragraph.\n\nA second paragraph.'
                );

            assert(range.startContainer instanceof TextOM.ParagraphNode);
            assert(
                range.toString() ===
                'A first paragraph.\n\nA second paragraph.'
            );
        }
    );

    it('should return a `Range` with a `endContainer` set to the last ' +
        'inserted node', function () {
            var root = converter('A document.'),
                range = root.replaceContent(
                    'A first paragraph.\n\nA second paragraph.'
                );

            assert(range.endContainer instanceof TextOM.ParagraphNode);
            assert(
                range.toString() ===
                'A first paragraph.\n\nA second paragraph.'
            );
        }
    );

    it('should replace one or more `ParagraphNode`s when operating on ' +
        'a `RootNode`', function () {
            var root = converter('A document including a paragraph.');
            root.replaceContent('Another paragraph.');
            assert(root.head instanceof TextOM.ParagraphNode);
            assert(root.toString() === 'Another paragraph.');
        }
    );

    it('should insert one or more `SentenceNode`s when operating on ' +
        'a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            paragraph.replaceContent(
                'A second sentence. A third sentence.'
            );

            assert(paragraph.head instanceof TextOM.SentenceNode);
            assert(paragraph.tail instanceof TextOM.SentenceNode);
            assert(
                paragraph.toString() ===
                'A second sentence. A third sentence.'
            );
        }
    );

    it('should insert one or more of `WordNode`, `PunctuationNode`, and ' +
        '`WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
            var sentence = converter('A sentence').head.head;
            sentence.replaceContent(
                'Some words, whitespace, and punctuation.'
            );
            assert(sentence.head instanceof TextOM.WordNode);
            assert(sentence.tail instanceof TextOM.PunctuationNode);
            assert(
                sentence.toString() ===
                'Some words, whitespace, and punctuation.'
            );
        }
    );

    it('should insert one or more of `WhiteSpaceNode`s, when starting or ' +
        'ending the given value', function () {
            var root = converter('A document including a paragraph.');
            root.replaceContent('\n\nAnother paragraph.\n\n');
            assert(root.head instanceof TextOM.WhiteSpaceNode);
            assert(root.tail instanceof TextOM.WhiteSpaceNode);
            assert(root.toString() === '\n\nAnother paragraph.\n\n');
        }
    );

    it('should throw, when one or more `ParagraphNode`s are inserted into ' +
        'a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document including a paragraph.'
            ).head;

            assert.throws(function () {
                paragraph.replaceContent(
                    'A second paragraph.\n\nA third paragraph.\n\n'
                );
            }, /multiple parents/);
        }
    );

    it('should throw, when one or more `SentenceNode`s are inserted into ' +
        'a `SentenceNode`', function () {
            var sentence = converter(
                'A document including a sentence.'
            ).head.head;

            assert.throws(function () {
                sentence.replaceContent(
                    'A second sentence. A third sentence. '
                );
            }, /multiple parents/);
        }
    );
});

describe('ParseEnglish.TextOM.Parent#removeContent()', function () {
    it('should be of type `function`', function () {
        assert(typeof TextOM.Parent.prototype.removeContent === 'function');
    });

    it('should throw, when not opperating on a parent', function () {
        var root = converter('A document.');

        assert.throws(function () {
            root.removeContent.call();
        }, /Type Error/);

        assert.throws(function () {
            root.removeContent.call(new TextOM.WordNode('test'));
        }, /Type Error/);
    });

    it('should remove all `(Paragraph|WhiteSpace)Node`s when when ' +
        'operating on a `RootNode`', function () {
            var root = converter('A document.\n\nContaining two paragraphs.');
            root.removeContent();
            assert(root.toString() === '');
            assert(root.length === 0);
        }
    );

    it('should remove all `(Sentence|WhiteSpace)Node`s when operating on ' +
        'a `ParagraphNode`', function () {
            var paragraph = converter(
                'A document. Containing two paragraphs.\n\n' +
                'The first paragraph contains two sentences.'
            ).head;

            paragraph.removeContent();

            assert(paragraph.length === 0);
            assert(paragraph.toString() === '');
            assert(
                paragraph.parent.toString() ===
                '\n\nThe first paragraph contains two sentences.'
            );
        }
    );

    it('should insert one or more of `WordNode`, `PunctuationNode`, and ' +
        '`WhiteSpaceNode`, when operating on a `SentenceNode`', function () {
            var sentence = converter(
                'A document. Containing two paragraphs.\n\n' +
                'The first paragraph contains two sentences.'
            ).head.head;

            sentence.removeContent();
            assert(sentence.length === 0);
            assert(sentence.toString() === '');
            assert(
                sentence.parent.parent.toString() ===
                ' Containing two paragraphs.\n\n' +
                'The first paragraph contains two sentences.'
            );
        }
    );
});

describe('Two paragraphs', function () {
    /*
     * Modified first paragraph, split into two, of:
     *    http://en.wikipedia.org/wiki/Paragraph
    */
    var source = 'A paragraph (from the Greek paragraphos, “to write ' +
        'beside” or “written beside”) is a self-contained unit of a ' +
        'discourse in writing dealing with a particular point or idea. A ' +
        'paragraph has 5 types (Br. Anton Heitman).\n\nA paragraph ' +
        'consists of one or more sentences. Though not required by the ' +
        'syntax of any language, paragraphs are usually an expected part ' +
        'of formal writing, used to organize longer prose.';

    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '('
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'from'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'the'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Greek'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraphos'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '“'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'to'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'write'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'beside'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '”'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '“'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'written'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'beside'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '”'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ')'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'is'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'self'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '-'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'contained'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'unit'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'discourse'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'in'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'writing'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'dealing'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'with'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'particular'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'point'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'idea'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'has'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : '5'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'types'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '('
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Br'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Anton'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Heitman'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ')'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : '\n\n'
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'consists'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'one'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'more'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'sentences'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Though'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'not'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'required'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'by'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'the'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'syntax'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'any'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'language'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraphs'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'are'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'usually'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'an'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'expected'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'part'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'formal'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'writing'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'used'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'to'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'organize'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'longer'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'prose'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Summarised from the first paragraph of: http://en.wikipedia.org/wiki/Ms.
*/
describe('Sentence: Abbreviations followed by a full-stop', function () {
    it('should equal the test AST', function () {
        var source = 'Like Miss and Mrs. the term Ms. has its origins ' +
            'in English title once used for all women. Various plural ' +
            'forms used are Mss., Mses. and Mmes.';

        assert(converter(source).head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Like'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Miss'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mrs'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'term'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Ms'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'has'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'its'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'origins'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'English'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'title'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'once'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'for'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'all'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'women'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Various'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'plural'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'forms'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'are'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mss'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mses'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mmes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Part of the second sentence of:
 * http://en.wikipedia.org/wiki/Natural_language#
 *   Constructed_languages_and_international_auxiliary_languages
*/
describe('Sentence: Abbreviations with dot characters', function () {
    it('should equal the test AST', function () {
        var source = 'Esperanto was selectively designed by L.L. Zamenhof ' +
            'from natural languages.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Esperanto'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'selectively'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'designed'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Zamenhof'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'from'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'natural'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'languages'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/Park_Ave.
*/
describe('Sentence: common abbreviations suffixed by a dot', function () {
    it('should equal the test AST', function () {
        var source = 'Park Ave. was an indie pop band which started in ' +
            'January 1996 in Nebr. (Omaha).';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Park'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ave'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'an'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'indie'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'pop'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'band'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'which'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'started'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'January'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1996'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Nebr'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '('
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Omaha'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Last sentence of the first paragraph of: http://en.wikipedia.org/wiki/.com
*/
describe('Sentence: common abbreviations preceded by a dot', function () {
    it('should equal the test AST', function () {
        var source = 'However, eventually the distinction was lost ' +
            'when .com, .org and .net were opened for unrestricted ' +
            'registration.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'However'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'eventually'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'distinction'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'lost'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'when'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'com'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'org'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'net'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'were'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'opened'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'for'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'unrestricted'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'registration'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Example found on the web.
*/
describe('Sentence: A terminal marker before a closing quote or parenthesis',
    function () {
        it('should equal the test AST', function () {
            var source = '“However,” says my Grade 8 teacher, “the ' +
                'period goes inside quotes.” This is another sentence';

            assert(converter(source).head.toAST() === JSON.stringify({
                'type' : 'ParagraphNode',
                'children' : [
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'However'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'says'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'my'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'Grade'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : '8'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'teacher'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'the'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'period'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'goes'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'inside'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'quotes'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'This'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'is'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'another'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'sentence'
                            }
                        ]
                    }
                ]
            }));
        });
    }
);

/*
 * Part of the wikipedia license note.
*/
describe('Sentence: Abbreviations followed by a dot, optional white ' +
    'space, and a comma', function () {
        it('should equal the test AST', function () {
            var source = 'Wikipedia® is a registered trademark of the ' +
                'Wikimedia Foundation, Inc., a non-profit organization.';

            assert(converter(source).head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '®'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'registered'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikimedia'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Foundation'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Inc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'non'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'profit'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'organization'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });
    }
);

describe('Sentence: Starting with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var source = '. . . to be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'to'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Sentence: Starting with ellipsis without spaces', function () {
    it('should equal the test AST', function () {
        var source = '...To be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '...'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'To'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Sentence: Without alphabetic content', function () {
    it('should equal the test AST', function () {
        var source = '\uD83D\uDC38.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '\uD83D\uDC38'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('White space characters', function () {
    var sentenceStart = 'A',
        sentenceEnd = 'house.',
        whiteSpaceCharacters = [
            '\u0009', // CHARACTER TABULATION
            '\u000A', // LINE FEED (LF)
            '\u000B', // LINE TABULATION
            '\u000C', // FORM FEED (FF)
            '\u000D', // CARRIAGE RETURN (CR)
            '\u0020', // SPACE
            '\u0085', // NEXT LINE (NEL)
            '\u00A0', // NO-BREAK SPACE
            '\u1680', // OGHAM SPACE MARK
            '\u180E', // MONGOLIAN VOWEL SEPARATOR
            '\u2000', // EN QUAD
            '\u2001', // EM QUAD
            '\u2002', // EN SPACE
            '\u2003', // EM SPACE
            '\u2004', // THREE-PER-EM SPACE
            '\u2005', // FOUR-PER-EM SPACE
            '\u2006', // SIX-PER-EM SPACE
            '\u2007', // FIGURE SPACE
            '\u2008', // PUNCTUATION SPACE
            '\u2009', // THIN SPACE
            '\u200A', // HAIR SPACE
            '\u2028', // LINE SEPARATOR
            '\u2029', // PARAGRAPH SEPARATOR
            '\u202F', // NARROW NO-BREAK SPACE
            '\u205F', // MEDIUM MATHEMATICAL SPACE
            '\u3000'  // IDEOGRAPHIC SPACE
        ];

    whiteSpaceCharacters.forEach(function (character) {
        var source = sentenceStart + character + sentenceEnd;

        it('should equal the test AST when using `' + character + '`',
            function () {
                assert(
                    converter(source).head.head.toAST() === JSON.stringify({
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'A'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : character
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'house'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            }
                        ]
                    })
                );
            }
        );
    });
});

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters',
    function () {
        var source = 'The unicode character \uD83D\uDCA9 is pile of poo.';
        it('should equal the test AST', function () {
            assert(converter(source).head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unicode'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDCA9'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pile'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'poo'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });
    }
);

/*
 * Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING KEYCAP,
 * together forming a :zero: emoji
 */
describe('Double combining marks', function () {
    var source = 'He scored 0\uFE0F\u20E3 points.';
    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
        'type' : 'SentenceNode',
        'children' : [
            {
                    'type' : 'WordNode',
                    'value' : 'He'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'scored'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '0\uFE0F\u20E3'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'points'
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
        ]
        }));
    });
});

var diacritics = [
    '\u0300', // COMBINING GRAVE ACCENT (U+0300)
    '\u0301', // COMBINING ACUTE ACCENT (U+0301)
    '\u0302', // COMBINING CIRCUMFLEX ACCENT (U+0302)
    '\u0303', // COMBINING TILDE (U+0303)
    '\u0304', // COMBINING MACRON (U+0304)
    '\u0305', // COMBINING OVERLINE (U+0305)
    '\u0306', // COMBINING BREVE (U+0306)
    '\u0307', // COMBINING DOT ABOVE (U+0307)
    '\u0308', // COMBINING DIAERESIS (U+0308)
    '\u0309', // COMBINING HOOK ABOVE (U+0309)
    '\u030A', // COMBINING RING ABOVE (U+030A)
    '\u030B', // COMBINING DOUBLE ACUTE ACCENT (U+030B)
    '\u030C', // COMBINING CARON (U+030C)
    '\u030D', // COMBINING VERTICAL LINE ABOVE (U+030D)
    '\u030E', // COMBINING DOUBLE VERTICAL LINE ABOVE (U+030E)
    '\u030F', // COMBINING DOUBLE GRAVE ACCENT (U+030F)
    '\u0310', // COMBINING CANDRABINDU (U+0310)
    '\u0311', // COMBINING INVERTED BREVE (U+0311)
    '\u0312', // COMBINING TURNED COMMA ABOVE (U+0312)
    '\u0313', // COMBINING COMMA ABOVE (U+0313)
    '\u0314', // COMBINING REVERSED COMMA ABOVE (U+0314)
    '\u0315', // COMBINING COMMA ABOVE RIGHT (U+0315)
    '\u0316', // COMBINING GRAVE ACCENT BELOW (U+0316)
    '\u0317', // COMBINING ACUTE ACCENT BELOW (U+0317)
    '\u0318', // COMBINING LEFT TACK BELOW (U+0318)
    '\u0319', // COMBINING RIGHT TACK BELOW (U+0319)
    '\u031A', // COMBINING LEFT ANGLE ABOVE (U+031A)
    '\u031B', // COMBINING HORN (U+031B)
    '\u031C', // COMBINING LEFT HALF RING BELOW (U+031C)
    '\u031D', // COMBINING UP TACK BELOW (U+031D)
    '\u031E', // COMBINING DOWN TACK BELOW (U+031E)
    '\u031F', // COMBINING PLUS SIGN BELOW (U+031F)
    '\u0320', // COMBINING MINUS SIGN BELOW (U+0320)
    '\u0321', // COMBINING PALATALIZED HOOK BELOW (U+0321)
    '\u0322', // COMBINING RETROFLEX HOOK BELOW (U+0322)
    '\u0323', // COMBINING DOT BELOW (U+0323)
    '\u0324', // COMBINING DIAERESIS BELOW (U+0324)
    '\u0325', // COMBINING RING BELOW (U+0325)
    '\u0326', // COMBINING COMMA BELOW (U+0326)
    '\u0327', // COMBINING CEDILLA (U+0327)
    '\u0328', // COMBINING OGONEK (U+0328)
    '\u0329', // COMBINING VERTICAL LINE BELOW (U+0329)
    '\u032A', // COMBINING BRIDGE BELOW (U+032A)
    '\u032B', // COMBINING INVERTED DOUBLE ARCH BELOW (U+032B)
    '\u032C', // COMBINING CARON BELOW (U+032C)
    '\u032D', // COMBINING CIRCUMFLEX ACCENT BELOW (U+032D)
    '\u032E', // COMBINING BREVE BELOW (U+032E)
    '\u032F', // COMBINING INVERTED BREVE BELOW (U+032F)
    '\u0330', // COMBINING TILDE BELOW (U+0330)
    '\u0331', // COMBINING MACRON BELOW (U+0331)
    '\u0332', // COMBINING LOW LINE (U+0332)
    '\u0333', // COMBINING DOUBLE LOW LINE (U+0333)
    '\u0334', // COMBINING TILDE OVERLAY (U+0334)
    '\u0335', // COMBINING SHORT STROKE OVERLAY (U+0335)
    '\u0336', // COMBINING LONG STROKE OVERLAY (U+0336)
    '\u0337', // COMBINING SHORT SOLIDUS OVERLAY (U+0337)
    '\u0338', // COMBINING LONG SOLIDUS OVERLAY (U+0338)
    '\u0339', // COMBINING RIGHT HALF RING BELOW (U+0339)
    '\u033A', // COMBINING INVERTED BRIDGE BELOW (U+033A)
    '\u033B', // COMBINING SQUARE BELOW (U+033B)
    '\u033C', // COMBINING SEAGULL BELOW (U+033C)
    '\u033D', // COMBINING X ABOVE (U+033D)
    '\u033E', // COMBINING VERTICAL TILDE (U+033E)
    '\u033F', // COMBINING DOUBLE OVERLINE (U+033F)
    '\u0340', // COMBINING GRAVE TONE MARK (U+0340)
    '\u0341', // COMBINING ACUTE TONE MARK (U+0341)
    '\u0342', // COMBINING GREEK PERISPOMENI (U+0342)
    '\u0343', // COMBINING GREEK KORONIS (U+0343)
    '\u0344', // COMBINING GREEK DIALYTIKA TONOS (U+0344)
    '\u0345', // COMBINING GREEK YPOGEGRAMMENI (U+0345)
    '\u0346', // COMBINING BRIDGE ABOVE (U+0346)
    '\u0347', // COMBINING EQUALS SIGN BELOW (U+0347)
    '\u0348', // COMBINING DOUBLE VERTICAL LINE BELOW (U+0348)
    '\u0349', // COMBINING LEFT ANGLE BELOW (U+0349)
    '\u034A', // COMBINING NOT TILDE ABOVE (U+034A)
    '\u034B', // COMBINING HOMOTHETIC ABOVE (U+034B)
    '\u034C', // COMBINING ALMOST EQUAL TO ABOVE (U+034C)
    '\u034D', // COMBINING LEFT RIGHT ARROW BELOW (U+034D)
    '\u034E', // COMBINING UPWARDS ARROW BELOW (U+034E)
    '\u034F', // COMBINING GRAPHEME JOINER (U+034F)
    '\u0350', // COMBINING RIGHT ARROWHEAD ABOVE (U+0350)
    '\u0351', // COMBINING LEFT HALF RING ABOVE (U+0351)
    '\u0352', // COMBINING FERMATA (U+0352)
    '\u0353', // COMBINING X BELOW (U+0353)
    '\u0354', // COMBINING LEFT ARROWHEAD BELOW (U+0354)
    '\u0355', // COMBINING RIGHT ARROWHEAD BELOW (U+0355)
    '\u0356', // COMBINING RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356)
    '\u0357', // COMBINING RIGHT HALF RING ABOVE (U+0357)
    '\u0358', // COMBINING DOT ABOVE RIGHT (U+0358)
    '\u0359', // COMBINING ASTERISK BELOW (U+0359)
    '\u035A', // COMBINING DOUBLE RING BELOW (U+035A)
    '\u035B', // COMBINING ZIGZAG ABOVE (U+035B)
    '\u035C', // COMBINING DOUBLE BREVE BELOW (U+035C)
    '\u035D', // COMBINING DOUBLE BREVE (U+035D)
    '\u035E', // COMBINING DOUBLE MACRON (U+035E)
    '\u035F', // COMBINING DOUBLE MACRON BELOW (U+035F)
    '\u0360', // COMBINING DOUBLE TILDE (U+0360)
    '\u0361', // COMBINING DOUBLE INVERTED BREVE (U+0361)
    '\u0362', // COMBINING DOUBLE RIGHTWARDS ARROW BELOW (U+0362)
    '\u0363', // COMBINING LATIN SMALL LETTER A (U+0363)
    '\u0364', // COMBINING LATIN SMALL LETTER E (U+0364)
    '\u0365', // COMBINING LATIN SMALL LETTER I (U+0365)
    '\u0366', // COMBINING LATIN SMALL LETTER O (U+0366)
    '\u0367', // COMBINING LATIN SMALL LETTER U (U+0367)
    '\u0368', // COMBINING LATIN SMALL LETTER C (U+0368)
    '\u0369', // COMBINING LATIN SMALL LETTER D (U+0369)
    '\u036A', // COMBINING LATIN SMALL LETTER H (U+036A)
    '\u036B', // COMBINING LATIN SMALL LETTER M (U+036B)
    '\u036C', // COMBINING LATIN SMALL LETTER R (U+036C)
    '\u036D', // COMBINING LATIN SMALL LETTER T (U+036D)
    '\u036E', // COMBINING LATIN SMALL LETTER V (U+036E)
    '\u036F'  // COMBINING LATIN SMALL LETTER X (U+036F)
];

describe('A simple sentence testing for combining diacritical marks',
    function () {
        diacritics.forEach(function (diacritic) {
            var source = 'This is a' + diacritic + ' house.';
            it('should equal the test AST when using \u25CC' + diacritic,
                function () {
                    assert(
                        converter(source).head.head.toAST() ===
                        JSON.stringify({
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'This'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'is'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a' + diacritic
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'house'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        })
                    );
                }
            );
        });
    }
);

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Contraction_(grammar)
*/
describe('A simple sentence testing for common contractions', function () {
    var source = 'Common examples of contractions include: Ain\'t, ' +
        'let\'s, I\'m, we\'re, what\'s, where\'d, and I\'ll.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Common'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'examples'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'of'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'contractions'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'include'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ':'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ai'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 't'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'let'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'we'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 're'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'what'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'where'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'd'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'll'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
*/
describe('Simple sentences testing for tie characters', function () {
    it('should equal the test AST, when using the combinding double ' +
        'breve \u25CC\u035D\u25CC', function () {
            var source = 'e.g. the combining double breve o\u035Do.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o\u035Do'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double ' +
        'inverted breve \u25CC\u0361\u25CC', function () {
            var source =
                'e.g. the combining double inverted breve /k\u0361p/';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u0361p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double breve ' +
        'below \u25CC\u035C\u25CC', function () {
            var source = 'e.g. the combining double breve below /k\u035Cp/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'below'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u035Cp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the undertie \u203F',
        function () {
            var source = 'e.g. the undertie /vuz\u203Fave/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'vuz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u203F'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ave'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the character tie \u2040',
        function () {
            var source = 'e.g. the character tie s\u2040t';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2040'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 't'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the inverted undertie \u2054',
        function () {
            var source = 'e.g. the inverted undertie o\u2054o';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2054'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    }
                ]
            }));
        }
    );
});

describe('Intelectual property marks', function () {
    it('should equal the test AST, when using the copyright symbol \u00A9',
        function () {
            var source = '\u00A9 2011 John Smith';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00A9'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2011'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'John'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Smith'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the sound recording ' +
        'copyright symbol \u2117', function () {
            var source =
                'Designated by \u2117, the sound recording copyright symbol.';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Designated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'by'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2117'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sound'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'recording'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'copyright'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'symbol'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the registered trademark ' +
        'symbol \u00AE', function () {
            var source = 'Wikipedia\u00AE is a registered trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00AE'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'registered'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the service mark symbol \u2120',
        function () {
            var source = 'ABC Law\u2120 legal services.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'ABC'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Law'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2120'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'legal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'services'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the trademark symbol \u2122',
        function () {
            var source = 'Mytrademark\u2122 is a trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Mytrademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2122'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/IPhone_5S
*/
describe('A simple sentence testing for digit-letters', function () {
    var source = 'iPhone 5S is a high-end smartphone developed by Apple.';
    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'iPhone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '5'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'S'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'is'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'high'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '-'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'end'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'smartphone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'developed'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Apple'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified sentence from: http://mathiasbynens.be/notes/javascript-unicode
 * Note the combining characters.
*/
describe('A simple sentence testing for grapheme clusters', function () {
    var source = 'Grapheme clusters such as \u0BA8\u0BBF and Hangul made ' +
        'of conjoining Jamo such as \u1101\u1161\u11A8, or other similar ' +
        'symbols.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Grapheme'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'clusters'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u0BA8\u0BBF'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Hangul'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'made'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'of'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'conjoining'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Jamo'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u1101\u1161\u11A8'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'or'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'other'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'similar'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbols'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified example from: https://github.com/walling/unorm
 * Note both the hexadecimal and Unicode escape sequences.
*/
describe('Unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
        '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length ' +
        '10\u207B\xB9\u2070 m.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'The'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // NOT a combining ring! Just the unicode
                // A-ring character.
                {
                    'type' : 'WordNode',
                    'value' : '\xC5'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbol'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'invented'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'J'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // A combining ring and a combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'A\u030Angstro\u0308m'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '('
                },
                {
                    'type' : 'WordNode',
                    'value' : '1814'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // Two combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'Lo\u0308gdo\u0308'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // En-dash
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u2013'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1874'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'denotes'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'length'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '10'
                },
                // Superscript minus.
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u207B'
                },
                // Superscript one and superscript two
                {
                    'type' : 'WordNode',
                    'value' : '\xB9\u2070'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Abbreviations: Decimals (affixed by a full-stop)', function () {
    it('should *not* treat the dot-character succeeding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var root;

            '0123456789'.split('').forEach(function (digit) {
                root = converter('See § ' + digit + '. ¶ 2.');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'See'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '§'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : digit
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '¶'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Abbreviations: Geographic', function () {
    it('should *not* treat the dot-character succeeding `Ave` ' +
        '(abbreviation for `Avenue`), as a terminal marker', function () {
            var root = converter(
                'Survey Reaffirms 5th Ave. at Top of the Retail Rent Heap'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Survey'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Reaffirms'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '5th'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ave'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Top'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Retail'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Heap'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Blvd` ' +
        '(abbreviation for `Boulevard`), as a terminal marker', function () {
            var root = converter('A café located on the blvd. of Kusadasi');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'café'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'located'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'blvd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Kusadasi'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Mt` ' +
        '(abbreviation for `Mountain`), as a terminal marker', function () {
            var root = converter(
                'Like all mountains, Mt. Gay is a large large mass of rock.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Like'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'all'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mountains'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Mt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Gay'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mass'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rock'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rd` ' +
        '(abbreviation for `Road`), as a terminal marker', function () {
            var root = converter('In law, Rd. is an abbreviation of road.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'law'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviation'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'road'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Bldg` ' +
        '(abbreviation for `Building`), as a terminal marker', function () {
            var root = converter(
                'The many fine Victorian buildings in Wolverhampton.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'many'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Victorian'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'buildings'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wolverhampton'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }

                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Nat` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = converter('The Teide Nat. Park in Tenerife, Spain.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Teide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Nat'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Park'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Tenerife'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Spain'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Natl` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = converter('The Teide Natl. Park in Tenerife, Spain.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Teide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Natl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Park'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Tenerife'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Spain'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rt` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = converter(
                'U.S. Rt. 66, a historic highway in America.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'U'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'S'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '66'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'historic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highway'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'America'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rte` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = converter(
                'U.S. Rte. 66, a historic highway in America.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'U'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'S'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rte'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '66'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'historic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highway'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'America'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Co` ' +
        '(abbreviation for `County`), as a terminal marker', function () {
            var root = converter(
                'Leicestershire Co. is a landlocked county in the ' +
                'English Midlands.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Leicestershire'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Co'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'landlocked'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'county'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'English'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Midlands'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pk` ' +
        '(abbreviation for `Park`), as a terminal marker', function () {
            var root = converter('St. James\'s Pk. covers 34 ha.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'St'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'James'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pk'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'covers'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '34'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ha'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Sq` ' +
        '(abbreviation for `Square`), as a terminal marker', function () {
            var root = converter(
                'See the attachment for potential Times Sq. sites.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'See'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'attachment'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'potential'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Times'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Sq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sites'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Dr` ' +
        '(abbreviation for `Drive`), as a terminal marker', function () {
            var root = converter(
                'Continue on Pershing Dr. before turning right.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Continue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pershing'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Dr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'turning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'right'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pt` ' +
        '(abbreviation for `Point` or `Port`), as a terminal marker',
        function () {
            var root = converter(
                'The Pt. of L.A. is also called Los Angeles Harbor ' +
                'Department.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'L'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'called'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Los'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Angeles'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Harbor'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Department'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `St` ' +
        '(abbreviation for `Street` or `State`), as a terminal marker',
        function () {
            var root = converter('I used to live on 2nd St. in Clinton.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'live'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2nd'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'St'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Clinton'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ft` ' +
        '(abbreviation for `Fort`), as a terminal marker', function () {
            var root = converter(
                'As Ft. Knox is no longer “The Home of Armor”, ' +
                'the Patton Museum has also been relocated.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Knox'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'no'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'longer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Home'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Armor'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Patton'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Museum'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'has'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'been'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'relocated'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pen` ' +
        '(abbreviation for `Peninsula`), as a terminal marker', function () {
            var root = converter(
                'Huon Pen. is a large rugged peninsula on the island of ' +
                'New Guinea.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Huon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pen'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rugged'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'peninsula'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'island'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'New'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Guinea'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Terr` ' +
        '(abbreviation for `Territory`), as a terminal marker', function () {
            var root = converter(
                'Yukon, formerly Yukon Territory (Yuk. Terr.), is an ' +
                'area of rugged mountains and high plateaus.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Yukon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'formerly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Yukon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Territory'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Yuk'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Terr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'area'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rugged'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mountains'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'high'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'plateaus'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Hwy` ' +
        '(abbreviation for `Highway`), as a terminal marker', function () {
            var root = converter(
                'The Atlantic Hwy. was the direct predecessor to US 1.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Atlantic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Hwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'direct'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'predecessor'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'US'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Fwy` ' +
        '(abbreviation for `Freeway`), as a terminal marker', function () {
            var root = converter(
                'The San Diego Fwy. is most commonly called “The 405”.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'San'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Diego'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Fwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'most'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'commonly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'called'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '405'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pkwy` ' +
        '(abbreviation for `Parkway`), as a terminal marker', function () {
            var root = converter(
                'Blue Ridge Pkwy. is a National Parkway, noted for ' +
                'its scenic beauty.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Blue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ridge'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pkwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'National'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Parkway'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'noted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'its'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'scenic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'beauty'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding (American) ' +
        'states (e.g., `Ala`, `Ariz`, &c.), as a terminal marker',
        function () {
            var root;

            (
                'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|' +
                'Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|' +
                'Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|' +
                'Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo'
            ).split('|').forEach(function (state) {
                root = converter(
                    'I live in Clinton, ' + state + '. on 2nd street.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'live'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Clinton'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : state
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2nd'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'street'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );

    it('should *not* treat the dot-character succeeding (Canadian) ' +
        'states (e.g., `Alta`, `Man`, &c.), as a terminal marker',
        function () {
            var states = 'Alta|Man|Ont|Qué|Que|Sask|Yuk',
                root;

            states.split('|').forEach(function (state) {
                root = converter(
                    'I\'m from Mount Pleasant, ' + state + '. in Canada.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'm'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'from'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mount'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Pleasant'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : state
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Canada'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );

    it('should *not* treat the dot-character succeeding (English) ' +
        'counties (e.g., `Beds`, `Berks`, &c.), as a terminal marker',
        function () {
            var root;

            (
                'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|' +
                'Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|' +
                'Lincs|Mx|Middx|Mddx|Norf|Northants|Northumb|Northd|Notts|' +
                'Oxon|Rut|Shrops|Salop|Som|Staffs|Staf|Suff|Sy|Sx|Ssx|' +
                'Warks|War|Warw|Westm|Wilts|Worcs|Yorks'
            ).split('|').forEach(function (county) {
                root = converter(
                    'I\'m from Newton, ' + county + '. in England.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'm'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'from'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Newton'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : county
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'England'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Abbreviations: Title abbreviations', function () {
    it('should *not* treat the dot-character succeeding titles (e.g., ' +
        '`Mr`, `Mrs`, &c.), as a terminal marker', function () {
            var root;

            (
                'Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|Dr|' +
                'Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|' +
                'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|' +
                'Po|Wo|Ph'
            ).split('|').forEach(function (title) {
                root = converter(
                    'You should talk to ' + title +
                    '. Smith about these questions.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'You'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'should'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'talk'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'to'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : title
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Smith'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'about'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'these'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'questions'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        });
});

describe('Abbreviations: Alphabetical', function () {
    it('should *not* treat the dot-character preceded by a latin letter ' +
        'and whitespace, as a terminal marker (e.g., in ' +
        '`Thomas A. Swift`, or in `e.` when abbreviating east)',
        function () {
            var alphabet = 'abcdefghijklmnopqrstuvwxyz',
                root;

            alphabet += alphabet.toUpperCase();

            alphabet.split('').forEach(function (character) {
                root = converter('Thomas ' + character + '. Swift');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Thomas'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : character
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Swift'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Abbreviations: Business', function () {
    it('should *not* treat the dot-character succeeding `Inc` ' +
        '(abbreviation for `Incorporation`), as a terminal marker',
        function () {
            var root = converter(
                'Today, ABC Company, Inc. announced an increase of 100 ' +
                'percent in the last two years.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Today'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ABC'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Company'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Inc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'announced'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'increase'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '100'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'percent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'last'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'two'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'years'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ltd` ' +
        '(abbreviation for `Limited`), as a terminal marker', function () {
            var root = converter(
                'XYZ Associates Ltd. is a member of the confederation.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'XYZ'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Associates'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ltd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'member'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'confederation'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Latin', function () {
    it('should *not* treat the dot-character succeeding `ca` (abbreviation ' +
        'for `circa`), as a terminal marker', function () {
            var root = converter(
                'The antique clock is from ca. 1900.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'antique'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'clock'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'from'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ca'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1900'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cap` ' +
        '(abbreviation for `chapter`), as a terminal marker', function () {
            var root = converter(
                'Electronic Transactions Ordinance (Cap. 553)'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Electronic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Transactions'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ordinance'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Cap'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '553'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cf` (abbreviation ' +
        'for `bring together`), as a terminal marker', function () {
            var root = converter(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992)'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'were'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'similar'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'those'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'obtained'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'using'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'different'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'techniques'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cf'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wilson'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1999'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ansmann'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1992'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cp` (abbreviation ' +
        'for `compare`), as a terminal marker', function () {
            var root = converter(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'were'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'similar'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'those'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'obtained'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'using'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'different'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'techniques'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cf'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wilson'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1999'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ansmann'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1992'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cwt` ' +
        '(abbreviation for `centum weight`), as a terminal marker',
        function () {
            var root = converter(
                'Hundredweight is abbreviated as cwt. because \'C\' is ' +
                'the Roman symbol for 100.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hundredweight'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cwt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'because'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'C'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Roman'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'symbol'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '100'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ead` ' +
        '(abbreviation for `eadem`), as a terminal marker', function () {
            var root = converter(
                'When quoting a female author, use the feminine form ' +
                'of idem, ead. (eadem).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'When'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'quoting'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'female'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'author'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'use'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feminine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'form'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'idem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ead'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eadem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `al` ' +
        '(abbreviation for `(et) alii`), as a terminal marker', function () {
            var root = converter(
                'These results agree with the ones published by ' +
                'Pelon et al. (2002).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'agree'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ones'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'published'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'by'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pelon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'al'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2002'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `etc` ' +
        '(abbreviation for `et cetera`), as a terminal marker', function () {
            var root = converter(
                'Et cetera (abbreviated as etc. or &c.) is a Latin ' +
                'expression that means “and other things”, or “and so ' +
                'forth.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cetera'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'etc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '&'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'c'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'expression'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'means'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'other'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'things'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'so'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'forth'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` (abbreviation ' +
        'for `floruit`), as a terminal marker', function () {
            var root = converter(
                'The great author Joseph Someone (fl. 2050-75) was ' +
                'renowned for his erudition.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'great'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'author'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Joseph'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Someone'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2050'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '75'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'renowned'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'his'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'erudition'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ff` ' +
        '(abbreviation for `foliis`), as a terminal marker', function () {
            var root = converter(
                'As such, Hornblower 258f. would refer to pages 258–259 ' +
                'while 258ff. would refer to an undetermined number of ' +
                'pages following page 258.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'such'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Hornblower'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'f'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '–'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '259'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'while'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ff'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undetermined'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'number'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'following'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'page'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ibid` ' +
        '(abbreviation for `ibidem`), as a terminal marker', function () {
            var root = converter(
                'Ibid. (Latin, short for ibidem, meaning “in the same ' +
                'place”) is the term used to provide an endnote or ' +
                'footnote citation or reference for a source that was ' +
                'cited in the preceding endnote or footnote.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Ibid'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'short'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ibidem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'meaning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'same'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'place'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'term'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'provide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'endnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'footnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'citation'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'reference'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'source'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cited'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'preceding'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'endnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'footnote'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `id` (abbreviation ' +
        'for `idem`), as a terminal marker', function () {
            var root = converter(
                'Id. is particularly used in legal citations.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Id'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'particularly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'legal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'citations'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `nem` and `con` ' +
        '(in `nem. con.`, abbreviation for `nemine contradicente`), as a ' +
        'terminal marker', function () {
            var root = converter(
                'The meaning of nemine contradicente is distinct from ' +
                '“unanimously”; nem. con. simply means that nobody voted ' +
                'against.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'meaning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nemine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'contradicente'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'distinct'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'from'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unanimously'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ';'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'con'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'simply'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'means'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nobody'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'voted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'against'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `op` and `cit` ' +
        '(in `op. cit.`, abbreviation for `opere (citato)`), as a terminal ' +
        'marker', function () {
            var root = converter(
                'As usual with foreign words and phrases, op. cit. is ' +
                'typically given in italics.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'usual'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'foreign'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'words'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'phrases'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'op'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cit'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'typically'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'given'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'italics'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cent` ' +
        '(abbreviation for `(per) cent`), as a terminal marker', function () {
            var root = converter(
                'The form per cent. is still in use as a part of highly ' +
                'formal language.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'form'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cent'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'still'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'use'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'part'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'formal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'language'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pro` ' +
        '(abbreviation for `(per) procurationem`), as a terminal marker',
        function () {
            var root = converter(
                'Procuration (per procurationem), or shortly per pro., ' +
                'or simply p.p.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Procuration'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'procurationem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'shortly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pro'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'simply'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tem` ' +
        '(abbreviation for `(pro) tempore`), as a terminal marker',
        function () {
            var root = converter(
                'Legislative bodies can have one or more pro tem. for ' +
                'the presiding officer.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Legislative'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bodies'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'can'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'have'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pro'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'presiding'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'officer'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sic` ' +
        '(abbreviation for `sic erat scriptum`), as a terminal marker',
        function () {
            var root = converter(
                'Sic., or sic erat scriptum, is Latin for “Thus it ' +
                'was written.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Sic'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'erat'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'scriptum'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Thus'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'it'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'written'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `seq` ' +
        '(abbreviation for `(et) sequentia`), as a terminal marker',
        function () {
            var root = converter(
                'The phrase et seq. is used to indicate that ' +
                'the information is continued on the denoted ' +
                'pages or sections.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'phrase'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'seq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'indicate'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'information'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'continued'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'denoted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sections'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `stat` ' +
        '(abbreviation for `statim`), as a terminal marker', function () {
            var root = converter('That patient needs attention, stat.!');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'That'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'patient'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'needs'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'attention'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stat'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '!'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `viz` ' +
        '(abbreviation for `videlicet`), as a terminal marker', function () {
            var root = converter(
                'The noble gases, viz. helium, neon, argon, xenon, ' +
                'krypton and radon, show a non-expected behaviour when ' +
                'exposed to this new element.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'noble'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gases'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'viz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'helium'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'neon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'argon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'xenon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'krypton'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'radon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'show'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'non'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'expected'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'behaviour'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'when'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'exposed'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'this'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'new'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'element'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: English unit abbreviations', function () {
    it('should *not* treat the dot-character succeeding `bbl` ' +
        '(abbreviation for `barrel`), as a terminal marker', function () {
            var root = converter(
                'The price for 15 bbls. is unknown to me.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'price'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '15'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bbls'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unknown'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cu` ' +
        '(abbreviation for `cubic`), as a terminal marker', function () {
            var root = converter(
                '12 cu. in. could also be written as 12inch^3.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cu'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'could'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'written'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inch'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '^'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '3'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `doz` ' +
        '(abbreviation for `dozen`), as a terminal marker', function () {
            var root = converter('Could you get 2 doz. of eggs?');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Could'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'get'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'doz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eggs'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '?'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` ' +
        '(as in `fl. oz.`, abbreviation for `fluid (ounce)`), ' +
        'as a terminal marker', function () {
            var root = converter('1 fl. oz. equals about 28 ml.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'about'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '28'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ml'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` (abbreviation ' +
        'for `fluid ounce`), as a terminal marker', function () {
            var root = converter('2 oz. equals about 56–57 gr.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'about'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '56'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '–'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '57'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ft` (abbreviation ' +
        'for `foot`), as a terminal marker', function () {
            var root = converter('2 ft. equals exactly 60.96 centimeters.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'exactly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '60'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '96'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'centimeters'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gal` ' +
        '(abbreviation for `gallon`), as a terminal marker', function () {
            var root = converter('1 gal. equals 8 pints.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gal'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '8'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pints'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gr` (abbreviation ' +
        'for `grain`), as a terminal marker', function () {
            var root = converter(
                '5 gr. bottle indicates on the back that the ' +
                'dosage is “325 mg.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '5'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bottle'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'indicates'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'back'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'dosage'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '325'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mg'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gro` ' +
        '(abbreviation for `gross`), as a terminal marker', function () {
            var root = converter(
                '1 Gro. (a gross) refers to a group of 144 items.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Gro'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gross'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refers'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'group'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '144'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'items'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `in` (abbreviation ' +
        'for `inch`), as a terminal marker', function () {
            var root = converter('There are 12 in. in a foot.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'There'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'are'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'foot'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `kt` (abbreviation ' +
        'for `karat or knot`), as a terminal marker', function () {
            var root = converter(
                'Items 10-karat or greater are to be stamped with ' +
                'either Kt. or K.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Items'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '10'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'karat'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'greater'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'are'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stamped'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'either'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Kt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'K'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `lb` (abbreviation ' +
        'for `pound`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 lb. equals ' +
                '0.45359237 kilograms'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'lb'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '0'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '45359237'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'kilograms'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `mi` ' +
        '(abbreviation for `mile`), as a terminal marker', function () {
            var root = converter(
                'A mile, known as 1 mi. also, is a unit of length most ' +
                'commonly equivalent to 5,280 feet.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mile'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'known'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mi'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unit'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'length'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'most'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'commonly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equivalent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '5'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '280'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feet'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` ' +
        '(abbreviation for `ounce`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 oz. equals ' +
                'one sixteenth of a pound.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sixteenth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pound'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pt` (abbreviation ' +
        'for `pint`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 pt. equals ' +
                'one eighth of a gallon.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eighth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gallon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `qt` ' +
        '(abbreviation for `quart`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 qt. ' +
                'equals one fourth of a gallon.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'qt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fourth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gallon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sq` ' +
        '(abbreviation for `square`), as a terminal marker', function () {
            var root = converter(
                'The large house boasts 29 sq. ft. of living space.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'house'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'boasts'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '29'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'living'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'space'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tbsp` ' +
        '(abbreviation for `tablespoon`), as a terminal marker', function () {
            var root = converter('Add 3 tbsp. sea salt flakes.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Add'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '3'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tbsp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sea'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'salt'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'flakes'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });

    it('should *not* treat the dot-character succeeding `tsp` ' +
        '(abbreviation for `teaspoon`), as a terminal marker', function () {
            var root = converter('Add 1 tsp. mustard powder.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Add'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tsp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mustard'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'powder'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `yd` ' +
        '(abbreviation for `yard`), as a terminal marker', function () {
            var root = converter('2 yd. is a fanthom.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'yd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fanthom'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Time references', function () {
    it('should *not* treat the dot-character succeeding `sec` ' +
        '(abbreviation for `seconds`), as a terminal marker', function () {
            var root = converter(
                'Sprint for 90 sec. more, before you do some stretches.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Sprint'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '90'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sec'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'do'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'some'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stretches'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `min` ' +
        '(abbreviation for `minutes`), as a terminal marker', function () {
            var root = converter(
                'Continue down the road 8 more min. before turning left ' +
                'at the crossroads.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Continue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'down'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'road'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '8'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'min'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'turning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'left'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'crossroads'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `hr` (abbreviation ' +
        'for `hours`), as a terminal marker', function () {
            var root = converter('We\'ll be there in 1 hr. I think');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'We'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'll'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'there'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'hr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'think'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding days (e.g., ' +
        '`Mon`, `Tue`, &c.), as a terminal marker', function () {
            var days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun',
                root;

            days.split('|').forEach(function (day) {
                root = converter(
                    'Let\'s move the meeting to next ' + day + '. at 10:00.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Let'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 's'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'move'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'meeting'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'to'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'next'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : day
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'at'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '10'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ':'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '00'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );

    it('should *not* treat the dot-character succeeding months (e.g., ' +
        '`Jan`, `Feb`, &c.), as a terminal marker', function () {
            var months = 'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec',
                root;

            months.split('|').forEach(function (month) {
                root = converter(
                    'My birthday is in ' + month + ' on the 12th.'
                );
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'My'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'birthday'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : month
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '12th'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Abbreviations: Decimals (prefixed by a full-stop)', function () {
    it('should *not* treat the dot-character preceding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            '0123456789'.split('').forEach(function (digit) {
                var root = converter('See § .' + digit + ' ¶ 2.');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'See'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '§'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : digit
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '¶'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Abbreviations: TLD abbreviations', function () {
    it('should *not* treat the dot-character preceding top-level domains ' +
        '(e.g., `aero`, `asia`, `biz`, &c.), as a terminal marker',
        function () {
            (
                'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|' +
                'mil|mobi|museum|name|net|org|post|pro|tel|travel|xxx'
            ).split('|').forEach(function (domain) {
                var root = converter(
                    'The domain .' + domain + ' is a top-level domain.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'The'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : domain
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'a'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'top'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '-'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'level'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            });
        }
    );
});

describe('Contractions', function () {
    it('should break contractions of `‘ll` (from `will`)', function () {
        var root = converter('She\'ll be at the meeting');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'She'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'll'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'at'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'meeting'
                }
            ]
        }));
    });

    it('should break contractions of `‘re` (from `are`)', function () {
        var root = converter('You\'re finished');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'You'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 're'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'finished'
                }
            ]
        }));
    });

    it('should break contractions of `‘ve` (from `have`)', function () {
        var root = converter('Do you\'ve any tips');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Do'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'you'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 've'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'any'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'tips'
                }
            ]
        }));
    });

    it('should break contractions of `n‘t` (from `not`)', function () {
        var root = converter('Ain\'t nobody');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Ai'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 't'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'nobody'
                }
            ]
        }));
    });

    it('should break contractions of `‘s` (from `us`, `is`, `does`, ' +
        'and `has`)', function () {
            var root = converter('It\'s backed up');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'It'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'backed'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'up'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `‘m` (from `am`)', function () {
        var root = converter('I\'m on a boat');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'on'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'boat'
                }
            ]
        }));
    });

    it('should break contractions of `‘d` (from `had`, `did`, and `would`)',
        function () {
            var root = converter('Where\'d he go');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Where'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'd'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'he'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'go'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `cannot`', function () {
        var root = converter('They cannot fly');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'They'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'can'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'not'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'fly'
                }
            ]
        }));
    });

    it('should break contractions of `d\'ye` (from `do you`)', function () {
        var root = converter('What d\'ye need?');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'What'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'd'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ye'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'need'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '?'
                }
            ]
        }));
    });

    it('should break contractions of `gimme` (`from give me`)', function () {
        var root = converter('Gimme more');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Gim'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'me'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'more'
                }
            ]
        }));
    });

    it('should break contractions of `lemme` (from `let me`)', function () {
        var root = converter('Lemme go!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Lem'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'me'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'go'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `‘em` (from `them`)', function () {
        var root = converter('Have you seen \'em?');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Have'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'you'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'seen'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'em'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '?'
                }
            ]
        }));
    });

    it('should break contractions of `o‘` (from `of (the)`, as in `o‘clock`)',
        function () {
            var root = converter('See you at ten o\'clock.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'See'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ten'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'clock'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `y‘` (from `you`, as in `y‘all`)',
        function () {
            var root = converter('Hold on, y\'all!');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hold'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'y'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'all'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '!'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `‘t` (from `it`, as in `‘twas`)',
        function () {
            var root = converter('\'Twas the night before Christmas.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'T'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'night'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Christmas'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `coulda` (from `could have`)',
        function () {
            var root = converter('You coulda told him');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'could'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'him'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `musta` (from `must have`)',
        function () {
            var root = converter('He musta guessed');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'He'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'must'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'guessed'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `shoulda` (from `should have`)',
        function () {
            var root = converter('You shoulda told me');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'should'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `woulda` (from `would have`)',
        function () {
            var root = converter('You woulda told him');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'him'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `kinda` (from `kind of`)', function () {
        var root = converter('That\'s kinda funny');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'That'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'kind'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'funny'
                }
            ]
        }));
    });

    it('should break contractions of `sorta` (from `sort of`)', function () {
        var root = converter('That\'s sorta funny');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'That'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'sort'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'funny'
                }
            ]
        }));
    });

    it('should break contractions of `oughta` (from `ought of`)',
        function () {
            var root = converter('I oughta go');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ought'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'go'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `wanna` (from `want a` or `want to`)',
        function () {
            var root = converter('I wanna puppy');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'wan'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'na'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'puppy'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `gonna` (from `going to`)', function () {
        var root = converter('I’m gonna go');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '’'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'gon'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'na'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'go'
                }
            ]
        }));
    });

    it('should break contractions of `doncha` (from `don‘t you`)',
        function () {
            var root = converter('Doncha wanna?');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Don'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cha'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'wan'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'na'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '?'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `gotcha` (from `got you`)', function () {
        var root = converter('I gotcha now!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'got'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'cha'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'now'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `getcha` (from `get you`)', function () {
        var root = converter('Gonna getcha!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Gon'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'na'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'get'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'cha'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `outta` (from `out of`)', function () {
        var root = converter('I\'m outta here');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'out'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'here'
                }
            ]
        }));
    });

    it('should break contractions of `lotta` (from `lot of`)', function () {
        var root = converter('A whole lotta people');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'whole'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'lot'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'people'
                }
            ]
        }));
    });

    it('should break contractions of `hafta` (from `have to`)', function () {
        var root = converter('I hafta fill in my tax return');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'haf'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'fill'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'my'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'tax'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'return'
                }
            ]
        }));
    });

    it('should break contractions of `gotta` (from `got to`)', function () {
        var root = converter('I gotta learn');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'got'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'learn'
                }
            ]
        }));
    });
});

describe('Terminal markers', function () {
    it('should break sentences ending in a full stop/period', function () {
        var root = converter(
            'Like Miss and Mrs. the term Ms. has its origins in English ' +
            'title once used for all women. Various plural forms used ' +
            'are Mss., Mses. and Mmes.'
        );
        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Like'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Miss'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mrs'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'term'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Ms'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'has'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'its'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'origins'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'English'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'title'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'once'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'for'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'all'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'women'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Various'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'plural'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'forms'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'are'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mss'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mses'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mmes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in a question mark', function () {
        var root = converter(
            'Is it good in form? style? meaning? He responded with yes.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'it'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'good'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'form'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'style'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'meaning'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'He'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'responded'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'with'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'yes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an exclamation mark', function () {
        var root = converter(
            '“No!” he yelled. “Buy it now!” They have some really(!) ' +
            'low-priced rugs on sale this week.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'value' : '“'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'No'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '”'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'he'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'yelled'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'value' : '“'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Buy'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'it'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'now'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '”'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'They'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'have'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'some'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'really'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '('
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ')'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'low'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '-'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'priced'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'rugs'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'sale'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'this'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'week'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an interrobang', function () {
        var root = converter('Say what‽ She\'s pregnant?! Realy!? Wow.');
        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Say'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'what'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '‽'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'She'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 's'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'pregnant'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Realy'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Wow'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an ellipsis', function () {
        var root = converter(
            'This is rather straightforward... most of the time... ' +
            'She said that you should end a sentence with an ellipsis.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'This'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'rather'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'straightforward'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '...'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'most'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'of'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'time'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '...'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'She'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'said'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'that'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'you'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'should'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'end'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'a'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'sentence'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'with'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'an'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'ellipsis'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

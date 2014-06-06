/* A simple sentence, which tests for digit-letters.
 * e.g.:
 * - `iPhone 5S`
 * - `3min`
 */

var converter = require('..'),
    assert = require('assert');

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

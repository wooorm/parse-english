'use strict';

var Parser, sentence, paragraph, section, article, book;

Parser = require('..');

/* Test data */

/* Source: http://www.gutenberg.org/files/10745/10745-h/10745-h.htm */

/* A sentence, 20 words. */
sentence = 'Where she had stood was clear, and she was gone since Sir Kay ' +
    'does not choose to assume my quarrel.';

/* A paragraph, 5 sentences, 100 words. */
paragraph = 'Thou art a churlish knight to so affront a lady ' +
    'he could not sit upon his horse any longer. ' +
    'For methinks something hath befallen my lord and that he ' +
    'then, after a while, he cried out in great voice. ' +
    'For that light in the sky lieth in the south ' +
    'then Queen Helen fell down in a swoon, and lay. ' +
    'Touch me not, for I am not mortal, but Fay ' +
    'so the Lady of the Lake vanished away, everything behind. ' +
    sentence;

/* A section, 10 paragraphs, 50 sentences, 1,000 words. */
section = paragraph + Array(10).join('\n\n' + paragraph);

/* An article, 100 paragraphs, 500 sentences, 10,000 words. */
article = section + Array(10).join('\n\n' + section);

/* A book, 1,000 paragraphs, 5,000 sentences, 100,000 words. */
book = article + Array(10).join('\n\n' + article);

/* Benchmarks */
suite('parser.parse(source);', function () {
    var parser = new Parser();

    set('mintime', 100);

    bench('A paragraph (5 sentences, 100 words)', function (next) {
        parser.parse(paragraph);
        next();
    });

    bench('A section (10 paragraphs, 50 sentences, 1,000 words)',
        function (next) {
            parser.parse(section);
            next();
        }
    );

    bench('An article (100 paragraphs, 500 sentences, 10,000 words)',
        function (next) {
            parser.parse(article);
            next();
        }
    );

    bench('A (large) book (1,000 paragraphs, 5,000 sentences, 100,000 words)',
        function (next) {
            parser.parse(book);
            next();
        }
    );
});

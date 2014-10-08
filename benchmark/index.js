'use strict';

/**
 * Dependencies.
 */

var ParseEnglish;

ParseEnglish = require('..');

/**
 * Fixtures.
 *
 * Source:
 *   http://www.gutenberg.org/cache/epub/11024/pg11024.html
 */

var sentence,
    paragraph,
    section,
    article,
    book;

/**
 * A sentence, 20 words.
 */

sentence = 'Where she had stood was clear, and she was ' +
    'gone since Sir Kay does not choose to assume my ' +
    'quarrel.';

/**
 * A paragraph, 5 sentences.
 */

paragraph = 'Thou art a churlish knight to so affront ' +
        'a lady he could not sit upon his horse any ' +
        'longer. ' +

        'For methinks something hath befallen my lord ' +
        'and that he then, after a while, he cried out ' +
        'in great voice. ' +

        'For that light in the sky lieth in the south ' +
        'then Queen Helen fell down in a swoon, and ' +
        'lay. ' +

        'Touch me not, for I am not mortal, but Fay ' +
        'so the Lady of the Lake vanished away, ' +
        'everything behind. ' +

        sentence;

/**
 * A section, 10 paragraphs.
 */

section = paragraph + Array(10).join('\n\n' + paragraph);

/**
 * An article, 10 sections.
 */

article = section + Array(10).join('\n\n' + section);

/**
 * An book, 10 articles.
 */

book = article + Array(10).join('\n\n' + article);

/**
 * Benchmarks.
 */

suite('english.parse(document);', function () {
    var english;

    english = new ParseEnglish();

    set('mintime', 100);

    bench('A paragraph (5 sentences, 100 words)', function () {
        english.parse(paragraph);
    });

    bench('A section (10 paragraphs)', function () {
        english.parse(section);
    });

    bench('An article (10 sections)', function () {
        english.parse(article);
    });

    bench('A (large) book (10 articles)', function () {
        english.parse(book);
    });
});

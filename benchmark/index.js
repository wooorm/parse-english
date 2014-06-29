'use strict';

var parseEnglish, source, tiny, small, medium, large;

parseEnglish = require('..');

source = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ' +
    'ac ultricies diam, quis vehicula mauris. Vivamus accumsan eleifend ' +
    'quam et varius. Etiam congue id magna eu fermentum. Aliquam mollis ' +
    'adipiscing.\n\n';

/* Test data */
tiny = source;
small = Array(11).join(source);
medium = Array(11).join(small);
large = Array(11).join(medium);

/* Benchmarks */
suite('parse(source); // Reuse instance', function () {
    var parse = parseEnglish();

    bench('tiny (1 paragraph, 5 sentences, 30 words, 208 B)',
        function (next) {
            parse(tiny);
            next();
        }
    );

    bench('small (10 paragraphs, 50 sentences, 300 words, 2 kB)',
        function (next) {
            parse(small);
            next();
        }
    );

    bench('medium (100 paragraphs, 500 sentences, 3000 words, 21 kB)',
        function (next) {
            parse(medium);
            next();
        }
    );

    bench('large (1000 paragraphs, 5000 sentences, 30000 words, 208 kB)',
        function (next) {
            parse(large);
            next();
        }
    );
});

suite('parseEnglish()(source); // Create new instance', function () {
    bench('tiny (1 paragraph, 5 sentences, 30 words, 208 B)',
        function (next) {
            parseEnglish()(tiny);
            next();
        }
    );

    bench('small (10 paragraphs, 50 sentences, 300 words, 2 kB)',
        function (next) {
            parseEnglish()(small);
            next();
        }
    );

    bench('medium (100 paragraphs, 500 sentences, 3000 words, 21 kB)',
        function (next) {
            parseEnglish()(medium);
            next();
        }
    );

    bench('large (1000 paragraphs, 5000 sentences, 30000 words, 208 kB)',
        function (next) {
            parseEnglish()(large);
            next();
        }
    );
});

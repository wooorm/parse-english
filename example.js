// Dependencies:
var inspect = require('unist-util-inspect');
var English = require('./index.js');

// Parse:
var tree = new English().parse(
    'Mr. Henry Brown: A hapless but friendly City of London worker.'
);

// Which, when inspecting, yields:
console.log('txt', inspect.noColor(tree));

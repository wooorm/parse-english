'use strict';

/**
 * Dependencies.
 */

var ParseEnglish,
    fs;

ParseEnglish = require('../');
fs = require('fs');

/**
 * `ParseEnglish`.
 */

var english;

english = new ParseEnglish();

/**
 * Exit with info on too-few parameters.
 */

var parameters,
    filepath,
    nlcst;

parameters = process.argv.splice(2);

if (parameters.length < 2) {
    console.log('Usage:');
    console.log('  npm run fixture name document');
} else {
    filepath = 'test/fixture/' + parameters[0] + '.json';
    nlcst = english.parse(parameters[1]);

    /**
     * Write fixture.
     */

    fs.writeFileSync(filepath, JSON.stringify(nlcst, 0, 2));

    console.log('Wrote file to `' + filepath + '`');
}

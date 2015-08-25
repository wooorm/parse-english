/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-english:script:generate-fixture
 * @fileoverview Generate fixtures for `parse-english`.
 */

'use strict';

/* eslint-env node */

/* eslint-disable no-console */

/*
 * Dependencies.
 */

var fs = require('fs');
var ParseEnglish = require('..');

/*
 * `ParseEnglish`.
 */

var english = new ParseEnglish();

/*
 * Exit with info on too-few parameters.
 */

var parameters = process.argv.splice(2);

if (parameters.length < 2) {
    console.log('Usage:');
    console.log('  npm run fixture name document [method]');
    return;
}

var filePath = 'test/fixture/' + parameters[0] + '.json';
var nlcst = english[parameters[2] || 'parse'](parameters[1]);

/*
 * Write fixture.
 */

fs.writeFileSync(filePath, JSON.stringify(nlcst, 0, 2) + '\n');

console.log('Wrote file to `' + filePath + '`');

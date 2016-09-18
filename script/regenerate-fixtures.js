/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-english:script:regenerate-fixtures
 * @fileoverview Re-generate fixtures.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var toString = require('nlcst-to-string');
var negate = require('negate');
var hidden = require('is-hidden');
var ParseEnglish = require('..');

/* Parser. */
var english = new ParseEnglish();

var root = path.join('test', 'fixture');

/* Find fixtures. */
fs.readdirSync(root)
  .filter(negate(hidden))
  .forEach(function (name) {
    var fp = path.join(root, name);
    var doc = fs.readFileSync(fp);
    var json = JSON.parse(doc);
    var fn = 'tokenize' + json.type.slice(0, json.type.indexOf('Node'));
    var nlcst;

    if (fn === 'tokenizeRoot') {
      fn = 'parse';
    }

    nlcst = english[fn](toString(json));
    nlcst = JSON.stringify(nlcst, 0, 2) + '\n';

    fs.writeFileSync(fp, nlcst);
  });

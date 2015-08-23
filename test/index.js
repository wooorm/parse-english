/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-english:test
 * @fileoverview Test suite for `parse-english`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var nlcstTest = require('nlcst-test');
var ParseEnglish = require('..');

/*
 * Methods.
 */

var deepEqual = assert.deepEqual;

/*
 * `ParseEnglish`.
 */

var english = new ParseEnglish();

var englishPosition = new ParseEnglish({
    'position': true
});

/**
 * Clone `object` but omit positional information.
 *
 * @param {Object|Array} object - Object to clone.
 * @return {Object|Array} - `object`, without positional
 *   information.
 */
function clean(object) {
    var clone = 'length' in object ? [] : {};
    var key;
    var value;

    for (key in object) {
        value = object[key];

        if (key === 'position') {
            continue;
        }

        clone[key] = typeof object[key] === 'object' ? clean(value) : value;
    }

    return clone;
}

/**
 * Utility to test if a given document is both a valid
 * node, and matches a fixture.
 *
 * @param {string} name - Filename of fixture.
 * @param {string} document - Source to validate.
 */
function describeFixture(name, document, method) {
    var nlcstA = english[method || 'parse'](document);
    var nlcstB = englishPosition[method || 'parse'](document);
    var fixture = require('./fixture/' + name);

    nlcstTest(nlcstA);
    nlcstTest(nlcstB);

    deepEqual(nlcstA, clean(fixture));
    deepEqual(nlcstB, fixture);
}

/*
 * Tests.
 */

describe('ParseEnglish', function () {
    it('should be a function', function () {
        assert(typeof ParseEnglish === 'function');
    });

    it('should return a new instance object when invoked', function () {
        assert(new ParseEnglish() instanceof ParseEnglish);
        /*eslint-disable new-cap */
        assert(ParseEnglish() instanceof ParseEnglish);
        /*eslint-enable new-cap */
    });
});

describe('Abbreviations: Geographic', function () {
    it('should NOT treat `Ave.` as a terminal marker', function () {
        /*
         * Note: This paragraph also tests for
         * coverage of early break branches in the
         * `mergeEnglishPrefixExceptions` function.
         *
         * These should probably be tested by running
         * `ParseLatin` specs.
         */

        describeFixture(
            'geographic-ave',
            'Survey! (Reaffirms). Test. The 5th Ave. Top of the ' +
            'Retail Rent Heap.',
            'tokenizeParagraph'
        );
    });

    it('should NOT treat `Blvd.` as a terminal marker', function () {
        describeFixture(
            'geographic-blvd',
            'A café located on the Blvd. Kusadasi.'
        );
    });

    it('should NOT treat `Mt.` as a terminal marker', function () {
        describeFixture(
            'geographic-mt',
            'Like all mountains, Mt. Gay is a large large mass of rock.'
        );
    });

    it('should NOT treat `Rd.` as a terminal marker', function () {
        describeFixture(
            'geographic-rd',
            'It\'s at Rd. Townmead.'
        );
    });

    it('should NOT treat `Bldg.` as a terminal marker', function () {
        describeFixture(
            'geographic-bldg',
            'Near Bldg. Linchfield'
        );
    });

    it('should NOT treat `Nat.` as a terminal marker', function () {
        describeFixture(
            'geographic-nat',
            'The Teide Nat. Park in Tenerife, Spain.'
        );
    });

    it('should NOT treat `Natl.` as a terminal marker', function () {
        describeFixture(
            'geographic-natl',
            'The Teide Natl. Park in Tenerife, Spain.'
        );
    });

    it('should NOT treat `Rt.` as a terminal marker', function () {
        describeFixture(
            'geographic-rt',
            'Some gibberish Rt. America 66.'
        );
    });

    it('should NOT treat `Rte.` as a terminal marker', function () {
        describeFixture(
            'geographic-rte',
            'Some gibberish Rte. America 66.'
        );
    });

    it('should NOT treat `Co.` as a terminal marker', function () {
        describeFixture(
            'geographic-co',
            'The Co. Leicestershire is a landlocked county'
        );
    });

    it('should NOT treat `Pk.` as a terminal marker', function () {
        describeFixture(
            'geographic-pk',
            'Meet at Pk. St. James\'s, which covers 34 ha.'
        );
    });

    it('should NOT treat `Sq.` as a terminal marker', function () {
        describeFixture(
            'geographic-sq',
            'Times Sq. New York is a major commercial intersection.'
        );
    });

    it('should NOT treat `Dr.` as a terminal marker', function () {
        describeFixture(
            'geographic-dr',
            'Continue on Pershing Dr. Greenville.'
        );
    });

    it('should NOT treat `Pt.` as a terminal marker', function () {
        describeFixture(
            'geographic-pt',
            'The Pt. L.A. is also called Los Angeles Harbor ' +
            'Department.'
        );
    });

    it('should NOT treat `St.` as a terminal marker', function () {
        describeFixture(
            'geographic-st',
            'I used to live on 2nd St. Clinton.'
        );
    });

    it('should NOT treat `Ft.` as a terminal marker', function () {
        describeFixture(
            'geographic-ft',
            'As Ft. Knox is no longer “The Home of Armor”, ' +
            'the Patton Museum has also been relocated.'
        );
    });

    it('should NOT treat `Pen.` as a terminal marker', function () {
        describeFixture(
            'geographic-pen',
            'Pen. Huon is a large rugged peninsula on the island of ' +
            'New Guinea.'
        );
    });

    it('should NOT treat `Terr.` as a terminal marker', function () {
        describeFixture(
            'geographic-terr',
            'Terr. Yukon is an area of rugged mountains and high ' +
            'plateaus.'
        );
    });

    it('should NOT treat `Hwy.` as a terminal marker', function () {
        describeFixture(
            'geographic-hwy',
            'The Hwy. Atlantic was the direct predecessor to U.S. 1.'
        );
    });

    it('should NOT treat `Fwy.` as a terminal marker', function () {
        describeFixture(
            'geographic-fwy',
            'The Fwy. San Diego is most commonly called “The 405”.'
        );
    });

    it('should NOT treat `Pkwy.` as a terminal marker', function () {
        describeFixture(
            'geographic-pkwy',
            'The National Pkwy. Blue Ridge is noted for its scenic beauty.'
        );
    });

    (
        'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Dak|Del|Fla|Ga|Ia|Id|' +
        'Ida|Ill|Ind|Kan|Kans|Ken|Ky|La|Mass|Md|Me|Mex|Mich|Minn|Miss|' +
        'Mo|Mont|Neb|Nebr|Nev|Ok|Okla|Ore|Pa|Penn|Penna|Tenn|Tex|Ut|Va|' +
        'Vt|Wash|Wis|Wisc|Wyo'
    ).split('|').forEach(function (state) {
        it('should NOT treat `' + state + '.` as a terminal marker',
            function () {
                describeFixture(
                    'geographic-state-' + state.toLowerCase(),
                    'I live in ' + state + '. Clinton on 2nd street.'
                );
            }
        );
    });

    'Alta|Man|Ont|Qué|Que|Sask|Yuk'.split('|').forEach(function (state) {
        it('should NOT treat `' + state + '.` as a terminal marker',
            function () {
                describeFixture(
                    'geographic-state-' + state.toLowerCase(),
                    'I\'m from Mt. Pleasant, ' + state + '. Canada.'
                );
            }
        );
    });

    (
        'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|' +
        'Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|' +
        'Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|' +
        'Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
        'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|' +
        'Worcs|Yorks'
    ).split('|').forEach(function (county) {
        it('should NOT treat `' + county + '.` as a terminal marker',
            function () {
                describeFixture(
                    'geographic-state-' + county.toLowerCase(),
                    'I\'m from Newton, ' + county + '. England.'
                );
            }
        );
    });
});

describe('Abbreviations: Title abbreviations', function () {
    (
        'Amb|Amd|Atty|Br|Brig|Capt|Cdr|Col|Dr|Fr|Gen|Gov|Hon|Jr|Lt|' +
        'M|Maj|Messrs|Mgr|Miss|Mlle|Mme|Mmes|Mr|Mrs|Ms|Msgr|Ph|Po|' +
        'Pres|Prof|Rep|Rev|Sec|Sen|Sgt|Snr|Sr|St|Supt|Treas|Wo'
    ).split('|').forEach(function (title) {
        it('should NOT treat `' + title + '.` as a terminal marker',
            function () {
                describeFixture(
                    'title-' + title.toLowerCase(),
                    'You should talk to ' + title + '. Smith.'
                );
            }
        );
    });
});

describe('Abbreviations: Business', function () {
    'Inc|Ltd'.split('|').forEach(function (abbreviation) {
        it('should NOT treat `' + abbreviation + '.` as a terminal marker',
            function () {
                describeFixture(
                    'business-' + abbreviation.toLowerCase(),
                    'XYZ Associates ' + abbreviation + '. is a member.'
                );
            }
        );
    });
});

describe('Abbreviations: English unit abbreviations', function () {
    (
        'bbl|cu|doz|fl|oz|ft|gal|gr|gro|in|kt|lb|mi|pt|qt|sq|tbsp|tsp|yd'
    ).split('|').forEach(function (unit) {
        it('should NOT treat `' + unit + '.` as a terminal marker',
            function () {
                describeFixture(
                    'unit-' + unit,
                    'What\'s the price for 1 ' + unit + '. Eric?'
                );
            }
        );
    });
});

describe('Abbreviations: Time references', function () {
    'sec|min|hr'.split('|').forEach(function (time) {
        it('should NOT treat `' + time + '.` as a terminal marker',
            function () {
                describeFixture(
                    'time-' + time,
                    'What\'s the price for 30 ' + time + '. Eric?'
                );
            }
        );
    });

    (
        'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun'
    ).split('|').forEach(function (day) {
        it('should NOT treat `' + day + '.` as a terminal marker',
            function () {
                describeFixture(
                    'day-' + day.toLowerCase(),
                    'Move the meeting to next ' + day + '. Smith.'
                );
            }
        );
    });

    (
        'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec'
    ).split('|').forEach(function (month) {
        it('should NOT treat `' + month + '.` as a terminal marker',
            function () {
                describeFixture(
                    'month-' + month.toLowerCase(),
                    'My birthday is ' + month + '. Giberish.'
                );
            }
        );
    });
});

describe('Elision', function () {
    it('should treat `o\'` as one word', function () {
        describeFixture(
            'elision-final-o',
            'Lots o\' luck, lots o\u2019 luck.'
        );
    });

    it('should treat `ol\'` as one word', function () {
        describeFixture(
            'elision-final-ol',
            'Your ol\' grandpa, your ol\u2019 grandpa.'
        );
    });

    it('should treat `\'em` as one word', function () {
        describeFixture(
            'elision-initial-em',
            'Tell \'em, tell \u2019em.'
        );
    });

    it('should treat `\'er` as one word', function () {
        describeFixture(
            'elision-initial-er',
            'Tell \'er, tell \u2019er.'
        );
    });

    it('should treat `\'im` as one word', function () {
        describeFixture(
            'elision-initial-im',
            'Tell \'im, tell \u2019im.'
        );
    });

    it('should treat `\'cause` as one word', function () {
        describeFixture(
            'elision-initial-cause',
            '\'Cause it is, \u2019cause it is.'
        );
    });

    it('should treat `\'n\'` as one word', function () {
        describeFixture(
            'elision-n',
            'Rock \'n\' Roll, Rock \u2019n\u2019 Roll!'
        );
    });

    it('should treat `\'twas` as one word', function () {
        describeFixture(
            'elision-initial-twas',
            '\'Twas the day, \u2019twas the day of Christmas.'
        );
    });

    it('should treat `\'tis` as one word', function () {
        describeFixture(
            'elision-initial-tis',
            '\'Tis the day, \u2019tis the day of Christmas.'
        );
    });

    it('should treat `\'twere` as one word', function () {
        describeFixture(
            'elision-initial-twere',
            'If \'twere us, if \u2019twere us...'
        );
    });

    it('should treat `\'70s` as one word', function () {
        describeFixture(
            'elision-initial-year-plural',
            'That \'70s Show, that \u201970s show.'
        );
    });

    it('should treat `\'49` as one word', function () {
        describeFixture(
            'elision-initial-year',
            'In \'49, in \u201949...'
        );
    });

    it('should NOT treat other initial apostrophes as word', function () {
        describeFixture(
            'elision-non-initial',
            'Such as \'the previous.'
        );

        /*
         * This is commented out because `parse-latin`
         * always thinks apostrophes at the start of
         * a word are part of that word.
         */

        /*
         * describeFixture(
         *     'elision-non-initial-smart',
             'Such as \u2019the previous.'
         * );
         */
    });

    it('should NOT treat other final apostrophes as word', function () {
        describeFixture(
            'elision-non-final',
            'Such as the\' previous.'
        );

        describeFixture(
            'elision-non-final-smart',
            'Such as the\u2019 previous.'
        );
    });

    it('should treat `w/` as one word', function () {
        describeFixture(
            'elision-w',
            'Let\'s meet w/ Eric.'
        );
    });

    it('should NOT treat the slash in`with/` as one word', function () {
        describeFixture(
            'elision-non-with',
            'Let\'s meet with/ Eric.'
        );
    });
});

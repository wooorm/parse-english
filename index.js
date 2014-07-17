'use strict';

var EXPRESSION_ABBREVIATION_ENGLISH_PREFIX,
    EXPRESSION_ABBREVIATION_ENGLISH_PREFIX_SENSITIVE,
    EXPRESSION_ELISION_ENGLISH_AFFIX,
    EXPRESSION_APOSTROPHE,
    Parser, parserPrototype;

Parser = require('parse-latin');

/**
 * `EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE` holds a blacklist of full
 * stop characters that should not be treated as terminal sentence
 * markers:
 *
 * A "word" boundry,
 * followed by a case-sensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_ENGLISH_PREFIX = new RegExp(
    '^(' +
        /*
         * Business Abbreviations:
         * Incorporation, Limited company.
         */
        'inc|ltd|' +

        /*
         * English unit abbreviations:
         * Note that *Metric abbreviations* do not use full stops.
         *
         * barrel, *, cubic, dozen, fluid ounce, foot, gallon, grain, gross,
         * inch, karat / knot, pound, mile, ounce, pint, quart, square,
         * tablespoon, teaspoon, yard.
         */
        'bbl|bbls|cu|dozfl|oz|ft|gal|gr|gro|in|kt|lb|mi|oz|pt|qt|sq|tbsp|' +
        'tsp|yd|' +

        /*
         * Abbreviations of time references:
         *
         * seconds, minutes, hours, Monday, Tuesday, *, Wednesday,
         * Thursday, *, Friday, Saturday, Sunday, January, Februari, March,
         * April, June, July, August, September, *, October, November,
         * December.
         */
        'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar|' +
        'apr|jun|jul|aug|sep|sept|oct|nov|dec' +
    ')$'
);

/**
 * `EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE` holds a blacklist of full
 * stop characters that should not be treated as terminal sentence
 * markers:
 *
 * A "word" boundry,
 * followed by a case-sensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_ENGLISH_PREFIX_SENSITIVE = new RegExp(
    '^(' +
        /* Social:
         * Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
         * Misters, Mesdames, Junior, Senior, *.
         */
        'Mr|Mrs|Miss|Ms|Mss|Mses|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|' +

        /*
         * Rank and academic:
         * Doctor, Magister, Attorney, Profesor, Honourable, Reverend,
         * Father, Monsignor, Sister, Brother, Saint, President,
         * Superintendent, Representative, Senator.
         */
        'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|' +

        /* Rank and military:
         * Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier,
         * General, Commander, Colonel, Captain, Lieutenant, Major,
         * Sergeant, Petty Officer, Warrant Officer, Purple Heart.
         */
        'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph|' +

        /*
         * Common geographical abbreviations:
         * Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
         * County, Park, Square, Drive, Port or Point, Street or State, Fort,
         * Peninsula, Territory, Highway, Freeway, Parkway.
         */
        'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St|' +
        'Ft|Pen|Terr|Hwy|Fwy|Pkwy|' +

        /*
         * American state abbreviations:
         * Alabama, Arizona, Arkansas, California, *, Colorado, *,
         * Connecticut, Delaware, Florida, Georgia,Idaho, *, Illinois,
         * Indiana, Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland,
         * Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,
         * Nebraska, *, Nevada, Mexico, Dakota, Oklahoma, *, Oregon,
         * Pennsylvania, *, *, Tennessee, Texas, Utah, Vermont, Virginia,
         * Washington, Wisconsin, *, Wyoming.
         */
        'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|' +
        'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|' +
        'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|' +
        'Wash|Wis|Wisc|Wyo|' +

        /*
         * Canadian province abbreviations:
         * Alberta, Manitoba, Ontario, Quebec, *, Saskatchewan,
         * Yukon Territory.
         */
        'Alta|Man|Ont|Qu\u00E9|Que|Sask|Yuk|' +

        /*
         * English county abbreviations
         * Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire,
         * Cheshire, Cornwall, Cumberland, Derbyshire, *, Devon, Dorset,
         * Durham, Gloucestershire, Hampshire, Herefordshire, *,
         * Hertfordshire, Huntingdonshire, Lancashire, Leicestershire,
         * Lincolnshire, Middlesex, *, *, Norfolk, Northamptonshire,
         * Northumberland, *, Nottinghamshire, Oxfordshire, Rutland,
         * Shropshire, Somerset, Staffordshire, *, Suffolk, Surrey,
         * Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
         * Worcestershire, Yorkshire.
         */
        'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|' +
        'Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|' +
        'Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
        'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks' +
    ')$'
);

function mergeEnglishPrefixExceptions(child, index, parent) {
    var children = child.children,
        node;

    if (
        !children ||
        !children.length ||
        index === parent.children.length - 1
    ) {
        return;
    }

    node = children[children.length - 1];

    if (
        !node || node.type !== 'PunctuationNode' ||
        node.children[0].value !== '.'
    ) {
        return;
    }

    node = children[children.length - 2];

    if (!node || node.type !== 'WordNode') {
        return;
    }

    if (!(
        EXPRESSION_ABBREVIATION_ENGLISH_PREFIX.test(
            node.children[0].value.toLowerCase()
        ) ||
        EXPRESSION_ABBREVIATION_ENGLISH_PREFIX_SENSITIVE.test(
            node.children[0].value
        )
    )) {
        return;
    }

    child.children = children.concat(
        parent.children[index + 1].children
    );

    parent.children.splice(index + 1, 1);

    return index > 0 ? index - 1 : 0;
}

EXPRESSION_ELISION_ENGLISH_AFFIX = new RegExp(
    '^(' +
        /* Elisions of [h]im, [h]er, and [th]em. */
        'im|er|em|' +

        /* Elisions of [i]t[ ]was, [i]t[ ]is, and [i]t[ ]were. */
        'twas|tis|twere|' +

        /* Groups of years. */
        '\\d\\ds' +
    ')$'
);

EXPRESSION_APOSTROPHE = /^['\u2019]$/;

function mergeEnglishElisionExceptions(child, index, parent) {
    var siblings = parent.children,
        length = siblings.length,
        node, value;

    /* Return if the child is not an apostrophe. */
    if (
        child.type !== 'PunctuationNode' ||
        !EXPRESSION_APOSTROPHE.test(child.children[0].value)
    ) {
        return;
    }

    /* If two preceding (the first white space and the second a word), and
     * one following (white space) nodes exist... */
    if (
        index > 2 && index < length - 1 &&
        siblings[index - 1].type === 'WordNode' &&
        siblings[index - 2].type === 'WhiteSpaceNode' &&
        siblings[index + 1].type === 'WhiteSpaceNode'
    ) {
        node = siblings[index - 1];

        /* If the preceding node is just an `o`... */
        if (node.children[0].value.toLowerCase() === 'o') {
            /* Remove the apostrophe from parent. */
            siblings.splice(index, 1);

            /* Append the apostrophe into the children of node. */
            node.children = node.children.concat(child);

            return;
        }
    }

    /* If a following word exists, and the preceding node is not a word... */
    if (
        index < length - 1 &&
        siblings[index + 1].type === 'WordNode' && (
            index === 0 ||
            siblings[index - 1].type !== 'WordNode'
        )
    ) {
        node = siblings[index + 1];
        value = node.children[0].value.toLowerCase();

        /* If the following word matches a known elision... */
        if (EXPRESSION_ELISION_ENGLISH_AFFIX.test(value)) {
            /* Remove the apostrophe from parent. */
            siblings.splice(index, 1);

            /* Prepend the apostrophe into the children of node. */
            node.children = [child].concat(node.children);
        /* Otherwise, if the following word is an `n`, and is followed by an
         * apostrophe. */
        } else if (
            value === 'n' && index < length - 2 &&
            siblings[index + 2].type === 'PunctuationNode' &&
            EXPRESSION_APOSTROPHE.test(
                siblings[index + 2].children[0].value
            )
        ) {
            /* Remove the apostrophe from parent. */
            siblings.splice(index, 1);

            /* Prepend the apostrophe and append the next apostrophe, into
             * the children of node. */
            node.children = [child].concat(
                node.children, siblings.splice(index + 1, 1)
            );
        }
    }
}

function ParserPrototype () {}
ParserPrototype.prototype = Parser.prototype;
parserPrototype = new ParserPrototype();

function ParseEnglish() {
    /*
     * TODO: This should later be removed (when this change bubbles
     * through to dependants)
     */
    if (!(this instanceof ParseEnglish)) {
        return new ParseEnglish();
    }

    Parser.apply(this, arguments);
}

ParseEnglish.prototype = parserPrototype;

parserPrototype.tokenizeSentenceModifiers = [
        mergeEnglishElisionExceptions
    ].concat(parserPrototype.tokenizeSentenceModifiers);

parserPrototype.tokenizeParagraphModifiers = [
        mergeEnglishPrefixExceptions
    ].concat(parserPrototype.tokenizeParagraphModifiers);

module.exports = ParseEnglish;

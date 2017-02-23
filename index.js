'use strict';

/* Dependencies. */
var Parser = require('parse-latin');
var nlcstToString = require('nlcst-to-string');
var visitChildren = require('unist-util-visit-children');
var modifyChildren = require('unist-util-modify-children');

/* Expose `ParseEnglish`. */
module.exports = ParseEnglish;

/* Inherit from `ParseLatin`. */
ParserPrototype.prototype = Parser.prototype;

var proto = new ParserPrototype();

ParseEnglish.prototype = proto;

/* Add modifiers to `parser`. */
proto.tokenizeSentencePlugins = [
  visitChildren(mergeEnglishElisionExceptions)
].concat(proto.tokenizeSentencePlugins);

proto.tokenizeParagraphPlugins = [
  modifyChildren(mergeEnglishPrefixExceptions)
].concat(proto.tokenizeParagraphPlugins);

/* Transform English natural language into an NLCST-tree. */
function ParseEnglish(doc, file) {
  if (!(this instanceof ParseEnglish)) {
    return new ParseEnglish(doc, file);
  }

  Parser.apply(this, arguments);
}

/* Constructor to create a `ParseEnglish` prototype. */
function ParserPrototype() {}

/* Match a blacklisted (case-insensitive) abbreviation
 * which when followed by a full-stop does not depict
 * a sentence terminal marker. */
var EXPRESSION_ABBREVIATION_ENGLISH_PREFIX = new RegExp(
  '^(' +
    /* Business Abbreviations:
     * Incorporation, Limited company. */
    'inc|ltd|' +

    /* English unit abbreviations:
     * - Note that *Metric abbreviations* do not use
     *   full stops.
     * - Note that some common plurals are included,
     *   although units should not be pluralised.
     *
     * barrel, cubic, dozen, fluid (ounce), foot, gallon, grain, gross,
     * inch, karat / knot, pound, mile, ounce, pint, quart, square,
     * tablespoon, teaspoon, yard. */
    'bbls?|cu|doz|fl|ft|gal|gr|gro|in|kt|lbs?|mi|oz|pt|qt|sq|tbsp|' +
    'tsp|yds?|' +

    /* Abbreviations of time references:
     * seconds, minutes, hours, Monday, Tuesday, *, Wednesday,
     * Thursday, *, Friday, Saturday, Sunday, January, Februari, March,
     * April, June, July, August, September, *, October, November,
     * December. */

    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar|' +
    'apr|jun|jul|aug|sep|sept|oct|nov|dec' +
  ')$'
  /*
   * NOTE! There's no `i` flag here because the value to
   * test against should be all lowercase!
   */
);

/* Match a blacklisted (case-sensitive) abbreviation
 * which when followed by a full-stop does not depict
 * a sentence terminal marker. */
var EXPRESSION_ABBREVIATION_ENGLISH_PREFIX_SENSITIVE = new RegExp(
  '^(' +
    /* Social:
     * Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
     * Misters, Mesdames, Junior, Senior, *. */
    'Mr|Mrs|Miss|Ms|Mss|Mses|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|' +

    /* Rank and academic:
     * Doctor, Magister, Attorney, Profesor, Honourable, Reverend,
     * Father, Monsignor, Sister, Brother, Saint, President,
     * Superintendent, Representative, Senator. */
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|' +

    /* Rank and military:
     * Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier,
     * General, Commander, Colonel, Captain, Lieutenant, Major,
     * Sergeant, Petty Officer, Warrant Officer, Purple Heart. */
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph|' +

    /* Common geographical abbreviations:
     *
     * Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
     * County, Park, Square, Drive, Port or Point, Street or State, Fort,
     * Peninsula, Territory, Highway, Freeway, Parkway. */
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St|' +
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy|' +

    /* American state abbreviations:
     * Alabama, Arizona, Arkansas, California, *, Colorado, *,
     * Connecticut, Delaware, Florida, Georgia,Idaho, *, Illinois,
     * Indiana, Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland,
     * Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,
     * Nebraska, *, Nevada, Mexico, Dakota, Oklahoma, *, Oregon,
     * Pennsylvania, *, *, Tennessee, Texas, Utah, Vermont, Virginia,
     * Washington, Wisconsin, *, Wyoming. */
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|' +
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|' +
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|' +
    'Wash|Wis|Wisc|Wyo|' +

    /* Canadian province abbreviations:
     * Alberta, Manitoba, Ontario, Quebec, *, Saskatchewan,
     * Yukon Territory. */
    'Alta|Man|Ont|Qu\u00E9|Que|Sask|Yuk|' +

    /* English county abbreviations:
     * Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire,
     * Cheshire, Cornwall, Cumberland, Derbyshire, *, Devon, Dorset,
     * Durham, Gloucestershire, Hampshire, Herefordshire, *,
     * Hertfordshire, Huntingdonshire, Lancashire, Leicestershire,
     * Lincolnshire, Middlesex, *, *, Norfolk, Northamptonshire,
     * Northumberland, *, Nottinghamshire, Oxfordshire, Rutland,
     * Shropshire, Somerset, Staffordshire, *, Suffolk, Surrey,
     * Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
     * Worcestershire, Yorkshire. */
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|' +
    'Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|' +
    'Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks' +
  ')$'
);

/* Match a blacklisted word which when followed by
 * an apostrophe depicts elision. */
var EXPRESSION_ELISION_ENGLISH_PREFIX = new RegExp(
  '^(' +
    /* Includes:
     * - o' > of;
     * - ol' > old. */
    'o|ol' +
  ')$'
);

/* Match a blacklisted word which when preceded by
 * an apostrophe depicts elision. */
var EXPRESSION_ELISION_ENGLISH_AFFIX = new RegExp(
  '^(' +
    /* Includes:
     * - 'im > him;
     * - 'er > her;
     * - 'em > them.
     * - 'cause > because. */
    'im|er|em|cause|' +

    /* Includes:
     * - 'twas > it was;
     * - 'tis > it is;
     * - 'twere > it were. */
    'twas|tis|twere|' +

    /* Matches groups of year, optionally followed
     * by an `s`. */
    '\\d\\ds?' +
  ')$'
);

/* Match one apostrophe. */
var EXPRESSION_APOSTROPHE = /^['\u2019]$/;

/* Merge a sentence into its next sentence,
 * when the sentence ends with a certain word. */
function mergeEnglishPrefixExceptions(child, index, parent) {
  var children = child.children;
  var prev;
  var node;
  var prevValue;
  var next;

  if (
    children &&
    children.length !== 0 &&
    index !== parent.children.length - 1
  ) {
    prev = children[children.length - 2];
    node = children[children.length - 1];

    if (
      node &&
      prev &&
      prev.type === 'WordNode' &&
      nlcstToString(node) === '.'
    ) {
      prevValue = nlcstToString(prev);

      if (
        EXPRESSION_ABBREVIATION_ENGLISH_PREFIX_SENSITIVE.test(prevValue) ||
        EXPRESSION_ABBREVIATION_ENGLISH_PREFIX.test(prevValue.toLowerCase())
      ) {
        next = parent.children[index + 1];

        child.children = children.concat(next.children);

        /* Update position. */
        if (child.position && next.position) {
          child.position.end = next.position.end;
        }

        parent.children.splice(index + 1, 1);

        return index - 1;
      }
    }
  }
}

/* Merge an apostrophe depicting elision into
 * its surrounding word. */
function mergeEnglishElisionExceptions(child, index, parent) {
  var siblings;
  var length;
  var value;
  var node;
  var other;

  if (child.type !== 'PunctuationNode' && child.type !== 'SymbolNode') {
    return;
  }

  siblings = parent.children;
  length = siblings.length;
  value = nlcstToString(child);

  /* Match abbreviation of `with`, `w/` */
  if (value === '/') {
    node = siblings[index - 1];

    if (node && nlcstToString(node).toLowerCase() === 'w') {
      /* Remove the slash from parent. */
      siblings.splice(index, 1);

      /* Append the slash into the children of the
       * previous node. */
      node.children.push(child);

      /* Update position. */
      if (node.position && child.position) {
        node.position.end = child.position.end;
      }
    }
  } else if (EXPRESSION_APOSTROPHE.test(value)) {
    /* If two preceding (the first white space and the
     * second a word), and one following (white space)
     * nodes exist... */
    node = siblings[index - 1];

    if (
      index > 2 &&
      index < length - 1 &&
      node.type === 'WordNode' &&
      siblings[index - 2].type === 'WhiteSpaceNode' &&
      siblings[index + 1].type === 'WhiteSpaceNode' &&
      EXPRESSION_ELISION_ENGLISH_PREFIX.test(
        nlcstToString(node).toLowerCase()
      )
    ) {
      /* Remove the apostrophe from parent. */
      siblings.splice(index, 1);

      /* Append the apostrophe into the children of
       * node. */
      node.children.push(child);

      /* Update position. */
      if (node.position && child.position) {
        node.position.end = child.position.end;
      }

      return;
    }

    /* If a following word exists, and the preceding node
     * is not a word... */
    if (
      index !== length - 1 &&
      siblings[index + 1].type === 'WordNode' &&
      (
        index === 0 ||
        siblings[index - 1].type !== 'WordNode'
      )
    ) {
      node = siblings[index + 1];
      value = nlcstToString(node).toLowerCase();

      if (EXPRESSION_ELISION_ENGLISH_AFFIX.test(value)) {
        /* Remove the apostrophe from parent. */
        siblings.splice(index, 1);

        /* Prepend the apostrophe into the children of
         * node. */
        node.children = [child].concat(node.children);

        /* Update position. */
        if (node.position && child.position) {
          node.position.start = child.position.start;
        }
      /* If both preceded and followed by an apostrophe,
       * and the word is `n`... */
      } else if (
        value === 'n' &&
        index < length - 2 &&
        EXPRESSION_APOSTROPHE.test(nlcstToString(siblings[index + 2]))
      ) {
        other = siblings[index + 2];

        /* Remove the apostrophe from parent. */
        siblings.splice(index, 1);
        siblings.splice(index + 1, 1);

        /* Prepend the preceding apostrophe and append
         * the into the following apostrophe into
         * the children of node. */
        node.children = [child].concat(node.children, other);

        /* Update position. */
        if (node.position) {
          /* istanbul ignore else */
          if (child.position) {
            node.position.start = child.position.start;
          }

          /* istanbul ignore else */
          if (other.position) {
            node.position.end = other.position.end;
          }
        }
      }
    }
  }
}

/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Sentence} Sentence
 */

import {toString} from 'nlcst-to-string'
import {ParseLatin} from 'parse-latin'
import {modifyChildren} from 'unist-util-modify-children'
import {visitChildren} from 'unist-util-visit-children'

/**
 * Create a new parser.
 *
 * `ParseEnglish` extends `ParseLatin`.
 * See `parse-latin` for API docs.
 */
export class ParseEnglish extends ParseLatin {}

/**
 * List of transforms handling a sentence.
 */
ParseEnglish.prototype.tokenizeSentencePlugins = [
  visitChildren(mergeEnglishElisionExceptions),
  ...ParseLatin.prototype.tokenizeSentencePlugins
]

/**
 * List of transforms handling a paragraph.
 */
ParseEnglish.prototype.tokenizeParagraphPlugins = [
  modifyChildren(mergeEnglishPrefixExceptions),
  ...ParseLatin.prototype.tokenizeParagraphPlugins
]

// To do: generate these expressions in a build script.
// <https://github.com/wooorm/markdown-tm-language/blob/0d68d92/build.js#L101>.

// Match a blacklisted (case-insensitive) abbreviation which when followed by a
// full-stop does not depict a sentence terminal marker.
const abbreviations = new RegExp(
  '^(' +
    // Business Abbreviations: Incorporation, Limited company.
    'inc|ltd|' +
    // English unit abbreviations:
    // -   Note that *Metric abbreviations* do not use full stops.
    // -   Note that some common plurals are included, although units should not
    //     be pluralised.
    //
    // barrel, cubic, dozen, fluid (ounce), foot, gallon, grain, gross,
    // inch, karat / knot, pound, mile, ounce, pint, quart, square,
    // tablespoon, teaspoon, yard.
    'bbls?|cu|doz|fl|ft|gal|gr|gro|in|kt|lbs?|mi|oz|pt|qt|sq|tbsp|' +
    'tsp|yds?|' +
    // Abbreviations of time references:
    // seconds, minutes, hours, Monday, Tuesday, *, Wednesday, Thursday, *,
    // Friday, Saturday, Sunday, January, Februari, March, April, June, July,
    // August, September, *, October, November, December.
    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar|' +
    'apr|jun|jul|aug|sep|sept|oct|nov|dec' +
    ')$'
  // Note: There's no `i` flag here because the value to test against should be
  // all lowercase!
)

// Match a blacklisted (case-sensitive) abbreviation which when followed by a
// full-stop does not depict a sentence terminal marker.
const abbreviationsSensitive = new RegExp(
  '^(' +
    // Social:
    // Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
    // Misters, Mesdames, Junior, Senior, *.
    'Mr|Mrs|Miss|Ms|Mss|Mses|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr|' +
    // Rank and academic:
    // Doctor, Magister, Attorney, Profesor, Honourable, Reverend, Father,
    // Monsignor, Sister, Brother, Saint, President, Superintendent,
    // Representative, Senator.
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen|' +
    // Rank and military:
    // Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier, General,
    // Commander, Colonel, Captain, Lieutenant, Major, Sergeant, Petty Officer,
    // Warrant Officer, Purple Heart.
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph|' +
    // Common geographical abbreviations:
    // Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
    // County, Park, Square, Drive, Port or Point, Street or State, Fort,
    // Peninsula, Territory, Highway, Freeway, Parkway.
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St|' +
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy|' +
    // American state abbreviations:
    // Alabama, Arizona, Arkansas, California, *, Colorado, *,
    // Connecticut, Delaware, Florida, Georgia, Idaho, *, Illinois, Indiana,
    // Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland, Massachusetts,
    // Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, *, Nevada,
    // Mexico, Dakota, Oklahoma, *, Oregon, Pennsylvania, *, *, Tennessee,
    // Texas, Utah, Vermont, Virginia, Washington, Wisconsin, *, Wyoming.
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind|' +
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb|' +
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va|' +
    'Wash|Wis|Wisc|Wyo|' +
    // Canadian province abbreviations:
    // Alberta, Manitoba, Ontario, Quebec, *, Saskatchewan, Yukon Territory.
    'Alta|Man|Ont|Que|Qué|Sask|Yuk|' +
    // English county abbreviations:
    // Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire, Cheshire,
    // Cornwall, Cumberland, Derbyshire, *, Devon, Dorset, Durham,
    // Gloucestershire, Hampshire, Herefordshire, *, Hertfordshire,
    // Huntingdonshire, Lancashire, Leicestershire, Lincolnshire, Middlesex,
    // *, *, Norfolk, Northamptonshire, Northumberland, *, Nottinghamshire,
    // Oxfordshire, Rutland, Shropshire, Somerset, Staffordshire, *, Suffolk,
    // Surrey, Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
    // Worcestershire, Yorkshire.
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|' +
    'Glos|Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|' +
    'Norf|Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks' +
    ')$'
)

// Match a blacklisted word which when followed by an apostrophe depicts
// elision.
const elisionPrefix = new RegExp(
  '^(' +
    // Includes: - o' > of; - ol' > old.
    'o|ol' +
    ')$'
)

// Match a blacklisted word which when preceded by an apostrophe depicts
// elision.
const elisionAffix = new RegExp(
  '^(' +
    // Includes: 'im > him; 'er > her; 'em > them. 'cause > because.
    'im|er|em|cause|' +
    // Includes: 'twas > it was; 'tis > it is; 'twere > it were.
    'twas|tis|twere|' +
    // Matches groups of year, optionally followed by an `s`.
    '\\d\\ds?' +
    ')$'
)

// Match one apostrophe.
const apostrophe = /^['’]$/

/**
 * Merge a sentence into its next sentence, when the sentence ends with a
 * certain word.
 *
 * @type {import('unist-util-modify-children').Modifier<Paragraph>}
 */
function mergeEnglishPrefixExceptions(sentence, index, paragraph) {
  if ('children' in sentence && sentence.children) {
    const period = sentence.children[sentence.children.length - 1]
    const word = sentence.children[sentence.children.length - 2]

    if (
      period &&
      period.type === 'PunctuationNode' &&
      toString(period) === '.' &&
      word &&
      word.type === 'WordNode'
    ) {
      const value = toString(word)

      if (
        abbreviations.test(value.toLowerCase()) ||
        abbreviationsSensitive.test(value)
      ) {
        // Merge period into abbreviation.
        word.children.push(period)
        sentence.children.pop()

        if (period.position && word.position) {
          word.position.end = period.position.end
        }

        // Merge sentences.
        const next = paragraph.children[index + 1]

        if (next && next.type === 'SentenceNode') {
          sentence.children.push(...next.children)
          paragraph.children.splice(index + 1, 1)

          // Update position.
          if (next.position && sentence.position) {
            sentence.position.end = next.position.end
          }

          // Next, iterate over the current node again.
          return index - 1
        }
      }
    }
  }
}

/**
 * Merge an apostrophe depicting elision into its surrounding word.
 *
 * @type {import('unist-util-visit-children').Visitor<Sentence>}
 */
function mergeEnglishElisionExceptions(child, index, sentence) {
  if (child.type === 'PunctuationNode' || child.type === 'SymbolNode') {
    const siblings = sentence.children
    const length = siblings.length
    const value = toString(child)

    // Match abbreviation of `with`, `w/`
    if (value === '/') {
      const sibling = siblings[index - 1]

      if (
        sibling &&
        sibling.type === 'WordNode' &&
        toString(sibling).toLowerCase() === 'w'
      ) {
        // Remove the slash from the sentence.
        siblings.splice(index, 1)

        // Append the slash into the children of the previous node.
        sibling.children.push(child)

        // Update position.
        if (sibling.position && child.position) {
          sibling.position.end = child.position.end
        }
      }
    } else if (apostrophe.test(value)) {
      // If two preceding (the first white space and the second a word), and one
      // following (white space) nodes exist...
      const sibling = siblings[index - 1]

      if (
        index > 2 &&
        index < length - 1 &&
        sibling.type === 'WordNode' &&
        siblings[index - 2].type === 'WhiteSpaceNode' &&
        siblings[index + 1].type === 'WhiteSpaceNode' &&
        elisionPrefix.test(toString(sibling).toLowerCase())
      ) {
        // Remove the apostrophe from the sentence.
        siblings.splice(index, 1)

        // Append the apostrophe into the children of node.
        sibling.children.push(child)

        // Update position.
        if (sibling.position && child.position) {
          sibling.position.end = child.position.end
        }

        return
      }

      // If a following word exists, and the preceding node is not a word...
      if (
        index !== length - 1 &&
        siblings[index + 1].type === 'WordNode' &&
        (index === 0 || siblings[index - 1].type !== 'WordNode')
      ) {
        const sibling = siblings[index + 1]
        const value = toString(sibling).toLowerCase()
        const other = siblings[index + 2]

        if (sibling.type === 'WordNode' && elisionAffix.test(value)) {
          // Remove the apostrophe from the sentence.
          siblings.splice(index, 1)

          // Prepend the apostrophe into the children of node.
          sibling.children.unshift(child)

          // Update position.
          if (sibling.position && child.position) {
            sibling.position.start = child.position.start
          }
          // If both preceded and followed by an apostrophe, and the word is
          // `n`...
        } else if (
          sibling.type === 'WordNode' &&
          value === 'n' &&
          other &&
          other.type === 'PunctuationNode' &&
          apostrophe.test(toString(other))
        ) {
          // Remove the apostrophe from the sentence.
          siblings.splice(index, 1)
          siblings.splice(index + 1, 1)

          // Prepend the preceding apostrophe and append the into the following
          // apostrophe into the children of node.
          sibling.children.unshift(child)
          sibling.children.push(other)

          // Update position.
          if (sibling.position) {
            if (child.position) {
              sibling.position.start = child.position.start
            }

            if (other.position) {
              sibling.position.end = other.position.end
            }
          }
        }
      }
    }
  }
}

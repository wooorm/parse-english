(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var textom, GROUP_NUMERICAL, GROUP_ALPHABETIC, GROUP_WHITE_SPACE,
    GROUP_COMBINING_DIACRITICAL_MARK, GROUP_TERMINAL_MARKER,
    GROUP_CLOSING_PUNCTUATION, GROUP_FINAL_PUNCTUATION,
    EXPRESSION_WORD_CONTRACTION, EXPRESSION_WORD_MULTIPUNCTUATION,
    EXPRESSION_WORD_DIGIT_LETTER, EXPRESSION_MULTILINEBREAK, STRING_PIPE,
    EXPRESSION_ABBREVIATION_PREFIX, EXPRESSION_WORD_CHARACTER,
    EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE, EXPRESSION_ABBREVIATION_AFFIX,
    EXPRESSION_SENTENCE_END, EXPRESSION_WORD_COMBINING, EXPRESSION_ORDINAL,
    EXPRESSION_INITIAL_WHITE_SPACE, EXPRESSION_WHITE_SPACE,
    GROUP_COMBINING_NONSPACING_MARK;

/**
 * Module dependencies.
 */
textom = require('textom');

/**
 * Expose `expand`. Expands a list of Unicode code points and ranges to
 * be usable in a regex character class.
 *
 * “Borrowed” from XRegexp.
 *
 * @param {String} value
 * @return {String}
 * @api private
 */
function expand(value) {
    return value.replace(/\w{4}/g, '\\u$&');
}

/**
 * Expose `GROUP_NUMERICAL`. Unicode Number Range (Nd, Nl, and No).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_NUMERICAL = expand(
    /*
     * Nd: Number, Decimal Digit
     */
    '0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F' +
    '09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF' +
    '20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F33' +
    '1040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-1819' +
    '1946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C49' +
    '1C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-' +
    '24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9' +
    'A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19' +

    /*
     * Nl: Number, Letter
     */
    '16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF' +

    /*
     * No: Number, Other
     */
    '00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D75' +
    '0F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F' +
    '21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA830-A835'
);

/**
 * Expose `GROUP_ALPHABETIC`. Unicode Alphabetic Range: Contains
 * Lu (Letter, uppercase), Ll (Letter, lowercase), and Lo (Letter, other).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_ALPHABETIC = expand('0041-005A0061-007A00AA00B500BA00C0-00D6' +
    '00D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377' +
    '037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-0527' +
    '0531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA' +
    '05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E8' +
    '06ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-' +
    '0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B' +
    '093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C' +
    '098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC' +
    '09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-' +
    '0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A51' +
    '0A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-' +
    '0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-' +
    '0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B44' +
    '0B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E' +
    '-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-' +
    '0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C28' +
    '0C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-' +
    '0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC4' +
    '0CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C' +
    '0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D63' +
    '0D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD4' +
    '0DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E88' +
    '0E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-' +
    '0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-' +
    '0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E' +
    '109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258' +
    '125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-' +
    '12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F4' +
    '1401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-1713' +
    '1720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D' +
    '717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-' +
    '196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00' +
    '-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-' +
    '1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F15' +
    '1F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB4' +
    '1FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-' +
    '1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D2124' +
    '21262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-' +
    '24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D' +
    '2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-' +
    '2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031' +
    '-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-' +
    '318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-' +
    'A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71F' +
    'A722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80A' +
    'A80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-' +
    'A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-' +
    'AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-' +
    'AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-' +
    'FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40' +
    'FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74' +
    'FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7' +
    'FFDA-FFDC'
);

/**
 * Expose `GROUP_WHITE_SPACE`. Unicode White Space Range.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_WHITE_SPACE = expand(
    '0009-000D0020008500A01680180E2000-200A20282029202F205F3000'
);

/**
 * Expose `GROUP_COMBINING_DIACRITICAL_MARK`. Unicode Combining
 * Diacritical Marks, and Combining Diacritical Marks for Symbols, Blocks.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_DIACRITICAL_MARK = expand('20D0-20FF0300-036F');

/**
 * Expose `GROUP_COMBINING_NONSPACING_MARK`. Unicode Mark, Nonspacing,
 * Block.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_NONSPACING_MARK = expand('0300-036F0483-04870591-05BD' +
    '05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E4' +
    '06E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-0823' +
    '0825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D' +
    '0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A42' +
    '0A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD' +
    '0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C40' +
    '0C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41' +
    '-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-' +
    '0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F86' +
    '0F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E1058' +
    '1059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-' +
    '1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D' +
    '18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A62' +
    '1A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B80' +
    '1B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C36' +
    '1C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC' +
    '20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67D' +
    'A69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951' +
    'A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0' +
    'AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0F' +
    'FE20-FE26'
);

/**
 * Expose `GROUP_TERMINAL_MARKER`. Interrobang, question-, and
 * exclamation mark
 *
 * @global
 * @private
 * @constant
 */
GROUP_TERMINAL_MARKER = '\\u203D\\?\\!';

/**
 * Expose `GROUP_CLOSING_PUNCTUATION`. Unicode
 * Pe (Punctuation, Close) category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_CLOSING_PUNCTUATION = expand('0029005D007D0F3B0F3D169C2046' +
    '207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF' +
    '298429862988298A298C298E2990299229942996299829D929DB29FD2E232E25' +
    '2E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36' +
    'FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63'
);

/**
 * Expose `GROUP_FINAL_PUNCTUATION`. Unicode
 * Pf (Punctuation, Final) category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_FINAL_PUNCTUATION = expand(
    '00BB2019201D203A2E032E052E0A2E0D2E1D2E21'
);

/**
 * `EXPRESSION_WORD_CONTRACTION` caches contractions consisting of two
 * parts.
 *
 * Sources:
 * - http://en.wikipedia.org/wiki/Relaxed_pronunciation#English
 * - http://en.wikipedia.org/wiki/Contraction_(grammar)#English
 * - http://en.wikipedia.org/wiki/English_auxiliaries_and_contractions
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_CONTRACTION = [
    /([\s\S])(n['’]t)\b/ig,
    /(['’]t)/ig,
    /\b(can)(not)\b/ig,
    /\b(gim)(me)\b/ig,
    /\b(lem)(me)\b/ig,
    /\b(could|must|should|would|kind|sort|ought)(a)\b/ig,
    /\b(wan|gon)(na)\b/ig,
    /\b(don|got|get)(cha)\b/ig,
    /\b(out|lot|haf|got)(ta)\b/ig
];

/**
 * `EXPRESSION_WORD_MULTIPUNCTUATION` matches either an astral plane
 * character, or streaks of the same punctuation character.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_MULTIPUNCTUATION = new RegExp(
    '([\\uD800-\\uDBFF][\\uDC00-\\uDFFF])+|[\\s\\S][' +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK +
    ']{2,}|([^' + GROUP_NUMERICAL + GROUP_ALPHABETIC + '])\\2*', 'g'
);

/**
 * `EXPRESSION_WORD_COMBINING` matches multiple combining mark
 * characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_COMBINING = new RegExp(
    '^([' +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK +
    '])+$'
);

/**
 * `EXPRESSION_WORD_DIGIT_LETTER` matches one or more digits followed by
 * one or more letters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_DIGIT_LETTER = new RegExp('([' + GROUP_NUMERICAL +
    ']+)([' + GROUP_ALPHABETIC + ']+)', 'g'
);

/**
 * `EXPRESSION_ORDINAL` matches an ordinal suffix: `th`, `st`, `nd`,
 * or `rd`.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ORDINAL = /^(th|st|nd|rd)$/i;

/**
 * `EXPRESSION_MULTILINEBREAK` matches initial, internal, and final white
 *  space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_MULTILINEBREAK = /(\r?\n|\r)*$|^(\r?\n|\r)+|(\r?\n|\r){2,}/g;

/**
 * `STRING_PIPE` holds a pipe (`|`) character.
 *
 * @global
 * @private
 * @constant
 */
STRING_PIPE = '|';

/**
 * `EXPRESSION_ABBREVIATION_PREFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A “word” boundry,
 * followed by a case-insensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '\\b(' + [
    /* *Alphabet*. */
    '[a-z]',

    /*
     * Common Latin Abbreviations:
     * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
     * Where only the abbreviations written without joining full stops,
     * but with a final full stop, were extracted.
     *
     * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
     * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
     * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
     * sic erat scriptum, (et) sequentia, statim, videlicet.
     */
    'c?ca|cap|cf|cp|cwt|ead|al|etc|fl|ff|ibid|id|nem|con|op|cit|cent',
    'pro|tem|sic|seq|stat|viz',

    /*
     * Business Abbreviations:
     * Incorporation, Limited company.
     */
    'inc|ltd',

    /*
     * English unit abbreviations:
     * Note that *Metric abbreviations* do not use full stops.
     *
     * barrel, cubic, dozen, fluid ounce, foot, gallon, grain, gross,
     * inch, karat / knot, pound, mile, ounce, pint, quart, square,
     * tablespoon, teaspoon, yard.
     */
    'bbls?|cu|dozfl|oz|ft|gal|gr|gro|in|kt|lb|mi|oz|pt|qt|sq|tbsp|tsp|yd',

    /*
     * Abbreviations of time references:
     *
     * seconds, minutes, hours, Monday, Tuesday, *, Wednesday,
     * Thursday, *, Friday, Saturday, Sunday, January, Februari, March,
     * April, June, July, August, September, *, October, November,
     * December.
     */
    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar',
    'apr|jun|jul|aug|sep|sept|oct|nov|dec'
    ].join(STRING_PIPE) + ')\\.',
'gi');

/**
 * `EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE` holds a blacklist of full
 * stop characters that should not be treated as terminal sentence
 * markers:
 *
 * A “word” boundry,
 * followed by a case-sensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE = new RegExp(
    '\\b(' + [
    /* Decimals */
    '[0-9]',

    /* Social:
     * Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
     * Misters, Mesdames, Junior, Senior, *.
     */
    'Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr',

    /*
     * Rank and academic:
     * Doctor, Magister, Attorney, Profesor, Honourable, Reverend,
     * Father, Monsignor, Sister, Brother, Saint, President,
     * Superintendent, Representative, Senator.
     */
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen',

    /* Rank and military:
     * Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier,
     * General, Commander, Colonel, Captain, Lieutenant, Major,
     * Sergeant, Petty Officer, Warrant Officer, Purple Heart.
     */
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph',

    /*
     * Common geographical abbreviations:
     * Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
     * County, Park, Square, Drive, Port or Point, Street or State, Fort,
     * Peninsula, Territory, Highway, Freeway, Parkway.
     */
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St',
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy',

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
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind',
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb',
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va',
    'Wash|Wis|Wisc|Wyo',

    /*
     * Canadian province abbreviations:
     * Alberta, Manitoba, Ontario, Québec, *, Saskatchewan,
     * Yukon Territory.
     */
    'Alta|Man|Ont|Qué|Que|Sask|Yuk',

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
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|Glos',
    'Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf',
    'Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|Staffs',
    'Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks'

    ].join(STRING_PIPE) + ')\\.',
'g');

/**
 * `EXPRESSION_ABBREVIATION_AFFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A full stop,
 * followed by a case-sensitive abbreviation,
 * followed by “word” boundry.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_AFFIX = new RegExp(
    '\\.(' + [
    /*
     * Generic Top-level Domains:
     * Air transport industry, Asia-Pacific, business use, Catalan,
     * commercial organizations, cooperatives,
     * U.S. post-secondary educational establishments,
     * U.S. government entities, informational sites,
     * international organizations, employment-related,
     * U.S. military, mobile devices, museums, families and individuals,
     * network infrastructures, organizations, postal services,
     * professions, telephone network, travel, pornography.
     */
    'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi',
    'museum|name|net|org|post|pro|tel|travel|xxx',

    /* Decimals */
    '0|1|2|3|4|5|6|7|8|9'
    ].join(STRING_PIPE) + ')\\b',
'g');

/**
 * `EXPRESSION_WORD_CHARACTER` finds a word character.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_CHARACTER = new RegExp('[' + GROUP_ALPHABETIC + ']');

/**
 * `EXPRESSION_SENTENCE_END` finds probable sentence ends.
 *
 * A probable sentence end:
 * A terminal marker (`?`, `!`, or `.`),
 * followed by an optional closing punctuation (e.g., `)` or `”`),
 * followed by an optional comma, full stop, or number,
 * optionally followed by one or more spaces and a letter.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_SENTENCE_END = new RegExp(
    '(\\.|[' + GROUP_TERMINAL_MARKER + ']+)' +
    '([' + GROUP_CLOSING_PUNCTUATION + GROUP_FINAL_PUNCTUATION + '])?' +
    '([,\\.' + GROUP_NUMERICAL + '])?' +
    '(?:(\\ +)([\\.' + GROUP_ALPHABETIC + ']))?|$',
'g');

/**
 * `EXPRESSION_INITIAL_WHITE_SPACE` matches optional white space at the start
 * of a string, followed by any other characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_INITIAL_WHITE_SPACE = new RegExp(
    '^([' + GROUP_WHITE_SPACE + ']+)?'
);

/**
 * `EXPRESSION_WHITE_SPACE` matches a string containing ONLY white space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WHITE_SPACE = new RegExp(
    '^[' + GROUP_WHITE_SPACE + ']+$'
);

/**
 * `BREAKPOINT_SORT` sorts breakpoints (an array of integers): Small to
 * large.
 *
 * @global
 * @private
 * @constant
 */
function BREAKPOINT_SORT(a, b) {
    return a - b;
}

/*eslint-disable no-cond-assign */

/**
 * `tokenizeSentence` tokenizes a sentence into `WordNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @param {SentenceNode} sentence - The SentenceNode to append to.
 * @param {String} value - The words, punctuation, and white space to
 *                         parse.
 * @return {SentenceNode} - The given SentenceNode.
 * @global
 * @private
 */
function tokenizeSentence(sentence, value) {
    var tokenBreakPoints = [],
        tokens = [],
        iterator = -1,
        length = EXPRESSION_WORD_CONTRACTION.length,
        expression, pointer, match, token, start, end;

    EXPRESSION_WORD_DIGIT_LETTER.lastIndex =
        EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

    /* Insert word-like break points. */

    /* Break between contractions consisting of two parts. */
    while (++iterator < length) {
        expression = EXPRESSION_WORD_CONTRACTION[iterator];
        expression.lastIndex = 0;

        while (match = expression.exec(value)) {
            tokenBreakPoints.push(match.index + match[1].length);
        }
    }

    /*
     * Break on general punctuation (One or more of the same
     * non-letter or non-number character.
     */
    while (match = EXPRESSION_WORD_MULTIPUNCTUATION.exec(value)) {
        if (EXPRESSION_WORD_COMBINING.test(match[0])) {
            continue;
        }

        pointer = match.index;
        tokenBreakPoints.push(pointer);
        tokenBreakPoints.push(pointer + match[0].length);
    }

    /* Break on one or more digits followed by one or more letters. */
    while (match = EXPRESSION_WORD_DIGIT_LETTER.exec(value)) {
        if (!EXPRESSION_ORDINAL.test(match[2])) {
            tokenBreakPoints.push(match.index + match[1].length);
        }
    }

    tokenBreakPoints.sort(BREAKPOINT_SORT);

    iterator = -1;
    length = tokenBreakPoints.length + 1;
    start = 0;

    while (++iterator < length) {
        end = tokenBreakPoints[iterator];

        /* Skip if the previous end is the same. */
        if (end === 0 || start === end) {
            continue;
        }

        tokens.push(value.substring(start, end || value.length));

        start = end;
    }

    /* Iterate over the non-empty tokens, detect type of token. */
    iterator = -1;
    EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

    while (token = tokens[++iterator]) {
        EXPRESSION_WORD_MULTIPUNCTUATION.lastIndex = 0;

        /*
         * Append a new item (glue or box) to the list, and pass it the
         * string value and the item its in.
         */
        if (EXPRESSION_WHITE_SPACE.test(token)) {
            sentence.append(new sentence.TextOM.WhiteSpaceNode(token));
        } else if (
            (match = EXPRESSION_WORD_MULTIPUNCTUATION.exec(token)) &&
            !EXPRESSION_WORD_COMBINING.test(match[0])
        ) {
            sentence.append(new sentence.TextOM.PunctuationNode(token));
        } else {
            sentence.append(new sentence.TextOM.WordNode(token));
        }
    }

    return sentence;
}

/**
 * `tokenizeParagraph` tokenizes a paragraph into `SentenceNode`s and
 * `WhiteSpaceNode`s.
 *
 * @param {ParagraphNode} paragraph - The ParagraphNode to append to.
 * @param {String} value - The sentences and white space to parse.
 * @return {ParagraphNode} - The given ParagraphNode.
 * @global
 * @private
 */
function tokenizeParagraph(paragraph, value) {
    var sentences = [],
        blacklist = {},
        iterator = -1,
        TextOM = paragraph.TextOM,
        start, sentence, match, $5, end, whiteSpace;

    EXPRESSION_SENTENCE_END.lastIndex =
        EXPRESSION_ABBREVIATION_PREFIX.lastIndex =
        EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE.lastIndex =
        EXPRESSION_ABBREVIATION_AFFIX.lastIndex = 0;

    /* A (case insensitive) common abbreviation, followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX.exec(value)) {
        blacklist[match.index + match[1].length] = true;
    }

    /* A (case sensitive) common abbreviation, followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE.exec(value)) {
        blacklist[match.index + match[1].length] = true;
    }

    /* A full stop, followed by a common abbreviation. */
    while (match = EXPRESSION_ABBREVIATION_AFFIX.exec(value)) {
        blacklist[match.index] = true;
    }

    start = 0;

    /*
     * A probable sentence end: A terminal marker (`?`, `!`, or `.`),
     * followed by an optional closing punctuation (e.g., `)` or `”`),
     * followed by an optional comma or full stop, followed by an optional
     * comma or dot, optionally followed by one or more spaces and a
     * letter.
     */
    while (match = EXPRESSION_SENTENCE_END.exec(value)) {
        /*
         * The probable sentence end is blacklisted, thus in an abbreviation.
         */
        if (match.index in blacklist) {
            continue;
        }

        /*
         * If three was set, the delimiter is followed by a comma character,
         * or a number, thus it's probably not a terminal
         * marker.
         */
        if (match[3]) {
            continue;
        }

        $5 = match[5];

        /*
         * If four was set, the delimiter is followed by a space and a letter.
         * If that letter is lowercase, its probably not a terminal marker.
         */
        if ($5 && $5 === $5.toLowerCase()) {
            continue;
        }

        end = match.index + (match[1] || '').length + (match[2] || '').length;

        sentence = value.substring(start, end);

        /*
         * If the sentence contains an alphabetic character...
         * This prevents ellipses joined by spaces from classifying as a
         * sentence.
         */
        if (EXPRESSION_WORD_CHARACTER.test(sentence)) {
            sentences.push(sentence);
        /*
         * Otherwise, if a previous sentence already exists, append the
         * invalid “sentence” to the previous sentence.
         */
        } else if (sentences.length) {
            sentences[sentences.length - 1] += sentence;
        /*
         * Otherwise, if this is the only content in the paragraph,
         * classify it as a sentence nonetheless.
         */
        } else if (end === value.length) {
            sentences.push(sentence);
        /* Otherwise, prepend the content to the next sentence. */
        } else {
            end -= sentence.length;
        }

        /*
         * The expression also matches $ (end-of-string), which keeps on
         * matching in global state, thus we detect it here and exit the loop.
         */
        if (EXPRESSION_SENTENCE_END.lastIndex === value.length) {
            break;
        }

        start = end;
    }

    /*
     * Walk over the previously sentences, break of their white space, and
     * transform them into the object model.
     */
    while (sentence = sentences[++iterator]) {
        match = EXPRESSION_INITIAL_WHITE_SPACE.exec(sentence);
        whiteSpace = match[0];

        if (whiteSpace) {
            paragraph.append(
                new TextOM.WhiteSpaceNode(whiteSpace)
            );
        }

        tokenizeSentence(paragraph.append(
            new TextOM.SentenceNode()), sentence.substring(whiteSpace.length)
        );
    }

    return paragraph;
}

/**
 * `tokenizeRoot` tokenizes a document into `ParagraphNode`s and
 * `WhiteSpaceNode`s.
 *
 * @param {RootNode} root - The RootNode to append to.
 * @param {String} value - The paragraphs and white space to parse.
 * @return {RootNode} - The given RootNode.
 * @global
 * @private
 */
function tokenizeRoot(root, value) {
    var start = 0,
        TextOM = root.TextOM,
        match, end, paragraph, whiteSpace;

    if (!value) {
        return root;
    }

    EXPRESSION_MULTILINEBREAK.lastIndex = 0;

    while (match = EXPRESSION_MULTILINEBREAK.exec(value)) {
        end = match.index + match[0].length;

        paragraph = value.substring(start, match.index);
        whiteSpace = value.substring(match.index, end);

        if (paragraph) {
            tokenizeParagraph(
                root.append(new TextOM.ParagraphNode()), paragraph
            );
        }

        if (whiteSpace) {
            root.append(new TextOM.WhiteSpaceNode(whiteSpace));
        }

        /*
         * The expression also matches $ (end-of-string), which keeps on
         * matching in global state, thus we detect it here and exit the loop.
         */
        if (EXPRESSION_MULTILINEBREAK.lastIndex === value.length) {
            break;
        }

        start = end;
    }

    return root;
}

/*eslint-enable no-cond-assign */

/**
 * Expose `parseEnglishConstructor`. Used to construct a new parser.
 */
function parseEnglishConstructor() {
    var TextOM = textom(),
        types = TextOM.types = [],
        key, Constructor, prototype;

    for (key in TextOM) {
        /* istanbul ignore else */
        if (TextOM.hasOwnProperty(key)) {
            Constructor = TextOM[key];
            prototype = Constructor && Constructor.prototype;

            if (prototype && 'type' in prototype) {
                types[prototype.type] = key;
            }
        }
    }

    /**
     * `parser` parsed a given english (or latin) document into root,
     * paragraphs, sentences, words, punctuation, and white space “nodes”.
     * For more information about nodes see TextOM.
     *
     * @param {(String|Node)?} source - The source to convert.
     * @return {Node} - A RootNode containing the tokenised source.
     * @api public
     */
    function parser(source) {
        if (source === null || source === undefined) {
            source = '';
        } else if (source instanceof TextOM.Node ||
            source instanceof String) {
                source = source.toString();
        }

        if (typeof source !== 'string') {
            throw new TypeError('Illegal invocation: \'' + source +
                '\' is not a valid argument for \'ParseEnglish\'');
        }

        return tokenizeRoot(new TextOM.RootNode(), source);
    }

    /**
     * Expose `TextOM`.
     *
     * @api public
     * @memberof parser
     * @constructor
     */
    parser.TextOM = TextOM;

    /**
     * Expose `parser` on every node.
     *
     * @api public
     * @memberof TextOM.Node.prototype
     */
    TextOM.Node.prototype.parser = parser;

    return parser;
}

module.exports = parseEnglishConstructor;

},{"textom":8}],2:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":4}],3:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require("FWaASH"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"FWaASH":6,"inherits":5}],5:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],7:[function(require,module,exports){
'use strict';

exports = module.exports = function () {};

/* istanbul ignore if: User forgot a polyfill much? */
if (!JSON) {
    throw new Error('Missing JSON object for reparser');
}

/**
 * `fromJSON` converts a given (stringified?) JSON AST into a node.
 *
 * @param {Object} TextOM - The TextOM to get nodes from.
 * @param {Object|String} ast - The AST to convert.
 * @return {Object} - The parsed node.
 * @global
 * @private
 */
function fromJSON(TextOM, ast) {
    var iterator = -1,
        children, node;

    if (ast instanceof String) {
        ast = ast.toString();
    }

    if (typeof ast === 'string') {
        ast = JSON.parse(ast);
    } else if ({}.toString.call(ast) !== '[object Object]') {
        throw new TypeError('Illegal invocation: \'' + ast +
            '\' is not a valid argument for \'fromAST\'');
    }

    if (!('type' in ast && ('value' in ast || 'children' in ast))) {
        throw new TypeError('Illegal invocation: \'' + ast +
            '\' is not a valid argument for \'fromAST\' (it\'s ' +
            'missing the `type`, and either `value` or `children` ' +
            'attributes)');
    }

    node = new TextOM[ast.type]();

    if ('children' in ast) {
        iterator = -1;
        children = ast.children;

        while (children[++iterator]) {
            node.append(fromJSON(TextOM, children[iterator]));
        }
    } else {
        node.fromString(ast.value);
    }

    return node;
}

/**
 * `fromAST` converts a given (stringified?) AST into a node.
 *
 * @param {Object|String} ast - The AST to convert.
 * @return {Object} - The parsed node.
 * @global
 * @private
 */
function fromAST(ast) {
    return this.parse(fromJSON(this.parser.TextOM, ast));
}

/**
 * `toJSON` converts the given node to a JSON object.
 *
 * @return {Object} - A simple object containing the nodes type, and
 *                    either a children attribute containing an array
 *                    the result of `toJSON` on each child, or a value
 *                    attribute containing the nodes internal value.
 * @global
 * @private
 */
function toJSON() {
    var self = this,
        ast, result, item;

    if (!self || !self.TextOM) {
        throw new TypeError('Illegal invocation: \'' + self +
            '\' is not a valid argument for \'toJSON\'');
    }

    ast = {
        'type' : self.TextOM.types[self.type]
    };

    if (!('length' in self)) {
        ast.value = self.toString();
    } else {
        result = [];
        item = self.head;

        while (item) {
            result.push(item.toJSON());
            item = item.next;
        }

        ast.children = result;
    }

    return ast;
}

/**
 * `toAST` converts the operated on node into an stringified JSON object.
 *
 * @param {?(String|Number)} delimiter - When given, pretty prints the
 *                                       stringified object—indenting
 *                                       each level either with the given
 *                                       string or with the given number
 *                                       of spaces.
 * @return {String} - The `JSON.stringify`d result of the simple object
 *                    representation of the operated on node.
 * @global
 * @private
 */
function toAST(delimiter) {
    return JSON.stringify(this, null, delimiter);
}

function attach(retext) {
    var parser = retext.parser,
        nodePrototype = parser.TextOM.Node.prototype;

    /**
     * `toAST` converts the operated on node into an stringified JSON object.
     *
     * @param {?(String|Number)} delimiter - When given, pretty prints the
     *                                       stringified object—indenting
     *                                       each level either with the given
     *                                       string or with the given number
     *                                       of spaces.
     * @return {String} - The `JSON.stringify`d result of the simple object
     *                    representation of the operated on node.
     * @api public
     * @memberof Node.prototype
     */
    nodePrototype.toAST = toAST;

    /**
     * `toAST` converts the operated on node into an JSON object.
     *
     * @return {Object} - A JSON representation without all the cyclical
     *                    TextOM things.
     * @api public
     * @memberof Node.prototype
     */
    nodePrototype.toJSON = toJSON;

    /**
     * Expose `fromAST`.
     *
     * @param {Object|String} ast - The AST to convert.
     * @return {Object} - A TextOM object model.
     * @api public
     * @memberof retext
     */
    retext.fromAST = fromAST;
}

/**
 * Expose `attach`.
 * @memberof exports
 */
exports.attach = attach;

/**
 * Expose `toJSON`.
 * @memberof exports
 */
exports.toJSON = toJSON;

/**
 * Expose `toAST`.
 * @memberof exports
 */
exports.toAST = toAST;

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Utilities.
 */
var arrayPrototype = Array.prototype,
    arrayUnshift = arrayPrototype.unshift,
    arrayPush = arrayPrototype.push,
    arraySlice = arrayPrototype.slice,
    arrayIndexOf = arrayPrototype.indexOf,
    arraySplice = arrayPrototype.splice;

/* istanbul ignore if: User forgot a polyfill much? */
if (!arrayIndexOf) {
    throw new Error('Missing Array#indexOf() method for TextOM');
}

function fire(context, callbacks, args) {
    var iterator = -1;

    if (!callbacks || !callbacks.length) {
        return;
    }

    callbacks = callbacks.concat();

    while (callbacks[++iterator]) {
        callbacks[iterator].apply(context, args);
    }

    return;
}

function trigger(context, name) {
    var args = arraySlice.call(arguments, 2),
        callbacks;

    while (context) {
        callbacks = context.callbacks;
        if (callbacks) {
            fire(context, callbacks[name], args);
        }

        callbacks = context.constructor.callbacks;
        if (callbacks) {
            fire(context, callbacks[name], args);
        }

        context = context.parent;
    }
}

function emit(context, name) {
    var args = arraySlice.call(arguments, 2),
        constructors = context.constructor.constructors,
        iterator = -1,
        callbacks = context.callbacks;

    if (callbacks) {
        fire(context, callbacks[name], args);
    }

    /* istanbul ignore if: Wrong-usage */
    if (!constructors) {
        return;
    }

    while (constructors[++iterator]) {
        callbacks = constructors[iterator].callbacks;

        if (callbacks) {
            fire(context, callbacks[name], args);
        }
    }
}

/**
 * Inserts the given `child` after (when given), the `item`, and otherwise as
 * the first item of the given parents.
 *
 * @param {Object} parent
 * @param {Object} item
 * @param {Object} child
 * @api private
 */
function insert(parent, item, child) {
    var next;

    if (!parent) {
        throw new TypeError('Illegal invocation: \'' + parent +
            ' is not a valid argument for \'insert\'');
    }

    if (!child) {
        throw new TypeError('\'' + child +
            ' is not a valid argument for \'insert\'');
    }

    if ('hierarchy' in child && 'hierarchy' in parent) {
        if (parent.hierarchy + 1 !== child.hierarchy) {
            throw new Error('HierarchyError: The operation would ' +
                'yield an incorrect node tree');
        }
    }

    if (typeof child.remove !== 'function') {
        throw new Error('The operated on node did not have a ' +
            '`remove` method');
    }

    /* Insert after... */
    if (item) {
        /* istanbul ignore if: Wrong-usage */
        if (item.parent !== parent) {
            throw new Error('The operated on node (the "pointer") ' +
                'was detached from the parent');
        }

        /* istanbul ignore if: Wrong-usage */
        if (arrayIndexOf.call(parent, item) === -1) {
            throw new Error('The operated on node (the "pointer") ' +
                'was attached to its parent, but the parent has no ' +
                'indice corresponding to the item');
        }
    }

    /* Detach the child. */
    child.remove();

    /* Set the child's parent to items parent. */
    child.parent = parent;

    if (item) {
        next = item.next;

        /* If item has a next node... */
        if (next) {
            /* ...link the child's next node, to items next node. */
            child.next = next;

            /* ...link the next nodes previous node, to the child. */
            next.prev = child;
        }

        /* Set the child's previous node to item. */
        child.prev = item;

        /* Set the next node of item to the child. */
        item.next = child;

        /* If the parent has no last node or if item is the parent last node,
         * link the parents last node to the child. */
        if (item === parent.tail || !parent.tail) {
            parent.tail = child;
            arrayPush.call(parent, child);
        /* Else, insert the child into the parent after the items index. */
        } else {
            arraySplice.call(
                parent, arrayIndexOf.call(parent, item) + 1, 0, child
            );
        }
    /* If parent has a first node... */
    } else if (parent.head) {
        next = parent.head;

        /* Set the child's next node to head. */
        child.next = next;

        /* Set the previous node of head to the child. */
        next.prev = child;

        /* Set the parents heads to the child. */
        parent.head = child;

        /* If the the parent has no last node, link the parents last node to
         * head. */
        if (!parent.tail) {
            parent.tail = next;
        }

        arrayUnshift.call(parent, child);
    /* Prepend. There is no `head` (or `tail`) node yet. */
    } else {
        /* Set parent's first node to the prependee and return the child. */
        parent.head = child;
        parent[0] = child;
        parent.length = 1;
    }

    next = child.next;

    emit(child, 'insert');

    if (item) {
        emit(item, 'changenext', child, next);
        emit(child, 'changeprev', item, null);
    }

    if (next) {
        emit(next, 'changeprev', child, item);
        emit(child, 'changenext', next, null);
    }

    trigger(parent, 'insertinside', child);

    return child;
}

/**
 * Detach a node from its (when applicable) parent, links its (when
 * existing) previous and next items to each other.
 *
 * @param {Object} node
 * @api private
 */
function remove(node) {
    /* istanbul ignore if: Wrong-usage */
    if (!node) {
        return false;
    }

    /* Cache self, the parent list, and the previous and next items. */
    var parent = node.parent,
        prev = node.prev,
        next = node.next,
        indice;

    /* If the item is already detached, return node. */
    if (!parent) {
        return node;
    }

    /* If node is the last item in the parent, link the parents last
     * item to the previous item. */
    if (parent.tail === node) {
        parent.tail = prev;
    }

    /* If node is the first item in the parent, link the parents first
     * item to the next item. */
    if (parent.head === node) {
        parent.head = next;
    }

    /* If both the last and first items in the parent are the same,
     * remove the link to the last item. */
    if (parent.tail === parent.head) {
        parent.tail = null;
    }

    /* If a previous item exists, link its next item to nodes next
     * item. */
    if (prev) {
        prev.next = next;
    }

    /* If a next item exists, link its previous item to nodes previous
     * item. */
    if (next) {
        next.prev = prev;
    }

    /* istanbul ignore else: Wrong-usage */
    if ((indice = arrayIndexOf.call(parent, node)) !== -1) {
        arraySplice.call(parent, indice, 1);
    }

    /* Remove links from node to both the next and previous items,
     * and to the parent. */
    node.prev = node.next = node.parent = null;

    emit(node, 'remove', parent);

    if (next) {
        emit(next, 'changeprev', prev || null, node);
        emit(node, 'changenext', null, next);
    }

    if (prev) {
        emit(node, 'changeprev', null, prev);
        emit(prev, 'changenext', next || null, node);
    }

    trigger(parent, 'removeinside', node, parent);

    /* Return node. */
    return node;
}

function listen(name, callback) {
    var self = this,
        callbacks;

    if (typeof name !== 'string') {
        if (name === null || name === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + name +
            ' is not a valid argument for \'listen\'');
    }

    if (typeof callback !== 'function') {
        if (callback === null || callback === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + callback +
            ' is not a valid argument for \'listen\'');
    }

    callbacks = self.callbacks || (self.callbacks = {});
    callbacks = callbacks[name] || (callbacks[name] = []);
    callbacks.unshift(callback);

    return self;
}

function ignore(name, callback) {
    var self = this,
        callbacks, indice;

    if ((name === null || name === undefined) &&
        (callback === null || callback === undefined)) {
        self.callbacks = {};
        return self;
    }

    if (typeof name !== 'string') {
        if (name === null || name === undefined) {
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + name +
            ' is not a valid argument for \'listen\'');
    }

    if (!(callbacks = self.callbacks)) {
        return self;
    }

    if (!(callbacks = callbacks[name])) {
        return self;
    }

    if (typeof callback !== 'function') {
        if (callback === null || callback === undefined) {
            callbacks.length = 0;
            return self;
        }

        throw new TypeError('Illegal invocation: \'' + callback +
            ' is not a valid argument for \'listen\'');
    }

    if ((indice = callbacks.indexOf(callback)) !== -1) {
        callbacks.splice(indice, 1);
    }

    return self;
}

function TextOMConstructor() {
    /**
     * Expose `Node`. Initialises a new `Node` object.
     *
     * @api public
     * @constructor
     */
    function Node() {
        if (!this.data) {
            /** @member {Object} */
            this.data = {};
        }
    }

    var prototype = Node.prototype;

    prototype.on = Node.on = listen;

    prototype.off = Node.off = ignore;

    /**
     * Inherit the contexts' (Super) prototype into a given Constructor. E.g.,
     * Node is implemented by Parent, Parent is implemented by RootNode, &c.
     *
     * @param {function} Constructor
     * @api public
     */
    Node.isImplementedBy = function (Constructor) {
        var self = this,
            constructors = self.constructors || [self],
            constructorPrototype, key, newPrototype;

        constructors = [Constructor].concat(constructors);

        constructorPrototype = Constructor.prototype;

        function AltConstructor () {}
        AltConstructor.prototype = self.prototype;
        newPrototype = new AltConstructor();

        for (key in constructorPrototype) {
            newPrototype[key] = constructorPrototype[key];
        }

        if (constructorPrototype.toString !== {}.toString) {
            newPrototype.toString = constructorPrototype.toString;
        }

        for (key in self) {
            /* istanbul ignore else */
            if (self.hasOwnProperty(key)) {
                Constructor[key] = self[key];
            }
        }

        newPrototype.constructor = Constructor;
        Constructor.constructors = constructors;
        Constructor.prototype = newPrototype;
    };

    /**
     * Expose Parent. Constructs a new Parent node;
     *
     * @api public
     * @constructor
     */
    function Parent() {
        Node.apply(this, arguments);
    }

    prototype = Parent.prototype;

    /**
     * The first child of a parent, null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.head = null;

    /**
     * The last child of a parent (unless the last child is also the first
     * child), null otherwise.
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.tail = null;

    /**
     * The number of children in a parent.
     *
     * @api public
     * @type {number}
     * @readonly
     */
    prototype.length = 0;

    /**
     * Insert a child at the beginning of the list (like Array#unshift).
     *
     * @param {Child} child - the child to insert as the (new) FIRST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.prepend = function (child) {
        return insert(this, null, child);
    };

    /**
     * Insert a child at the end of the list (like Array#push).
     *
     * @param {Child} child - the child to insert as the (new) LAST child
     * @return {Child} - the given child.
     * @api public
     */
    prototype.append = function (child) {
        return insert(this, this.tail || this.head, child);
    };

    /**
     * Return a child at given position in parent, and null otherwise. (like
     * NodeList#item).
     *
     * @param {?number} [index=0] - the position to find a child at.
     * @return {Child?} - the found child, or null.
     * @api public
     */
    prototype.item = function (index) {
        if (index === null || index === undefined) {
            index = 0;
        } else if (typeof index !== 'number' || index !== index) {
            throw new TypeError('\'' + index + ' is not a valid argument ' +
                'for \'Parent.prototype.item\'');
        }

        return this[index] || null;
    };

    /**
     * Split the Parent into two, dividing the children from 0–position (NOT
     * including the character at `position`), and position–length (including
     * the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Parent} - the prepended parent.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            clone, cloneNode, iterator;

        if (position === null || position === undefined ||
            position !== position || position === -Infinity) {
                position = 0;
        } else if (position === Infinity) {
            position = self.length;
        } else if (typeof position !== 'number') {
            throw new TypeError('\'' + position + ' is not a valid ' +
                'argument for \'Parent.prototype.split\'');
        } else if (position < 0) {
            position = Math.abs((self.length + position) % self.length);
        }

        /* This throws if we're not attached, thus preventing appending. */
        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        clone = arraySlice.call(self);
        iterator = -1;

        while (++iterator < position && clone[iterator]) {
            cloneNode.append(clone[iterator]);
        }

        return cloneNode;
    };

    /**
     * Return the result of calling `toString` on each of `Parent`s children.
     *
     * NOTE The `toString` method is intentionally generic; It can be
     * transferred to other kinds of (linked-list-like) objects for use as a
     * method.
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        var value, node;

        value = '';
        node = this.head;

        while (node) {
            value += node;
            node = node.next;
        }

        return value;
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Parent);

    /**
     * Expose Child. Constructs a new Child node;
     *
     * @api public
     * @constructor
     */
    function Child() {
        Node.apply(this, arguments);
    }

    prototype = Child.prototype;

    /**
     * The parent node, null otherwise (when the child is detached).
     *
     * @api public
     * @type {?Parent}
     * @readonly
     */
    prototype.parent = null;

    /**
     * The next node, null otherwise (when `child` is the parents last child
     * or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.next = null;

    /**
     * The previous node, null otherwise (when `child` is the parents first
     * child or detached).
     *
     * @api public
     * @type {?Child}
     * @readonly
     */
    prototype.prev = null;

    /**
     * Insert a given child before the operated on child in the parent.
     *
     * @param {Child} child - the child to insert before the operated on
     *                        child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.before = function (child) {
        return insert(this.parent, this.prev, child);
    };

    /**
     * Insert a given child after the operated on child in the parent.
     *
     * @param {Child} child - the child to insert after the operated on child.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.after = function (child) {
        return insert(this.parent, this, child);
    };

    /**
     * Remove the operated on child, and insert a given child at its previous
     * position in the parent.
     *
     * @param {Child} child - the child to replace the operated on child with.
     * @return {Child} - the given child.
     * @api public
     */
    prototype.replace = function (child) {
        var result = insert(this.parent, this, child);

        remove(this);

        return result;
    };

    /**
     * Remove the operated on child.
     *
     * @return {Child} - the operated on child.
     * @api public
     */
    prototype.remove = function () {
        return remove(this);
    };

    /**
     * Inherit from `Node.prototype`.
     */
    Node.isImplementedBy(Child);

    /**
     * Expose Element. Constructs a new Element node;
     *
     * @api public
     * @constructor
     */
    function Element() {
        Parent.apply(this, arguments);
        Child.apply(this, arguments);
    }

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Parent.isImplementedBy(Element);
    Child.isImplementedBy(Element);

    /* Add Parent as a constructor (which it is) */
    Element.constructors.splice(2, 0, Parent);

    /**
     * Expose Text. Constructs a new Text node;
     *
     * @api public
     * @constructor
     */
    function Text(value) {
        Child.apply(this, arguments);

        this.fromString(value);
    }

    prototype = Text.prototype;

    /**
     * The internal value.
     *
     * @api private
     */
    prototype.internalValue = '';

    /**
     * Return the internal value of a Text;
     *
     * @return {String}
     * @api public
     */
    prototype.toString = function () {
        return this.internalValue;
    };

    /**
     * (Re)sets and returns the internal value of a Text with the stringified
     * version of the given value.
     *
     * @param {?String} [value=''] - the value to set
     * @return {String}
     * @api public
     */
    prototype.fromString = function (value) {
        var self = this,
            previousValue = self.toString(),
            parent;

        if (value === null || value === undefined) {
            value = '';
        } else {
            value = value.toString();
        }

        if (value !== previousValue) {
            self.internalValue = value;

            emit(self, 'changetext', value, previousValue);

            parent = self.parent;
            if (parent) {
                trigger(
                    parent, 'changetextinside', self, value, previousValue
                );
            }
        }

        return value;
    };

    /**
     * Split the Text into two, dividing the internal value from 0–position
     * (NOT including the character at `position`), and position–length
     * (including the character at `position`).
     *
     * @param {?number} [position=0] - the position to split at.
     * @return {Child} - the prepended child.
     * @api public
     */
    prototype.split = function (position) {
        var self = this,
            value = self.internalValue,
            cloneNode;

        if (position === null ||
            position === undefined ||
            position !== position ||
            position === -Infinity) {
                position = 0;
        } else if (position === Infinity) {
            position = value.length;
        } else if (typeof position !== 'number') {
            throw new TypeError('\'' + position + ' is not a valid ' +
                'argument for \'Text.prototype.split\'');
        } else if (position < 0) {
            position = Math.abs((value.length + position) % value.length);
        }

        /* This throws if we're not attached, thus preventing substringing. */
        /*eslint-disable new-cap */
        cloneNode = insert(self.parent, self.prev, new self.constructor());
        /*eslint-enable new-cap */

        self.fromString(value.slice(position));
        cloneNode.fromString(value.slice(0, position));

        return cloneNode;
    };

    /**
     * Inherit from `Child.prototype`.
     */
    Child.isImplementedBy(Text);

    /**
     * Expose RootNode. Constructs a new RootNode (inheriting from Parent);
     *
     * @api public
     * @constructor
     */
    function RootNode() {
        Parent.apply(this, arguments);
    }

    /**
     * The type of an instance of RootNode.
     *
     * @api public
     * @readonly
     * @static
     */
    RootNode.prototype.type = 1;
    RootNode.prototype.hierarchy = 1;

    /**
     * Inherit from `Parent.prototype`.
     */
    Parent.isImplementedBy(RootNode);

    /**
     * Expose ParagraphNode. Constructs a new ParagraphNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function ParagraphNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of ParagraphNode.
     *
     * @api public
     * @readonly
     * @static
     */
    ParagraphNode.prototype.type = 2;
    ParagraphNode.prototype.hierarchy = 2;

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Element.isImplementedBy(ParagraphNode);

    /**
     * Expose SentenceNode. Constructs a new SentenceNode (inheriting from
     * both Parent and Child);
     *
     * @api public
     * @constructor
     */
    function SentenceNode() {
        Element.apply(this, arguments);
    }

    /**
     * The type of an instance of SentenceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SentenceNode.prototype.type = 3;
    SentenceNode.prototype.hierarchy = 3;

    /**
     * Inherit from `Parent.prototype` and `Child.prototype`.
     */
    Element.isImplementedBy(SentenceNode);

    /**
     * Expose WordNode.
     */
    function WordNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of WordNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WordNode.prototype.type = 4;
    WordNode.prototype.hierarchy = 4;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(WordNode);

    /**
     * Expose WhiteSpaceNode.
     */
    function WhiteSpaceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of WhiteSpaceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    WhiteSpaceNode.prototype.type = 5;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(WhiteSpaceNode);

    /**
     * Expose PunctuationNode.
     */
    function PunctuationNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of PunctuationNode.
     *
     * @api public
     * @readonly
     * @static
     */
    PunctuationNode.prototype.type = 6;
    PunctuationNode.prototype.hierarchy = 4;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(PunctuationNode);

    /**
     * Expose SourceNode.
     */
    function SourceNode() {
        Text.apply(this, arguments);
    }

    /**
     * The type of an instance of SourceNode.
     *
     * @api public
     * @readonly
     * @static
     */
    SourceNode.prototype.type = 7;

    /**
     * Inherit from `Text.prototype`.
     */
    Text.isImplementedBy(SourceNode);

    var nodePrototype = Node.prototype,
        TextOM;

    /**
     * Define the `TextOM` object.
     * Expose `TextOM` on every instance of Node.
     *
     * @api public
     */
    nodePrototype.TextOM = TextOM = {};

    /**
     * Export all node types to `TextOM` and `Node#`.
     */
    TextOM.ROOT_NODE = nodePrototype.ROOT_NODE =
        RootNode.prototype.type;
    TextOM.PARAGRAPH_NODE = nodePrototype.PARAGRAPH_NODE =
        ParagraphNode.prototype.type;
    TextOM.SENTENCE_NODE = nodePrototype.SENTENCE_NODE =
        SentenceNode.prototype.type;
    TextOM.WORD_NODE = nodePrototype.WORD_NODE = WordNode.prototype.type;
    TextOM.PUNCTUATION_NODE = nodePrototype.PUNCTUATION_NODE =
        PunctuationNode.prototype.type;
    TextOM.WHITE_SPACE_NODE = nodePrototype.WHITE_SPACE_NODE =
        WhiteSpaceNode.prototype.type;
    TextOM.SOURCE_NODE = nodePrototype.SOURCE_NODE =
        SourceNode.prototype.type;

    /**
     * Export all `Node`s to `TextOM`.
     */
    TextOM.Node = Node;
    TextOM.Parent = Parent;
    TextOM.Child = Child;
    TextOM.Element = Element;
    TextOM.Text = Text;
    TextOM.RootNode = RootNode;
    TextOM.ParagraphNode = ParagraphNode;
    TextOM.SentenceNode = SentenceNode;
    TextOM.WordNode = WordNode;
    TextOM.PunctuationNode = PunctuationNode;
    TextOM.WhiteSpaceNode = WhiteSpaceNode;
    TextOM.SourceNode = SourceNode;

    /**
     * Expose `TextOM`. Used to instantiate a new `RootNode`.
     */
    return TextOM;
}

module.exports = TextOMConstructor;

},{}],9:[function(require,module,exports){
'use strict';

var parseEnglish, retextAST, assert, converter, TextOM;

parseEnglish = require('..');
retextAST = require('retext-ast');
assert = require('assert');
converter = parseEnglish();
TextOM = converter.TextOM;

converter.TextOM.Node.prototype.toAST = retextAST.toAST;
converter.TextOM.Node.prototype.toJSON = retextAST.toJSON;

describe('ParseEnglish()', function () {
    it('should be of type `function`', function () {
        assert(typeof converter === 'function');
    });

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with string literal or string object', function () {
            assert(converter('') instanceof TextOM.RootNode);
            /*eslint-disable no-new-wrappers */
            assert(converter(new String('')) instanceof TextOM.RootNode);
            /*eslint-enable no-new-wrappers */
        }
    );

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with a nully value', function () {
            assert(converter() instanceof TextOM.RootNode);
            assert(converter(null) instanceof TextOM.RootNode);
            assert(converter(undefined) instanceof TextOM.RootNode);
        }
    );

    it('should return a newly initialized `RootNode` object, when invoked ' +
        'with a `Node` object', function () {
            assert(
                converter(new TextOM.RootNode()) instanceof TextOM.RootNode
            );
        }
    );

    it('should throw, when something other than a string, null, undefined, ' +
        'or node was given', function () {
            assert.throws(function () {
                converter(true);
            }, /true/);
            assert.throws(function () {
                converter(1);
            }, /1/);
        }
    );

    it('should return a RootNode containing no paragraphNode, when an ' +
        'empty source is given', function () {
            assert(converter().length === 0);
            assert(converter('').length === 0);
            assert(converter(null).length === 0);
            assert(converter(undefined).length === 0);
            assert(converter(new TextOM.RootNode()).length === 0);
        });
});

describe('Two paragraphs', function () {
    /*
     * Modified first paragraph, split into two, of:
     *    http://en.wikipedia.org/wiki/Paragraph
    */
    var source = 'A paragraph (from the Greek paragraphos, “to write ' +
        'beside” or “written beside”) is a self-contained unit of a ' +
        'discourse in writing dealing with a particular point or idea. A ' +
        'paragraph has 5 types (Br. Anton Heitman).\n\nA paragraph ' +
        'consists of one or more sentences. Though not required by the ' +
        'syntax of any language, paragraphs are usually an expected part ' +
        'of formal writing, used to organize longer prose.';

    it('should equal the test AST', function () {
        assert(converter(source).toAST() === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '('
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'from'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'the'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Greek'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraphos'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '“'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'to'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'write'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'beside'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '”'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '“'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'written'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'beside'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '”'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ')'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'is'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'self'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '-'
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'contained'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'unit'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'discourse'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'in'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'writing'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'dealing'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'with'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'particular'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'point'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'idea'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'has'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : '5'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'types'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '('
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Br'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Anton'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Heitman'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ')'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : '\n\n'
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'A'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraph'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'consists'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'one'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'or'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'more'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'sentences'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'Though'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'not'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'required'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'by'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'the'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'syntax'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'any'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'language'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'paragraphs'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'are'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'usually'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'an'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'expected'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'part'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'of'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'formal'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'writing'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : ','
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'used'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'to'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'organize'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'longer'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'prose'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

describe('A whitespace only document', function () {
    it('should equal the test AST', function () {
        assert(converter('\n\n').toAST() === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : '\n\n'
                }
            ]
        }));
    });
});

/*
 * Summarised from the first paragraph of: http://en.wikipedia.org/wiki/Ms.
*/
describe('Sentence: Abbreviations followed by a full-stop', function () {
    it('should equal the test AST', function () {
        var source = 'Like Miss and Mrs. the term Ms. has its origins ' +
            'in English title once used for all women. Various plural ' +
            'forms used are Mss., Mses. and Mmes.';

        assert(converter(source).head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Like'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Miss'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mrs'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'term'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Ms'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'has'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'its'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'origins'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'English'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'title'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'once'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'for'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'all'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'women'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Various'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'plural'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'forms'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'are'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mss'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mses'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mmes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Part of the second sentence of:
 * http://en.wikipedia.org/wiki/Natural_language#
 *   Constructed_languages_and_international_auxiliary_languages
*/
describe('Sentence: Abbreviations with dot characters', function () {
    it('should equal the test AST', function () {
        var source = 'Esperanto was selectively designed by L.L. Zamenhof ' +
            'from natural languages.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Esperanto'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'selectively'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'designed'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'L'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Zamenhof'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'from'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'natural'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'languages'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/Park_Ave.
*/
describe('Sentence: common abbreviations suffixed by a dot', function () {
    it('should equal the test AST', function () {
        var source = 'Park Ave. was an indie pop band which started in ' +
            'January 1996 in Nebr. (Omaha).';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Park'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ave'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'an'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'indie'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'pop'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'band'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'which'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'started'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'January'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1996'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Nebr'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '('
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Omaha'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Last sentence of the first paragraph of: http://en.wikipedia.org/wiki/.com
*/
describe('Sentence: common abbreviations preceded by a dot', function () {
    it('should equal the test AST', function () {
        var source = 'However, eventually the distinction was lost ' +
            'when .com, .org and .net were opened for unrestricted ' +
            'registration.';

        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'However'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'eventually'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'distinction'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'was'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'lost'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'when'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'com'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'org'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'net'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'were'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'opened'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'for'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'unrestricted'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'registration'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Example found on the web.
*/
describe('Sentence: A terminal marker before a closing quote or parenthesis',
    function () {
        it('should equal the test AST', function () {
            var source = '“However,” says my Grade 8 teacher, “the ' +
                'period goes inside quotes.” This is another sentence';

            assert(converter(source).head.toAST() === JSON.stringify({
                'type' : 'ParagraphNode',
                'children' : [
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'However'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'says'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'my'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'Grade'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : '8'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'teacher'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : ','
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '“'
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'the'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'period'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'goes'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'inside'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'quotes'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'This'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'is'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'another'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : ' '
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'sentence'
                            }
                        ]
                    }
                ]
            }));
        });
    }
);

/*
 * Part of the wikipedia license note.
*/
describe('Sentence: Abbreviations followed by a dot, optional white ' +
    'space, and a comma', function () {
        it('should equal the test AST', function () {
            var source = 'Wikipedia® is a registered trademark of the ' +
                'Wikimedia Foundation, Inc., a non-profit organization.';

            assert(converter(source).head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '®'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'registered'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikimedia'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Foundation'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Inc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'non'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'profit'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'organization'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });
    }
);

describe('Sentence: Starting with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var source = '. . . to be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'to'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Sentence: Starting with ellipsis without spaces', function () {
    it('should equal the test AST', function () {
        var source = '...To be continued.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '...'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'To'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'continued'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Sentence: With trailing white space', function () {
    it('should equal the test AST', function () {
        var source = 'A sentence. ';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'sentence'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                }
            ]
        }));
    });
});

describe('Sentence: Without terminal marker', function () {
    it('should equal the test AST', function () {
        var source = 'A sentence';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'sentence'
                }
            ]
        }));
    });
});

describe('Sentence: Without alphabetic content', function () {
    it('should equal the test AST', function () {
        var source = '\uD83D\uDC38.';
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'value' : '\uD83D\uDC38'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('White space characters', function () {
    var sentenceStart = 'A',
        sentenceEnd = 'house.',
        iterator = -1,
        whiteSpaceCharacters = [
            '\u0009', // CHARACTER TABULATION
            '\u000A', // LINE FEED (LF)
            '\u000B', // LINE TABULATION
            '\u000C', // FORM FEED (FF)
            '\u000D', // CARRIAGE RETURN (CR)
            '\u0020', // SPACE
            '\u0085', // NEXT LINE (NEL)
            '\u00A0', // NO-BREAK SPACE
            '\u1680', // OGHAM SPACE MARK
            '\u180E', // MONGOLIAN VOWEL SEPARATOR
            '\u2000', // EN QUAD
            '\u2001', // EM QUAD
            '\u2002', // EN SPACE
            '\u2003', // EM SPACE
            '\u2004', // THREE-PER-EM SPACE
            '\u2005', // FOUR-PER-EM SPACE
            '\u2006', // SIX-PER-EM SPACE
            '\u2007', // FIGURE SPACE
            '\u2008', // PUNCTUATION SPACE
            '\u2009', // THIN SPACE
            '\u200A', // HAIR SPACE
            '\u2028', // LINE SEPARATOR
            '\u2029', // PARAGRAPH SEPARATOR
            '\u202F', // NARROW NO-BREAK SPACE
            '\u205F', // MEDIUM MATHEMATICAL SPACE
            '\u3000'  // IDEOGRAPHIC SPACE
        ],
        character;

    while (whiteSpaceCharacters[++iterator]) {
        character = whiteSpaceCharacters[iterator];

        var source = sentenceStart + character + sentenceEnd;

        it('should equal the test AST when using `' + character + '`',
            function () {
                assert(
                    converter(source).head.head.toAST() === JSON.stringify({
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'value' : 'A'
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'value' : character
                            },
                            {
                                'type' : 'WordNode',
                                'value' : 'house'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'value' : '.'
                            }
                        ]
                    })
                );
            }
        );
    }
});

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters',
    function () {
        var source = 'The unicode character \uD83D\uDCA9 is pile of poo.';
        it('should equal the test AST', function () {
            assert(converter(source).head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unicode'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\uD83D\uDCA9'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pile'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'poo'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });
    }
);

/*
 * Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING KEYCAP,
 * together forming a :zero: emoji
 */
describe('Double combining marks', function () {
    var source = 'He scored 0\uFE0F\u20E3 points.';
    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
        'type' : 'SentenceNode',
        'children' : [
            {
                    'type' : 'WordNode',
                    'value' : 'He'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'scored'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '0\uFE0F\u20E3'
                },
            {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
            {
                    'type' : 'WordNode',
                    'value' : 'points'
                },
            {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
        ]
        }));
    });
});

var diacritics = [
        '\u0300', // COMBINING GRAVE ACCENT (U+0300)
        '\u0301', // COMBINING ACUTE ACCENT (U+0301)
        '\u0302', // COMBINING CIRCUMFLEX ACCENT (U+0302)
        '\u0303', // COMBINING TILDE (U+0303)
        '\u0304', // COMBINING MACRON (U+0304)
        '\u0305', // COMBINING OVERLINE (U+0305)
        '\u0306', // COMBINING BREVE (U+0306)
        '\u0307', // COMBINING DOT ABOVE (U+0307)
        '\u0308', // COMBINING DIAERESIS (U+0308)
        '\u0309', // COMBINING HOOK ABOVE (U+0309)
        '\u030A', // COMBINING RING ABOVE (U+030A)
        '\u030B', // COMBINING DOUBLE ACUTE ACCENT (U+030B)
        '\u030C', // COMBINING CARON (U+030C)
        '\u030D', // COMBINING VERTICAL LINE ABOVE (U+030D)
        '\u030E', // COMBINING DOUBLE VERTICAL LINE ABOVE (U+030E)
        '\u030F', // COMBINING DOUBLE GRAVE ACCENT (U+030F)
        '\u0310', // COMBINING CANDRABINDU (U+0310)
        '\u0311', // COMBINING INVERTED BREVE (U+0311)
        '\u0312', // COMBINING TURNED COMMA ABOVE (U+0312)
        '\u0313', // COMBINING COMMA ABOVE (U+0313)
        '\u0314', // COMBINING REVERSED COMMA ABOVE (U+0314)
        '\u0315', // COMBINING COMMA ABOVE RIGHT (U+0315)
        '\u0316', // COMBINING GRAVE ACCENT BELOW (U+0316)
        '\u0317', // COMBINING ACUTE ACCENT BELOW (U+0317)
        '\u0318', // COMBINING LEFT TACK BELOW (U+0318)
        '\u0319', // COMBINING RIGHT TACK BELOW (U+0319)
        '\u031A', // COMBINING LEFT ANGLE ABOVE (U+031A)
        '\u031B', // COMBINING HORN (U+031B)
        '\u031C', // COMBINING LEFT HALF RING BELOW (U+031C)
        '\u031D', // COMBINING UP TACK BELOW (U+031D)
        '\u031E', // COMBINING DOWN TACK BELOW (U+031E)
        '\u031F', // COMBINING PLUS SIGN BELOW (U+031F)
        '\u0320', // COMBINING MINUS SIGN BELOW (U+0320)
        '\u0321', // COMBINING PALATALIZED HOOK BELOW (U+0321)
        '\u0322', // COMBINING RETROFLEX HOOK BELOW (U+0322)
        '\u0323', // COMBINING DOT BELOW (U+0323)
        '\u0324', // COMBINING DIAERESIS BELOW (U+0324)
        '\u0325', // COMBINING RING BELOW (U+0325)
        '\u0326', // COMBINING COMMA BELOW (U+0326)
        '\u0327', // COMBINING CEDILLA (U+0327)
        '\u0328', // COMBINING OGONEK (U+0328)
        '\u0329', // COMBINING VERTICAL LINE BELOW (U+0329)
        '\u032A', // COMBINING BRIDGE BELOW (U+032A)
        '\u032B', // COMBINING INVERTED DOUBLE ARCH BELOW (U+032B)
        '\u032C', // COMBINING CARON BELOW (U+032C)
        '\u032D', // COMBINING CIRCUMFLEX ACCENT BELOW (U+032D)
        '\u032E', // COMBINING BREVE BELOW (U+032E)
        '\u032F', // COMBINING INVERTED BREVE BELOW (U+032F)
        '\u0330', // COMBINING TILDE BELOW (U+0330)
        '\u0331', // COMBINING MACRON BELOW (U+0331)
        '\u0332', // COMBINING LOW LINE (U+0332)
        '\u0333', // COMBINING DOUBLE LOW LINE (U+0333)
        '\u0334', // COMBINING TILDE OVERLAY (U+0334)
        '\u0335', // COMBINING SHORT STROKE OVERLAY (U+0335)
        '\u0336', // COMBINING LONG STROKE OVERLAY (U+0336)
        '\u0337', // COMBINING SHORT SOLIDUS OVERLAY (U+0337)
        '\u0338', // COMBINING LONG SOLIDUS OVERLAY (U+0338)
        '\u0339', // COMBINING RIGHT HALF RING BELOW (U+0339)
        '\u033A', // COMBINING INVERTED BRIDGE BELOW (U+033A)
        '\u033B', // COMBINING SQUARE BELOW (U+033B)
        '\u033C', // COMBINING SEAGULL BELOW (U+033C)
        '\u033D', // COMBINING X ABOVE (U+033D)
        '\u033E', // COMBINING VERTICAL TILDE (U+033E)
        '\u033F', // COMBINING DOUBLE OVERLINE (U+033F)
        '\u0340', // COMBINING GRAVE TONE MARK (U+0340)
        '\u0341', // COMBINING ACUTE TONE MARK (U+0341)
        '\u0342', // COMBINING GREEK PERISPOMENI (U+0342)
        '\u0343', // COMBINING GREEK KORONIS (U+0343)
        '\u0344', // COMBINING GREEK DIALYTIKA TONOS (U+0344)
        '\u0345', // COMBINING GREEK YPOGEGRAMMENI (U+0345)
        '\u0346', // COMBINING BRIDGE ABOVE (U+0346)
        '\u0347', // COMBINING EQUALS SIGN BELOW (U+0347)
        '\u0348', // COMBINING DOUBLE VERTICAL LINE BELOW (U+0348)
        '\u0349', // COMBINING LEFT ANGLE BELOW (U+0349)
        '\u034A', // COMBINING NOT TILDE ABOVE (U+034A)
        '\u034B', // COMBINING HOMOTHETIC ABOVE (U+034B)
        '\u034C', // COMBINING ALMOST EQUAL TO ABOVE (U+034C)
        '\u034D', // COMBINING LEFT RIGHT ARROW BELOW (U+034D)
        '\u034E', // COMBINING UPWARDS ARROW BELOW (U+034E)
        '\u034F', // COMBINING GRAPHEME JOINER (U+034F)
        '\u0350', // COMBINING RIGHT ARROWHEAD ABOVE (U+0350)
        '\u0351', // COMBINING LEFT HALF RING ABOVE (U+0351)
        '\u0352', // COMBINING FERMATA (U+0352)
        '\u0353', // COMBINING X BELOW (U+0353)
        '\u0354', // COMBINING LEFT ARROWHEAD BELOW (U+0354)
        '\u0355', // COMBINING RIGHT ARROWHEAD BELOW (U+0355)
        '\u0356', // COMBINING RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356)
        '\u0357', // COMBINING RIGHT HALF RING ABOVE (U+0357)
        '\u0358', // COMBINING DOT ABOVE RIGHT (U+0358)
        '\u0359', // COMBINING ASTERISK BELOW (U+0359)
        '\u035A', // COMBINING DOUBLE RING BELOW (U+035A)
        '\u035B', // COMBINING ZIGZAG ABOVE (U+035B)
        '\u035C', // COMBINING DOUBLE BREVE BELOW (U+035C)
        '\u035D', // COMBINING DOUBLE BREVE (U+035D)
        '\u035E', // COMBINING DOUBLE MACRON (U+035E)
        '\u035F', // COMBINING DOUBLE MACRON BELOW (U+035F)
        '\u0360', // COMBINING DOUBLE TILDE (U+0360)
        '\u0361', // COMBINING DOUBLE INVERTED BREVE (U+0361)
        '\u0362', // COMBINING DOUBLE RIGHTWARDS ARROW BELOW (U+0362)
        '\u0363', // COMBINING LATIN SMALL LETTER A (U+0363)
        '\u0364', // COMBINING LATIN SMALL LETTER E (U+0364)
        '\u0365', // COMBINING LATIN SMALL LETTER I (U+0365)
        '\u0366', // COMBINING LATIN SMALL LETTER O (U+0366)
        '\u0367', // COMBINING LATIN SMALL LETTER U (U+0367)
        '\u0368', // COMBINING LATIN SMALL LETTER C (U+0368)
        '\u0369', // COMBINING LATIN SMALL LETTER D (U+0369)
        '\u036A', // COMBINING LATIN SMALL LETTER H (U+036A)
        '\u036B', // COMBINING LATIN SMALL LETTER M (U+036B)
        '\u036C', // COMBINING LATIN SMALL LETTER R (U+036C)
        '\u036D', // COMBINING LATIN SMALL LETTER T (U+036D)
        '\u036E', // COMBINING LATIN SMALL LETTER V (U+036E)
        '\u036F'  // COMBINING LATIN SMALL LETTER X (U+036F)
    ],
    iterator = -1,
    diacritic;

describe('A simple sentence testing for combining diacritical marks',
    function () {
        while (diacritics[++iterator]) {
            diacritic = diacritics[iterator];

            var source = 'This is a' + diacritic + ' house.';
            it('should equal the test AST when using \u25CC' + diacritic,
                function () {
                    assert(
                        converter(source).head.head.toAST() ===
                        JSON.stringify({
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'value' : 'This'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'is'
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'a' + diacritic
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'value' : ' '
                                },
                                {
                                    'type' : 'WordNode',
                                    'value' : 'house'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'value' : '.'
                                }
                            ]
                        })
                    );
                }
            );
        }
    }
);

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Contraction_(grammar)
*/
describe('A simple sentence testing for common contractions', function () {
    var source = 'Common examples of contractions include: Ain\'t, ' +
        'let\'s, I\'m, we\'re, what\'s, where\'d, and I\'ll.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Common'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'examples'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'of'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'contractions'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'include'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ':'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Ai'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 't'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'let'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'we'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 're'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'what'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'where'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'd'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'll'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
*/
describe('Simple sentences testing for tie characters', function () {
    it('should equal the test AST, when using the combinding double ' +
        'breve \u25CC\u035D\u25CC', function () {
            var source = 'e.g. the combining double breve o\u035Do.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o\u035Do'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double ' +
        'inverted breve \u25CC\u0361\u25CC', function () {
            var source =
                'e.g. the combining double inverted breve /k\u0361p/';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u0361p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the combinding double breve ' +
        'below \u25CC\u035C\u25CC', function () {
            var source = 'e.g. the combining double breve below /k\u035Cp/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'combining'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'double'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'breve'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'below'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'k\u035Cp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the undertie \u203F',
        function () {
            var source = 'e.g. the undertie /vuz\u203Fave/';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'vuz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u203F'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ave'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '/'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the character tie \u2040',
        function () {
            var source = 'e.g. the character tie s\u2040t';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'character'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2040'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 't'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the inverted undertie \u2054',
        function () {
            var source = 'e.g. the inverted undertie o\u2054o';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'e'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'g'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inverted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undertie'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2054'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    }
                ]
            }));
        }
    );
});

describe('Intelectual property marks', function () {
    it('should equal the test AST, when using the copyright symbol \u00A9',
        function () {
            var source = '\u00A9 2011 John Smith';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00A9'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2011'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'John'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Smith'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the sound recording ' +
        'copyright symbol \u2117', function () {
            var source =
                'Designated by \u2117, the sound recording copyright symbol.';

            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Designated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'by'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2117'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sound'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'recording'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'copyright'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'symbol'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the registered trademark ' +
        'symbol \u00AE', function () {
            var source = 'Wikipedia\u00AE is a registered trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Wikipedia'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u00AE'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'registered'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the service mark symbol \u2120',
        function () {
            var source = 'ABC Law\u2120 legal services.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'ABC'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Law'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2120'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'legal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'services'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should equal the test AST, when using the trademark symbol \u2122',
        function () {
            var source = 'Mytrademark\u2122 is a trademark.';
            assert(converter(source)[0][0].toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Mytrademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\u2122'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'trademark'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/IPhone_5S
*/
describe('A simple sentence testing for digit-letters', function () {
    var source = 'iPhone 5S is a high-end smartphone developed by Apple.';
    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'iPhone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '5'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'S'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'is'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'high'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '-'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'end'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'smartphone'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'developed'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Apple'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified sentence from: http://mathiasbynens.be/notes/javascript-unicode
 * Note the combining characters.
*/
describe('A simple sentence testing for grapheme clusters', function () {
    var source = 'Grapheme clusters such as \u0BA8\u0BBF and Hangul made ' +
        'of conjoining Jamo such as \u1101\u1161\u11A8, or other similar ' +
        'symbols.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Grapheme'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'clusters'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u0BA8\u0BBF'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'and'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Hangul'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'made'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'of'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'conjoining'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'Jamo'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'such'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'as'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '\u1101\u1161\u11A8'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'or'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'other'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'similar'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbols'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

/*
 * Modified example from: https://github.com/walling/unorm
 * Note both the hexadecimal and Unicode escape sequences.
*/
describe('Unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
        '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length ' +
        '10\u207B\xB9\u2070 m.';

    it('should equal the test AST', function () {
        assert(converter(source).head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'The'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // NOT a combining ring! Just the unicode
                // A-ring character.
                {
                    'type' : 'WordNode',
                    'value' : '\xC5'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'symbol'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'invented'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'by'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'J'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // A combining ring and a combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'A\u030Angstro\u0308m'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '('
                },
                {
                    'type' : 'WordNode',
                    'value' : '1814'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // Two combining diaereses.
                {
                    'type' : 'WordNode',
                    'value' : 'Lo\u0308gdo\u0308'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ','
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                // En-dash
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u2013'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '1874'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : ')'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'denotes'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'length'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : '10'
                },
                // Superscript minus.
                {
                    'type' : 'PunctuationNode',
                    'value' : '\u207B'
                },
                // Superscript one and superscript two
                {
                    'type' : 'WordNode',
                    'value' : '\xB9\u2070'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '.'
                }
            ]
        }));
    });
});

describe('Abbreviations: Decimals (affixed by a full-stop)', function () {
    it('should *not* treat the dot-character succeeding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var root,
                digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];
                root = converter('See § ' + digit + '. ¶ 2.');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'See'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '§'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : digit
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '¶'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Geographic', function () {
    it('should *not* treat the dot-character succeeding `Ave` ' +
        '(abbreviation for `Avenue`), as a terminal marker', function () {
            var root = converter(
                'Survey Reaffirms 5th Ave. at Top of the Retail Rent Heap'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Survey'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Reaffirms'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '5th'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ave'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Top'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Retail'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Heap'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Blvd` ' +
        '(abbreviation for `Boulevard`), as a terminal marker', function () {
            var root = converter('A café located on the blvd. of Kusadasi');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'café'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'located'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'blvd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Kusadasi'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Mt` ' +
        '(abbreviation for `Mountain`), as a terminal marker', function () {
            var root = converter(
                'Like all mountains, Mt. Gay is a large large mass of rock.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Like'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'all'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mountains'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Mt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Gay'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mass'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rock'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rd` ' +
        '(abbreviation for `Road`), as a terminal marker', function () {
            var root = converter('In law, Rd. is an abbreviation of road.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'law'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviation'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'road'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Bldg` ' +
        '(abbreviation for `Building`), as a terminal marker', function () {
            var root = converter(
                'The many fine Victorian buildings in Wolverhampton.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'many'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Victorian'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'buildings'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wolverhampton'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }

                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Nat` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = converter('The Teide Nat. Park in Tenerife, Spain.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Teide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Nat'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Park'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Tenerife'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Spain'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Natl` ' +
        '(abbreviation for `National`), as a terminal marker', function () {
            var root = converter('The Teide Natl. Park in Tenerife, Spain.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Teide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Natl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Park'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Tenerife'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Spain'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rt` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = converter(
                'U.S. Rt. 66, a historic highway in America.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'U'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'S'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '66'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'historic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highway'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'America'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Rte` ' +
        '(abbreviation for `Route`), as a terminal marker', function () {
            var root = converter(
                'U.S. Rte. 66, a historic highway in America.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'U'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'S'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Rte'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '66'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'historic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highway'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'America'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Co` ' +
        '(abbreviation for `County`), as a terminal marker', function () {
            var root = converter(
                'Leicestershire Co. is a landlocked county in the ' +
                'English Midlands.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Leicestershire'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Co'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'landlocked'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'county'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'English'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Midlands'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pk` ' +
        '(abbreviation for `Park`), as a terminal marker', function () {
            var root = converter('St. James\'s Pk. covers 34 ha.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'St'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'James'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pk'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'covers'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '34'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ha'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Sq` ' +
        '(abbreviation for `Square`), as a terminal marker', function () {
            var root = converter(
                'See the attachment for potential Times Sq. sites.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'See'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'attachment'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'potential'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Times'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Sq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sites'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Dr` ' +
        '(abbreviation for `Drive`), as a terminal marker', function () {
            var root = converter(
                'Continue on Pershing Dr. before turning right.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Continue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pershing'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Dr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'turning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'right'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pt` ' +
        '(abbreviation for `Point` or `Port`), as a terminal marker',
        function () {
            var root = converter(
                'The Pt. of L.A. is also called Los Angeles Harbor ' +
                'Department.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'L'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'called'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Los'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Angeles'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Harbor'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Department'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `St` ' +
        '(abbreviation for `Street` or `State`), as a terminal marker',
        function () {
            var root = converter('I used to live on 2nd St. in Clinton.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'live'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2nd'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'St'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Clinton'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ft` ' +
        '(abbreviation for `Fort`), as a terminal marker', function () {
            var root = converter(
                'As Ft. Knox is no longer “The Home of Armor”, ' +
                'the Patton Museum has also been relocated.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Knox'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'no'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'longer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Home'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Armor'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Patton'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Museum'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'has'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'been'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'relocated'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pen` ' +
        '(abbreviation for `Peninsula`), as a terminal marker', function () {
            var root = converter(
                'Huon Pen. is a large rugged peninsula on the island of ' +
                'New Guinea.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Huon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pen'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rugged'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'peninsula'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'island'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'New'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Guinea'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Terr` ' +
        '(abbreviation for `Territory`), as a terminal marker', function () {
            var root = converter(
                'Yukon, formerly Yukon Territory (Yuk. Terr.), is an ' +
                'area of rugged mountains and high plateaus.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Yukon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'formerly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Yukon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Territory'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Yuk'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Terr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'area'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'rugged'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mountains'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'high'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'plateaus'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Hwy` ' +
        '(abbreviation for `Highway`), as a terminal marker', function () {
            var root = converter(
                'The Atlantic Hwy. was the direct predecessor to US 1.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Atlantic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Hwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'direct'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'predecessor'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'US'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Fwy` ' +
        '(abbreviation for `Freeway`), as a terminal marker', function () {
            var root = converter(
                'The San Diego Fwy. is most commonly called “The 405”.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'San'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Diego'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Fwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'most'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'commonly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'called'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '405'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Pkwy` ' +
        '(abbreviation for `Parkway`), as a terminal marker', function () {
            var root = converter(
                'Blue Ridge Pkwy. is a National Parkway, noted for ' +
                'its scenic beauty.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Blue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ridge'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pkwy'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'National'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Parkway'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'noted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'its'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'scenic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'beauty'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding (American) ' +
        'states (e.g., `Ala`, `Ariz`, &c.), as a terminal marker',
        function () {
            var states = (
                    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|' +
                    'Id|Ill|Ind|Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|' +
                    'Miss|Mo|Mont|Neb|Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|' +
                    'Penn|Pa|Tenn|Tex|Ut|Vt|Va|Wash|Wis|Wisc|Wyo'
                ).split('|'),
                iterator = -1,
                root, state;

            while (states[++iterator]) {
                state = states[iterator];

                root = converter(
                    'I live in Clinton, ' + state + '. on 2nd street.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'live'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Clinton'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : state
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2nd'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'street'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding (Canadian) ' +
        'states (e.g., `Alta`, `Man`, &c.), as a terminal marker',
        function () {
            var states = 'Alta|Man|Ont|Qué|Que|Sask|Yuk'.split('|'),
                iterator = -1,
                state, root;

            while (states[++iterator]) {
                state = states[iterator];

                root = converter(
                    'I\'m from Mount Pleasant, ' + state + '. in Canada.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'm'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'from'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mount'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Pleasant'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : state
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Canada'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding (English) ' +
        'counties (e.g., `Beds`, `Berks`, &c.), as a terminal marker',
        function () {
            var counties = ('Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|' +
                    'Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|' +
                    'Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|' +
                    'Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
                    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|' +
                    'Worcs|Yorks'
                ).split('|'),
                iterator = -1,
                root, county;

            while (counties[++iterator]) {
                county = counties[iterator];

                root = converter(
                    'I\'m from Newton, ' + county + '. in England.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'I'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'm'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'from'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Newton'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : county
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'England'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Title abbreviations', function () {
    it('should *not* treat the dot-character succeeding titles (e.g., ' +
        '`Mr`, `Mrs`, &c.), as a terminal marker', function () {
            var titles = ('Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|' +
                    'Snr|Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|' +
                    'Supt|Rep|Sen|Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|' +
                    'Capt|Lt|Maj|Sgt|Po|Wo|Ph'
                ).split('|'),
                iterator = -1,
                root, title;

            while (titles[++iterator]) {
                title = titles[iterator];

                root = converter(
                    'You should talk to ' + title +
                    '. Smith about these questions.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'You'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'should'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'talk'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'to'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : title
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Smith'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'about'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'these'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'questions'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        });
});

describe('Abbreviations: Alphabetical', function () {
    it('should *not* treat the dot-character preceded by a latin letter ' +
        'and whitespace, as a terminal marker (e.g., in ' +
        '`Thomas A. Swift`, or in `e.` when abbreviating east)',
        function () {
            var alphabet = 'abcdefghijklmnopqrstuvwxyz',
                iterator = -1,
                root, character;

            alphabet += alphabet.toUpperCase();
            alphabet = alphabet.split('');

            while (alphabet[++iterator]) {
                character = alphabet[iterator];
                root = converter('Thomas ' + character + '. Swift');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Thomas'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : character
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Swift'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Business', function () {
    it('should *not* treat the dot-character succeeding `Inc` ' +
        '(abbreviation for `Incorporation`), as a terminal marker',
        function () {
            var root = converter(
                'Today, ABC Company, Inc. announced an increase of 100 ' +
                'percent in the last two years.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Today'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ABC'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Company'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Inc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'announced'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'increase'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '100'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'percent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'last'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'two'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'years'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `Ltd` ' +
        '(abbreviation for `Limited`), as a terminal marker', function () {
            var root = converter(
                'XYZ Associates Ltd. is a member of the confederation.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'XYZ'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Associates'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ltd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'member'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'confederation'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Latin', function () {
    it('should *not* treat the dot-character succeeding `ca` (abbreviation ' +
        'for `circa`), as a terminal marker', function () {
            var root = converter(
                'The antique clock is from ca. 1900.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'antique'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'clock'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'from'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ca'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1900'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cap` ' +
        '(abbreviation for `chapter`), as a terminal marker', function () {
            var root = converter(
                'Electronic Transactions Ordinance (Cap. 553)'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Electronic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Transactions'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ordinance'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Cap'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '553'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cf` (abbreviation ' +
        'for `bring together`), as a terminal marker', function () {
            var root = converter(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992)'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'were'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'similar'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'those'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'obtained'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'using'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'different'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'techniques'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cf'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wilson'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1999'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ansmann'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1992'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cp` (abbreviation ' +
        'for `compare`), as a terminal marker', function () {
            var root = converter(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'were'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'similar'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'those'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'obtained'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'using'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'different'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'techniques'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cf'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Wilson'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1999'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Ansmann'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1992'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cwt` ' +
        '(abbreviation for `centum weight`), as a terminal marker',
        function () {
            var root = converter(
                'Hundredweight is abbreviated as cwt. because \'C\' is ' +
                'the Roman symbol for 100.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hundredweight'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cwt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'because'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'C'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Roman'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'symbol'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '100'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ead` ' +
        '(abbreviation for `eadem`), as a terminal marker', function () {
            var root = converter(
                'When quoting a female author, use the feminine form ' +
                'of idem, ead. (eadem).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'When'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'quoting'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'female'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'author'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'use'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feminine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'form'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'idem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ead'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eadem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `al` ' +
        '(abbreviation for `(et) alii`), as a terminal marker', function () {
            var root = converter(
                'These results agree with the ones published by ' +
                'Pelon et al. (2002).'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'These'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'results'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'agree'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ones'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'published'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'by'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Pelon'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'al'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2002'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `etc` ' +
        '(abbreviation for `et cetera`), as a terminal marker', function () {
            var root = converter(
                'Et cetera (abbreviated as etc. or &c.) is a Latin ' +
                'expression that means “and other things”, or “and so ' +
                'forth.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cetera'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'abbreviated'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'etc'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '&'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'c'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'expression'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'means'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'other'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'things'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'so'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'forth'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` (abbreviation ' +
        'for `floruit`), as a terminal marker', function () {
            var root = converter(
                'The great author Joseph Someone (fl. 2050-75) was ' +
                'renowned for his erudition.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'great'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'author'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Joseph'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Someone'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2050'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '75'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'renowned'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'his'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'erudition'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ff` ' +
        '(abbreviation for `foliis`), as a terminal marker', function () {
            var root = converter(
                'As such, Hornblower 258f. would refer to pages 258–259 ' +
                'while 258ff. would refer to an undetermined number of ' +
                'pages following page 258.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'such'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Hornblower'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'f'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '–'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '259'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'while'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ff'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refer'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'undetermined'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'number'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'following'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'page'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '258'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ibid` ' +
        '(abbreviation for `ibidem`), as a terminal marker', function () {
            var root = converter(
                'Ibid. (Latin, short for ibidem, meaning “in the same ' +
                'place”) is the term used to provide an endnote or ' +
                'footnote citation or reference for a source that was ' +
                'cited in the preceding endnote or footnote.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Ibid'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'short'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ibidem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'meaning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'same'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'place'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'term'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'provide'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'an'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'endnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'footnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'citation'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'reference'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'source'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cited'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'preceding'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'endnote'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'footnote'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `id` (abbreviation ' +
        'for `idem`), as a terminal marker', function () {
            var root = converter(
                'Id. is particularly used in legal citations.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Id'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'particularly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'legal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'citations'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `nem` and `con` ' +
        '(in `nem. con.`, abbreviation for `nemine contradicente`), as a ' +
        'terminal marker', function () {
            var root = converter(
                'The meaning of nemine contradicente is distinct from ' +
                '“unanimously”; nem. con. simply means that nobody voted ' +
                'against.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'meaning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nemine'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'contradicente'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'distinct'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'from'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unanimously'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ';'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'con'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'simply'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'means'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'nobody'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'voted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'against'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `op` and `cit` ' +
        '(in `op. cit.`, abbreviation for `opere (citato)`), as a terminal ' +
        'marker', function () {
            var root = converter(
                'As usual with foreign words and phrases, op. cit. is ' +
                'typically given in italics.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'As'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'usual'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'foreign'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'words'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'phrases'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'op'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cit'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'typically'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'given'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'italics'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cent` ' +
        '(abbreviation for `(per) cent`), as a terminal marker', function () {
            var root = converter(
                'The form per cent. is still in use as a part of highly ' +
                'formal language.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'form'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cent'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'still'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'use'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'part'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'highly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'formal'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'language'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pro` ' +
        '(abbreviation for `(per) procurationem`), as a terminal marker',
        function () {
            var root = converter(
                'Procuration (per procurationem), or shortly per pro., ' +
                'or simply p.p.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Procuration'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'procurationem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'shortly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'per'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pro'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'simply'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'p'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tem` ' +
        '(abbreviation for `(pro) tempore`), as a terminal marker',
        function () {
            var root = converter(
                'Legislative bodies can have one or more pro tem. for ' +
                'the presiding officer.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Legislative'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bodies'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'can'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'have'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pro'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tem'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'presiding'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'officer'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sic` ' +
        '(abbreviation for `sic erat scriptum`), as a terminal marker',
        function () {
            var root = converter(
                'Sic., or sic erat scriptum, is Latin for “Thus it ' +
                'was written.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Sic'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sic'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'erat'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'scriptum'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Latin'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Thus'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'it'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'written'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `seq` ' +
        '(abbreviation for `(et) sequentia`), as a terminal marker',
        function () {
            var root = converter(
                'The phrase et seq. is used to indicate that ' +
                'the information is continued on the denoted ' +
                'pages or sections.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'phrase'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'et'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'seq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'used'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'indicate'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'information'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'continued'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'denoted'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pages'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sections'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `stat` ' +
        '(abbreviation for `statim`), as a terminal marker', function () {
            var root = converter('That patient needs attention, stat.!');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'That'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'patient'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'needs'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'attention'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stat'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '!'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `viz` ' +
        '(abbreviation for `videlicet`), as a terminal marker', function () {
            var root = converter(
                'The noble gases, viz. helium, neon, argon, xenon, ' +
                'krypton and radon, show a non-expected behaviour when ' +
                'exposed to this new element.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'noble'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gases'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'viz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'helium'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'neon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'argon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'xenon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'krypton'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'and'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'radon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'show'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'non'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'expected'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'behaviour'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'when'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'exposed'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'this'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'new'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'element'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: English unit abbreviations', function () {
    it('should *not* treat the dot-character succeeding `bbl` ' +
        '(abbreviation for `barrel`), as a terminal marker', function () {
            var root = converter(
                'The price for 15 bbls. is unknown to me.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'price'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '15'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bbls'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unknown'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cu` ' +
        '(abbreviation for `cubic`), as a terminal marker', function () {
            var root = converter(
                '12 cu. in. could also be written as 12inch^3.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cu'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'could'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'written'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'inch'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '^'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '3'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `doz` ' +
        '(abbreviation for `dozen`), as a terminal marker', function () {
            var root = converter('Could you get 2 doz. of eggs?');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Could'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'get'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'doz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eggs'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '?'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` ' +
        '(as in `fl. oz.`, abbreviation for `fluid (ounce)`), ' +
        'as a terminal marker', function () {
            var root = converter('1 fl. oz. equals about 28 ml.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fl'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'about'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '28'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ml'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` (abbreviation ' +
        'for `fluid ounce`), as a terminal marker', function () {
            var root = converter('2 oz. equals about 56–57 gr.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'about'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '56'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '–'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '57'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ft` (abbreviation ' +
        'for `foot`), as a terminal marker', function () {
            var root = converter('2 ft. equals exactly 60.96 centimeters.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'exactly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '60'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '96'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'centimeters'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gal` ' +
        '(abbreviation for `gallon`), as a terminal marker', function () {
            var root = converter('1 gal. equals 8 pints.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gal'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '8'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pints'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gr` (abbreviation ' +
        'for `grain`), as a terminal marker', function () {
            var root = converter(
                '5 gr. bottle indicates on the back that the ' +
                'dosage is “325 mg.”'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '5'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'bottle'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'indicates'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'back'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'that'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'dosage'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '“'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '325'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mg'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '”'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `gro` ' +
        '(abbreviation for `gross`), as a terminal marker', function () {
            var root = converter(
                '1 Gro. (a gross) refers to a group of 144 items.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Gro'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '('
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gross'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ')'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'refers'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'group'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '144'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'items'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `in` (abbreviation ' +
        'for `inch`), as a terminal marker', function () {
            var root = converter('There are 12 in. in a foot.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'There'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'are'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '12'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'foot'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `kt` (abbreviation ' +
        'for `karat or knot`), as a terminal marker', function () {
            var root = converter(
                'Items 10-karat or greater are to be stamped with ' +
                'either Kt. or K.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Items'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '10'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '-'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'karat'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'greater'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'are'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stamped'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'with'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'either'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Kt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'or'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'K'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `lb` (abbreviation ' +
        'for `pound`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 lb. equals ' +
                '0.45359237 kilograms'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'lb'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '0'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '45359237'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'kilograms'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `mi` ' +
        '(abbreviation for `mile`), as a terminal marker', function () {
            var root = converter(
                'A mile, known as 1 mi. also, is a unit of length most ' +
                'commonly equivalent to 5,280 feet.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'A'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mile'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'known'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'as'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mi'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'also'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'unit'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'length'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'most'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'commonly'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equivalent'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'to'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '5'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '280'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'feet'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `oz` ' +
        '(abbreviation for `ounce`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 oz. equals ' +
                'one sixteenth of a pound.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'oz'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sixteenth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pound'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pt` (abbreviation ' +
        'for `pint`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 pt. equals ' +
                'one eighth of a gallon.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'pt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'eighth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gallon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `qt` ' +
        '(abbreviation for `quart`), as a terminal marker', function () {
            var root = converter(
                'In the imperial systems of measurement, 1 qt. ' +
                'equals one fourth of a gallon.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'In'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'imperial'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'systems'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'measurement'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'qt'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'equals'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'one'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fourth'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'gallon'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sq` ' +
        '(abbreviation for `square`), as a terminal marker', function () {
            var root = converter(
                'The large house boasts 29 sq. ft. of living space.'
            );

            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'The'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'large'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'house'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'boasts'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '29'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sq'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ft'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'of'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'living'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'space'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tbsp` ' +
        '(abbreviation for `tablespoon`), as a terminal marker', function () {
            var root = converter('Add 3 tbsp. sea salt flakes.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Add'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '3'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tbsp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sea'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'salt'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'flakes'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        });

    it('should *not* treat the dot-character succeeding `tsp` ' +
        '(abbreviation for `teaspoon`), as a terminal marker', function () {
            var root = converter('Add 1 tsp. mustard powder.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Add'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'tsp'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'mustard'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'powder'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `yd` ' +
        '(abbreviation for `yard`), as a terminal marker', function () {
            var root = converter('2 yd. is a fanthom.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : '2'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'yd'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'is'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'fanthom'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Time references', function () {
    it('should *not* treat the dot-character succeeding `sec` ' +
        '(abbreviation for `seconds`), as a terminal marker', function () {
            var root = converter(
                'Sprint for 90 sec. more, before you do some stretches.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Sprint'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'for'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '90'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'sec'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'do'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'some'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'stretches'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `min` ' +
        '(abbreviation for `minutes`), as a terminal marker', function () {
            var root = converter(
                'Continue down the road 8 more min. before turning left ' +
                'at the crossroads.'
            );
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Continue'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'down'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'road'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '8'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'more'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'min'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'turning'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'left'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'crossroads'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `hr` (abbreviation ' +
        'for `hours`), as a terminal marker', function () {
            var root = converter('We\'ll be there in 1 hr. I think');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'We'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'll'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'be'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'there'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'in'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : '1'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'hr'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'think'
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding days (e.g., ' +
        '`Mon`, `Tue`, &c.), as a terminal marker', function () {
            var days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun'.split('|'),
                iterator = -1,
                day, root;

            while (days[++iterator]) {
                day = days[iterator];

                root = converter(
                    'Let\'s move the meeting to next ' + day + '. at 10:00.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Let'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 's'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'move'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'meeting'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'to'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'next'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : day
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'at'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '10'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ':'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '00'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );

    it('should *not* treat the dot-character succeeding months (e.g., ' +
        '`Jan`, `Feb`, &c.), as a terminal marker', function () {
            var months = ('Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|' +
                    'Nov|Dec'
                ).split('|'),
                iterator = -1,
                month, root;

            while (months[++iterator]) {
                month = months[iterator];

                root = converter(
                    'My birthday is in ' + month + ' on the 12th.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'My'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'birthday'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : month
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '12th'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Decimals (prefixed by a full-stop)', function () {
    it('should *not* treat the dot-character preceding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];

                var root = converter('See § .' + digit + ' ¶ 2.');
                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'See'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '§'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : digit
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '¶'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : '2'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: TLD abbreviations', function () {
    it('should *not* treat the dot-character preceding top-level domains ' +
        '(e.g., `aero`, `asia`, `biz`, &c.), as a terminal marker',
        function () {
            var tlds = ('aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|' +
                    'mil|mobi|museum|name|net|org|post|pro|tel|travel|xxx'
                ).split('|'),
                iterator = -1,
                root, domain;

            while (tlds[++iterator]) {
                domain = tlds[iterator];

                root = converter(
                    'The domain .' + domain + ' is a top-level domain.'
                );

                assert(root.head.head.toAST() === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'The'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : domain
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'a'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'top'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '-'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'level'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'domain'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }));
            }
        }
    );
});

describe('Contractions', function () {
    it('should break contractions of `‘ll` (from `will`)', function () {
        var root = converter('She\'ll be at the meeting');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'She'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'll'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'be'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'at'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'the'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'meeting'
                }
            ]
        }));
    });

    it('should break contractions of `‘re` (from `are`)', function () {
        var root = converter('You\'re finished');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'You'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 're'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'finished'
                }
            ]
        }));
    });

    it('should break contractions of `‘ve` (from `have`)', function () {
        var root = converter('Do you\'ve any tips');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Do'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'you'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 've'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'any'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'tips'
                }
            ]
        }));
    });

    it('should break contractions of `n‘t` (from `not`)', function () {
        var root = converter('Ain\'t nobody');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Ai'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'n'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 't'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'nobody'
                }
            ]
        }));
    });

    it('should break contractions of `‘s` (from `us`, `is`, `does`, ' +
        'and `has`)', function () {
            var root = converter('It\'s backed up');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'It'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 's'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'backed'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'up'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `‘m` (from `am`)', function () {
        var root = converter('I\'m on a boat');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'on'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'boat'
                }
            ]
        }));
    });

    it('should break contractions of `‘d` (from `had`, `did`, and `would`)',
        function () {
            var root = converter('Where\'d he go');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Where'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'd'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'he'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'go'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `cannot`', function () {
        var root = converter('They cannot fly');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'They'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'can'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'not'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'fly'
                }
            ]
        }));
    });

    it('should break contractions of `d\'ye` (from `do you`)', function () {
        var root = converter('What d\'ye need?');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'What'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'd'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ye'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'need'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '?'
                }
            ]
        }));
    });

    it('should break contractions of `gimme` (`from give me`)', function () {
        var root = converter('Gimme more');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Gim'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'me'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'more'
                }
            ]
        }));
    });

    it('should break contractions of `lemme` (from `let me`)', function () {
        var root = converter('Lemme go!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Lem'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'me'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'go'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `‘em` (from `them`)', function () {
        var root = converter('Have you seen \'em?');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Have'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'you'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'seen'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'em'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '?'
                }
            ]
        }));
    });

    it('should break contractions of `o‘` (from `of (the)`, as in `o‘clock`)',
        function () {
            var root = converter('See you at ten o\'clock.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'See'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'you'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'at'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ten'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'o'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'clock'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `y‘` (from `you`, as in `y‘all`)',
        function () {
            var root = converter('Hold on, y\'all!');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Hold'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'on'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : ','
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'y'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'all'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '!'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `‘t` (from `it`, as in `‘twas`)',
        function () {
            var root = converter('\'Twas the night before Christmas.');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'PunctuationNode',
                        'value' : '\''
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'T'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'was'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'the'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'night'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'before'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'Christmas'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '.'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `coulda` (from `could have`)',
        function () {
            var root = converter('You coulda told him');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'could'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'him'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `musta` (from `must have`)',
        function () {
            var root = converter('He musta guessed');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'He'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'must'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'guessed'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `shoulda` (from `should have`)',
        function () {
            var root = converter('You shoulda told me');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'should'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'me'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `woulda` (from `would have`)',
        function () {
            var root = converter('You woulda told him');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'You'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'would'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'told'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'him'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `kinda` (from `kind of`)', function () {
        var root = converter('That\'s kinda funny');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'That'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'kind'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'funny'
                }
            ]
        }));
    });

    it('should break contractions of `sorta` (from `sort of`)', function () {
        var root = converter('That\'s sorta funny');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'That'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 's'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'sort'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'a'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'funny'
                }
            ]
        }));
    });

    it('should break contractions of `oughta` (from `ought of`)',
        function () {
            var root = converter('I oughta go');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'ought'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'a'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'go'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `wanna` (from `want a` or `want to`)',
        function () {
            var root = converter('I wanna puppy');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'I'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'wan'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'na'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'puppy'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `gonna` (from `going to`)', function () {
        var root = converter('I’m gonna go');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '’'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'gon'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'na'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'go'
                }
            ]
        }));
    });

    it('should break contractions of `doncha` (from `don‘t you`)',
        function () {
            var root = converter('Doncha wanna?');
            assert(root.head.head.toAST() === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'value' : 'Don'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'cha'
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'value' : ' '
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'wan'
                    },
                    {
                        'type' : 'WordNode',
                        'value' : 'na'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'value' : '?'
                    }
                ]
            }));
        }
    );

    it('should break contractions of `gotcha` (from `got you`)', function () {
        var root = converter('I gotcha now!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'got'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'cha'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'now'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `getcha` (from `get you`)', function () {
        var root = converter('Gonna getcha!');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'Gon'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'na'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'get'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'cha'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '!'
                }
            ]
        }));
    });

    it('should break contractions of `outta` (from `out of`)', function () {
        var root = converter('I\'m outta here');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'value' : '\''
                },
                {
                    'type' : 'WordNode',
                    'value' : 'm'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'out'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'here'
                }
            ]
        }));
    });

    it('should break contractions of `lotta` (from `lot of`)', function () {
        var root = converter('A whole lotta people');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'A'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'whole'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'lot'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'people'
                }
            ]
        }));
    });

    it('should break contractions of `hafta` (from `have to`)', function () {
        var root = converter('I hafta fill in my tax return');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'haf'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'fill'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'in'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'my'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'tax'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'return'
                }
            ]
        }));
    });

    it('should break contractions of `gotta` (from `got to`)', function () {
        var root = converter('I gotta learn');
        assert(root.head.head.toAST() === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'value' : 'I'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'got'
                },
                {
                    'type' : 'WordNode',
                    'value' : 'ta'
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'WordNode',
                    'value' : 'learn'
                }
            ]
        }));
    });
});

describe('Terminal markers', function () {
    it('should break sentences ending in a full stop/period', function () {
        var root = converter(
            'Like Miss and Mrs. the term Ms. has its origins in English ' +
            'title once used for all women. Various plural forms used ' +
            'are Mss., Mses. and Mmes.'
        );
        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Like'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Miss'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mrs'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'term'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Ms'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'has'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'its'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'origins'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'English'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'title'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'once'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'for'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'all'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'women'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Various'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'plural'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'forms'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'used'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'are'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mss'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ','
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mses'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'and'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Mmes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in a question mark', function () {
        var root = converter(
            'Is it good in form? style? meaning? He responded with yes.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'it'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'good'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'in'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'form'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'style'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'meaning'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'He'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'responded'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'with'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'yes'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an exclamation mark', function () {
        var root = converter(
            '“No!” he yelled. “Buy it now!” They have some really(!) ' +
            'low-priced rugs on sale this week.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'value' : '“'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'No'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '”'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'he'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'yelled'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'value' : '“'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'Buy'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'it'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'now'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '”'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'They'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'have'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'some'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'really'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '('
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : ')'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'low'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '-'
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'priced'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'rugs'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'on'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'sale'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'this'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'week'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an interrobang', function () {
        var root = converter('Say what‽ She\'s pregnant?! Realy!? Wow.');
        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Say'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'what'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '‽'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'She'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '\''
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 's'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'pregnant'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Realy'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '!'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '?'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'Wow'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an ellipsis', function () {
        var root = converter(
            'This is rather straightforward... most of the time... ' +
            'She said that you should end a sentence with an ellipsis.'
        );

        assert(root.head.toAST() === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'This'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'is'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'rather'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'straightforward'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '...'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'most'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'of'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'the'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'time'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '...'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'value' : ' '
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'value' : 'She'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'said'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'that'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'you'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'should'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'end'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'a'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'sentence'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'with'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'an'
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'value' : ' '
                        },
                        {
                            'type' : 'WordNode',
                            'value' : 'ellipsis'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

},{"..":1,"assert":2,"retext-ast":7}]},{},[9])
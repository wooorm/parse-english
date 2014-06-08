var textom, GROUP_NUMERICAL, GROUP_ALPHABETIC, GROUP_WHITE_SPACE,
    GROUP_COMBINING_DIACRITICAL_MARK, GROUP_TERMINAL_MARKER,
    GROUP_CLOSING_PUNCTUATION, GROUP_FINAL_PUNCTUATION,
    EXPRESSION_WORD_CONTRACTION, EXPRESSION_WORD_MULTIPUNCTUATION,
    EXPRESSION_WORD_DIGIT_LETTER, EXPRESSION_MULTILINEBREAK, STRING_PIPE,
    EXPRESSION_ABBREVIATION_PREFIX, EXPRESSION_WORD_CHARACTER,
    EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE,
    EXPRESSION_ABBREVIATION_AFFIX, EXPRESSION_INITIALISM,
    EXPRESSION_FULL_STOP, EXPRESSION_SENTENCE_END,
    EXPRESSION_SENTENCE_SPACE, EXPRESSION_WHITE_SPACE, EXPRESSION_ORDINAL,
    GROUP_COMBINING_NONSPACING_MARK, constructors, types;

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
    /* e.g., (I)('(ll)), the(y)('(re)) */
    /([\s\S])(['’](ll|re|ve|s|m|d|em))\b/ig,
    /* e.g., c(a)(n't) */
    /([\s\S])(n['’]t)\b/ig,
    /* e.g., (o')(c)lock, (y')(a)ll */
    /\b([oy]['’])([\s\S])\b/ig,
    /* ('T)(w)as */
    /(['’]t)([\s\S])/ig,
    /\b(can)(not)\b/ig,
    /\b(d)(['’]ye)\b/ig,
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
    ']{2,}|([^' + GROUP_NUMERICAL + GROUP_ALPHABETIC +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK +
    '])\\2*', 'g'
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
 * `EXPRESSION_MULTILINEBREAK` finds between-paragraph white space. Also
 * matches initial and final white space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_MULTILINEBREAK = new RegExp(
    '(\\r?\\n|\\r)+$|^(\\r?\\n|\\r)+|(\\r?\\n|\\r){2,}', 'g'
);

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
    /* *Alphabet*: Both upper- and lowercase. */
    'a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z',

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
    'apr|jun|jul|aug|sep|sept|oct|nov|dec',
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
    '0|1|2|3|4|5|6|7|8|9',

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
 * `EXPRESSION_INITIALISM` finds initialisms, an abbreviation from
 * initials, with full stops after each initial.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_INITIALISM = new RegExp(
    '([' + GROUP_ALPHABETIC + ']+\\.){2,}', 'g'
);

/**
 * `EXPRESSION_FULL_STOP` finds full stop characters, globally.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_FULL_STOP = /\./g;

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
    '(\\ +[\\.' + GROUP_ALPHABETIC + '])?',
'g');

/**
 * `EXPRESSION_SENTENCE_SPACE` matches optional white space at the start
 * of a string, followed by any other characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_SENTENCE_SPACE = new RegExp(
    '^([' + GROUP_WHITE_SPACE + ']+)?([\\s\\S]+)$'
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
    var iterator = -1,
        start = 0,
        breakpoints = [],
        match, breakpoint,
        paragraph, whiteSpace;

    /*jshint boss:true */
    while (match = EXPRESSION_MULTILINEBREAK.exec(value)) {
        breakpoints.push([match.index, match.index + match[0].length]);
    }

    breakpoints.push([value.length, value.length]);

    while (breakpoint = breakpoints[++iterator]) {
        if (paragraph = value.slice(start, breakpoint[0])) {
            tokenizeParagraph(
                root.append(new root.TextOM.ParagraphNode()), paragraph
            );
        }

        if (whiteSpace = value.slice(breakpoint[0], breakpoint[1])) {
            root.append(new root.TextOM.WhiteSpaceNode(whiteSpace));
        }

        start = breakpoint[1];
    }

    return root;
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
        sentenceBreakPoints = [],
        sentenceNoBreakPoints = [],
        iterator = -1,
        start, sentence, match, submatch, pointer, $0, $4, length, end;

    /* Two or more occurrences of a letter followed by a full stop. */
    /*jshint boss:true */
    while (submatch = EXPRESSION_INITIALISM.exec(value)) {
        pointer = submatch.index;
        $0 = submatch[0];

        while (match = EXPRESSION_FULL_STOP.exec($0)) {
            sentenceNoBreakPoints.push(pointer + match.index);
        }
    }

    /* A space followd by a common abbr., followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX.exec(value)) {
        sentenceNoBreakPoints.push(match.index + match[1].length);
    }

    /* A common abbreviation, followed by a full stop. */
    while (match = EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE.exec(value)) {
        sentenceNoBreakPoints.push(match.index + match[1].length);
    }

    /* A full stop, followed by a common abbreviation. */
    while (match = EXPRESSION_ABBREVIATION_AFFIX.exec(value)) {
        sentenceNoBreakPoints.push(match.index);
    }

    /*
     * A probable sentence end: A terminal marker (`?`, `!`, or `.`),
     * followed by an optional closing punctuation (e.g., `)` or `”`),
     * followed by an optional comma or full stop, followed by an optional
     * comma or dot, optionally followed by one or more spaces and a
     * letter.
     */
    while (match = EXPRESSION_SENTENCE_END.exec(value)) {
        pointer = match.index;
        $4 = match[4];

        if (sentenceNoBreakPoints.indexOf(pointer) === -1) {
            /*
             * If three was set, the delimiter is followed by a comma
             * character, or a number, thus it's probably not a terminal
             * marker.
             */
            if (match[3]) {
                continue;
            }

            /*
             * If four was set, the delimiter is followed by a space and a
             * letter. If that letter is lowercase, its probably not a
             * terminal marker.
             */
            if ($4 && $4.toString() === $4.toLowerCase()) {
                continue;
            }

            pointer += match[1].length;

            if (match[2]) {
                pointer += match[2].length;
            }

            sentenceBreakPoints.push(pointer);
        }
    }

    sentenceBreakPoints.sort(BREAKPOINT_SORT);
    length = sentenceBreakPoints.length + 1;
    start = 0;

    while (++iterator < length) {
        end = sentenceBreakPoints[iterator];

        sentence = value.slice(start, end);

        if (EXPRESSION_WORD_CHARACTER.test(sentence)) {
            sentences.push(sentence);
        } else if (sentences.length) {
            sentences[sentences.length - 1] += sentence;
        } else if (iterator === length - 1) {
            sentences.push(sentence);
        } else {
            end -= sentence.length;
        }

        start = end;
    }

    iterator = -1;

    while (sentence = sentences[++iterator]) {
        sentence = EXPRESSION_SENTENCE_SPACE.exec(sentence);

        if (sentence[1]) {
            paragraph.append(
                new paragraph.TextOM.WhiteSpaceNode(sentence[1])
            );
        }

        tokenizeSentence(paragraph.append(
            new paragraph.TextOM.SentenceNode()), sentence[2]
        );
    }

    return paragraph;
}

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

    /* Insert word-like break points.

    /* Break between contractions consisting of two parts. */
    while (++iterator < length) {
        expression = EXPRESSION_WORD_CONTRACTION[iterator];

        /*jshint boss:true */
        while (match = expression.exec(value)) {
            tokenBreakPoints.push(match.index + match[1].length);
        }
    }

    /*
     * Break on general punctuation (One or more of the same
     * non-letter or non-number character.
     */
    while (match = EXPRESSION_WORD_MULTIPUNCTUATION.exec(value)) {
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

        tokens.push(value.slice(start, end));

        start = end;
    }

    /* Iterate over the non-empty tokens, detect type of token. */
    iterator = -1;

    while (token = tokens[++iterator]) {
        /*
         * Append a new item (glue or box) to the list, and pass it the
         * string value and the item its in.
         */
        if (token.match(EXPRESSION_WHITE_SPACE)) {
            sentence.append(new sentence.TextOM.WhiteSpaceNode(token));
        } else if (token.match(EXPRESSION_WORD_MULTIPUNCTUATION)) {
            sentence.append(new sentence.TextOM.PunctuationNode(token));
        } else {
            sentence.append(new sentence.TextOM.WordNode(token));
        }
    }

    return sentence;
}

/**
 * `toAST` converts the given node into a AST object.
 *
 * @param {Object} node - The node to convert.
 * @return {Object} - A simple object containing the nodes type, and
 *                    either a children attribute containing an array
 *                    the result of `toAST` on each child, or a value
 *                    attribute containing the nodes internal value.
 * @global
 * @private
 */
function toAST (node) {
    var ast, result, item;

    if (!node || !node.TextOM) {
        throw new TypeError('Illegal invocation: \'' + node +
            '\' is not a valid argument for \'toAST\'');
    }

    ast = {
        'type' : node.TextOM.types[node.type]
    };

    if (!('length' in node)) {
        ast.value = node.toString();
    } else {
        result = [];
        item = node.head;

        while (item) {
            result.push(toAST(item));
            item = item.next;
        }

        ast.children = result;
    }

    return ast;
}

/**
 * `insert` inserts the given source after (when given), the `item`, and
 * otherwise as the first item of the given parent. Tries to be smart
 * about which nodes to add (i.e., nodes of the same or without
 * hierarchy).
 *
 * @param {Object} parent - The node to insert into.
 * @param {Object?} item - The node to insert after.
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first inserted node, and endContainer set to to
 *                   the last inserted node.
 * @api private
 */
function insert(parent, item, source) {
    var hierarchy, child, range, children, method, iterator;

    if (!parent || !parent.TextOM ||
        !(parent instanceof parent.TextOM.Parent ||
        parent instanceof parent.TextOM.Element)) {
            throw new TypeError('Type Error');
    }

    hierarchy = parent.hierarchy + 1;
    child = parent.parser(source);

    if (!child.length) {
        throw new TypeError('Illegal invocation: \'' + source +
            '\' is not a valid argument for \'insert\'');
    }

    while (child.hierarchy < hierarchy) {
        /* WhiteSpace, and the like, or multiple children. */
        if (child.length > 1) {
            if (!('hierarchy' in child.head) ||
                child.head.hierarchy === hierarchy) {
                    children = [].slice.call(child);
                    break;
            } else {
                throw new TypeError('Illegal invocation: Can\'t ' +
                    'insert from multiple parents');
            }
        } else {
            child = child.head;
        }
    }

    if (!children) {
        children = [child];
    }

    range = new parent.TextOM.Range();
    range.setStart(children[0]);
    range.setEnd(children[children.length - 1]);

    iterator = children.length;

    while (children[--iterator]) {
        (item ? item.after : parent.prepend).call(
            item || parent, children[iterator]
        );
    }

    return range;
}

/**
 * `remove` calls `remove` on each item in `items`.
 *
 * @param {Node|Node[]} items - The nodes to remove.
 * @api private
 */
function remove(items) {
    var iterator;

    if (!items || !('length' in items) ||
        !('TextOM' in items || items instanceof Array)) {
            throw new TypeError('Type Error');
    }

    items = [].slice.call(items);
    iterator = items.length;

    while (items[--iterator]) {
        items[iterator].remove();
    }
}

/**
 * `prependContent` inserts the parsed `source` at the start of the
 * operated on node.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first prepended node, and endContainer set to to
 *                   the last prepended node.
 * @global
 * @private
 */
function prependContent(source) {
    return insert(this, null, source);
}

/**
 * `appendContent` inserts the parsed `source` at the end of the operated
 * on node.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first appended node, and endContainer set to to the
 *                   last appended node.
 * @global
 * @private
 */
function appendContent(source) {
    return insert(this, this && (this.tail || this.head), source);
}

/**
 * `removeContent` removes the content of the operated on node.
 *
 * @global
 * @private
 */
function removeContent() {
    remove(this);
}

/**
 * `replaceContent` inserts the parsed `source` at the end of the operated
 * on node, and removes its previous children.
 *
 * @param {String} source - The source to parse and insert.
 * @return {Range} - A range object with its startContainer set to the
 *                   first appended node, and endContainer set to to the
 *                   last appended node.
 * @global
 * @private
 */
function replaceContent(source) {
    var self = this,
        items = [].slice.call(self),
        result;

    if (!self || !self.TextOM || !(self instanceof self.TextOM.Parent ||
        self instanceof self.TextOM.Element)) {
            throw new TypeError('Type Error');
    }

    if (self.parser(source).length) {
        result = insert(self, null, source);
    }

    remove(items);

    return result;
}

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
                types[prototype.type] = Constructor.name;
            }
        }
    }

    /**
     * `Node.prototype.toAST` converts the operated on node into an AST
     * object.
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
    TextOM.Node.prototype.toAST = function (delimiter) {
        return JSON.stringify(toAST(this), null, delimiter);
    };

    /**
     * `prependContent` inserts the parsed `source` at the start of the
     * operated on parent.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first prepended node, and endContainer set to to
     *                   the last prepended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    TextOM.Element.prototype.prependContent =
        TextOM.Parent.prototype.prependContent = prependContent;

    /**
     * `appendContent` inserts the parsed `source` at the end of the operated
     * on parent.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first appended node, and endContainer set to to the
     *                   last appended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    TextOM.Element.prototype.appendContent =
        TextOM.Parent.prototype.appendContent = appendContent;

    /**
     * `removeContent` removes the content of the operated on parent.
     *
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    TextOM.Element.prototype.removeContent =
        TextOM.Parent.prototype.removeContent = removeContent;

    /**
     * `replaceContent` inserts the parsed `source` at the end of the operated
     * on parent, and removes its previous children.
     *
     * @param {String} source - The source to parse and insert.
     * @return {Range} - A range object with its startContainer set to the
     *                   first appended node, and endContainer set to to the
     *                   last appended node.
     * @api public
     * @memberof TextOM.Parent.prototype
     */
    TextOM.Element.prototype.replaceContent =
        TextOM.Parent.prototype.replaceContent = replaceContent;

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
     * `fromAST` converts a given (stringified?) AST into a node.
     *
     * @param {Object|String} ast - The AST to convert.
     * @return {Object} - The parsed node.
     * @global
     * @private
     */
    function fromAST(ast) {
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
                node.append(fromAST(children[iterator]));
            }
        } else {
            node.fromString(ast.value);
        }

        return node;
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
     * Expose `fromAST`.
     *
     * @api public
     * @memberof parser
     */
    parser.fromAST = fromAST;

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

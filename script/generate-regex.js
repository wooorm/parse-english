import fs from 'node:fs/promises'
import regexgen from 'regexgen'

// Case-insensitive abbreviation, followed by dot.
const abbreviationsInsensitive = [
  /**
   * # Business Abbreviations
   */
  // Incorporation
  'inc',
  // Limited company
  'ltd',
  /**
   * # British unit abbreviations
   *
   * > 👉 **Note**: *metric abbreviations* do not use full stops.
   *
   * > 👉 **Note**: some common plurals are included, although units should not
   * > be pluralised.
   */
  // Barrel
  'bbl',
  'bbls',
  // Cubic
  'cu',
  // Dozen
  'doz',
  // Fluid (ounce)
  'fl',
  // Foot
  'ft',
  // Gallon
  'gal',
  // Grain
  'gr',
  // Gross
  'gro',
  // Inch
  'in',
  // Karat / knot
  'kt',
  // Pound
  'lb',
  'lbs',
  // Mile
  'mi',
  // Ounce,
  'oz',
  // Pint
  'pt',
  // Quart
  'qt',
  // Square
  'sq',
  // Tablespoon
  'tbsp',
  // Teaspoon
  'tsp',
  // Yard
  'yd',
  'yds',
  /**
   * # Abbreviations of time references
   */
  // Seconds
  'sec',
  // Minutes
  'min',
  // Hours
  'hr',
  // Monday
  'mon',
  // Tuesday
  'tue',
  'tues',
  // Wednesday
  'wed',
  // Thursday
  'thu',
  'thurs',
  // Friday
  'fri',
  // Saturday
  'sat',
  // Sunday
  'sun',
  // January
  'jan',
  // Februari
  'feb',
  // March
  'mar',
  // April
  'apr',
  // June
  'jun',
  // July
  'jul',
  // August
  'aug',
  // September
  'sep',
  'sept',
  // October
  'oct',
  // November
  'nov',
  // December
  'dec'
]

// Case-sensitive abbreviation, followed by dot.
const abbreviationsSensitive = [
  /**
   * # Social
   */
  // Mister
  'Mr',
  // Mistress
  'Mrs',
  // Mistress
  'Miss',
  // Woman
  'Ms',
  // Mademoiselle
  'Mss',
  // Madame,
  'Mses',
  'Mlle',
  'Mme',
  // Monsieur
  'M',
  // Misters.
  'Messrs',
  // Mesdames
  'Mmes',
  // Junior
  'Jr',
  // Senior
  'Sr',
  'Snr',
  /**
   * # Rank and academic
   */
  //
  // Doctor
  'Dr',
  // Magister
  'Mgr',
  // Attorney
  'Atty',
  // Profesor
  'Prof',
  // Honourable
  'Hon',
  // Reverend
  'Rev',
  // Father
  'Fr',
  // Monsignor
  'Msgr',
  // Sister
  'Sr',
  // Brother
  'Br',
  // Saint
  'St',
  // President
  'Pres',
  // Superintendent
  'Supt',
  // Representative
  'Rep',
  // Senator
  'Sen',
  /**
   * # Rank and military
   */
  // Governor
  'Gov',
  // Ambassador
  'Amb',
  // Treasurer
  'Treas',
  // Secretary
  'Sec',
  // Admiral
  'Amd',
  // Brigadier
  'Brig',
  // General
  'Gen',
  // Commander
  'Cdr',
  // Colonel
  'Col',
  // Captain
  'Capt',
  // Lieutenant
  'Lt',
  // Major
  'Maj',
  // Sergeant
  'Sgt',
  // Petty Officer
  'Po',
  // Warrant Officer
  'Wo',
  // Purple Heart
  'Ph',
  /**
   * # Common geographical abbreviations
   */
  // Avenue
  'Ave',
  // Boulevard
  'Blvd',
  // Mountain
  'Mt',
  // Road
  'Rd',
  // Building
  'Bldg',
  'Bldgs',
  // National
  'Nat',
  'Natl',
  // Route
  'Rt',
  'Rte',
  // County
  'Co',
  // Park
  'Pk',
  // Square
  'Sq',
  // Drive
  'Dr',
  // Port / Point
  'Pt',
  // Street / State
  'St',
  // Fort
  'Ft',
  // Peninsula
  'Pen',
  // Territory
  'Terr',
  // Highway
  'Hwy',
  // Freeway
  'Fwy',
  // Parkway
  'Pkwy',
  /**
   * # American state abbreviations
   */
  // Alabama
  'Ala',
  // Arizona
  'Ariz',
  // Arkansas
  'Ark',
  // California
  'Cal',
  'Calif',
  // Colorado
  'Col',
  'Colo',
  // Connecticut
  'Conn',
  // Delaware
  'Del',
  // Florida
  'Fla',
  // Georgia
  'Ga',
  // Idaho
  'Ida',
  'Id',
  // Illinois
  'Ill',
  // Indiana
  'Ind',
  // Iowa
  'Ia',
  // Kansas
  'Kan',
  'Kans',
  // Kentucky
  'Ken',
  'Ky',
  // Louisiana
  'La',
  // Maine
  'Me',
  // Maryland
  'Md',
  // Massachusetts
  'Mass',
  // Michigan
  'Mich',
  // Minnesota
  'Minn',
  // Mississippi
  'Miss',
  // Missouri
  'Mo',
  // Montana
  'Mont',
  // Nebraska
  'Neb',
  'Nebr',
  // Nevada
  'Nev',
  // Mexico
  'Mex',
  // Dakota
  'Dak',
  // Oklahoma
  'Okla',
  'Ok',
  // Oregon
  'Ore',
  // Pennsylvania
  'Penna',
  'Penn',
  'Pa',
  // Tennessee
  'Tenn',
  // Texas
  'Tex',
  // Utah
  'Ut',
  // Vermont
  'Vt',
  // Virginia
  'Va',
  // Washington
  'Wash',
  // Wisconsin
  'Wis',
  'Wisc',
  // Wyoming
  'Wyo',
  /**
   * # Canadian province abbreviations
   */
  // Alberta
  'Alta',
  // Manitoba
  'Man',
  // Ontario
  'Ont',
  // Quebec
  'Que',
  'Qué',
  // Saskatchewan
  'Sask',
  // Yukon Territory
  'Yuk',
  /**
   * # English county abbreviations
   */
  // Bedfordshire
  'Beds',
  // Berkshire
  'Berks',
  // Buckinghamshire
  'Bucks',
  // Cambridgeshire
  'Cambs',
  // Cheshire
  'Ches',
  // Cornwall
  'Corn',
  // Cumberland
  'Cumb',
  // Derbyshire
  'Derbys',
  'Derbs',
  // Devon
  'Dev',
  // Dorset
  'Dor',
  // Durham
  'Dur',
  // Gloucestershire
  'Glos',
  // Hampshire
  'Hants',
  // Herefordshire
  'Here',
  'Heref',
  // Hertfordshire
  'Herts',
  // Huntingdonshire
  'Hunts',
  // Lancashire
  'Lancs',
  // Leicestershire
  'Leics',
  // Lincolnshire
  'Lincs',
  // Middlesex
  'Mx',
  'Middx',
  'Mddx',
  // Norfolk
  'Norf',
  // Northamptonshire
  'Northants',
  // Northumberland
  'Northumb',
  'Northd',
  // Nottinghamshire
  'Notts',
  // Oxfordshire
  'Oxon',
  // Rutland
  'Rut',
  // Shropshire
  'Shrops',
  'Salop',
  // Somerset
  'Som',
  // Staffordshire
  'Staffs',
  'Staf',
  // Suffolk
  'Suff',
  // Surrey
  'Sy',
  // Sussex
  'Sx',
  'Ssx',
  // Warwickshire
  'Warks',
  'War',
  'Warw',
  // Westmorland
  'Westm',
  // Wiltshire
  'Wilts',
  // Worcestershire
  'Worcs',
  // Yorkshire
  'Yorks'
]

// Elision ending in apostrophe.
const elisionPrefix = [
  // `o’` -> `of`
  'o',
  // `ol’` -> `old`
  'ol'
]

// Elision starting in apostrophe.
const elisionAffix = [
  // ’im > him
  'im',
  // ’er > her
  'er',
  // ’em > them
  'em',
  // ’cause > because
  'cause',
  // ’twas > it was
  'twas',
  // ’tis > it is
  'tis',
  // ’twere > it were
  'twere'
  // Note: dates (’90s) are included manually below
]

await fs.writeFile(
  new URL('../lib/regex.js', import.meta.url),
  [
    '// Note: this file is generated by `script/generate-regex.js`',
    // Note: There's no `i` flag here because the value to test against should be
    // all lowercase!
    'export const abbreviations =',
    '  /^(' + regexgen(abbreviationsInsensitive).source + ')$/',
    '',
    'export const abbreviationsSensitive =',
    '  /^(' + regexgen(abbreviationsSensitive).source + ')$/',
    '',
    'export const elisionPrefix =',
    '  /^(' + regexgen(elisionPrefix).source + ')$/',
    '',
    'export const elisionAffix =',
    '  /^(' + regexgen(elisionAffix).source + '|\\d\\ds?)$/',
    ''
  ].join('\n')
)

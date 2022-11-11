import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {assert as nlcstTest} from 'nlcst-test'
import {VFile} from 'vfile'
import {ParseEnglish} from '../index.js'

const english = new ParseEnglish()

test('ParseEnglish', function (t) {
  t.equal(typeof ParseEnglish, 'function', 'should be a `function`')

  t.ok(new ParseEnglish() instanceof ParseEnglish, 'should instantiate')

  t.deepLooseEqual(
    new ParseEnglish(null, new VFile('Alpha bravo charlie')).parse(),
    english.parse('Alpha bravo charlie'),
    'should accept a vfile'
  )

  t.end()
})

test('Abbreviations: at sentence end', function (t) {
  t.test('should NOT treat `Ave.` as a terminal marker', function (st) {
    describeFixture(st, 'abbrev-final', 'Send it to 7th Ave.')
    st.end()
  })

  t.end()
})

test('Abbreviations: Geographic', function (t) {
  t.test('should NOT treat `Ave.` as a terminal marker', function (st) {
    // Note: This paragraph also tests for coverage of early break branches in
    // the `mergeEnglishPrefixExceptions` function.
    //
    // These should probably be tested by running `ParseLatin` specs.
    describeFixture(
      st,
      'geographic-ave',
      'Survey! (Reaffirms). Test. The 5th Ave. Top of the Retail Rent Heap.',
      'tokenizeParagraph'
    )

    st.end()
  })

  t.test('should NOT treat `Blvd.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-blvd',
      'A café located on the Blvd. Kusadasi.'
    )

    st.end()
  })

  t.test('should NOT treat `Mt.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-mt',
      'Like all mountains, Mt. Gay is a large large mass of rock.'
    )

    st.end()
  })

  t.test('should NOT treat `Rd.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-rd', "It's at Rd. Townmead.")

    st.end()
  })

  t.test('should NOT treat `Bldg.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-bldg', 'Near Bldg. Linchfield')

    st.end()
  })

  t.test('should NOT treat `Nat.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-nat',
      'The Teide Nat. Park in Tenerife, Spain.'
    )

    st.end()
  })

  t.test('should NOT treat `Natl.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-natl',
      'The Teide Natl. Park in Tenerife, Spain.'
    )

    st.end()
  })

  t.test('should NOT treat `Rt.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-rt', 'Some gibberish Rt. America 66.')

    st.end()
  })

  t.test('should NOT treat `Rte.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-rte', 'Some gibberish Rte. America 66.')

    st.end()
  })

  t.test('should NOT treat `Co.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-co',
      'The Co. Leicestershire is a landlocked county'
    )

    st.end()
  })

  t.test('should NOT treat `Pk.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-pk',
      "Meet at Pk. St. James's, which covers 34 ha."
    )

    st.end()
  })

  t.test('should NOT treat `Sq.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-sq',
      'Times Sq. New York is a major commercial intersection.'
    )

    st.end()
  })

  t.test('should NOT treat `Dr.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-dr', 'Continue on Pershing Dr. Greenville.')

    st.end()
  })

  t.test('should NOT treat `Pt.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-pt',
      'The Pt. L.A. is also called Los Angeles Harbor Department.'
    )

    st.end()
  })

  t.test('should NOT treat `St.` as a terminal marker', function (st) {
    describeFixture(st, 'geographic-st', 'I used to live on 2nd St. Clinton.')

    st.end()
  })

  t.test('should NOT treat `Ft.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-ft',
      'As Ft. Knox is no longer “The Home of Armor”, the Patton Museum has also been relocated.'
    )

    st.end()
  })

  t.test('should NOT treat `Pen.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-pen',
      'Pen. Huon is a large rugged peninsula on the island of New Guinea.'
    )

    st.end()
  })

  t.test('should NOT treat `Terr.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-terr',
      'Terr. Yukon is an area of rugged mountains and high plateaus.'
    )

    st.end()
  })

  t.test('should NOT treat `Hwy.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-hwy',
      'The Hwy. Atlantic was the direct predecessor to U.S. 1.'
    )

    st.end()
  })

  t.test('should NOT treat `Fwy.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-fwy',
      'The Fwy. San Diego is most commonly called “The 405”.'
    )

    st.end()
  })

  t.test('should NOT treat `Pkwy.` as a terminal marker', function (st) {
    describeFixture(
      st,
      'geographic-pkwy',
      'The National Pkwy. Blue Ridge is noted for its scenic beauty.'
    )

    st.end()
  })

  const states = (
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Dak|Del|Fla|Ga|Ia|Id|' +
    'Ida|Ill|Ind|Kan|Kans|Ken|Ky|La|Mass|Md|Me|Mex|Mich|Minn|Miss|' +
    'Mo|Mont|Neb|Nebr|Nev|Ok|Okla|Ore|Pa|Penn|Penna|Tenn|Tex|Ut|Va|' +
    'Vt|Wash|Wis|Wisc|Wyo'
  ).split('|')

  for (const state of states) {
    t.test(
      'should NOT treat `' + state + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'geographic-state-' + state.toLowerCase(),
          'I live in ' + state + '. Clinton on 2nd street.'
        )

        st.end()
      }
    )
  }

  const statesCa = 'Alta|Man|Ont|Qué|Que|Sask|Yuk'.split('|')

  for (const state of statesCa) {
    t.test(
      'should NOT treat `' + state + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'geographic-state-' + state.toLowerCase(),
          "I'm from Mt. Pleasant, " + state + '. Canada.'
        )

        st.end()
      }
    )
  }

  const counties = (
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|' +
    'Derbs|Dev|Dor|Dur|Glos|Hants|Here|Heref|Herts|Hunts|' +
    'Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf|Northants|' +
    'Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|' +
    'Staffs|Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|' +
    'Worcs|Yorks'
  ).split('|')

  for (const county of counties) {
    t.test(
      'should NOT treat `' + county + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'geographic-state-' + county.toLowerCase(),
          "I'm from Newton, " + county + '. England.'
        )

        st.end()
      }
    )
  }

  t.end()
})

test('Abbreviations: Title abbreviations', function (t) {
  const titles = (
    'Amb|Amd|Atty|Br|Brig|Capt|Cdr|Col|Dr|Fr|Gen|Gov|Hon|Jr|Lt|' +
    'M|Maj|Messrs|Mgr|Miss|Mlle|Mme|Mmes|Mr|Mrs|Ms|Msgr|Ph|Po|' +
    'Pres|Prof|Rep|Rev|Sec|Sen|Sgt|Snr|Sr|St|Supt|Treas|Wo'
  ).split('|')

  for (const title of titles) {
    t.test(
      'should NOT treat `' + title + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'title-' + title.toLowerCase(),
          'You should talk to ' + title + '. Smith.'
        )

        st.end()
      }
    )
  }

  t.end()
})

test('Abbreviations: Business', function (t) {
  const abbreviations = 'Inc|Ltd'.split('|')

  for (const abbreviation of abbreviations) {
    t.test(
      'should NOT treat `' + abbreviation + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'business-' + abbreviation.toLowerCase(),
          'XYZ Associates ' + abbreviation + '. is a member.'
        )

        st.end()
      }
    )
  }

  t.end()
})

test('Abbreviations: English unit abbreviations', function (t) {
  const units =
    'bbl|cu|doz|fl|oz|ft|gal|gr|gro|in|kt|lb|mi|pt|qt|sq|tbsp|tsp|yd'.split('|')

  for (const unit of units) {
    t.test(
      'should NOT treat `' + unit + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'unit-' + unit,
          "What's the price for 1 " + unit + '. Eric?'
        )

        st.end()
      }
    )
  }

  t.end()
})

test('Abbreviations: Time references', function (t) {
  const times = 'sec|min|hr'.split('|')

  for (const time of times) {
    t.test(
      'should NOT treat `' + time + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'time-' + time,
          "What's the price for 30 " + time + '. Eric?'
        )

        st.end()
      }
    )
  }

  const days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun'.split('|')

  for (const day of days) {
    t.test(
      'should NOT treat `' + day + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'day-' + day.toLowerCase(),
          'Move the meeting to next ' + day + '. Smith.'
        )

        st.end()
      }
    )
  }

  const months = 'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec'.split('|')

  for (const month of months) {
    t.test(
      'should NOT treat `' + month + '.` as a terminal marker',
      function (st) {
        describeFixture(
          st,
          'month-' + month.toLowerCase(),
          'My birthday is ' + month + '. Giberish.'
        )

        st.end()
      }
    )
  }

  t.end()
})

test('Elision', function (t) {
  t.test("should treat `o'` as one word", function (st) {
    describeFixture(st, 'elision-final-o', "Lots o' luck, lots o\u2019 luck.")

    st.end()
  })

  t.test("should treat `ol'` as one word", function (st) {
    describeFixture(
      st,
      'elision-final-ol',
      "Your ol' grandpa, your ol\u2019 grandpa."
    )

    st.end()
  })

  t.test("should treat `'em` as one word", function (st) {
    describeFixture(st, 'elision-initial-em', "Tell 'em, tell \u2019em.")

    st.end()
  })

  t.test("should treat `'er` as one word", function (st) {
    describeFixture(st, 'elision-initial-er', "Tell 'er, tell \u2019er.")

    st.end()
  })

  t.test("should treat `'im` as one word", function (st) {
    describeFixture(st, 'elision-initial-im', "Tell 'im, tell \u2019im.")

    st.end()
  })

  t.test("should treat `'cause` as one word", function (st) {
    describeFixture(
      st,
      'elision-initial-cause',
      "'Cause it is, \u2019cause it is."
    )

    st.end()
  })

  t.test("should treat `'n'` as one word", function (st) {
    describeFixture(st, 'elision-n', "Rock 'n' Roll, Rock \u2019n\u2019 Roll!")

    st.end()
  })

  t.test("should treat `'twas` as one word", function (st) {
    describeFixture(
      st,
      'elision-initial-twas',
      "'Twas the day, \u2019twas the day of Christmas."
    )

    st.end()
  })

  t.test("should treat `'tis` as one word", function (st) {
    describeFixture(
      st,
      'elision-initial-tis',
      "'Tis the day, \u2019tis the day of Christmas."
    )

    st.end()
  })

  t.test("should treat `'twere` as one word", function (st) {
    describeFixture(
      st,
      'elision-initial-twere',
      "If 'twere us, if \u2019twere us..."
    )

    st.end()
  })

  t.test("should treat `'70s` as one word", function (st) {
    describeFixture(
      st,
      'elision-initial-year-plural',
      "That '70s Show, that \u201970s show."
    )

    st.end()
  })

  t.test("should treat `'49` as one word", function (st) {
    describeFixture(st, 'elision-initial-year', "In '49, in \u201949...")

    st.end()
  })

  t.test('should NOT treat other initial apostrophes as word', function (st) {
    describeFixture(st, 'elision-non-initial', "Such as 'the previous.")

    // This is commented out because `parse-latin` always thinks apostrophes at
    // the start of a word are part of that word.
    // describeFixture('elision-non-initial-smart', 'Such as \u2019the previous.')

    st.end()
  })

  t.test('should NOT treat other final apostrophes as word', function (st) {
    describeFixture(st, 'elision-non-final', "Such as the' previous.")

    describeFixture(
      st,
      'elision-non-final-smart',
      'Such as the\u2019 previous.'
    )

    st.end()
  })

  t.test('should treat `w/` as one word', function (st) {
    describeFixture(st, 'elision-w', "Let's meet w/ Eric.")

    st.end()
  })

  t.test('should NOT treat the slash in`with/` as one word', function (st) {
    describeFixture(st, 'elision-non-with', "Let's meet with/ Eric.")

    st.end()
  })

  t.end()
})

// Utility to test if a given document is both a valid node, and matches a
// fixture.
function describeFixture(t, name, doc, method) {
  const nlcstA = english[method || 'parse'](doc)
  const fixture = JSON.parse(
    fs.readFileSync(path.join('test', 'fixture', name + '.json'))
  )

  nlcstTest(nlcstA)

  t.deepLooseEqual(nlcstA, fixture, 'should match w/ position')
}

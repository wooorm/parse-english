import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {assert as nlcstTest} from 'nlcst-test'
import {VFile} from 'vfile'
import {ParseEnglish} from '../index.js'

/* eslint-disable no-await-in-loop */

const english = new ParseEnglish()

test('ParseEnglish', function () {
  assert.equal(typeof ParseEnglish, 'function', 'should be a `function`')

  assert.ok(new ParseEnglish() instanceof ParseEnglish, 'should instantiate')

  assert.deepEqual(
    new ParseEnglish(null, new VFile('Alpha bravo charlie')).parse(),
    english.parse('Alpha bravo charlie'),
    'should accept a vfile'
  )
})

test('Abbreviations: at sentence end', async function (t) {
  await t.test(
    'should NOT treat `Ave.` as a terminal marker',
    async function () {
      await describeFixture('abbrev-final', 'Send it to 7th Ave.')
    }
  )
})

test('Abbreviations: Geographic', async function (t) {
  await t.test(
    'should NOT treat `Ave.` as a terminal marker',
    async function () {
      // Note: This paragraph also tests for coverage of early break branches in
      // the `mergeEnglishPrefixExceptions` function.
      //
      // These should probably be tested by running `ParseLatin` specs.
      await describeFixture(
        'geographic-ave',
        'Survey! (Reaffirms). Test. The 5th Ave. Top of the Retail Rent Heap.',
        'tokenizeParagraph'
      )
    }
  )

  await t.test(
    'should NOT treat `Blvd.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-blvd',
        'A café located on the Blvd. Kusadasi.'
      )
    }
  )

  await t.test(
    'should NOT treat `Mt.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-mt',
        'Like all mountains, Mt. Gay is a large large mass of rock.'
      )
    }
  )

  await t.test(
    'should NOT treat `Rd.` as a terminal marker',
    async function () {
      await describeFixture('geographic-rd', "It's at Rd. Townmead.")
    }
  )

  await t.test(
    'should NOT treat `Bldg.` as a terminal marker',
    async function () {
      await describeFixture('geographic-bldg', 'Near Bldg. Linchfield')
    }
  )

  await t.test(
    'should NOT treat `Nat.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-nat',
        'The Teide Nat. Park in Tenerife, Spain.'
      )
    }
  )

  await t.test(
    'should NOT treat `Natl.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-natl',
        'The Teide Natl. Park in Tenerife, Spain.'
      )
    }
  )

  await t.test(
    'should NOT treat `Rt.` as a terminal marker',
    async function () {
      await describeFixture('geographic-rt', 'Some gibberish Rt. America 66.')
    }
  )

  await t.test(
    'should NOT treat `Rte.` as a terminal marker',
    async function () {
      await describeFixture('geographic-rte', 'Some gibberish Rte. America 66.')
    }
  )

  await t.test(
    'should NOT treat `Co.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-co',
        'The Co. Leicestershire is a landlocked county'
      )
    }
  )

  await t.test(
    'should NOT treat `Pk.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-pk',
        "Meet at Pk. St. James's, which covers 34 ha."
      )
    }
  )

  await t.test(
    'should NOT treat `Sq.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-sq',
        'Times Sq. New York is a major commercial intersection.'
      )
    }
  )

  await t.test(
    'should NOT treat `Dr.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-dr',
        'Continue on Pershing Dr. Greenville.'
      )
    }
  )

  await t.test(
    'should NOT treat `Pt.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-pt',
        'The Pt. L.A. is also called Los Angeles Harbor Department.'
      )
    }
  )

  await t.test(
    'should NOT treat `St.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-st',
        'I used to live on 2nd St. Clinton.'
      )
    }
  )

  await t.test(
    'should NOT treat `Ft.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-ft',
        'As Ft. Knox is no longer “The Home of Armor”, the Patton Museum has also been relocated.'
      )
    }
  )

  await t.test(
    'should NOT treat `Pen.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-pen',
        'Pen. Huon is a large rugged peninsula on the island of New Guinea.'
      )
    }
  )

  await t.test(
    'should NOT treat `Terr.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-terr',
        'Terr. Yukon is an area of rugged mountains and high plateaus.'
      )
    }
  )

  await t.test(
    'should NOT treat `Hwy.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-hwy',
        'The Hwy. Atlantic was the direct predecessor to U.S. 1.'
      )
    }
  )

  await t.test(
    'should NOT treat `Fwy.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-fwy',
        'The Fwy. San Diego is most commonly called “The 405”.'
      )
    }
  )

  await t.test(
    'should NOT treat `Pkwy.` as a terminal marker',
    async function () {
      await describeFixture(
        'geographic-pkwy',
        'The National Pkwy. Blue Ridge is noted for its scenic beauty.'
      )
    }
  )

  const states = (
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Dak|Del|Fla|Ga|Ia|Id|' +
    'Ida|Ill|Ind|Kan|Kans|Ken|Ky|La|Mass|Md|Me|Mex|Mich|Minn|Miss|' +
    'Mo|Mont|Neb|Nebr|Nev|Ok|Okla|Ore|Pa|Penn|Penna|Tenn|Tex|Ut|Va|' +
    'Vt|Wash|Wis|Wisc|Wyo'
  ).split('|')

  for (const state of states) {
    await t.test(
      'should NOT treat `' + state + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'geographic-state-' + state.toLowerCase(),
          'I live in ' + state + '. Clinton on 2nd street.'
        )
      }
    )
  }

  const statesCa = 'Alta|Man|Ont|Qué|Que|Sask|Yuk'.split('|')

  for (const state of statesCa) {
    await t.test(
      'should NOT treat `' + state + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'geographic-state-' + state.toLowerCase(),
          "I'm from Mt. Pleasant, " + state + '. Canada.'
        )
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
    await t.test(
      'should NOT treat `' + county + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'geographic-state-' + county.toLowerCase(),
          "I'm from Newton, " + county + '. England.'
        )
      }
    )
  }
})

test('Abbreviations: Title abbreviations', async function (t) {
  const titles = (
    'Amb|Amd|Atty|Br|Brig|Capt|Cdr|Col|Dr|Fr|Gen|Gov|Hon|Jr|Lt|' +
    'M|Maj|Messrs|Mgr|Miss|Mlle|Mme|Mmes|Mr|Mrs|Ms|Msgr|Ph|Po|' +
    'Pres|Prof|Rep|Rev|Sec|Sen|Sgt|Snr|Sr|St|Supt|Treas|Wo'
  ).split('|')

  for (const title of titles) {
    await t.test(
      'should NOT treat `' + title + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'title-' + title.toLowerCase(),
          'You should talk to ' + title + '. Smith.'
        )
      }
    )
  }
})

test('Abbreviations: Business', async function (t) {
  const abbreviations = 'Inc|Ltd'.split('|')

  for (const abbreviation of abbreviations) {
    await t.test(
      'should NOT treat `' + abbreviation + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'business-' + abbreviation.toLowerCase(),
          'XYZ Associates ' + abbreviation + '. is a member.'
        )
      }
    )
  }
})

test('Abbreviations: English unit abbreviations', async function (t) {
  const units =
    'bbl|cu|doz|fl|oz|ft|gal|gr|gro|in|kt|lb|mi|pt|qt|sq|tbsp|tsp|yd'.split('|')

  for (const unit of units) {
    await t.test(
      'should NOT treat `' + unit + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'unit-' + unit,
          "What's the price for 1 " + unit + '. Eric?'
        )
      }
    )
  }
})

test('Abbreviations: Time references', async function (t) {
  const times = 'sec|min|hr'.split('|')

  for (const time of times) {
    await t.test(
      'should NOT treat `' + time + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'time-' + time,
          "What's the price for 30 " + time + '. Eric?'
        )
      }
    )
  }

  const days = 'Mon|Tue|Tues|Wed|Thu|Thurs|Fri|Sat|Sun'.split('|')

  for (const day of days) {
    await t.test(
      'should NOT treat `' + day + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'day-' + day.toLowerCase(),
          'Move the meeting to next ' + day + '. Smith.'
        )
      }
    )
  }

  const months = 'Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec'.split('|')

  for (const month of months) {
    await t.test(
      'should NOT treat `' + month + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'month-' + month.toLowerCase(),
          'My birthday is ' + month + '. Giberish.'
        )
      }
    )
  }
})

test('Elision', async function (t) {
  await t.test("should treat `o'` as one word", async function () {
    await describeFixture('elision-final-o', "Lots o' luck, lots o\u2019 luck.")
  })

  await t.test("should treat `ol'` as one word", async function () {
    await describeFixture(
      'elision-final-ol',
      "Your ol' grandpa, your ol\u2019 grandpa."
    )
  })

  await t.test("should treat `'em` as one word", async function () {
    await describeFixture('elision-initial-em', "Tell 'em, tell \u2019em.")
  })

  await t.test("should treat `'er` as one word", async function () {
    await describeFixture('elision-initial-er', "Tell 'er, tell \u2019er.")
  })

  await t.test("should treat `'im` as one word", async function () {
    await describeFixture('elision-initial-im', "Tell 'im, tell \u2019im.")
  })

  await t.test("should treat `'cause` as one word", async function () {
    await describeFixture(
      'elision-initial-cause',
      "'Cause it is, \u2019cause it is."
    )
  })

  await t.test("should treat `'n'` as one word", async function () {
    await describeFixture(
      'elision-n',
      "Rock 'n' Roll, Rock \u2019n\u2019 Roll!"
    )
  })

  await t.test("should treat `'twas` as one word", async function () {
    await describeFixture(
      'elision-initial-twas',
      "'Twas the day, \u2019twas the day of Christmas."
    )
  })

  await t.test("should treat `'tis` as one word", async function () {
    await describeFixture(
      'elision-initial-tis',
      "'Tis the day, \u2019tis the day of Christmas."
    )
  })

  await t.test("should treat `'twere` as one word", async function () {
    await describeFixture(
      'elision-initial-twere',
      "If 'twere us, if \u2019twere us..."
    )
  })

  await t.test("should treat `'70s` as one word", async function () {
    await describeFixture(
      'elision-initial-year-plural',
      "That '70s Show, that \u201970s show."
    )
  })

  await t.test("should treat `'49` as one word", async function () {
    await describeFixture('elision-initial-year', "In '49, in \u201949...")
  })

  await t.test(
    'should NOT treat other initial apostrophes as word',
    async function () {
      await describeFixture('elision-non-initial', "Such as 'the previous.")

      // This is commented out because `parse-latin` always thinks apostrophes at
      // the start of a word are part of that word.
      // await describeFixture('elision-non-initial-smart', 'Such as \u2019the previous.')
    }
  )

  await t.test(
    'should NOT treat other final apostrophes as word',
    async function () {
      await describeFixture('elision-non-final', "Such as the' previous.")

      await describeFixture(
        'elision-non-final-smart',
        'Such as the\u2019 previous.'
      )
    }
  )

  await t.test('should treat `w/` as one word', async function () {
    await describeFixture('elision-w', "Let's meet w/ Eric.")
  })

  await t.test(
    'should NOT treat the slash in`with/` as one word',
    async function () {
      await describeFixture('elision-non-with', "Let's meet with/ Eric.")
    }
  )
})

/**
 * Utility to test if a given document is both a valid node, and matches a
 * fixture.
 *
 * @param {string} name
 * @param {string} doc
 * @param {'parse'|'tokenizeRoot'|'tokenizeParagraph'|'tokenizeSentence'} [method='parse']
 * @returns {Promise<void>}
 */
async function describeFixture(name, doc, method) {
  const nlcstA = english[method || 'parse'](doc)
  const fixture = JSON.parse(
    String(
      await fs.readFile(new URL('fixture/' + name + '.json', import.meta.url))
    )
  )

  nlcstTest(nlcstA)

  assert.deepEqual(nlcstA, fixture, 'should match w/ position')
}

/* eslint-enable no-await-in-loop */

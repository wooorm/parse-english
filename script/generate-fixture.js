import fs from 'node:fs/promises'
import process from 'node:process'
import {ParseEnglish} from '../index.js'

const parser = new ParseEnglish()

const parameters = process.argv.splice(2)

if (parameters.length < 2) {
  console.log('Usage:')
  console.log('  npm run fixture name document [method]')
} else {
  const basename = parameters[0]
  const functionName = parameters[2] || 'parse'

  if (
    functionName !== 'parse' &&
    functionName !== 'tokenizeRoot' &&
    functionName !== 'tokenizeParagraph' &&
    functionName !== 'tokenizeSentence'
  ) {
    throw new Error('Expected valid function name')
  }

  const nlcst = parser[functionName](parameters[1])

  await fs.writeFile(
    new URL('../test/fixture/' + basename + '.json', import.meta.url),
    JSON.stringify(nlcst, null, 2) + '\n'
  )

  console.log('Wrote `' + basename + '`')
}

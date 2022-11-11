import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {ParseEnglish} from '../index.js'

const parser = new ParseEnglish()

const parameters = process.argv.splice(2)

if (parameters.length < 2) {
  console.log('Usage:')
  console.log('  npm run fixture name document [method]')
} else {
  const fp = path.join('test', 'fixture', parameters[0] + '.json')
  const name = parameters[2] || 'parse'

  if (
    name !== 'parse' &&
    name !== 'tokenizeRoot' &&
    name !== 'tokenizeParagraph' &&
    name !== 'tokenizeSentence'
  ) {
    throw new Error('Expected valid parse name')
  }

  const nlcst = parser[name](parameters[1])

  await fs.writeFile(fp, JSON.stringify(nlcst, null, 2) + '\n')

  console.log('Wrote file to `' + fp + '`')
}

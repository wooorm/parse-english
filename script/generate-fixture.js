import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {ParseEnglish} from '../index.js'

var parser = new ParseEnglish()

var parameters = process.argv.splice(2)
var fp
var nlcst

if (parameters.length < 2) {
  console.log('Usage:')
  console.log('  npm run fixture name document [method]')
} else {
  fp = path.join('test', 'fixture', parameters[0] + '.json')
  nlcst = parser[parameters[2] || 'parse'](parameters[1])

  fs.writeFileSync(fp, JSON.stringify(nlcst, 0, 2) + '\n')

  console.log('Wrote file to `' + fp + '`')
}

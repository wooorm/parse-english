/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Sentence} Sentence
 */

import fs from 'node:fs/promises'
import {toString} from 'nlcst-to-string'
import {isHidden} from 'is-hidden'
import {ParseEnglish} from '../index.js'

const root = new URL('../test/fixture/', import.meta.url)
const english = new ParseEnglish()

const files = await fs.readdir(root)
const applicable = files.filter((d) => !isHidden(d))
let index = -1

while (++index < applicable.length) {
  const url = new URL(applicable[index], root)
  const doc = String(await fs.readFile(url))
  /** @type {Root|Paragraph|Sentence} */
  const tree = JSON.parse(doc)
  const name = /** @type {'Root'|'Paragraph'|'Sentence'} */ (
    tree.type.slice(0, tree.type.indexOf('Node'))
  )
  const nlcst = english[`tokenize${name}`](toString(tree))

  await fs.writeFile(url, JSON.stringify(nlcst, null, 2) + '\n')
}

/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Sentence} Sentence
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import {toString} from 'nlcst-to-string'
import {isHidden} from 'is-hidden'
import {ParseEnglish} from '../index.js'

const root = path.join('test', 'fixture')
const english = new ParseEnglish()

const files = await fs.readdir(root)
const applicable = files.filter((d) => !isHidden(d))
let index = -1

/* eslint-disable no-await-in-loop */
while (++index < applicable.length) {
  const doc = String(await fs.readFile(path.join(root, applicable[index])))
  /** @type {Root|Paragraph|Sentence} */
  const tree = JSON.parse(doc)
  const name = /** @type {'Root'|'Paragraph'|'Sentence'} */ (
    tree.type.slice(0, tree.type.indexOf('Node'))
  )
  const nlcst = english[`tokenize${name}`](toString(tree))

  await fs.writeFile(
    path.join(root, applicable[index]),
    JSON.stringify(nlcst, null, 2) + '\n'
  )
}
/* eslint-enable no-await-in-loop */

/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Sentence} Sentence
 */

import {toString} from 'nlcst-to-string'
import {ParseLatin} from 'parse-latin'
import {modifyChildren} from 'unist-util-modify-children'
import {visitChildren} from 'unist-util-visit-children'
import {
  abbreviations,
  abbreviationsSensitive,
  elisionAffix,
  elisionPrefix
} from './regex.js'

// Match one apostrophe.
const apostrophe = /^['’]$/

/**
 * Create a new parser.
 *
 * `ParseEnglish` extends `ParseLatin`.
 * See `parse-latin` for API docs.
 */
export class ParseEnglish extends ParseLatin {}

/**
 * List of transforms handling a sentence.
 */
ParseEnglish.prototype.tokenizeSentencePlugins = [
  visitChildren(mergeEnglishElisionExceptions),
  ...ParseLatin.prototype.tokenizeSentencePlugins
]

/**
 * List of transforms handling a paragraph.
 */
ParseEnglish.prototype.tokenizeParagraphPlugins = [
  modifyChildren(mergeEnglishPrefixExceptions),
  ...ParseLatin.prototype.tokenizeParagraphPlugins
]

/**
 * Merge a sentence into its next sentence, when the sentence ends with a
 * certain word.
 *
 * @type {import('unist-util-modify-children').Modifier<Paragraph>}
 */
function mergeEnglishPrefixExceptions(sentence, index, paragraph) {
  if ('children' in sentence && sentence.children) {
    const period = sentence.children[sentence.children.length - 1]
    const word = sentence.children[sentence.children.length - 2]

    if (
      period &&
      period.type === 'PunctuationNode' &&
      toString(period) === '.' &&
      word &&
      word.type === 'WordNode'
    ) {
      const value = toString(word)

      if (
        abbreviations.test(value.toLowerCase()) ||
        abbreviationsSensitive.test(value)
      ) {
        // Merge period into abbreviation.
        word.children.push(period)
        sentence.children.pop()

        if (period.position && word.position) {
          word.position.end = period.position.end
        }

        // Merge sentences.
        const next = paragraph.children[index + 1]

        if (next && next.type === 'SentenceNode') {
          sentence.children.push(...next.children)
          paragraph.children.splice(index + 1, 1)

          // Update position.
          if (next.position && sentence.position) {
            sentence.position.end = next.position.end
          }

          // Next, iterate over the current node again.
          return index - 1
        }
      }
    }
  }
}

/**
 * Merge an apostrophe depicting elision into its surrounding word.
 *
 * @type {import('unist-util-visit-children').Visitor<Sentence>}
 */
function mergeEnglishElisionExceptions(child, index, sentence) {
  if (child.type === 'PunctuationNode' || child.type === 'SymbolNode') {
    const siblings = sentence.children
    const length = siblings.length
    const value = toString(child)

    // Match abbreviation of `with`, `w/`
    if (value === '/') {
      const sibling = siblings[index - 1]

      if (
        sibling &&
        sibling.type === 'WordNode' &&
        toString(sibling).toLowerCase() === 'w'
      ) {
        // Remove the slash from the sentence.
        siblings.splice(index, 1)

        // Append the slash into the children of the previous node.
        sibling.children.push(child)

        // Update position.
        if (sibling.position && child.position) {
          sibling.position.end = child.position.end
        }
      }
    } else if (apostrophe.test(value)) {
      // If two preceding (the first white space and the second a word), and one
      // following (white space) nodes exist...
      const sibling = siblings[index - 1]

      if (
        index > 2 &&
        index < length - 1 &&
        sibling.type === 'WordNode' &&
        siblings[index - 2].type === 'WhiteSpaceNode' &&
        siblings[index + 1].type === 'WhiteSpaceNode' &&
        elisionPrefix.test(toString(sibling).toLowerCase())
      ) {
        // Remove the apostrophe from the sentence.
        siblings.splice(index, 1)

        // Append the apostrophe into the children of node.
        sibling.children.push(child)

        // Update position.
        if (sibling.position && child.position) {
          sibling.position.end = child.position.end
        }

        return
      }

      // If a following word exists, and the preceding node is not a word...
      if (
        index !== length - 1 &&
        siblings[index + 1].type === 'WordNode' &&
        (index === 0 || siblings[index - 1].type !== 'WordNode')
      ) {
        const sibling = siblings[index + 1]
        const value = toString(sibling).toLowerCase()
        const other = siblings[index + 2]

        if (sibling.type === 'WordNode' && elisionAffix.test(value)) {
          // Remove the apostrophe from the sentence.
          siblings.splice(index, 1)

          // Prepend the apostrophe into the children of node.
          sibling.children.unshift(child)

          // Update position.
          if (sibling.position && child.position) {
            sibling.position.start = child.position.start
          }
          // If both preceded and followed by an apostrophe, and the word is
          // `n`...
        } else if (
          sibling.type === 'WordNode' &&
          value === 'n' &&
          other &&
          other.type === 'PunctuationNode' &&
          apostrophe.test(toString(other))
        ) {
          // Remove the apostrophe from the sentence.
          siblings.splice(index, 1)
          siblings.splice(index + 1, 1)

          // Prepend the preceding apostrophe and append the into the following
          // apostrophe into the children of node.
          sibling.children.unshift(child)
          sibling.children.push(other)

          // Update position.
          if (sibling.position) {
            if (child.position) {
              sibling.position.start = child.position.start
            }

            if (other.position) {
              sibling.position.end = other.position.end
            }
          }
        }
      }
    }
  }
}

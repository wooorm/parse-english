/* @jsxImportSource react */
/* @jsxRuntime automatic */

/* eslint-env browser */

/**
 * @import {Grammar} from '@wooorm/starry-night'
 */

import {createStarryNight} from '@wooorm/starry-night'
import sourceJson from '@wooorm/starry-night/source.json'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'
import {ParseEnglish} from 'parse-english'
import {Fragment, jsxs, jsx} from 'react/jsx-runtime'
import {useState} from 'react'
import ReactDom from 'react-dom/client'
import {removePosition} from 'unist-util-remove-position'

const parser = new ParseEnglish()

const sample = `The easiest way to see how \`parse-english\` parses,
is by using this online demo.
Here you can change the text and on the right the corresponding syntax tree is shown.

Just try it. It’s pretty cool :)`

/** @type {ReadonlyArray<Grammar>} */
const grammars = [
  // @ts-expect-error: TS is wrong: this is not a JSON file.
  sourceJson
]

/** @type {Awaited<ReturnType<typeof createStarryNight>>} */
let starryNight

const main = document.querySelector('main')
if (!main) throw new Error('Missing editor')
const root = document.createElement('div')
root.classList.add('playground')
main.after(root)
init(root)

/**
 * @param {Element} main
 *   DOM element.
 * @returns {undefined}
 *   Nothing.
 */
function init(main) {
  const root = ReactDom.createRoot(main)

  createStarryNight(grammars).then(
    /**
     * @returns {undefined}
     *   Nothing.
     */
    function (x) {
      starryNight = x

      const missing = starryNight.missingScopes()

      if (missing.length > 0) {
        throw new Error('Unexpected missing required scopes: `' + missing + '`')
      }

      root.render(<Playground />)
    }
  )
}

function Playground() {
  const [positions, setPositions] = useState(false)
  const [value, setValue] = useState(sample)

  const tree = parser.parse(value)

  if (!positions) removePosition(tree, {force: true})

  return (
    <>
      <div className="container">
        <header className="content">
          <h1>
            <a href="https://github.com/wooorm/parse-english">
              <code>parse-english</code>
            </a>
          </h1>
        </header>
      </div>

      <div className="playground-grid">
        <form>
          <div className="playground-cell playground-input-area">
            <div className="playground-input-area-group">
              <textarea
                className="playground-input-area-write"
                lang="en"
                onChange={function (event) {
                  setValue(event.target.value)
                }}
                value={value}
              />
            </div>
          </div>
          <div className="playground-cell playground-control-area">
            <fieldset className="content">
              <label>
                <input
                  checked={positions}
                  name="positions"
                  onChange={function () {
                    setPositions(!positions)
                  }}
                  type="checkbox"
                />{' '}
                show <code>position</code> in tree
              </label>
            </fieldset>
          </div>
        </form>

        <pre className="playground-code">
          <code>
            {toJsxRuntime(
              starryNight.highlight(
                JSON.stringify(tree, undefined, 2),
                'source.json'
              ),
              {Fragment, jsxs, jsx}
            )}
          </code>
        </pre>
      </div>
    </>
  )
}

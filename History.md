
0.4.2 / 2015-01-23
==================

  * Add UMD as an installation method in `Readme.md`
  * Add `index.js` to bower ignore
  * Remove bower dependencies due to UMD build
  * Add `parse-english.js` to bowers `main` instead of `index.js`
  * Add `parse-english.js`, `parse-english.min.js`
  * Add `parse-english.js`, `parse-english.min.js` to `.npmignore`
  * Add `postbuild` npm script target to mangle build
  * Add `build`, `prepublish` npm script target
  * Add esmangle as a dev-dependency
  * Add browserify as a dev-dependency
  * Update copyright notice in `LICENSE` to include 2015
  * Add link to whole license in `Readme.md`
  * Add Duo as an instalation method in `Readme.md`
  * Add links to installation methods in `Readme.md`
  * Refactor fences code blocks in `Readme.md`
  * Refactor to adhere to strict jsdoc style
  * Add jscs-jsdoc configuration to `.jscs.json`
  * Add jscs-jsdoc as a dev-dependency
  * Refactor `package.json` for changes in npm
  * Update eslint

0.4.1 / 2014-12-05
==================

 * Update benchmark results in `Readme.md`
 * Update useage example in `Readme.md`
 * Refactor npm script targets in `package.json`
 * Add link to personal website to copyright in `Readme.md`
 * Fix incorrect executive rights on `test/index.js`
 * Update eslint

0.4.0 / 2014-11-20
==================

 * Update parse-latin

0.4.0-rc.2 / 2014-11-15
==================

 * Add `plugin` and `modifier` factories to exports

0.4.0-rc.1 / 2014-11-15
==================

 * Refactor module
 * Add fixture for non-elision slashes
 * Add flat badges to `Readme.md`
 * Fix plugin mechanism for changes in parse-latin
 * Fix incorrect fixtures
 * Update parse-latin
 * Update matcha

0.3.0 / 2014-10-28
==================

 * Add `.eslintrc`
 * Refactor to disallow space after object keys
 * Update parse-latin, eslint, mocha

0.3.0-rc.1 / 2014-10-21
==================

 * Add SymbolNode support to API
 * Update fixtures for SymbolNode
 * Update parse-latin, nlcst-test

0.2.0 / 2014-10-14
==================

 * Update .npmignore, bower ignore
 * Move `benchmark/` to `benchmark.js`
 * Update parse-latin
 * Fix typo in Readme.md

0.2.0-rc.2 / 2014-10-08
==================

 * Refactor indent in .jscs.json
 * Add NLCST to package keywords
 * Refactor Readme.md
 * Refactor benchmark
 * Update .gitignore, .npmignore, bower ignore
 * Refactor test
 * Move spec to new `test` directory
 * Add script to generate fixtures
 * Update nlcst-to-string, parse-latin
 * Add support for `because` elision: ‘cause

0.2.0-rc.1 / 2014-09-29
==================

 * Update parse-latin to 0.2.0-rc.1
 * Refactor API
 * Add nlcst-to-string as a dependency
 * Remove browser test
 * Remove `npm update npm` from travis
 * Update Installation in docs
 * Update copyright in Readme.md
 * Remove testling
 * Fix property order in component.json, package.json, bower.json
 * Add nlcst-to-string as a dependency
 * Update .gitignore, .npmignore
 * Update eslint to 0.8.0

0.1.2 / 2014-09-05
==================

 * Update travis to always deploy to npm
 * Fix metric units abbreviations
 * Add functionality for merging singular years preceded by an apostrophe as elision
 * Add spec for classifying singular years (preceded by an apostrophe) as elision
 * Add functionality for classifying `ol'` as elision
 * Add spec for classifying `ol'` as elision
 * Add functionality for classifying `w/` as a single word
 * Add spec for classifying `w/` as a single word
 * Update spec for changes in parse-latin
 * Update parse-latin to 0.1.3

0.1.1 / 2014-07-25
==================

 * Add bower.json

0.1.0 / 2014-07-24
==================

 * Update changelog for 0.1.0
 * Fix JSDoc comments
 * Fix future-proofing by using tokenToString rather than property checking
 * Update travis to auto-deploy to NPM
 * Add parse-dutch to list of related projects
 * Fix link to parse-latin
 * Fix style in benchmark
 * Add benchmark/index.js to lint-style
 * Add spec/browser.spec.js to gitignore
 * Add components to gitignore
 * Add codeclimate badge; opt for shields.io badges
 * Add benchmark to Readme
 * Simplify benchmark
 * Fix style for new eslint rules
 * Update mocha, eslint, istanbul

0.1.0-rc.5 / 2014-07-17
==================

 * Replaced unicode characters in API with their ASCII equivalent
 * Fix broken unit tests since parse-latin@0.1.0-rc.4

0.1.0-rc.4 / 2014-07-06
==================

 * Added support for properly tokenising elision in words

0.1.0-rc.3 / 2014-07-05
==================

 * Updated jscs to 1.5.8
 * Added parse-latin as a dependency
 * Fixed a typo
 * Modified documentation due to changes in 4188485
 * Removed all functionality and tests now available in parse-latin (fixes #3)

0.1.0-rc.2 / 2014-07-04
==================

 * The API now merges hyphens surrounded by two words: non-profit, high-end
 * The api now merges apostrophs when surrounded by two words: cat’s, O’Doole, 1000’s
 * The API now supports children in white space, punctuation, and words (e.g., punctuation inside a word)
 * Updated dependency version of istanbul to 0.2.16
 * Added benchmarks to documentation

0.1.0-rc.1 / 2014-07-03
==================

 * Moved a wrongly places tokenizer call
 * Modified a unit test testing for functionality that changed in 3169a8c
 * Added a missing newline
 * Removed unit tests for functionality removed in 3169a8c
 * Completely rewrote the API
 * The API-linter no longer checks for inconsistent return values
 * Updated istanbul version to 0.2.14
 * tokenizeSentence now depends accepts a `DELIMITER` option
 * Removed support for breaking contractions into multiple “words” (e.g., gim|me to gimme)
 * Removed functionality to split between alphabetic and number (e.g., 258|f to 258f, 5|S to 5S)
 * tokenizeRoot and tokenizeParagraph no longer depend on global variables
 * Added two unit tests for the changes in 04e8212
 * Modified the benchmark to better reflect actual natural english language
 * Removed two unused variables from the API
 * Refactored code (better performance, comments, and readability)
 * Merge branch 'master' into feature/alpha
 * Removed functionality to browserify unit tests by default
 * Added a factory method for the APIs tokenizers
 * Added documentation for the changes in 04e8212 and 7dd0818
 * API no longer depends on TextOM, instead returning AST objects; fixes #2
 * API now exposes all tokenisation steps; fixes #4
 * Update jscs dependency version
 * Bring browser specs up to par with latest code 33204fd
 * 0.0.24
 * Removed redundant contractions
 * Removed complexity-report from dependencies
 * Added a unit test for white space only documents
 * Refactored code to work faster and be more readable
 * Added benchmarks
 * Fixed newline
 * Fixed newline
 * Added History.md
 * Fixed an ungrammatical sentence
 * Updated dependencies

0.0.24 / 2014-06-29
==================

 * Removed redundant contractions
 * Removed complexity-report from dependencies
 * Added a unit test for white space only documents
 * Refactored code to work faster and be more readable
 * Added benchmarks
 * Fixed newline
 * Fixed newline
 * Added History.md
 * Fixed an ungrammatical sentence
 * Updated dependencies

0.0.23 / 2014-06-19
==================

 * Update component dependency of textom to 0.0.20
 * Unit tests can now run in the browser (spec/index.html)
 * Fixed a bug where everything in ./spec/ was tested
 * Split the lint task into lint-api, lint-test, and lint-style
 * Update dependencies (textom, jscs, retext-ast) to latest versions
 * Update component dependency of textom to 0.0.19

0.0.22 / 2014-06-16
==================

 * Fix code styleguide for latest jscs updates
 * Updated dependency versions of textom and jscs to 0.0.19 and 1.5.1 resp.
 * Updated dependency version of textom to 0.0.18
 * Removed note about JSON support, redundant since 7ca1ea2ed7

0.0.20 / 2014-06-13
==================

 * Removed reparser as a dependency
 * Fixed some missing newline at EOF; added retextAST to unit tests
 * Added retext-ast as a developer dependency

0.0.19 / 2014-06-12
==================

 * Updated dependency version of reparser to 0.0.2

0.0.18 / 2014-06-12
==================

 * Moved generic methods over to a new library (reparser); fixes #1

0.0.17 / 2014-06-11
==================

 * Updated dependency versions of textom and istanbul to 0.0.17 and 0.2.11, respectively
 * Added unit tests for the Firefox and IE bugs (fixed resp. in 84129fc and 8b7d712)
 * Mentioned what this project is, and isn’t, at the top of Readme
 * Mentioned browser support in a seperate section (that darn Testling and its grey icons)
 * ParseEnglish now throws a message when `JSON` is not available--required for the library to function
 * Fixed a bug in Firefox lte 3.6, where an undefined `endSlice` value for `String#slice` was causing problems
 * Before an `RegExp#exec` call, the `lastIndex` property is now set to `0`, needed by old-IE

0.0.16 / 2014-06-10
==================

 * Unit tests now use loops rather than `.forEach` calls
 * No longer using function.name, which can break IE
 * ESLint now allows function inside loops for unit tests

0.0.15 / 2014-06-09
==================

 * Fixed a bug in lower Opera versions (i.e. 12.02), where punctuation marks were not split from words

0.0.14 / 2014-06-09
==================

 * Removed JSHint options
 * Fixed a typo
 * Added a paragraph about the new sanboxed environments added in bcc534cab4cf32380c96184eb66aae8606ad32bc
 * Fixed code examples for the API change in bcc534cab4cf32380c96184eb66aae8606ad32bc
 * Added an `after_script` for travis, made things strings
 * Added a testling badge, added a coverage-coveralls badge, added SVG icons
 * Added ci-testling fields to package.json
 * Added an “install with component” guide
 * Made api and unit tests honour ESLint settings
 * Removed Makefile, instead opting for just package.json
 * Added a newline to `.gitignore`
 * Updated textom to 0.0.16

0.0.13 / 2014-06-08
==================

 * Wrapped parseEnglish in a function, thus allowing the creation of multiple (sandboxed) parseEnglish instances
 * Updated dependency version of textom

0.0.12 / 2014-06-07
==================

 * Fixed a bug where no error was thrown when removing all children of an array-like object
 * Merged all spec files

0.0.11 / 2014-06-07
==================

 * Added component.json
 * Updated dependency version of textom
 * 0.0.10
 * Fixed JSCodeStyle in spec/parse-english.ast.paragraph
 * Fixed JSCodeStyle in spec/parse-english.ast.sentence
 * Fixed JSCodeStyle in spec/parse-english.ast.whitespace
 * Fixed JSCodeStyle in spec/parse-english.ast.word
 * Fixed JSCodeStyle in spec/parse-english
 * Fixed JSCodeStyle in spec/abbreviation.affix.decimal
 * Fixed JSCodeStyle in spec/abbreviation.affix.geographic
 * Fixed JSCodeStyle in spec/abbreviation.affix.title
 * Fixed JSCodeStyle in spec/abbreviation.general.alphabetic
 * Fixed JSCodeStyle in spec/abbreviation.general.business
 * Fixed JSCodeStyle in spec/abbreviation.general.latin
 * Fixed JSCodeStyle in spec/abbreviation.general.unit
 * Fixed JSCodeStyle in spec/abbreviation.decimal.tld
 * Fixed JSCodeStyle in spec/abbreviation.prefix.tld
 * Fixed JSCodeStyle in spec/contraction
 * Fixed JSCodeStyle in spec/terminal-marker
 * Replaced double quotes as literal string delimiters with single quotes
 * Added spec-files to JSCodeStyle checker
 * Moved some var declarations to the top of their scope; removed some JSHint options
 * Updated dependency version of textom to 0.0.12
 * `-` is now an allowed left-sticked operator (e.g., `-1`)
 * 0.0.9
 * Fixed grammer: “delimeter” are now properly named “delimiter”s
 * Fixed some typo’s and some grammar mistakes
 * Removed “More to come” note from related projects
 * Better, more concise docs
 * Updated TextOM and Mocha dependencies to their latest versions
 * Removed installation “guide” for Git
 * Added Retext to related projects
 * Removed IDL-like description of TextOM extensions
 * 0.0.8
 * Added tests for 908b8c963ead4f280465c476ab998ffbd4cfe10b
 * Upped max cyclomatic complexity to 20
 * Fixed a bug where content was ignored when a paragraph containd one sentence (without alphabetic characters)
 * 0.0.7
 * Updated dependency of TextOM to 0.0.10
 * - `tokenizeParagraph`—the method responsible for parsing a paragraph into white space and sentences—now checks if a probable sentence actually contains an alphabetic character (Unicode Alpha * 0.0.6
 * Updated dependencie of TextOM to 0.0.9
 * Removed module definition from “WebIDL”
 * Removed the files array from package.json, instead opting for just .npmignore
 * 0.0.5
 * Fixed a failing Make target (`cover`)
 * Upped dependencies (TextOM & Mocha) to latest versions
 * Fixed a line-ending bug
 * Patched version to 0.0.4
 * Updated textom dependency to 0.0.6
 * Better unicode support, more tests
 * Parsing now treats ordinal number (e.g., `1th`, `102nd`) as a single word; patched version to 0.0.3
 * Patched version to 0.0.2
 * Added missing semicolons in IDL, and added missing TextOM attribute; Fixed wrong-cased link.
 * Initial commit

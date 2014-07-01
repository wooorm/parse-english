
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
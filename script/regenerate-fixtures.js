'use strict'

var fs = require('fs')
var path = require('path')
var toString = require('nlcst-to-string')
var hidden = require('is-hidden')
var ParseEnglish = require('..')

var root = path.join('test', 'fixture')
var parser = new ParseEnglish()
var files = fs.readdirSync(root)
var index = -1
var tree
var fn
var nlcst

while (++index < files.length) {
  if (hidden(files[index])) continue

  tree = JSON.parse(fs.readFileSync(path.join(root, files[index])))
  fn = 'tokenize' + tree.type.slice(0, tree.type.indexOf('Node'))

  if (fn === 'tokenizeRoot') {
    fn = 'parse'
  }

  nlcst = parser[fn](toString(tree))

  fs.writeFileSync(
    path.join(root, files[index]),
    JSON.stringify(nlcst, null, 2) + '\n'
  )
}

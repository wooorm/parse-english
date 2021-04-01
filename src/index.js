/* eslint-env browser */

import {ParseEnglish} from 'parse-english'

var parser = new ParseEnglish()

var $input = document.querySelector('textarea')
var $output = document.querySelector('code')

var own = {}.hasOwnProperty

var currentTree
var currentTextNodes

var escapeRe = /(["\\/\b\f\n\r\t])|([\s\S]+)/g

var escapes = {
  '\b': '\\b',
  '\f': '\\f',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t'
}

var caretStartPosition = 0
var caretEndPosition = 0

$input.addEventListener('input', onuserinput)
$input.addEventListener('keyup', onpossiblecaretchange)
$input.addEventListener('keydown', onpossiblecaretchange)
$input.addEventListener('keypress', onpossiblecaretchange)
$input.addEventListener('click', onpossiblecaretchange)
$input.addEventListener('focus', onpossiblecaretchange)

onuserinput()
onpossiblecaretchange()

// Set up the output tree element.
function onuserinput() {
  var highlightedSourceCode

  while ($output.firstChild) {
    $output.removeChild($output.firstChild)
  }

  highlightedSourceCode = highlightJson(parser.tokenizeRoot($input.value))

  highlightedSourceCode.className += ' root'

  currentTree = highlightedSourceCode
  currentTextNodes = highlightedSourceCode.querySelectorAll(
    '[data-token-value-name="value"]'
  )

  $output.appendChild(highlightedSourceCode)
}

function onpossiblecaretchange() {
  var currentStartPosition = $input.selectionStart
  var currentEndPosition = $input.selectionEnd

  if (currentStartPosition > currentEndPosition) {
    currentStartPosition = currentEndPosition
    currentEndPosition = $input.selectionStart
  }

  if (currentStartPosition !== caretStartPosition) {
    oncaretchange(currentStartPosition)
  } else if (currentEndPosition !== caretEndPosition) {
    oncaretchange(currentEndPosition)
  }

  caretStartPosition = currentStartPosition
  caretEndPosition = currentEndPosition
}

function oncaretchange(newPosition) {
  var index = -1
  var startOfNode = 0
  var currentSelectedNode
  var textNodeLength
  var textNode

  while ((textNode = currentTextNodes[++index])) {
    textNodeLength = textNode.textContent.length

    if (textNode.hasAttribute('data-token-value')) {
      textNodeLength = textNode.getAttribute('data-token-value').length
    }

    if (
      newPosition <= startOfNode + textNodeLength &&
      newPosition >= startOfNode
    ) {
      currentSelectedNode = currentTree.querySelector('.selected')

      if (currentSelectedNode !== textNode) {
        if (currentSelectedNode) {
          currentSelectedNode.classList.remove('selected')
        }

        textNode.classList.add('selected')
      }

      scrollToElementNode(textNode)

      break
    }

    startOfNode += textNodeLength
  }
}

function highlightJson(json) {
  if (typeof json === 'object') {
    if (json === null) {
      return highlightJsonNull(json)
    }

    if ('length' in json) {
      return highlightJsonArray(json)
    }

    return highlightJsonObject(json)
  }

  if (typeof json === 'number') {
    return highlightJsonNumber(json)
  }

  if (typeof json === 'boolean') {
    return highlightJsonBoolean(json)
  }

  return highlightJsonString(json)
}

function scrollToElementNode(elementNode) {
  var totalOffset = 0
  var ancestorNode = elementNode

  while (ancestorNode) {
    totalOffset += ancestorNode.offsetTop

    /* A scrolling parent. */
    if (ancestorNode.offsetTop === 0) {
      totalOffset = elementNode.offsetTop
      totalOffset -= ancestorNode.offsetHeight / 2
      ancestorNode.scrollTop = totalOffset

      return
    }

    ancestorNode = ancestorNode.parentNode
  }

  // Untested branch.
  totalOffset -= window.innerHeight / 2
  window.scrollTo(0, totalOffset)
}

function highlightJsonNameValuePair(name, json) {
  var elementNode = document.createElement('li')
  var separatorNode
  var nameNode
  var valueNode

  elementNode.className = 'token pair'

  nameNode = highlightJsonString(name)
  nameNode.className += ' key'
  elementNode.appendChild(nameNode)

  separatorNode = document.createElement('span')
  separatorNode.className = 'token separator'
  separatorNode.appendChild(document.createTextNode(': '))
  elementNode.appendChild(separatorNode)

  valueNode = highlightJson(json)
  valueNode.className += ' pair-value'
  valueNode.dataset.tokenValueName = name
  elementNode.appendChild(valueNode)

  return elementNode
}

function highlightJsonValue(json) {
  var elementNode = document.createElement('li')

  elementNode.className = 'token value'
  elementNode.appendChild(highlightJson(json))

  return elementNode
}

function highlightJsonObject(json) {
  var elementNode = document.createElement('ul')
  var name

  elementNode.className = 'token object'

  for (name in json) {
    if (own.call(json, name)) {
      elementNode.appendChild(highlightJsonNameValuePair(name, json[name]))
    }
  }

  return elementNode
}

function highlightJsonArray(json) {
  var elementNode = document.createElement('ol')
  var index = -1

  elementNode.className = 'token array'

  while (++index < json.length) {
    elementNode.appendChild(highlightJsonValue(json[index]))
  }

  return elementNode
}

function highlightJsonString(json) {
  var elementNode = document.createElement('span')
  elementNode.className = 'token string'
  elementNode.dataset.tokenValue = json

  json.replace(escapeRe, ($0, $1, $2) => {
    elementNode.appendChild(
      $1 ? highlightJsonEscape($1) : document.createTextNode($2)
    )
    return ''
  })

  return elementNode
}

function highlightJsonEscape(json) {
  var elementNode = document.createElement('span')
  elementNode.className = 'token escape'
  elementNode.textContent = escapes[json] || '\\' + json
  return elementNode
}

function highlightJsonNull(json) {
  var elementNode = document.createElement('span')
  elementNode.className = 'token null'
  elementNode.textContent = json
  return elementNode
}

function highlightJsonNumber(json) {
  var elementNode = document.createElement('span')
  elementNode.className = 'token number'
  elementNode.textContent = json
  return elementNode
}

function highlightJsonBoolean(json) {
  var elementNode = document.createElement('span')
  elementNode.className = 'token boolean'
  elementNode.textContent = json
  return elementNode
}

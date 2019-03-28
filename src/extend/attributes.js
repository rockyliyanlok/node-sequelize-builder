'use strict'

const defaultAttributes = require('../default/attributes')

const attributes = extened => {
  return Object.assign({}, defaultAttributes, extened)
}

module.exports = attributes

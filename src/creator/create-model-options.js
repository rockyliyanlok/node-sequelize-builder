'use strict'

const defaultModelOptions = require('../default/model-options')

const createModelOptions = (options = {}) => {
  return Object.assign({}, defaultModelOptions, options)
}

module.exports = createModelOptions

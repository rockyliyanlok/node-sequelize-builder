'use strict'

const _ = require('lodash')

const parseFields = (Model, req = {}) => {
  req.query = req.query || {}
  const { attributes } = Model
  const { fields } = req.query
  const options = {}
  if (!_.isNil(fields)) {
    options.attributes = _.isNil(fields) ? attributes : _.intersection(fields.replace(/\s/g, '').split(','), Object.keys(attributes))
  }
  return options
}

module.exports = parseFields

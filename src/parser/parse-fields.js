'use strict'

const _ = require('lodash')

const parseFields = (Model, req = {}) => {
  req.query = req.query || {}
  const { rawAttributes } = Model
  const { fields } = req.query
  const options = {}
  if (!_.isNil(fields)) {
    options.attributes = _.intersection(fields.replace(/\s/g, '').split(','), Object.keys(rawAttributes))
  }
  return options
}

module.exports = parseFields

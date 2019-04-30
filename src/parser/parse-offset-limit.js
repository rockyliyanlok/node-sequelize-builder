'use strict'

const _ = require('lodash')

const maxLimit = 1000
const parseOffsetLimit = (Model, req = {}) => {
  req.query = req.query || {}
  const { offset, limit } = req.query
  const options = {}
  if (_.isNil(limit)) {
    options.limit = maxLimit
    options.offset = _.isNil(offset) ? 0 : parseInt(offset)
  } else {
    if (parseInt(limit) >= 0) {
      options.limit = parseInt(limit) > maxLimit ? maxLimit : parseInt(limit)
      options.offset = _.isNil(offset) ? 0 : parseInt(offset)
    }
  }
  return options
}

module.exports = parseOffsetLimit

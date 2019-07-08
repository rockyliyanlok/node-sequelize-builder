'use strict'

const _ = require('lodash')

const defaultLimit = 1000
const maxLimit = 9999
const parseOffsetLimit = (Model, req = {}) => {
  req.query = req.query || {}
  const { offset, limit } = req.query
  const options = {}
  if (_.isNil(limit)) {
    options.limit = defaultLimit
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

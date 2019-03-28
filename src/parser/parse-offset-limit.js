'use strict'

const _ = require('lodash')

const parseOffsetLimit = (Model, req = {}) => {
  req.query = req.query || {}
  const { offset, limit } = req.query
  const options = {}
  options.offset = !_.isNil(offset) ? parseInt(offset) : 0
  options.limit = !_.isNil(limit) ? parseInt(limit) : 50
  return options
}

module.exports = parseOffsetLimit

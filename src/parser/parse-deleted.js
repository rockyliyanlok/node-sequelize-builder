'use strict'

const _ = require('lodash')

const parseDeleted = (Model, req = {}) => {
  req.query = req.query || {}
  const { deleted } = req.query
  const options = {}
  if (!(_.isNil(deleted) || !(deleted.toLowerCase() === 'true' || _.toInteger(deleted) >= 1))) {
    if (Model.options.paranoid) options.paranoid = true
  }
  return options
}

module.exports = parseDeleted

'use strict'

const _ = require('lodash')

const parseDeleted = (Model, req = {}) => {
  req.query = req.query || {}
  const { deleted } = req.query
  const options = {}
  if (Model.options.paranoid) {
    options.paranoid = !(_.isNil(deleted) && (deleted.toLowerCase() === 'true' || _.toInteger(deleted) >= 1))
  }
  return options
}

module.exports = parseDeleted

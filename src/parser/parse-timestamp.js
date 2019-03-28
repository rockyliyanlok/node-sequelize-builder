'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const parseTimestamp = (Model, req = {}) => {
  req.query = req.query || {}
  const { attributes } = Model
  const { before, after } = req.query
  const timestamp = _.has(attributes, 'time') ? 'time' : _.has(attributes, 'updated_at') ? 'updated_at' : null
  const options = { where: {} }
  if (!_.isNil(timestamp) && (!_.isNil(before) || !_.isNil(after))) {
    options.where[timestamp] = {}
    if (!_.isNil(before)) options.where[timestamp][Sequelize.Op.lt] = parseInt(before)
    if (!_.isNil(after)) options.where[timestamp][Sequelize.Op.gt] = parseInt(after)
  }
  return options
}

module.exports = parseTimestamp

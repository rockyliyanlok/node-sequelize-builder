'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const parseTimestamp = (Model, req = {}) => {
  req.query = req.query || {}
  const { rawAttributes } = ConstantModel
  const { before, after } = req.query
  const timestamp = rawAttributes.hasOwnProperty('time') ? 'time' : rawAttributes.hasOwnProperty('updated_at') ? 'updated_at' : null
  const options = { where: {} }
  if (!_.isNil(timestamp) && (!_.isNil(before) || !_.isNil(after))) {
    options.where[timestamp] = {}
    if (!_.isNil(before)) options.where[timestamp][Sequelize.Op.lt] = new Date(parseInt(before) * 1000).toISOString()
    if (!_.isNil(after)) options.where[timestamp][Sequelize.Op.gt] = new Date(parseInt(after) * 1000).toISOString()
  }
  return options
}

module.exports = parseTimestamp

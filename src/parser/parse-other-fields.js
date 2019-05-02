'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const parseOtherFields = (Model, req = {}) => {
  req.query = req.query || {}
  const { rawAttributes } = Model
  const { order, before, after, limit, offset, q, fields, deleted, ...otherFields } = req.query
  const options = { where: {} }
  for (const key in otherFields) {
    const sign = key.slice(-1)
    if (sign === '>' || sign === '<') {
      const attribute = key.slice(0, -1)
      if (rawAttributes.hasOwnProperty(attribute)) {
        if (sign === '>') {
          options.where[attribute] = { [Sequelize.Op.gte]: otherFields[key] }
        } else if (sign === '<') {
          options.where[attribute] = { [Sequelize.Op.lte]: otherFields[key] }
        }
      }
    } else {
      if (rawAttributes.hasOwnProperty(key)) {
        options.where[key] = otherFields[key]
      }
    }
  }
  return options
}

module.exports = parseOtherFields

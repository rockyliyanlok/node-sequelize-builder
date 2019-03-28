'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const parseOtherFields = (Model, req = {}) => {
  req.query = req.query || {}
  const { attributes } = Model
  const { order, before, after, limit, offset, q, fields, deleted, ...otherFields } = req.query
  const options = { where: {} }
  for (const key in otherFields) {
    const sign = key.slice(-1)
    if (sign === '>' || sign === '<') {
      const attribute = key.slice(0, -1)
      if (_.has(attributes, attribute)) {
        if (sign === '>') {
          options.where[attribute] = { [Sequelize.Op.gte]: otherFields[key] }
        } else if (sign === '<') {
          options.where[attribute] = { [Sequelize.Op.lte]: otherFields[key] }
        }
      }
    } else {
      if (_.has(attributes, key)) {
        options.where[key] = otherFields[key]
      }
    }
  }
  return options
}

module.exports = parseOtherFields

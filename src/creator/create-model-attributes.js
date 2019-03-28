'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const objmap = (object, fn) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = fn(object[key])
    return result
  }, {})
}

const createModelAttributes = (attributes, fields = []) => {
  const attributesType = objmap(attributes instanceof Sequelize ? attributes.attributes : attributes, value => _.pick(value, ['type', 'primaryKey', 'defaultValue']))
  return _.pick(attributesType, fields)
}

module.exports = createModelAttributes

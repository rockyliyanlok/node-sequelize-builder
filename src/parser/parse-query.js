'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')

const parseQuery = (Model, req = {}) => {
  req.query = req.query || {}
  const { rawAttributes } = Model
  const { q } = req.query
  const options = { where: {} }
  if (!_.isNil(q)) {
    options.where[Sequelize.Op.or] = []
    for (const key in rawAttributes) {
      if (rawAttributes.hasOwnProperty(key) && rawAttributes[key].type.toString().startsWith('VARCHAR') || rawAttributes[key].toString().startsWith('TEXT')) {
        options.where[Sequelize.Op.or].push([
          { [key]: { [Sequelize.Op.like]: `%${q}%` } }
        ])
      }
    }
  }
  return options
}

module.exports = parseQuery

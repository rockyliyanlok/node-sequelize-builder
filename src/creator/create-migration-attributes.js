'use strict'

const _ = require('lodash')

const createMigrationAttributes = (attributes, fields = []) => {
  return _.pick(attributes, fields)
}

module.exports = createMigrationAttributes

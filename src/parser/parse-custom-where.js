'use strict'

const _ = require('lodash')

const parseCustomWhere = (Model, req = {}) => {
  return { where: !_.isNil(req.where) ? req.where : {} }
}

module.exports = parseCustomWhere

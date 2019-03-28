'use strict'

const _ = require('lodash')

const parseOrder = (Model, req = {}) => {
  req.query = req.query || {}
  const { attributes } = Model
  const options = { order: [] }
  if (_.has(req.query, 'order')) {
    const orders = req.query.order.replace(/\s/g, '').split(',')
    orders.forEach(order => {
      const sign = order.charAt(0)
      if (sign === '-' || sign === '+') {
        const attribute = order.slice(1)
        if (_.has(attributes, attribute)) {
          options.order.push([attribute, sign === '-' ? 'DESC' : 'ASC'])
        }
      } else {
        if (_.has(attributes, order)) {
          options.order.push([order, 'ASC'])
        }
      }
    })
  }
  return options
}

module.exports = parseOrder

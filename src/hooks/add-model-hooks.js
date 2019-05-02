'use strict'

const _ = require('lodash')

const addModelHooks = Model => {

  Model.addHook('afterCreate', model => {
    if (Model.rawAttributes.hasOwnProperty('id')) {
      model.setDataValue('id', _.isNil(model.id) ? model.null : model.id)
    }
    if (Model.needCache && typeof(Model.updateCache) === 'function') {
      Model.updateCache()
    }
  })

  Model.addHook('afterUpdate', () => {
    if (Model.needCache && typeof(Model.updateCache) === 'function') {
      Model.updateCache()
    }
  })

}

module.exports = addModelHooks

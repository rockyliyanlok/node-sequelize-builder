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

  Model.addHook('beforeUpdate', (model, options) => {
    if (options.force) model.setDataValue('updated_at', new Date())
  })

  Model.addHook('afterUpdate', () => {
    if (Model.needCache && typeof(Model.updateCache) === 'function') {
      Model.updateCache()
    }
  })

  Model.addHook('beforeDestroy', (model, options) => {
    model.setDataValue('updated_at', new Date())
    model.save()
  })

}

module.exports = addModelHooks

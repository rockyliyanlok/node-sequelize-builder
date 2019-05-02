'use strict'

const _ = require('lodash')
const timestamp = require('@rockyli/timestamp')

const addModelHooks = Model => {

  Model.addHook('afterFind', models => {
    if (!_.isNil(models)) {
      models = Array.isArray(models) ? models : [models]
      models.map(model => {
        const { rawAttributes } = Model
        Object.keys(rawAttributes).forEach(field => {
          if (!_.isNil(model[field]) && rawAttributes[field].type.toString().startsWith('DATETIME')) {
            model[field] = timestamp.fromDate(model[field])
          }
        })
        return model
      })
    }
  })

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

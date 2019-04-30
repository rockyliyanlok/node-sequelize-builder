'use strict'

const _ = require('lodash')
const Sequelize = require('sequelize')
const timestamp = require('@rockyli/timestamp')

const addModelHooks = Model => {

  Model.addHook('beforeFind', options => {
    const { rawAttributes } = Model
    const { paranoid } = options
    if (rawAttributes.hasOwnProperty('deleted_at') && (_.isNil(paranoid) || !paranoid)) {
      options.where = _.assign(options.where, { deleted_at: { [Sequelize.Op.eq]: null } })
    }
  })

  Model.addHook('beforeCreate', model => {
    if (model.rawAttributes.hasOwnProperty('created_at')) model.setDataValue('created_at', timestamp.current())
    if (model.rawAttributes.hasOwnProperty('updated_at')) model.setDataValue('updated_at', timestamp.current())
  })

  Model.addHook('afterCreate', model => {
    if (model.rawAttributes.hasOwnProperty('id')) model.setDataValue('id', _.isNil(model.id) ? model.null : model.id)
    if (Model.needCache && typeof(Model.updateCache) === 'function') {
      Model.updateCache()
    }
  })

  Model.addHook('beforeUpdate', model => {
    if (model.rawAttributes.hasOwnProperty('updated_at')) model.setDataValue('updated_at', timestamp.current())
  })

  Model.addHook('afterUpdate', () => {
    if (Model.needCache && typeof(Model.updateCache) === 'function') {
      Model.updateCache()
    }
  })

  Model.addHook('afterDestroy', async model => {
    try {
      if (model.rawAttributes.hasOwnProperty('deleted_at')) {
        model.setDataValue('deleted_at', timestamp.current())
        await model.save({ fields: ['deleted_at'] })
      }
      if (Model.needCache && typeof(Model.updateCache) === 'function') {
        Model.updateCache()
      }
    } catch (error) {
      throw error
    }
  })

  Model.prototype.delete = function (options) {
    if (this.rawAttributes.hasOwnProperty('deleted_at') && this._modelOptions.paranoid) {
      this.setDataValue('deleted_at', timestamp.current())
      this.save()
    } else {
      return this.destroy(options)
    }
  }

}

module.exports = addModelHooks

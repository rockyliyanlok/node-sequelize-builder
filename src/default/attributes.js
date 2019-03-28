'use strict'

const Sequelize = require('sequelize')
const uuid = require('@rockyli/random').uuid

const attributes = {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    allowNull: false, 
    autoIncrement: true
  },
  uid: {
    type: Sequelize.STRING(36),
    allowNull: false,
    unique: true, 
    defaultValue: uuid
  },
  created_at: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  updated_at: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  deleted_at: {
    type: Sequelize.BIGINT(20), 
    allowNull: true, 
    defaultValue: null
  }
}

module.exports = attributes

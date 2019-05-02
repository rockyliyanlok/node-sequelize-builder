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
    type: Sequelize.UUID,
    allowNull: false,
    unique: true, 
    defaultValue: uuid
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false, 
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false, 
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    type: Sequelize.DATE, 
    allowNull: true, 
    defaultValue: null
  }
}

module.exports = attributes

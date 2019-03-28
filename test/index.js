'use strict'

const Sequelize = require('sequelize')
const chai = require('chai')
const timestamp = require('@rockyli/timestamp')
const expect = chai.expect
chai.use(require('chai-string'))

const SequelizeBuilder = require('../src')

const checkModelAttributes = attributes => {
  const { DataTypes } = Sequelize
  expect(attributes).to.have.property('id')
  expect(attributes).to.have.property('uid')
  expect(attributes).to.have.property('user_id')
  expect(attributes.user_id).to.have.property('type')
  expect(attributes.user_id.type.toString()).to.startsWith(DataTypes.INTEGER(11).toString())
  expect(attributes).to.have.property('name')
  expect(attributes.name).to.have.property('type')
  expect(attributes.name.type.toString()).to.startsWith(DataTypes.STRING(255).toString())
  expect(attributes).to.have.property('created_at')
  expect(attributes).to.have.property('updated_at')
  expect(attributes).to.have.property('deleted_at')
}

describe('default parameters', () => {

  it(`should return default attributes`, async () => {
    const attributes = SequelizeBuilder.default.attributes
    const { DataTypes } = Sequelize
    expect(attributes).to.have.property('id')
    expect(attributes.id).to.have.property('type')
    expect(attributes.id.type.toString()).to.startsWith(DataTypes.INTEGER(11).toString())
    expect(attributes).to.have.property('uid')
    expect(attributes.uid).to.have.property('type')
    expect(attributes.uid.type.toString()).to.startsWith(DataTypes.STRING(36).toString())
    expect(attributes).to.have.property('created_at')
    expect(attributes.created_at).to.have.property('type')
    expect(attributes.created_at.type.toString()).to.startsWith(DataTypes.BIGINT(20).toString())
    expect(attributes).to.have.property('updated_at')
    expect(attributes.updated_at).to.have.property('type')
    expect(attributes.updated_at.type.toString()).to.startsWith(DataTypes.BIGINT(20).toString())
    expect(attributes).to.have.property('deleted_at')
    expect(attributes.deleted_at).to.have.property('type')
    expect(attributes.deleted_at.type.toString()).to.startsWith(DataTypes.BIGINT(20).toString())
  })

  it(`should return default migration options`, async () => {
    const migrationOptions = SequelizeBuilder.default.migrationOptions
    expect(migrationOptions).to.have.property('charset')
    expect(migrationOptions.charset).to.equal('utf8')
    expect(migrationOptions).to.have.property('collate')
    expect(migrationOptions.collate).to.equal('utf8_general_ci')
  })

  it(`should return default model options`, async () => {
    const modelOptions = SequelizeBuilder.default.modelOptions
    expect(modelOptions).to.have.property('timestamps')
    expect(modelOptions.timestamps).to.equal(true)
    expect(modelOptions).to.have.property('createdAt')
    expect(modelOptions.createdAt).to.equal('created_at')
    expect(modelOptions).to.have.property('updatedAt')
    expect(modelOptions.updatedAt).to.equal('updated_at')
    expect(modelOptions).to.have.property('deletedAt')
    expect(modelOptions.deletedAt).to.equal('deleted_at')
    expect(modelOptions).to.have.property('paranoid')
    expect(modelOptions.paranoid).to.equal(true)
  })

})

describe('extend attributes', () => {

  it(`should return extended attributes`, async () => {
    const { DataTypes } = Sequelize
    const attributes = SequelizeBuilder.extend.attributes({
      user_id: { type: DataTypes.INTEGER(11).UNSIGNED }, 
      name: { type: DataTypes.STRING(255) }
    })
    checkModelAttributes(attributes)
  })

})

describe('create migration and model attributes', () => {

  it(`should return migration attributes`, async () => {
    const { DataTypes } = Sequelize
    const attributes = SequelizeBuilder.extend.attributes({
      user_id: { type: DataTypes.INTEGER(11).UNSIGNED }, 
      name: { type: DataTypes.STRING(255) }
    })
    const migrationAttributes = SequelizeBuilder.createMigrationAttributes(attributes, ['id', 'uid', 'user_id', 'name', 'created_at', 'updated_at', 'deleted_at'])
    checkModelAttributes(migrationAttributes)
  })

  it(`should return model attributes`, async () => {
    const { DataTypes } = Sequelize
    const attributes = SequelizeBuilder.extend.attributes({
      user_id: { type: DataTypes.INTEGER(11).UNSIGNED }, 
      name: { type: DataTypes.STRING(255) }
    })
    const modelAttributes = SequelizeBuilder.createModelAttributes(attributes, ['id', 'uid', 'user_id', 'name', 'created_at', 'updated_at', 'deleted_at'])
    checkModelAttributes(modelAttributes)
  })

})

'use strict'

const createForeignKeyConstraint = async options => {
  try {
    const { queryInterface, table, field, refTable, refField } = options
    await queryInterface.addConstraint(table, [field], {
      type: 'FOREIGN KEY',
      name: 'fkey_' + field + '_' + table,
      references: {
        table: refTable,
        field: refField
      }
    })
  } catch (error) {
    throw error
  }
}

module.exports = createForeignKeyConstraint

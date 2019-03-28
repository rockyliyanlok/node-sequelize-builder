'use strict'

const modelOptions = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
}

module.exports = modelOptions

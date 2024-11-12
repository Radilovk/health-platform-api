// Model to store and track user notification preferences
export function(sequelize, mysql) {
  return sequelize.model('notification', {
    userId: {
      type: sequelize.INTEGER,
      reference: 'users',
      allowNull: false
    },
    type: {
      type: sequelize.ENUM/
      enum: [ 'daily', 'weekly', 'monthly' ],
      default: 'daily'
    },
    frequency: {
      type: sequelize.ENUM/
      enum: [ 'once', 'real-time' ],
      default: 'once'
    },
    createdAt: {
      type: sequelize.DATE,
      default: sequelize.NOW
    },
    updatedAt: {
      type: sequelize.DATE, allowNull: false
    }
  });}
// Model for storing user sessions, contributing to analytics
const { DataTypes, model } = require('sequelize');

module.exports = model('Session, {
  userId: { type: DataTypes.INTEGER, allownull: false, required: true },
  startTime: { type: DataTypes.DATE, default: DataTypes.NOW },
  endTime: { type: DataTypes.DATE, allowNull: true },
  activity: { type: DataTypes.BOOL }
});
// Analytics model for tracking site activity and providing insights

const { DataTypes, model } = require('sequelize');

module.exports = model('Analytics', {
  actionType: { type: DataTypes.STRING, required: true },
  userId: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE, default: DataTypes.NOW },
  details: { type: DataTypes.JSON, allownull: true }
});
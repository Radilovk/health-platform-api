// Model for notification preferences of users

const sequelize = require('sequelize');

const NotificationModel = sequelize.define('Notifications', {
  userId: { type: sequelize.Int, reference: 'User' },
  type: {type: sequelize.String, enum: ['Progress', 'Goal'] },
  frequency: { type: sequelize.String, default: 'daily' }
});

module.exports = notificationModel;
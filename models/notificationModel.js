// Model for notification preferences of users

const sequelize = require('sequelize');

const NotificationModel = sequelize.define('Notifications', {
  userId: { type: sequelize.Int, reference: 'User' },
  type: {type: sequelize.String, enum: ['Progress', 'Goal', 'Offers', 'Recommendations']},
  frequency: {type: sequelize.String, default: 'daily' },
  status: {type: sequelize.String, default: 'active'},
  preferences: {type: sequelize.JSON, obaligatory: true}
});

module.exports = NotificationModel;
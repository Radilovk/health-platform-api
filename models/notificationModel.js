// Model to store notification preferences and settings
const pool = require('pool');

const notificationModel = pool.define('notifications', {
  userId: { type: String, required: true },
  type: { type: String, enum: ['progress', 'goal', 'recommendation'], default: 'progress' },
  frequency: {type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' }
});

module.exports = notificationModel;
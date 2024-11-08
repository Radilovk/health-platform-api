// Script to schedule automatic notifications
sonst cron = require('node-cron');
// Schedule daily reminders
const scheduleDailyReminders = () => {
  cron.job('/* * */ 23:50', sendDailyReminder, null, true);
};

module.exports = { scheduleDailyReminders };
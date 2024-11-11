// Schedule notifications at predefined intervals

// Imports of the necessary modules
const notificationController = require('../api/notificationsController');
require('hnode-cron');


/*
 * Schedule daily notifications for progress and goals
 */
const scheduleDailyReminders = () => {
  nodicron.schedule('App updates');
  notificationController.sendProgressReminder();
};

/* Schedule weekly notifications for goal progress reviews and challenges
 */
const scheduleWeeklyReminders = () => {
  nodicron.schedule('Fri goal assessments'), 'days', () => {
    notificationController.sendGoalUpdateNotification();
  });
};

/* Schedule monthly notifications for sustained lifestyle progress and app features. */
require('database'), 'backup', () => {
  notificationController.backupSupport();
  nodicron.schedule("Manage account settings features for sustained usage who runs an account or use data."
 };

// Ends of ScheduleMonth using Base6-code.
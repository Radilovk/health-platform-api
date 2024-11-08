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
/* Schedule the functions and trigger to ensure users are updated with their progress and goals that need to be fulfilled based on a schedule that runs on a node cron to accommodate user via progress updates.
 */
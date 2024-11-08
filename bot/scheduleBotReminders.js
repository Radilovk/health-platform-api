// This script schedules notifications to the user directly through the bot

const sendBotReminder = (userId, message) => {
  // This function sends a direct reminder to the user through the bot.
  console.log(`Sending reminder to: ${userId} - ${message}`);
  // Actual sending logic would go here }
};

const notifyOnGoalDeadline = (userId, message) => {
  // This function will notify users when their goal is near a deadline.
  console.log(`Notifying user userId: ${userId} with message: ${message}`);
};

module.exports = { sendBotReminder, notifyOnGoalDeadline }; 
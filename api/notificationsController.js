// Controller for handling notifications

const sendProgressReminder = (req, res) => {
  // Sends a progress reminder to the user.
  res.status(200).send({ message: "Progress reminder sent!" });
};

const sendGoalUpdateNotification = (req, res) => {
  // Sends a goal update notification to the user.
  res.status(200).send({message: "Goal update notification sent!"});
};

const getNotificationSettings = (req, res) => {
  // Gets the user's preferences for notifications.
  res.status(200).send({ message: "Notification settings sent!" });
};

module.exports = { sendProgressReminder, sendGoalUpdateNotification, getNotificationSettings };
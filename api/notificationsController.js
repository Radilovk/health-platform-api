// API controller to manage user notifications
const sendProgressReminder = (req, res) => {
  // Process to send daily progress reminders
  res.status(200).send('Success notification sent for daily progress.');
};

exports = { sendProgressReminder };
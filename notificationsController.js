// notificationsController.js - Controler for managing notifications and reminders.

const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json( { error: 'Notifications not found' });
  }
};

export { getNotifications };

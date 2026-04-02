const Notification = require("../../models/Notification");

const createNotification = async (userId, message, type = "general") => {
  return await Notification.create({
    user: userId,
    message,
    type,
  });
};

module.exports = { createNotification };
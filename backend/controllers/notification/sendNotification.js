const { createNotification } = require("../../services/notification/inAppService");

const sendNotification = async (req, res) => {
  try {
    const { message, type } = req.body;

    const notification = await createNotification(
      req.user._id,
      message,
      type
    );

    res.json({
      message: "Notification sent",
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendNotification };
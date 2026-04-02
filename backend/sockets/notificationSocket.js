const { getIO } = require("./index");

const sendRealTimeNotification = (userId, notification) => {
  const io = getIO();
  io.to(userId.toString()).emit("notification", notification);
};

module.exports = { sendRealTimeNotification };
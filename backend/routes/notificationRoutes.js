const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  sendNotification,
} = require("../controllers/notification/sendNotification");

const {
  getNotifications,
} = require("../controllers/notification/getNotifications");

const router = express.Router();

router.post("/", protect, sendNotification);
router.get("/", protect, getNotifications);

module.exports = router;
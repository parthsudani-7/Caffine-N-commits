const express = require("express");
const { sendOtp, verifyOtp, completeProfile } = require("../controllers/otp/authController");

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-profile", completeProfile);

module.exports = router;
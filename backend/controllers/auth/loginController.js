const User = require("../../models/User");

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    // Fake OTP (for now)
    const otp = "1234";

    // Check if user exists
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, name: "New User" });
    }

    res.json({
      message: "OTP sent",
      otp, // ⚠️ only for testing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOTP };
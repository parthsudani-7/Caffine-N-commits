const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (otp !== "1234") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ phone });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyOTP };
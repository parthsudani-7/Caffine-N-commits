const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const otpStore = {};
const otpRequestTime = {};

const sendOtp = async (req, res) => {
  try {
    const { phone, type } = req.body;

    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      return res.status(400).json({
        error: "Enter valid 10-digit mobile number",
      });
    }

    const user = await User.findOne({ phone });

    if (type === "login" && !user) {
      return res.status(400).json({
        error: "User not found. Please sign up.",
      });
    }

    if (type === "signup" && user) {
      return res.status(400).json({
        error: "User already exists. Please login.",
      });
    }
    const now = Date.now();

        if (otpRequestTime[phone] && now - otpRequestTime[phone] < 30000) {
        return res.status(400).json({
            error: "Wait 30 seconds before requesting OTP again",
        });
        }

        otpRequestTime[phone] = now;

    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[phone] = otp;

    console.log("OTP for", phone, ":", otp);

    res.json({
      message: "OTP sent successfully",
      otp, 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, type } = req.body;

    if (!otpStore[phone] || otpStore[phone] != otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    delete otpStore[phone];

    let user = await User.findOne({ phone });

    if (type === "signup" && !user) {
      user = await User.create({
        phone,
        name: "New User",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "OTP verified",
      user,
      token, 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
const completeProfile = async (req, res) => {
  try {
    const { phone, name, platform, zone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.name = name;
    user.platform = platform;
    user.zone = zone;

    await user.save();

    res.json({ user });

  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { sendOtp, verifyOtp, completeProfile };
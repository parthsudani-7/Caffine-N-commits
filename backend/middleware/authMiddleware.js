const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from DB
    const user = await User.findById(decoded.id).select("-__v");

    // ❌ If user not found
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // ✅ Attach user
    req.user = user;

    next();

  } catch (error) {
    console.log("❌ AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Token invalid or expired",
    });
  }
};

module.exports = { protect };
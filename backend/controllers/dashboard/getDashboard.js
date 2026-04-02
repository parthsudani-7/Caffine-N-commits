const User = require("../../models/User");
const Claim = require("../../models/Claim");

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const claims = await Claim.find({ user: user._id });

    res.json({
      user,
      totalClaims: claims.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Dashboard error" });
  }
};

module.exports = { getDashboard };
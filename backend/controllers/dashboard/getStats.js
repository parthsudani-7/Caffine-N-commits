const Claim = require("../../models/Claim");
const Policy = require("../../models/Policy");

const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalPolicies = await Policy.countDocuments({ user: userId });
    const totalClaims = await Claim.countDocuments({ user: userId });

    res.json({
      totalPolicies,
      totalClaims,
      user: req.user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats };
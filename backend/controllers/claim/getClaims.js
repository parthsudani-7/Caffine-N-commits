const Claim = require("../../models/Claim");
const Policy = require("../../models/Policy");

const getPrice = (type) => {
  if (type === "health") return 29;
  if (type === "vehicle") return 49;
  if (type === "life") return 79;
  return 29;
};

const getClaims = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const todayClaim = await Claim.findOne({
      user: userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!todayClaim) {
      const activePolicy = await Policy.findOne({
        user: userId,
        status: "active"
      });

      if (activePolicy) {
        const basePrice = getPrice(activePolicy.type);

        const multiplier = 5 + Math.random() * 5;
        const amount = Math.floor(basePrice * multiplier);

        await Claim.create({
          user: userId,
          policy: activePolicy._id,
          amount,
          reason: "Daily Risk Coverage",
          status: "approved"
        });
      }
    }

    const claims = await Claim.find({ user: userId })
      .populate("policy")
      .sort({ createdAt: -1 });

    res.json({ claims });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getClaims };
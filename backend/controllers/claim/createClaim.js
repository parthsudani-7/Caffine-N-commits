const Claim = require("../../models/Claim");
const { processClaim } = require("../../services/claim/claimEngine");
const { createNotification } = require("../../services/notification/inAppService");
const { sendRealTimeNotification } = require("../../sockets/notificationSocket");

const createClaim = async (req, res) => {
  try {
    const { policy, amount, reason } = req.body;

    const result = processClaim(amount, reason);

    const claim = await Claim.create({
      user: req.user._id,
      policy,
      amount,
      reason,
      status: result.status,
    });

    // save notification
    const notification = await createNotification(
      req.user._id,
      `Your claim is ${result.status}: ${result.reason}`,
      "claim"
    );

    // 🔥 send real-time notification
    sendRealTimeNotification(req.user._id, notification);

    res.status(201).json({
      message: "Claim processed",
      decision: result,
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClaim };
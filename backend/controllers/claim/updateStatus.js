const Claim = require("../../models/Claim");

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = status;
    await claim.save();

    res.json({
      message: "Claim updated",
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateStatus };
const express = require("express");
const Policy = require("../models/Policy");
const { protect } = require("../middleware/authMiddleware");
const axios = require("axios");

const router = express.Router();

const generatePolicyNumber = () => {
  return "POL" + Date.now();
};

const getLocation = (req) => {
  const { lat, lon } = req.body;
  return {
    lat: lat || 19.0760,
    lon: lon || 72.8777,
  };
};

const getRiskFromBackend = async (lat, lon, token) => {
  try {
    const res = await axios.get(
      `${API}/dashboard/risk?lat=${lat}&lon=${lon}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.riskScore;
  } catch (err) {
    console.log("⚠️ Risk fetch failed, fallback used");
    return 50;
  }
};

router.post("/create", protect, async (req, res) => {
  try {
    const { type, basePrice, coverage } = req.body;

    const userId = req.user._id;

    if (!type || !basePrice || !coverage) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const { lat, lon } = getLocation(req);

    const riskScore = await getRiskFromBackend(
      lat,
      lon,
      req.headers.authorization.split(" ")[1]
    );

    const premium = basePrice;

    const policy = new Policy({
      user: userId,
      policyNumber: generatePolicyNumber(),
      type,
      basePrice,
      riskScore,
      premium,
      coverage,
    });

    await policy.save();

    res.status(201).json({
      success: true,
      policy,
    });

  } catch (err) {
    console.log("❌ CREATE POLICY ERROR:", err.message);
    res.status(500).json({ error: "Failed to create policy" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const policies = await Policy.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      policies,
    });

  } catch (err) {
    console.log("❌ FETCH POLICY ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        error: "Policy not found",
      });
    }

    if (policy.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    policy.status = "cancelled";
    await policy.save();

    res.json({
      success: true,
      policy,
    });

  } catch (err) {
    console.log("❌ CANCEL POLICY ERROR:", err.message);
    res.status(500).json({ error: "Cancel failed" });
  }
});

router.put("/upgrade/:id", protect, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({
        error: "Policy not found",
      });
    }

    if (policy.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    const { lat, lon } = getLocation(req);

    const riskScore = await getRiskFromBackend(
      lat,
      lon,
      req.headers.authorization.split(" ")[1]
    );

    const newCoverage = policy.coverage + 5000;
    const newPremium = policy.basePrice;

    policy.coverage = newCoverage;
    policy.premium = newPremium;
    policy.riskScore = riskScore;

    await policy.save();

    res.json({
      success: true,
      policy,
    });

  } catch (err) {
    console.log("❌ UPGRADE ERROR:", err.message);
    res.status(500).json({ error: "Upgrade failed" });
  }
});

module.exports = router;
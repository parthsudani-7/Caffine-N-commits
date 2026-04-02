
const express = require("express");
const Policy = require("../models/Policy");
const { protect } = require("../middleware/authMiddleware");
const axios = require("axios");

const router = express.Router();

// 🔢 GENERATE POLICY NUMBER
const generatePolicyNumber = () => {
  return "POL" + Date.now();
};

// 📍 GET USER LOCATION FROM BODY OR DEFAULT
const getLocation = (req) => {
  const { lat, lon } = req.body;
  return {
    lat: lat || 19.0760,
    lon: lon || 72.8777,
  };
};

// 🌦️ GET REAL-TIME RISK FROM WEATHER API
const getRiskFromBackend = async (lat, lon, token) => {
  try {
    const res = await axios.get(
      `${API}/api/dashboard/risk?lat=${lat}&lon=${lon}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.riskScore;
  } catch (err) {
    console.log("⚠️ Risk fetch failed, fallback used");
    return 50; // fallback risk
  }
};

// 🧠 CREATE POLICY (Dynamic Pricing + LIVE RISK)
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

    // 🔥 GET LIVE RISK
    const riskScore = await getRiskFromBackend(
      lat,
      lon,
      req.headers.authorization.split(" ")[1]
    );

    // 💰 DYNAMIC PRICING
    const multiplier = 1 + riskScore / 100;
    const premium = Math.round(basePrice * multiplier);

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

// 📜 GET ALL USER POLICIES
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

// ❌ CANCEL POLICY
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

// 🔼 UPGRADE POLICY (REAL BACKEND LOGIC)
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

    // 🔥 GET NEW RISK
    const riskScore = await getRiskFromBackend(
      lat,
      lon,
      req.headers.authorization.split(" ")[1]
    );

    // 🔼 UPGRADE LOGIC
    const newCoverage = policy.coverage + 5000;
    const multiplier = 1 + riskScore / 100;
    const newPremium = Math.round(policy.basePrice * multiplier);

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
const { calculateRisk } = require("./riskCalculator");
const { validateClaim } = require("./claimValidator");

const processClaim = (amount, reason) => {
  const validation = validateClaim(amount);

  if (!validation.valid) {
    return { status: "rejected", reason: validation.message };
  }

  const risk = calculateRisk(amount, reason);

  if (risk > 50) {
    return { status: "rejected", reason: "High risk claim" };
  }

  if (risk > 20) {
    return { status: "pending", reason: "Needs review" };
  }

  return { status: "approved", reason: "Low risk" };
};

module.exports = { processClaim };
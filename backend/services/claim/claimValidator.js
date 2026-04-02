const validateClaim = (amount) => {
  if (amount <= 0) {
    return { valid: false, message: "Invalid amount" };
  }

  if (amount > 50000) {
    return { valid: false, message: "Amount too high" };
  }

  return { valid: true };
};

module.exports = { validateClaim };
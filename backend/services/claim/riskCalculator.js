const calculateRisk = (amount, reason) => {
  let risk = 0;

  if (amount > 10000) risk += 40;
  if (reason?.toLowerCase().includes("accident")) risk += 20;
  if (reason?.toLowerCase().includes("fire")) risk += 30;

  return risk;
};

module.exports = { calculateRisk };
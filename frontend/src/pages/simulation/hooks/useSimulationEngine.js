import { useState } from "react";

const useSimulationEngine = () => {
  const [selected, setSelected] = useState("Rain");
  const [value, setValue] = useState(20);
  const [result, setResult] = useState(null);
  const [firing, setFiring] = useState(false);

  const handleFire = () => {
    setFiring(true);
    setResult(null);

    setTimeout(() => {
      const approved = value > 25;

      setResult({
        status: approved ? "APPROVED" : "REJECTED",
        payout: approved ? "₹350" : "₹0",
        reason: approved
          ? "Threshold exceeded"
          : "Below threshold",
      });

      setFiring(false);
    }, 1500);
  };

  return {
    selected,
    setSelected,
    value,
    setValue,
    result,
    firing,
    handleFire,
  };
};

export default useSimulationEngine;
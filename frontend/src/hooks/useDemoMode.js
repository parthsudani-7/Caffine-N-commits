import { useEffect, useState } from "react";

const useDemoMode = (isDemo) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isDemo) return;

    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 5500),
      setTimeout(() => setStep(4), 7000),
      setTimeout(() => setStep(5), 9000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isDemo]);

  return step;
};

export default useDemoMode;
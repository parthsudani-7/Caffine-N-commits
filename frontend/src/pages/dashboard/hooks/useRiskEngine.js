import { useEffect, useState, useRef } from "react";
import alertSound from "@/assets/alert.mp3";

import { useApp } from "../../../context/AppContext";

export const useRiskEngine = (weather) => {
  const [risk, setRisk] = useState(50);
  const [alerts, setAlerts] = useState(["Monitoring your zone..."]);
  const [riskHistory, setRiskHistory] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const hasTriggeredRef = useRef(false);

  let addHistory = null;

  try {
    const app = useApp();
    addHistory = app?.addHistory;
  } catch (e) {
    console.log("AppContext not ready");
  }

  useEffect(() => {
    if (!weather) return;

    const condition = weather.weather?.[0]?.main?.toLowerCase() || "";

    let calculatedRisk = 30;


    if (condition.includes("rain")) calculatedRisk = 90;
    else if (condition.includes("cloud")) calculatedRisk = 65;
    else if (condition.includes("clear")) calculatedRisk = 20;

    setRisk(calculatedRisk);


    setRiskHistory((prev) => [
      ...prev.slice(-9),
      {
        time: new Date().toLocaleTimeString(),
        risk: calculatedRisk,
      },
    ]);

    if (condition.includes("rain")) {
      setAlerts([
        "⚠️ Heavy Rain Detected",
        "High disruption risk — claim protection active",
      ]);

      setShowNotification(true);

      const audio = new Audio(alertSound);
      audio.play().catch(() => {});

      setTimeout(() => setShowNotification(false), 4000);

      if (calculatedRisk >= 80 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;

        if (addHistory) {
          addHistory({
            type: "CLAIM",
            amount: 2000, // 🔥 simulated payout
          });
        }

        setAlerts([
          "💰 Claim Automatically Triggered",
          "Payout credited based on policy coverage",
        ]);
      }

    } else if (condition.includes("cloud")) {
      setAlerts([
        "Cloudy conditions detected",
        "Moderate delivery impact expected",
      ]);

      hasTriggeredRef.current = false;
    } else {
      setAlerts(["Stable working conditions"]);

      hasTriggeredRef.current = false;
    }

  }, [weather]);

  return { risk, alerts, riskHistory, showNotification };
};
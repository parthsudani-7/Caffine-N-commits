import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // =========================
  // 🔥 POLICY STATE
  // =========================

  const [policy, setPolicy] = useState(null);
  const [risk, setRisk] = useState(0);
  const [history, setHistory] = useState([]);

  // =========================
  // 🔁 UPDATE RISK
  // =========================

  const updateRisk = (newRisk) => {
    setRisk(newRisk);

    setHistory((prev) => [
      {
        id: Date.now(),
        type: "RISK_UPDATE",
        date: new Date().toISOString(),
        amount: null,
      },
      ...prev,
    ]);
  };

  // =========================
  // 💰 ADD CLAIM
  // =========================

  const addClaim = (amount) => {
    setHistory((prev) => [
      {
        id: Date.now(),
        type: "CLAIM",
        date: new Date().toISOString(),
        amount,
      },
      ...prev,
    ]);
  };

  // =========================
  // 🧾 ADD HISTORY ENTRY
  // =========================

  const addHistory = (entry) => {
    setHistory((prev) => [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        ...entry,
      },
      ...prev,
    ]);
  };

  // =========================
  // 🎨 RISK COLOR
  // =========================

  const getRiskColor = () => {
    if (risk < 30) return "#00B8A0";
    if (risk < 70) return "#F58A07";
    return "#EF4444";
  };

  // =========================
  // 🚀 HYDRATE FROM BACKEND
  // =========================

  const hydrateFromAPI = (data) => {
    setPolicy(data?.policy || null);
    setRisk(data?.risk || 0);
    setHistory(data?.history || []);
  };

  // =========================
  // 🧹 CLEAR STATE
  // =========================

  const clearPolicyData = () => {
    setPolicy(null);
    setRisk(0);
    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        policy,
        setPolicy,
        risk,
        setRisk,
        updateRisk,
        history,
        setHistory,
        addClaim,
        addHistory,
        getRiskColor,
        hydrateFromAPI,
        clearPolicyData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// =========================
// 🔥 CUSTOM HOOK
// =========================

export const useApp = () => useContext(AppContext);
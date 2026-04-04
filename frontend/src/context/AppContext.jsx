import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [policy, setPolicy] = useState(null);
  const [risk, setRisk] = useState(0);
  const [history, setHistory] = useState([]);

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

  const getRiskColor = () => {
    if (risk < 30) return "#00B8A0";
    if (risk < 70) return "#F58A07";
    return "#EF4444";
  };
  const hydrateFromAPI = (data) => {
    setPolicy(data?.policy || null);
    setRisk(data?.risk || 0);
    setHistory(data?.history || []);
  };
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

export const useApp = () => useContext(AppContext);
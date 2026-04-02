import Navbar from "../../components/layout/Navbar";
import { motion } from "framer-motion";

import TriggerTabs from "./components/TriggerTabs";
import ValueSlider from "./components/ValueSlider";
import FireButton from "./components/FireButton";
import ResultCard from "./components/ResultCard";

import useSimulationEngine from "./hooks/useSimulationEngine";
import { styles } from "./styles/simulationStyles";

const Simulation = () => {
  const {
    selected,
    setSelected,
    value,
    setValue,
    result,
    firing,
    handleFire,
  } = useSimulationEngine();

  return (
    <>
     

      <div className={styles.page}>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Trigger Simulation ⚡
        </motion.h1>

        <TriggerTabs selected={selected} setSelected={setSelected} />

        <ValueSlider value={value} setValue={setValue} />

        <FireButton handleFire={handleFire} firing={firing} />

        <ResultCard result={result} firing={firing} />

      </div>
    </>
  );
};

export default Simulation;
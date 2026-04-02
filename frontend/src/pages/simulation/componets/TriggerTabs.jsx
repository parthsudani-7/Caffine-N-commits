import { motion } from "framer-motion";

const triggers = ["Rain", "Heat", "AQI", "Bandh"];

const TriggerTabs = ({ selected, setSelected }) => {
  return (
    <div className="flex gap-4 mb-6">
      {triggers.map((t) => (
        <motion.button
          key={t}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelected(t)}
          className={`px-4 py-2 rounded-full transition ${
            selected === t
              ? "bg-[#00B8A0] text-black"
              : "bg-white/10 backdrop-blur-md"
          }`}
        >
          {t}
        </motion.button>
      ))}
    </div>
  );
};

export default TriggerTabs;
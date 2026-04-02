import { motion } from "framer-motion";

const ValueSlider = ({ value, setValue }) => {
  return (
    <motion.div className="mb-6">
      <p className="mb-2">Set Value: {value}</p>

      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full accent-[#00B8A0]"
      />
    </motion.div>
  );
};

export default ValueSlider;
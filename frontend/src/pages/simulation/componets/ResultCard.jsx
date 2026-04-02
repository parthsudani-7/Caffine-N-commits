import { motion } from "framer-motion";

const ResultCard = ({ result, firing }) => {
  if (firing) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-center text-xl font-bold"
      >
        Processing...
      </motion.div>
    );
  }

  if (!result) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
    >
      <div
        className={`text-xl font-bold mb-2 ${
          result.status === "APPROVED"
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {result.status}
      </div>

      <p className="text-lg">{result.payout}</p>
      <p className="text-gray-400">{result.reason}</p>
    </motion.div>
  );
};

export default ResultCard;
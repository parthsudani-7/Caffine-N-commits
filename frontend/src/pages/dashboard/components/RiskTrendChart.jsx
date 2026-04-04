import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RiskTrendChart = ({ riskHistory }) => {

  const data = (riskHistory || []).map((item, index) => ({
    name: `#${index + 1}`,
    amount: item.amount,
    status:
      item.status === "approved"
        ? 100
        : item.status === "pending"
        ? 60
        : 20,
  }));

  return (
    <div className="bg-[#0B1E35] p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-white text-xl mb-4">📊 Risk Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#1F3A5F" strokeDasharray="3 3" />

          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="status"
            stroke="#00E5FF"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#FF6B6B"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskTrendChart;
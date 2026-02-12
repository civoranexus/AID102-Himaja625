import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartItem = {
  score: number;
  created_at: string;
};

export default function HistoryChart({
  data,
  range,
}: {
  data: ChartItem[];
  range: "daily" | "weekly" | "monthly";
}) {
  const chartData = data.map(item => ({
    label:
      range === "daily"
        ? new Date(item.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : item.created_at,
    score: item.score,
  }));

  const lowData = data.length <= 2;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm relative">
      <h3 className="text-lg font-semibold mb-4">
        Soil Health ({range})
      </h3>

      {lowData && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400 pointer-events-none">
          More data will unlock deeper insights
        </div>
      )}

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
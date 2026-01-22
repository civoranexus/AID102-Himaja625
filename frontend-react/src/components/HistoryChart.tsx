import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartItem = {
  score: number;
  created_at: string;
};

export default function HistoryChart({ data }: { data: ChartItem[] }) {
  const formatted = data.map((item) => ({
    score: item.score,
    date: new Date(item.created_at).toLocaleDateString(),
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h3 className="text-lg font-semibold mb-4">
        Soil Health Trend
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={formatted}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#14b8a6"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
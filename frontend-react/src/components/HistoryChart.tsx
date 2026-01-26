import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { movingAverage } from "../utils/analytics";

type ChartItem = {
  score: number;
  created_at: string;
};

export default function HistoryChart({ data }: { data: ChartItem[] }) {
  const reversed = data.slice().reverse();

  const averages = movingAverage(
    reversed.map((i) => ({
      score: i.score,
      created_at: i.created_at,
      overall_status: "moderate",
    }))
  );

  const chartData = reversed.map((item, index) => ({
    date: new Date(item.created_at).toLocaleDateString(),
    score: item.score,
    avg: averages[index],
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Soil Health Trend
        </h3>
        <span className="text-sm text-slate-500">
          Score & Moving Average
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            {/* Gradient for main line */}
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.2} />
            </linearGradient>

            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickLine={false} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
            }}
          />

          <Legend />

          {/* Main score */}
          <Line
            type="monotone"
            dataKey="score"
            name="Soil Score"
            stroke="url(#scoreGradient)"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            filter="url(#glow)"
          />

          {/* Moving average */}
          <Line
            type="monotone"
            dataKey="avg"
            name="3-Day Average"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
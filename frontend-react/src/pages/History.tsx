import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import { apiRequest } from "../utils/api";
import { detectTrend } from "../utils/analytics";

/**
 * Backend response shape
 */
type HistoryItem = {
  score: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

export default function History() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<HistoryItem[]>("http://localhost:5000/api/history")
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setError("Unable to load history. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <p className="text-center py-10 text-slate-600">
        Loading history…
      </p>
    );
  }

  /* ---------------- Error ---------------- */
  if (error) {
    return (
      <p className="text-center py-10 text-red-600">
        {error}
      </p>
    );
  }

  /* ---------------- Analytics ---------------- */
  const averageScore =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.score, 0) / data.length
      : 0;

  const trend = detectTrend(data);

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">
        Analysis History
      </h2>

      <p className="text-slate-600 mb-4">
        Track how your soil health changes over time
      </p>

      {/* Trend Indicator */}
      {data.length > 1 && (
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-slate-600">
            Soil trend:
          </span>
          <span className={`font-semibold ${trend.color}`}>
            {trend.label}
          </span>
        </div>
      )}

      {/* Chart */}
      {data.length > 1 && <HistoryChart data={data} />}

      {/* Average */}
      {data.length > 0 && (
        <div className="my-6 text-slate-700">
          Average Soil Health Score:{" "}
          <span className="font-semibold text-teal-600">
            {averageScore.toFixed(1)}%
          </span>
        </div>
      )}

      {/* History Cards */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center card"
          >
            <div>
              <p className="font-medium capitalize">
                {item.overall_status} soil
              </p>
              <p className="text-sm text-slate-500">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>

            <div className="text-lg font-bold text-teal-600">
              {item.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
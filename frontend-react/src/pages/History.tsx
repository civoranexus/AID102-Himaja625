import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import { apiRequest } from "../utils/api";
import { detectTrend } from "../utils/analytics";
import { calculateStabilityScore } from "../utils/stability";

type HistoryItem = {
  score: number;
  prev_score: number | null;
  delta_score: number | null;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

export default function History() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiRequest<HistoryItem[]>("http://localhost:5000/api/history")
      .then(setData)
      .catch(() =>
        setError("Unable to load history. Please try again later.")
      )
      .finally(() => setLoading(false));
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
  const scores = data.map((d) => d.score);

  const averageScore =
    scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;

  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const firstScore = scores[scores.length - 1];
  const latestScore = scores[0];

  const improvementPercent =
    scores.length > 1
      ? ((latestScore - firstScore) / firstScore) * 100
      : 0;

  const trend = detectTrend(data);

  const stabilityScore = calculateStabilityScore(scores);


  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-2xl font-bold mb-1">
        Analysis History
      </h2>

      <p className="text-slate-600 mb-6">
        Track how your soil health evolves over time
      </p>

      {/* 🔹 Advanced Insights */}
      {data.length > 1 && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-slate-500 mb-1">
              Stability Score
            </p>
            <p
              className={`text-2xl font-bold ${
                stabilityScore > 80
                  ? "text-green-600"
                  : stabilityScore > 60
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {stabilityScore}%
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Consistency of soil health over time
            </p>
          </div>

          {/* Best Score */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-slate-500 mb-1">
              Best Score
            </p>
            <p className="text-2xl font-bold text-teal-600">
              {bestScore.toFixed(0)}%
            </p>
          </div>

          {/* Average */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-slate-500 mb-1">
              Average Score
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {averageScore.toFixed(1)}%
            </p>
          </div>

          {/* Improvement */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm text-slate-500 mb-1">
              Improvement
            </p>
            <p
              className={`text-2xl font-bold ${
                improvementPercent > 0
                  ? "text-green-600"
                  : improvementPercent < 0
                  ? "text-red-600"
                  : "text-slate-600"
              }`}
            >
              {improvementPercent > 0 && "↑ "}
              {improvementPercent < 0 && "↓ "}
              {Math.abs(improvementPercent).toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Trend Badge */}
      {data.length > 1 && (
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 ${trend.color}`}
          >
            Soil trend: {trend.label}
          </span>
        </div>
      )}

      {/* Chart */}
      {data.length > 1 && <HistoryChart data={data} />}

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
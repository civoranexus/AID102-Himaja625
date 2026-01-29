import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import ConfidenceRing from "../components/ConfidenceRing";
import { apiRequest } from "../utils/api";
import PredictiveAlert from "../components/PredictiveAlert";
import { generatePredictiveAlert } from "../utils/analytics";
import {
  detectTrend,
  calculateStabilityScore,
  calculateConsistencyIndex,
  calculateConfidenceScore,
} from "../utils/analytics";

type HistoryItem = {
  score: number;
  prev_score: number | null;
  delta_score: number | null;
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

  if (loading)
    return (
      <p className="text-center py-10 text-slate-600">
        Loading history…
      </p>
    );

  if (error)
    return (
      <p className="text-center py-10 text-red-600">
        {error}
      </p>
    );

  /* Analytics */
  const scores = data.map((d) => d.score);

  const averageScore =
    scores.reduce((a, b) => a + b, 0) / (scores.length || 1);

  const bestScore = Math.max(...scores);

  const improvementPercent =
    scores.length > 1
      ? ((scores[0] - scores[scores.length - 1]) /
          scores[scores.length - 1]) *
        100
      : 0;

  const trend = detectTrend(data);
  const stabilityScore = calculateStabilityScore(scores);
  const consistencyIndex = calculateConsistencyIndex(data);

  const confidenceScore = calculateConfidenceScore(
    stabilityScore,
    consistencyIndex,
    data.length
  );

  const predictiveAlert = generatePredictiveAlert(
  scores,
  stabilityScore,
  consistencyIndex
);

  /* UI */
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-1 animate-fade-in">
        Analysis History
      </h2>

      <p className="text-slate-600 mb-10 animate-fade-in delay-1">
        Track how your soil health evolves over time
      </p>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Confidence : Hero */}
        <div className="lg:row-span-2 bg-white rounded-2xl p-6 flex items-center justify-center shadow-sm animate-stagger delay-5">
          <ConfidenceRing value={confidenceScore} />
        </div>

        <InsightCard
          label="Stability"
          value={`${stabilityScore}%`}
          delay={1}
        />

        <InsightCard
          label="Consistency"
          value={`${consistencyIndex}%`}
          delay={2}
        />

        <InsightCard
          label="Average"
          value={`${averageScore.toFixed(1)}%`}
          subtle
          delay={3}
        />

        <InsightCard
          label="Best"
          value={`${bestScore}%`}
          teal
          delay={4}
        />

        <InsightCard
          label="Improvement"
          value={`${Math.abs(improvementPercent).toFixed(1)}%`}
          trend={improvementPercent}
          delay={6}
        />
      </div>

      {/* Trend Badge */}
      <span
        className={`inline-flex mb-6 px-3 py-1 rounded-full text-sm bg-slate-100 animate-fade-in delay-7 ${trend.color}`}
      >
        Soil trend: {trend.label}
      </span>

      {/* Predictive Alert */}
        {predictiveAlert && (
          <div className="mb-6 animate-fade-in delay-6">
            <PredictiveAlert alert={predictiveAlert} />
          </div>
        )}

      {/* Chart */}
      {data.length > 1 && (
        <div className="animate-fade-in delay-8">
          <HistoryChart data={data} />
        </div>
      )}
    </div>
  );
}

/* Insight Card */

function InsightCard({
  label,
  value,
  teal,
  subtle,
  trend,
  delay,
}: {
  label: string;
  value: string;
  teal?: boolean;
  subtle?: boolean;
  trend?: number;
  delay: number;
}) {
  return (
    <div
      className={`bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition animate-stagger delay-${delay}`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-2xl font-semibold ${
          teal
            ? "text-teal-600"
            : subtle
            ? "text-slate-700"
            : trend !== undefined
            ? trend > 0
              ? "text-green-600"
              : trend < 0
              ? "text-red-600"
              : "text-slate-600"
            : "text-slate-800"
        }`}
      >
        {trend !== undefined && trend !== 0 && (
          <span className="mr-1">
            {trend > 0 ? "↑" : "↓"}
          </span>
        )}
        {value}
      </p>
    </div>
  );
}
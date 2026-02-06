import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import ConfidenceRing from "../components/ConfidenceRing";
import PredictiveAlert from "../components/PredictiveAlert";
import ConfidenceBreakdown from "../components/ConfidenceBreakdown";
import ConfidenceExplanation from "../components/ConfidenceExplanation";
import ConfidenceTrend from "../components/ConfidenceTrend";
import { apiRequest } from "../utils/api";

import {
  calculateConfidenceTrend,
  calculateStabilityScore,
  calculateConsistencyIndex,
  calculateConfidenceScore,
  generatePredictiveAlert,
  detectWeakestConfidenceFactor,
} from "../utils/analytics";

type HistoryItem = {
  score: number;
  overall_status?: "poor" | "moderate" | "healthy";
  created_at: string;
};

type Range = "daily" | "weekly" | "monthly";

export default function History() {
  const [range, setRange] = useState<Range>("daily");
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiRequest<HistoryItem[]>(
      `http://localhost:5000/api/history?range=${range}`
    )
      .then(setData)
      .finally(() => setLoading(false));
  }, [range]);

  if (loading) {
    return (
      <p className="text-center py-12 text-slate-500 animate-fade-in">
        Loading analytics…
      </p>
    );
  }

  const scores = data.map(d => d.score);

  const stability = calculateStabilityScore(scores);

  const consistency = calculateConsistencyIndex(
    data.map(d => ({
      score: d.score,
      overall_status: d.overall_status ?? "moderate",
      created_at: d.created_at,
    }))
  );

  const confidenceTrend = calculateConfidenceTrend(scores);

  const confidence = calculateConfidenceScore(
    stability,
    consistency,
    data.length
  );

  const weakest = detectWeakestConfidenceFactor({
    stability,
    consistency,
    samples: data.length,
  });

  // ✅ USE ANALYTICS OUTPUT DIRECTLY
  const alert = generatePredictiveAlert(
    scores,
    stability,
    consistency
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center">
        <ConfidenceRing value={confidence} history={scores} />
        <ConfidenceTrend data={confidenceTrend} />
      </div>

      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Analysis History</h2>
        <p className="text-slate-500">
          Confidence-driven insights from your soil data
        </p>
      </header>

      <div className="inline-flex bg-slate-100 rounded-xl p-1">
        {(["daily", "weekly", "monthly"] as Range[]).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 text-sm rounded-lg transition ${
              range === r
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric label="Stability" value={`${stability}%`} />
        <Metric label="Consistency" value={`${consistency}%`} />
        <Metric label="Samples" value={`${data.length}`} />
      </section>

      <ConfidenceBreakdown
        stability={stability}
        consistency={consistency}
        samples={data.length}
      />

      <ConfidenceExplanation
        confidence={confidence}
        stability={stability}
        consistency={consistency}
        samples={data.length}
        weakest={weakest}
      />

      {alert && <PredictiveAlert alert={alert} />}

      <HistoryChart data={data} range={range} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
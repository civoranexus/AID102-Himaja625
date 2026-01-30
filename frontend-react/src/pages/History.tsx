import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import ConfidenceRing from "../components/ConfidenceRing";
import PredictiveAlert from "../components/PredictiveAlert";
import { apiRequest } from "../utils/api";
import ConfidenceBreakdown from "../components/ConfidenceBreakdown";
import {
  calculateStabilityScore,
  calculateConsistencyIndex,
  calculateConfidenceScore,
  generatePredictiveAlert,
} from "../utils/analytics";

type HistoryItem = {
  score: number;
  created_at: string;
};

type Range = "daily" | "weekly" | "monthly";

export default function History() {
  const [range, setRange] = useState<Range>("daily");
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiRequest<HistoryItem[]>(`http://localhost:5000/api/history?range=${range}`)
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
      overall_status: "moderate",
      created_at: d.created_at,
    }))
  );

  const confidence = calculateConfidenceScore(
    stability,
    consistency,
    data.length
  );

  const alert = generatePredictiveAlert(scores, stability, consistency);

  <ConfidenceBreakdown
    stability={stability}
    consistency={consistency}
    samples={data.length}
  />

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h2 className="text-2xl font-bold">Analysis History</h2>
        <p className="text-slate-500">
          Confidence-driven insights from your soil data
        </p>
      </header>

      {/* Range Toggle */}
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

      {/* HERO INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Confidence Hero */}
        <div className="lg:row-span-2 bg-white rounded-3xl p-8 shadow-sm flex items-center justify-center animate-stagger delay-1">
          <ConfidenceRing
            value={confidence}
            history={scores}
          />
        </div>

        <Metric label="Stability" value={`${stability}%`} delay={2} />
        <Metric label="Consistency" value={`${consistency}%`} delay={3} />
        <Metric label="Samples" value={`${data.length}`} delay={4} />
      </section>

      {/* Alert */}
      {alert && (
        <div className="animate-fade-in delay-5">
          <PredictiveAlert alert={alert} />
        </div>
      )}

      {/* Chart */}
      <section className="animate-fade-in delay-6">
        <HistoryChart data={data} range={range} />
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <div
      className={`bg-white rounded-2xl px-6 py-5 shadow-sm animate-stagger delay-${delay}`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}
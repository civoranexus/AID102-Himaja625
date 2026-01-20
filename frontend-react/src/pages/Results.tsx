import { useLocation } from "react-router-dom";
import ScoreRing from "../components/ScoreRing";

type BackendResult = {
  score: number;
  overallStatus: "poor" | "moderate" | "healthy";
  statuses: {
    nitrogen: "poor" | "moderate" | "healthy";
    phosphorus: "poor" | "moderate" | "healthy";
    potassium: "poor" | "moderate" | "healthy";
    ph: "poor" | "moderate" | "healthy";
    moisture: "poor" | "moderate" | "healthy";
  };
  recommendations: string[];
};

export default function Results() {
  const location = useLocation();
  const data = location.state as BackendResult | null;

  if (!data) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12 text-center">
        <p className="text-slate-600">
          No analysis data found. Please analyze soil first.
        </p>
      </div>
    );
  }

  const { score, overallStatus, statuses, recommendations } = data;

  const statusColor =
    overallStatus === "healthy"
      ? "text-emerald-600"
      : overallStatus === "moderate"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Summary */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <ScoreRing value={score} />
        <div>
          <h2 className={`text-2xl font-bold capitalize ${statusColor}`}>
            {overallStatus} Soil Health
          </h2>
          <p className="text-slate-600 mt-1">
            AI-generated analysis based on your soil parameters
          </p>
        </div>
      </div>

      {/* Nutrient Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[
          ["Nitrogen", statuses.nitrogen],
          ["Phosphorus", statuses.phosphorus],
          ["Potassium", statuses.potassium],
          ["Moisture", statuses.moisture],
        ].map(([label, status]) => (
          <div key={label} className="bg-white p-5 rounded-lg shadow">
            <p className="font-medium flex justify-between">
              {label}
              <span className="text-sm capitalize text-slate-500">
                {status}
              </span>
            </p>
            <div className="h-3 bg-slate-200 rounded mt-3">
              <div
                className="h-3 bg-teal-500 rounded"
                style={{
                  width:
                    status === "healthy"
                      ? "90%"
                      : status === "moderate"
                      ? "60%"
                      : "30%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Explainability */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">
          Why the AI gave this result
        </h3>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          {Object.entries(statuses).map(([key, value]) => (
            <li key={key}>
              {key.toUpperCase()} level is classified as{" "}
              <span className="font-medium capitalize">{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">
          AI Recommendations
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec}
              className="bg-white p-4 rounded-lg shadow text-sm"
            >
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
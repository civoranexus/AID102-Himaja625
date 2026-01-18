import { useLocation } from "react-router-dom";
import ScoreRing from "../components/ScoreRing";

type SoilData = {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
};

export default function Results() {
  const location = useLocation();
  const data = location.state as SoilData | null;

  // fallback (direct URL access)
  const soil = data ?? {
    nitrogen: 60,
    phosphorus: 40,
    potassium: 50,
    ph: 6.8,
    moisture: 55,
  };

  const score =
    (soil.nitrogen + soil.phosphorus + soil.potassium + soil.moisture) / 4;

  let status = "Moderate";
  let color = "text-yellow-500";

  if (score >= 75) {
    status = "Excellent";
    color = "text-emerald-600";
  } else if (score < 50) {
    status = "Poor";
    color = "text-red-500";
  }

  const recommendations =
    status === "Excellent"
      ? ["Maintain current irrigation", "Monitor pH monthly"]
      : status === "Moderate"
      ? ["Add organic compost", "Improve irrigation timing"]
      : [
          "Apply nitrogen-rich fertilizer",
          "Increase irrigation frequency",
          "Correct soil pH immediately",
        ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <ScoreRing value={Math.round(score)} />
        <div>
          <h2 className={`text-2xl font-bold ${color}`}>
            {status} Soil Health
          </h2>
          <p className="text-slate-600 mt-1">
            Based on your soil parameters
          </p>
        </div>
      </div>

      {/* Nutrients */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[
          ["Nitrogen", soil.nitrogen],
          ["Phosphorus", soil.phosphorus],
          ["Potassium", soil.potassium],
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-5 rounded-lg shadow">
            <p className="font-medium">{label}</p>
            <div className="h-3 bg-slate-200 rounded mt-3">
              <div
                className="h-3 bg-teal-500 rounded"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
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
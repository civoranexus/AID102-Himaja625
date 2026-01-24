import { useEffect, useState } from "react";
import HistoryChart from "../components/HistoryChart";
import { apiRequest } from "../utils/api";

type HistoryItem = {
  score: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

export default function History() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("http://localhost:5000/api/history")
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-slate-600">
        Loading history...
      </p>
    );
  }

  const avgScore =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.score, 0) /
        data.length
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-2">
        Analysis History
      </h2>

      <p className="text-slate-600 mb-6">
        Track how your soil health changes over time
      </p>

      {data.length > 1 && <HistoryChart data={data} />}

      {data.length > 0 && (
        <div className="mb-6 text-slate-700">
          Average Soil Health Score:{" "}
          <span className="font-semibold text-teal-600">
            {avgScore.toFixed(1)}%
          </span>
        </div>
      )}

      <div className="space-y-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium capitalize">
                {item.overall_status} Soil
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
type Insight = {
  status: "poor" | "moderate" | "healthy";
  weight: number;
  contribution: number;
  impact: "positive" | "neutral" | "negative";
};

type Props = {
  insights: Record<string, Insight>;
};

export default function NutrientInsights({ insights }: Props) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(insights).map(([key, info]) => (
        <div
          key={key}
          className="bg-white rounded-xl shadow p-5 card"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {key}
          </p>

          <p
            className={`text-xl font-bold mt-1 ${
              info.impact === "positive"
                ? "text-green-600"
                : info.impact === "negative"
                ? "text-red-600"
                : "text-yellow-500"
            }`}
          >
            {info.contribution.toFixed(1)} pts
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Weight: {(info.weight * 100).toFixed(0)}%
          </p>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
              info.status === "healthy"
                ? "bg-green-100 text-green-700"
                : info.status === "moderate"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {info.status}
          </span>
        </div>
      ))}
    </div>
  );
}
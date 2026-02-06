type Props = {
  data: number[];
};

export default function ConfidenceTrend({ data }: Props) {
  if (data.length < 2) return null;

  return (
    <div className="mt-4 w-full">
      <p className="text-xs text-slate-500 mb-2">
        Confidence trend over time
      </p>

      <div className="w-full h-12 bg-slate-100 rounded-lg overflow-hidden">
        <svg width="100%" height="48" viewBox="0 0 100 48" preserveAspectRatio="none">
          <polyline
            points={data
              .slice(-10)
              .map((v, i) => `${i * 10},${48 - v * 0.4}`)
              .join(" ")}
            fill="none"
            stroke="var(--emerald)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
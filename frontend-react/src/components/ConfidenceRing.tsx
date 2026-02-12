import { useEffect, useState } from "react";

type Props = {
  value: number;
  history?: number[];
};

export default function ConfidenceRing({ value, history = [] }: Props) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [value]);

  const level =
    value >= 75 ? "High" : value >= 45 ? "Medium" : "Low";

  const color =
    value >= 75
      ? "emerald"
      : value >= 45
      ? "amber"
      : "red";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <svg width="140" height="140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke={`var(--${color})`}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className={pulse ? "confidence-pulse" : ""}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{value}%</span>
          <span className={`text-sm font-medium text-${color}-600`}>
            {level}
          </span>
        </div>

        <div className="absolute top-full mt-3 w-56 text-xs text-slate-700 bg-white shadow-lg border rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Based on stability, consistency & data volume
        </div>
      </div>

      {history.length > 1 && (
        <div className="w-28 h-8 bg-slate-100 rounded-md overflow-hidden">
          <svg width="112" height="32">
            <polyline
              points={history
                .slice(-10)
                .map((v, i) => `${i * 12},${32 - v * 0.25}`)
                .join(" ")}
              fill="none"
              stroke={`var(--${color})`}
              strokeWidth="2"
            />
          </svg>
        </div>
      )}

      <p className="mt-2 text-sm text-slate-500">
        Overall Confidence
      </p>
    </div>
  );
}
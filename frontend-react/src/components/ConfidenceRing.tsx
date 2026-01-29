import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  history?: number[]; // pass last N confidence values
};

export default function ConfidenceRing({
  value,
  history = [],
}: Props) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  const ringRef = useRef<SVGCircleElement>(null);
  const [pulse, setPulse] = useState(false);

  /* ---------------- Pulse on change ---------------- */
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [value]);

  /* ---------------- Confidence Logic ---------------- */
  const isHigh = value >= 75;
  const isMedium = value >= 45 && value < 75;

  const gradientId = isHigh
    ? "confidenceHigh"
    : isMedium
    ? "confidenceMedium"
    : "confidenceLow";

  const label = isHigh ? "High" : isMedium ? "Medium" : "Low";

  /* ---------------- Sparkline ---------------- */
  const sparkline = history.length > 1
    ? history
        .slice(-10)
        .map((v, i) => `${i * 10},${40 - v * 0.35}`)
        .join(" ")
    : "";

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Ring */}
      <div className="relative group">
        <svg width="120" height="120">
          <defs>
            <linearGradient id="confidenceHigh" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="confidenceMedium" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="confidenceLow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Background */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          {/* Progress */}
          <circle
            ref={ringRef}
            cx="60"
            cy="60"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className={pulse ? "confidence-pulse" : ""}
            style={{
              transition: "stroke-dashoffset 0.8s ease",
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-900">
            {value}%
          </span>
          <span
            className={`text-xs font-medium ${
              isHigh
                ? "text-emerald-600"
                : isMedium
                ? "text-amber-500"
                : "text-red-600"
            }`}
          >
            {label}
          </span>
        </div>

        {/* Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 text-xs text-slate-700 bg-white shadow-lg border rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
          Based on stability, consistency & data volume
        </div>
      </div>

      {/* Sparkline */}
      {sparkline && (
        <svg width="100" height="40" className="mt-3">
          <polyline
            points={sparkline}
            fill="none"
            stroke={
              isHigh
                ? "#10b981"
                : isMedium
                ? "#f59e0b"
                : "#ef4444"
            }
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      <p className="mt-2 text-sm text-slate-500">
        Confidence Score
      </p>
    </div>
  );
}
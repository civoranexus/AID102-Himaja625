// frontend/src/utils/analytics.ts

export type HistoryItem = {
  score: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

/* ---------------- Moving Average ---------------- */

export function movingAverage(
  data: HistoryItem[],
  windowSize = 3
): number[] {
  return data.map((_, index) => {
    const slice = data.slice(
      Math.max(0, index - windowSize + 1),
      index + 1
    );
    const avg =
      slice.reduce((sum, i) => sum + i.score, 0) / slice.length;
    return Number(avg.toFixed(2));
  });
}

/* ---------------- Trend ---------------- */

export function detectTrend(data: HistoryItem[]) {
  if (data.length < 2) {
    return { label: "Stable", color: "text-slate-500" };
  }

  const latest = data[0].score;
  const oldest = data[data.length - 1].score;
  const delta = latest - oldest;

  if (delta > 5) return { label: "Improving", color: "text-green-600" };
  if (delta < -5) return { label: "Declining", color: "text-red-600" };

  return { label: "Stable", color: "text-slate-500" };
}

/* ---------------- Stability Score ---------------- */

export function calculateStabilityScore(scores: number[]): number {
  if (scores.length < 2) return 100;

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) /
    scores.length;

  return Math.round(Math.max(0, 100 - variance));
}

/* ---------------- Consistency Index ---------------- */

export function calculateConsistencyIndex(
  data: HistoryItem[]
): number {
  if (!data.length) return 0;

  const good = data.filter(
    d => d.overall_status !== "poor"
  ).length;

  return Math.round((good / data.length) * 100);
}

/* ---------------- Confidence Score ---------------- */

export function calculateConfidenceScore(
  stability: number,
  consistency: number,
  sampleCount: number
): number {
  const sampleFactor = Math.min(100, sampleCount * 10);

  const score =
    0.4 * stability +
    0.4 * consistency +
    0.2 * sampleFactor;

  return Math.round(score);
}

/* ---------------- Predictive Alerts (ELITE) ---------------- */

export type PredictiveAlert = {
  level: "positive" | "warning" | "danger";
  title: string;
  message: string;

  confidence: number;
  confidenceLabel: "Low" | "Medium" | "High";
  explanation: string;
};

export function generatePredictiveAlert(
  scores: number[],
  stability: number,
  consistency: number
): PredictiveAlert | null {
  if (scores.length < 3) return null;

  const recent = scores.slice(0, 3);
  const delta = recent[0] - recent[recent.length - 1];

  const confidence =
    Math.round(
      0.5 * Math.abs(delta) * 10 +
      0.3 * (100 - stability) +
      0.2 * consistency
    );

  const normalized = Math.min(100, Math.max(30, confidence));

  const confidenceLabel =
    normalized >= 75
      ? "High"
      : normalized >= 50
      ? "Medium"
      : "Low";

  /* 🔴 Degradation risk */
  if (delta < -5 && stability < 65) {
    return {
      level: "danger",
      title: "Soil Degradation Risk",
      message:
        "Recent scores show a clear downward trend that may affect soil health.",
      confidence: normalized,
      confidenceLabel,
      explanation:
        "Based on repeated decline and unstable recent readings.",
    };
  }

  /* 🟡 Instability */
  if (Math.abs(delta) <= 5 && stability < 70) {
    return {
      level: "warning",
      title: "Soil Health Instability",
      message:
        "Soil readings are fluctuating and may require closer monitoring.",
      confidence: normalized,
      confidenceLabel,
      explanation:
        "Trend detected with moderate variation across recent samples.",
    };
  }

  /* 🟢 Positive trend */
  if (delta > 5 && consistency > 80) {
    return {
      level: "positive",
      title: "Healthy Upward Trend",
      message:
        "Soil health is improving steadily under current conditions.",
      confidence: normalized,
      confidenceLabel,
      explanation:
        "Consistent improvement observed across recent measurements.",
    };
  }

  return null;
}
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
/**
 * Stability score based on variance (numbers only)
 * 0–100 (higher = more stable)
 */
export function calculateStabilityScore(scores: number[]): number {
  if (scores.length < 2) return 100;

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;

  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) /
    scores.length;

  const normalized = Math.max(0, 100 - variance);
  return Math.round(normalized);
}

/* ---------------- Consistency Index ---------------- */
/**
 * % of non-poor readings
 */
export function calculateConsistencyIndex(
  data: HistoryItem[]
): number {
  if (!data.length) return 0;

  const good = data.filter(d => d.overall_status !== "poor").length;
  return Math.round((good / data.length) * 100);
}

/* ---------------- Confidence Score ---------------- */
/**
 * Confidence score based on:
 * - Stability (variance)
 * - Consistency
 * - Sample size
 * Returns 0–100
 */
export function calculateConfidenceScore(
  stability: number,
  consistency: number,
  sampleCount: number
): number {
  const sampleFactor = Math.min(100, sampleCount * 10);

  const confidence =
    0.4 * stability +
    0.4 * consistency +
    0.2 * sampleFactor;

  return Math.round(confidence);
}

/* ---------------- Predictive Alerts ---------------- */

export type PredictiveAlert = {
  level: "positive" | "warning" | "danger";
  title: string;
  message: string;
};

/**
 * Generate predictive alert based on recent trends
 */
export function generatePredictiveAlert(
  scores: number[],
  stability: number,
  consistency: number
): PredictiveAlert | null {
  if (scores.length < 3) return null;

  const recent = scores.slice(0, 3);
  const delta =
    recent[0] - recent[recent.length - 1];

  // 🔴 High risk
  if (delta < -5 && stability < 60) {
    return {
      level: "danger",
      title: "Soil Degradation Risk",
      message:
        "Recent decline detected with low stability. Immediate intervention is recommended to prevent further degradation.",
    };
  }

  // 🟡 Watch closely
  if (Math.abs(delta) <= 5 && stability < 70) {
    return {
      level: "warning",
      title: "Potential Instability",
      message:
        "Soil health is fluctuating. Monitor moisture and pH closely over the next cycle.",
    };
  }

  // 🟢 Positive momentum
  if (delta > 5 && consistency > 80) {
    return {
      level: "positive",
      title: "Healthy Upward Trend",
      message:
        "Soil health is improving steadily. Current practices are working well.",
    };
  }

  return null;
}
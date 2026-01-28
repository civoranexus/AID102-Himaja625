// frontend-react/src/utils/analytics.ts

export type HistoryItem = {
  score: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

/* ---------------- Existing ---------------- */

/**
 * Calculate moving average of soil health scores
 */
export function movingAverage(
  data: HistoryItem[],
  windowSize: number = 3
): number[] {
  return data.map((_, index) => {
    const start = Math.max(0, index - windowSize + 1);
    const slice = data.slice(start, index + 1);

    const avg =
      slice.reduce((sum, item) => sum + item.score, 0) /
      slice.length;

    return Number(avg.toFixed(2));
  });
}

/**
 * Detect overall trend direction
 */
export function detectTrend(data: HistoryItem[]): {
  label: "Improving" | "Stable" | "Declining";
  color: string;
} {
  if (data.length < 2) {
    return { label: "Stable", color: "text-slate-500" };
  }

  const oldest = data[data.length - 1].score;
  const latest = data[0].score;
  const delta = latest - oldest;

  if (delta > 5) return { label: "Improving", color: "text-green-600" };
  if (delta < -5) return { label: "Declining", color: "text-red-600" };

  return { label: "Stable", color: "text-slate-500" };
}

/* ---------------- New Advanced Analytics ---------------- */

/**
 * Stability score based on variance (lower variance = more stable)
 * Returns value between 0–100
 */
export function calculateStabilityScore(
  data: HistoryItem[]
): number {
  if (data.length < 2) return 100;

  const scores = data.map((d) => d.score);
  const mean =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  const variance =
    scores.reduce(
      (sum, s) => sum + Math.pow(s - mean, 2),
      0
    ) / scores.length;

  // Normalize variance → stability
  const normalized = Math.max(0, 100 - variance);
  return Math.round(normalized);
}

/**
 * Consistency index (% of entries that are moderate+)
 */
export function calculateConsistencyIndex(
  data: HistoryItem[]
): number {
  if (data.length === 0) return 0;

  const good = data.filter(
    (d) => d.overall_status !== "poor"
  ).length;

  return Math.round((good / data.length) * 100);
}
// frontend-react/src/utils/analytics.ts

export type HistoryItem = {
  score: number;
  overall_status: "poor" | "moderate" | "healthy";
  created_at: string;
};

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

  if (delta > 5) {
    return { label: "Improving", color: "text-green-600" };
  }

  if (delta < -5) {
    return { label: "Declining", color: "text-red-600" };
  }

  return { label: "Stable", color: "text-slate-500" };
}
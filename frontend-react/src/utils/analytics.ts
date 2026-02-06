export type SoilStatus = "poor" | "moderate" | "healthy";

export type HistoryItem = {
  score: number;
  overall_status: SoilStatus;
  created_at: string;
};

/* ---------------- Stability ---------------- */

export function calculateStabilityScore(scores: number[]): number {
  if (scores.length < 2) return 100;

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) /
    scores.length;

  return Math.max(0, Math.round(100 - variance));
}

/* ---------------- Consistency ---------------- */

export function calculateConsistencyIndex(data: HistoryItem[]): number {
  if (!data.length) return 0;

  const good = data.filter(d => d.overall_status !== "poor").length;
  return Math.round((good / data.length) * 100);
}

/* ---------------- Confidence ---------------- */

export function calculateConfidenceScore(
  stability: number,
  consistency: number,
  samples: number
): number {
  const sampleFactor = Math.min(100, samples * 10);

  return Math.round(
    0.4 * stability +
    0.4 * consistency +
    0.2 * sampleFactor
  );
}

/* ---------------- Trend ---------------- */

export function calculateConfidenceTrend(scores: number[]): number[] {
  if (scores.length < 2) return [];

  return scores.map((_, i) => {
    const slice = scores.slice(0, i + 1);
    return calculateConfidenceScore(
      calculateStabilityScore(slice),
      100,
      slice.length
    );
  });
}

/* ---------------- Weakest Factor ---------------- */

export function detectWeakestConfidenceFactor({
  stability,
  consistency,
  samples,
}: {
  stability: number;
  consistency: number;
  samples: number;
}) {
  const sampleScore = Math.min(100, samples * 10);

  const factors = [
    { key: "stability", label: "Stability", value: stability, reason: "High variance across readings" },
    { key: "consistency", label: "Consistency", value: consistency, reason: "Frequent drops below healthy range" },
    { key: "samples", label: "Data Volume", value: sampleScore, reason: "Limited historical samples" },
  ];

  return factors.reduce((min, f) => (f.value < min.value ? f : min));
}

/* ---------------- Predictive Alert ---------------- */

export type PredictiveAlert = {
  level: "positive" | "warning" | "danger";
  title: string;
  message: string;
  confidence: number;
};

export function generatePredictiveAlert(
  scores: number[],
  stability: number,
  consistency: number
): PredictiveAlert | null {
  if (scores.length < 3) return null;

  const delta = scores[0] - scores[scores.length - 1];

  if (delta < -5 && stability < 65) {
    return {
      level: "danger",
      title: "Soil Degradation Risk",
      message: "Downward trend with unstable readings detected.",
      confidence: 80,
    };
  }

  if (Math.abs(delta) <= 5 && stability < 70) {
    return {
      level: "warning",
      title: "Soil Health Instability",
      message: "Readings fluctuate — closer monitoring advised.",
      confidence: 65,
    };
  }

  if (delta > 5 && consistency > 80) {
    return {
      level: "positive",
      title: "Healthy Improvement",
      message: "Soil health improving consistently.",
      confidence: 85,
    };
  }

  return null;
}
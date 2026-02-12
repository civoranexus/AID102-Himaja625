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

export type PredictiveAlertType = {
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
): PredictiveAlertType | null {
  if (scores.length < 3) return null;

  const recent = scores.slice(0, 3);
  const delta = recent[0] - recent[recent.length - 1];

  const confidenceRaw =
    0.5 * Math.abs(delta) * 10 +
    0.3 * (100 - stability) +
    0.2 * consistency;

  const confidence = Math.min(
    100,
    Math.max(30, Math.round(confidenceRaw))
  );

  const confidenceLabel =
    confidence >= 75
      ? "High"
      : confidence >= 50
      ? "Medium"
      : "Low";

  if (delta < -5 && stability < 65) {
    return {
      level: "danger",
      title: "Soil Degradation Risk",
      message:
        "Recent soil scores show a clear downward trend that may impact crop health.",
      confidence,
      confidenceLabel,
      explanation:
        "Repeated decline combined with unstable recent readings.",
    };
  }

  if (Math.abs(delta) <= 5 && stability < 70) {
    return {
      level: "warning",
      title: "Soil Health Instability",
      message:
        "Soil readings are fluctuating and require closer monitoring.",
      confidence,
      confidenceLabel,
      explanation:
        "Moderate variation detected across recent samples.",
    };
  }

  if (delta > 5 && consistency > 80) {
    return {
      level: "positive",
      title: "Healthy Upward Trend",
      message:
        "Soil health is improving steadily under current conditions.",
      confidence,
      confidenceLabel,
      explanation:
        "Consistent improvement observed across recent measurements.",
    };
  }

  return null;
}
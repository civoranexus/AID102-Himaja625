export type Recommendation = {
  level: "info" | "warning" | "critical";
  title: string;
  message: string;
  rationale: string;
};

export function generateSoilRecommendations({
  stability,
  consistency,
  confidence,
  trend,
}: {
  stability: number;
  consistency: number;
  confidence: number;
  trend: "Improving" | "Stable" | "Declining";
}): Recommendation[] {
  const recs: Recommendation[] = [];

  if (trend === "Declining") {
    recs.push({
      level: "critical",
      title: "Declining Soil Health Trend",
      message:
        "Recent soil measurements show a consistent downward trend.",
      rationale:
        "Trend analysis across historical scores indicates degradation risk.",
    });
  }

  if (stability < 60) {
    recs.push({
      level: "warning",
      title: "High Soil Variability",
      message:
        "Soil readings fluctuate significantly across samples.",
      rationale:
        "Low stability score suggests inconsistent environmental or nutrient conditions.",
    });
  }

  if (confidence < 50) {
    recs.push({
      level: "warning",
      title: "Low Confidence in Analysis",
      message:
        "Model confidence is limited due to unstable or insufficient data.",
      rationale:
        "Confidence score integrates stability, consistency, and data volume.",
    });
  }

  if (recs.length === 0) {
    recs.push({
      level: "info",
      title: "Soil Health Appears Stable",
      message:
        "Current soil conditions are balanced with no immediate risks detected.",
      rationale:
        "All confidence indicators fall within acceptable ranges.",
    });
  }

  return recs;
}
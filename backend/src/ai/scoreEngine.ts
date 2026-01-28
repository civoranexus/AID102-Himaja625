import type { SoilStatus } from "./soilRules";

/**
 * Numeric score mapping per soil status
 */
export const STATUS_SCORE: Record<SoilStatus, number> = {
  poor: 20,
  moderate: 60,
  healthy: 100,
};

/**
 * Nutrient weights (must sum to 1.0)
 * These define sensitivity / influence
 */
export const NUTRIENT_WEIGHTS = {
  nitrogen: 0.25,
  phosphorus: 0.2,
  potassium: 0.2,
  ph: 0.2,
  moisture: 0.15,
} as const;

export type NutrientKey = keyof typeof NUTRIENT_WEIGHTS;

/**
 * Calculate weighted overall soil health score
 */
export function calculateOverallScore(
  statuses: Record<NutrientKey, SoilStatus>
): number {
  const score = (Object.keys(NUTRIENT_WEIGHTS) as NutrientKey[])
    .reduce((total, key) => {
      const raw = STATUS_SCORE[statuses[key]];
      const weight = NUTRIENT_WEIGHTS[key];
      return total + raw * weight;
    }, 0);

  return Math.round(score);
}

/**
 * Convert numeric score to soil health label
 */
export function getHealthLabel(score: number): SoilStatus {
  if (score < 40) return "poor";
  if (score < 70) return "moderate";
  return "healthy";
}

/**
 * Nutrient Sensitivity / Contribution Analytics
 * Used by:
 * - Contribution bar chart
 * - Confidence score
 * - Insight panels
 */
export function calculateNutrientInsights(
  statuses: Record<NutrientKey, SoilStatus>
) {
  return (Object.keys(NUTRIENT_WEIGHTS) as NutrientKey[])
    .reduce((acc, key) => {
      const rawScore = STATUS_SCORE[statuses[key]];
      const weight = NUTRIENT_WEIGHTS[key];
      const contribution = Number((rawScore * weight).toFixed(2));

      acc[key] = {
        status: statuses[key],
        weight,
        contribution,
        impact:
          rawScore >= 80
            ? "positive"
            : rawScore >= 50
            ? "neutral"
            : "negative",
      };

      return acc;
    }, {} as Record<
      NutrientKey,
      {
        status: SoilStatus;
        weight: number;
        contribution: number;
        impact: "positive" | "neutral" | "negative";
      }
    >);
}
import type { SoilStatus } from "./soilRules";

const scoreMap: Record<SoilStatus, number> = {
  poor: 20,
  moderate: 60,
  healthy: 100,
};

export function calculateOverallScore(statuses: SoilStatus[]): number {
  const total = statuses.reduce((sum, s) => sum + scoreMap[s], 0);
  return Math.round(total / statuses.length);
}

export function getHealthLabel(score: number): SoilStatus {
  if (score < 40) return "poor";
  if (score < 70) return "moderate";
  return "healthy";
}
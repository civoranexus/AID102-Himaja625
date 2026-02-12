import type { SoilStatus } from "./soilRules";

export function generateRecommendations(
  statuses: Record<string, SoilStatus>
): string[] {
  const tips: string[] = [];

  if (statuses.nitrogen === "poor")
    tips.push("Increase nitrogen using organic compost or urea.");

  if (statuses.phosphorus === "poor")
    tips.push("Apply phosphorus-rich fertilizers like DAP.");

  if (statuses.potassium === "poor")
    tips.push("Add potash fertilizers to improve root strength.");

  if (statuses.ph === "poor")
    tips.push("Adjust soil pH using lime or sulfur as needed.");

  if (statuses.moisture === "poor")
    tips.push("Improve irrigation scheduling to maintain moisture.");

  if (tips.length === 0)
    tips.push("Soil health is balanced. Maintain current practices.");

  return tips;
}
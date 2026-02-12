export type SoilStatus = "poor" | "moderate" | "healthy";

/**
 * Nitrogen evaluation (%)
 */
export function evaluateNitrogen(n: number): SoilStatus {
  if (n < 30) return "poor";
  if (n <= 60) return "moderate";
  return "healthy";
}

/**
 * Phosphorus evaluation (%)
 */
export function evaluatePhosphorus(p: number): SoilStatus {
  if (p < 20) return "poor";
  if (p <= 50) return "moderate";
  return "healthy";
}

/**
 * Potassium evaluation (%)
 */
export function evaluatePotassium(k: number): SoilStatus {
  if (k < 20) return "poor";
  if (k <= 50) return "moderate";
  return "healthy";
}

/**
 * pH evaluation
 */
export function evaluatePH(ph: number): SoilStatus {
  if (ph < 5.5 || ph > 8) return "poor";
  if (ph < 6 || ph > 7.5) return "moderate";
  return "healthy";
}

/**
 * Moisture evaluation (%)
 */
export function evaluateMoisture(m: number): SoilStatus {
  if (m < 30) return "poor";
  if (m <= 60) return "moderate";
  return "healthy";
}
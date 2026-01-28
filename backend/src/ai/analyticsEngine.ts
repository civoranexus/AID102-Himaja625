/**
 * Calculate variance of scores
 */
export function calculateVariance(scores: number[]): number {
  if (scores.length === 0) return 0;

  const mean =
    scores.reduce((sum, s) => sum + s, 0) / scores.length;

  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) /
    scores.length;

  return Number(variance.toFixed(2));
}

/**
 * Stability score (0–100)
 * Lower variance → higher stability
 */
export function calculateStabilityScore(scores: number[]): number {
  if (scores.length < 2) return 100;

  const variance = calculateVariance(scores);

  // Tunable scaling factor
  const stability = Math.max(0, 100 - variance);

  return Math.round(stability);
}
export function calculateStabilityScore(scores: number[]): number {
  if (scores.length < 2) return 100;

  const mean =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) /
    scores.length;

  return Math.max(0, Math.round(100 - variance));
}
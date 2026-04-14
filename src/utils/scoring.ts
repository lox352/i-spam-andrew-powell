import type { Challenge, ChallengeCompletion } from "../types";

export function calculatePoints(challenge: Challenge, count?: number): number {
  if (challenge.type === "variable") {
    return challenge.basePoints * (count ?? 0);
  }
  return challenge.basePoints;
}

export function calculateTotalScore(
  challenges: Record<string, ChallengeCompletion>
): number {
  return Object.values(challenges).reduce(
    (sum, c) => sum + (c.completed ? c.points : 0),
    0
  );
}

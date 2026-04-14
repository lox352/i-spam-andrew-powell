import type { Timestamp } from "firebase/firestore";

export interface Challenge {
  id: string;
  text: string;
  basePoints: number;
  type: "fixed" | "variable";
  unit?: string;
}

export interface ChallengeCompletion {
  completed: boolean;
  points: number;
  completedAt: Timestamp | null;
  count?: number;
}

export interface Player {
  id: string;
  name: string;
  createdAt: Timestamp;
  totalScore: number;
  challenges: Record<string, ChallengeCompletion>;
}

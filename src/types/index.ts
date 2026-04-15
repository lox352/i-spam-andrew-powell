import type { Timestamp } from "firebase/firestore";

export interface Challenge {
  id: string;
  text: string;
  basePoints: number;
  type: "fixed" | "variable" | "competition";
  unit?: string;
  winnerPoints?: number;
  info?: string;
}

export interface ChallengeCompletion {
  completed: boolean;
  points: number;
  completedAt: Timestamp | null;
  count?: number;
  note?: string;
  photoUrl?: string;
}

export interface Player {
  id: string;
  name: string;
  createdAt: Timestamp;
  totalScore: number;
  challenges: Record<string, ChallengeCompletion>;
}

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Player, ChallengeCompletion } from "../types";

const PLAYERS = "players";

export async function createPlayer(id: string, name: string): Promise<void> {
  await setDoc(doc(db, PLAYERS, id), {
    name,
    createdAt: serverTimestamp(),
    totalScore: 0,
    challenges: {},
  });
}

export async function getPlayer(id: string): Promise<Player | null> {
  const snap = await getDoc(doc(db, PLAYERS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Player;
}

export async function updatePlayerChallenge(
  playerId: string,
  challengeId: string,
  completion: ChallengeCompletion,
  totalScore: number
): Promise<void> {
  await updateDoc(doc(db, PLAYERS, playerId), {
    [`challenges.${challengeId}`]: completion,
    totalScore,
  });
}

export function subscribeToLeaderboard(
  callback: (players: Player[]) => void
): () => void {
  const q = query(
    collection(db, PLAYERS),
    orderBy("totalScore", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const players = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as Player
    );
    callback(players);
  });
}

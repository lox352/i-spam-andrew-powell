import { useState, useEffect } from "react";
import type { Player } from "../types";
import { subscribeToLeaderboard } from "../services/firestore";

export function useLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((updated) => {
      setPlayers(updated);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { players, loading };
}

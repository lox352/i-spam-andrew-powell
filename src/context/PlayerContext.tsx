import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Player } from "../types";
import { createPlayer, getPlayer } from "../services/firestore";

interface PlayerContextValue {
  player: Player | null;
  loading: boolean;
  register: (name: string) => Promise<void>;
  setPlayer: (player: Player) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

const STORAGE_KEY = "andrew-challenges-player-id";

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) {
      setLoading(false);
      return;
    }
    getPlayer(storedId)
      .then((p) => {
        if (p) setPlayer(p);
        else localStorage.removeItem(STORAGE_KEY);
      })
      .catch(() => localStorage.removeItem(STORAGE_KEY))
      .finally(() => setLoading(false));
  }, []);

  const register = useCallback(async (name: string) => {
    const id = crypto.randomUUID();
    await createPlayer(id, name);
    const p = await getPlayer(id);
    if (p) {
      localStorage.setItem(STORAGE_KEY, id);
      setPlayer(p);
    }
  }, []);

  return (
    <PlayerContext.Provider value={{ player, loading, register, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayerContext must be used within PlayerProvider");
  return ctx;
}

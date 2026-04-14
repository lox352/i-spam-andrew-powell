import { useLeaderboard } from "../hooks/useLeaderboard";
import { usePlayerContext } from "../context/PlayerContext";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const { players, loading } = useLeaderboard();
  const { player } = usePlayerContext();

  if (loading) {
    return <div className="leaderboard-loading">Loading scores...</div>;
  }

  if (players.length === 0) {
    return <div className="leaderboard-empty">No players yet. Be the first!</div>;
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-list">
        {players.map((p, i) => {
          const isMe = p.id === player?.id;
          return (
            <div
              key={p.id}
              className={`leaderboard-row ${isMe ? "is-me" : ""}`}
            >
              <span className="lb-rank">
                {i < 3 ? MEDALS[i] : `#${i + 1}`}
              </span>
              <span className="lb-name">
                {p.name}
                {isMe && <span className="lb-you"> (you)</span>}
              </span>
              <span className="lb-score">{p.totalScore} pts</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

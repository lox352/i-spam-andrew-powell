import { useLeaderboard } from "../hooks/useLeaderboard";
import { usePlayerContext } from "../context/PlayerContext";
import { challenges } from "../data/challenges";

const MEDALS = ["🥇", "🥈", "🥉"];

function getPendingWinnerPoints(playerChallenges: Record<string, { completed?: boolean }>): number {
  return challenges.reduce((sum, c) => {
    if (c.type === "competition" && c.winnerPoints && playerChallenges[c.id]?.completed) {
      return sum + c.winnerPoints;
    }
    return sum;
  }, 0);
}

export default function LeaderboardPage() {
  const { players, loading } = useLeaderboard();
  const { player } = usePlayerContext();

  if (loading) {
    return <div className="leaderboard-loading">Loading scores...</div>;
  }

  if (players.length === 0) {
    return <div className="leaderboard-empty">No players yet. Be the first!</div>;
  }

  const sorted = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-list">
        {sorted.map((p, i) => {
          const isMe = p.id === player?.id;
          const pending = getPendingWinnerPoints(p.challenges ?? {});
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
              <span className="lb-score">
                {pending > 0
                  ? `${p.totalScore} + up to ${pending} pts`
                  : `${p.totalScore} pts`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

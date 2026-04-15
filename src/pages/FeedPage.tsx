import { useMemo } from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { challenges } from "../data/challenges";
import type { Timestamp } from "firebase/firestore";

interface FeedItem {
  playerName: string;
  challengeText: string;
  note?: string;
  photoUrl?: string;
  completedAt: Timestamp;
}

function timeAgo(ts: Timestamp): string {
  const seconds = Math.floor((Date.now() - ts.toMillis()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const challengeMap = new Map(challenges.map((c) => [c.id, c.text]));

export default function FeedPage() {
  const { players, loading } = useLeaderboard();

  const feedItems = useMemo(() => {
    const items: FeedItem[] = [];
    for (const player of players) {
      for (const [challengeId, completion] of Object.entries(player.challenges)) {
        if (completion.completed && completion.completedAt) {
          items.push({
            playerName: player.name,
            challengeText: challengeMap.get(challengeId) ?? "Unknown challenge",
            note: completion.note,
            photoUrl: completion.photoUrl,
            completedAt: completion.completedAt,
          });
        }
      }
    }
    items.sort((a, b) => b.completedAt.toMillis() - a.completedAt.toMillis());
    return items;
  }, [players]);

  if (loading) {
    return <div className="feed-loading">Loading feed...</div>;
  }

  if (feedItems.length === 0) {
    return <div className="feed-empty">No completions yet. Get out there!</div>;
  }

  return (
    <div className="feed-page">
      <div className="feed-list">
        {feedItems.map((item, i) => (
          <div className="feed-item" key={i}>
            <div className="feed-item-header">
              <span className="feed-player">{item.playerName}</span>
              <span className="feed-time">{timeAgo(item.completedAt)}</span>
            </div>
            <div className="feed-challenge">{item.challengeText}</div>
            {item.note && <div className="feed-note">"{item.note}"</div>}
            {item.photoUrl && (
              <img
                src={item.photoUrl}
                alt="Challenge photo"
                className="feed-photo"
                onClick={() => window.open(item.photoUrl, "_blank")}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

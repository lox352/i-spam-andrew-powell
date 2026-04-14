import { useChallenges } from "../hooks/useChallenges";

export default function PlayerScoreBanner() {
  const { totalScore } = useChallenges();

  return (
    <div className="score-banner">
      Your score: <strong>{totalScore} pts</strong>
    </div>
  );
}

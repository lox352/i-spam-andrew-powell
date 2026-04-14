import type { Challenge, ChallengeCompletion } from "../types";
import VariableInput from "./VariableInput";

interface ChallengeCardProps {
  challenge: Challenge;
  completion?: ChallengeCompletion;
  onToggle: (id: string) => void;
  onVariableChange: (id: string, count: number) => void;
}

export default function ChallengeCard({
  challenge,
  completion,
  onToggle,
  onVariableChange,
}: ChallengeCardProps) {
  const isCompleted = completion?.completed ?? false;
  const points = completion?.points ?? 0;

  return (
    <div
      className={`challenge-card ${isCompleted ? "completed" : ""}`}
      onClick={() => {
        if (challenge.type === "fixed") onToggle(challenge.id);
      }}
      role={challenge.type === "fixed" ? "button" : undefined}
      tabIndex={challenge.type === "fixed" ? 0 : undefined}
      onKeyDown={(e) => {
        if (challenge.type === "fixed" && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onToggle(challenge.id);
        }
      }}
    >
      <div className="card-top">
        <span className="card-check">{isCompleted ? "✅" : "⬜"}</span>
        <span className="card-text">{challenge.text}</span>
        <span className="card-points">
          {challenge.type === "fixed"
            ? `${challenge.basePoints} pts`
            : `${points} pts`}
        </span>
      </div>
      {challenge.type === "variable" && (
        <VariableInput
          count={completion?.count ?? 0}
          unit={challenge.unit ?? "item"}
          onChange={(count) => onVariableChange(challenge.id, count)}
        />
      )}
    </div>
  );
}

import { useChallenges } from "../hooks/useChallenges";
import ChallengeCard from "../components/ChallengeCard";
import ConfettiOverlay from "../components/ConfettiOverlay";

export default function ChallengesPage() {
  const { challenges, completions, toggleFixed, setVariableCount, setNote, uploadPhoto } = useChallenges();

  const sortedChallenges = [...challenges].sort((a, b) => a.basePoints - b.basePoints);

  const hasAnyCompletion = Object.values(completions).some((c) => c.completed);

  return (
    <div className="challenges-page">
      <ConfettiOverlay trigger={hasAnyCompletion} />
      <div className="challenge-list">
        {sortedChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            completion={completions[challenge.id]}
            onToggle={toggleFixed}
            onVariableChange={setVariableCount}
            onNoteChange={setNote}
            onPhotoUpload={uploadPhoto}
          />
        ))}
      </div>
    </div>
  );
}

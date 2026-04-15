import { useRef } from "react";
import type { Challenge, ChallengeCompletion } from "../types";
import VariableInput from "./VariableInput";

interface ChallengeCardProps {
  challenge: Challenge;
  completion?: ChallengeCompletion;
  onToggle: (id: string) => void;
  onVariableChange: (id: string, count: number) => void;
  onNoteChange?: (id: string, note: string) => void;
  onPhotoUpload?: (id: string, file: File) => void;
}

export default function ChallengeCard({
  challenge,
  completion,
  onToggle,
  onVariableChange,
  onNoteChange,
  onPhotoUpload,
}: ChallengeCardProps) {
  const isCompleted = completion?.completed ?? false;
  const points = completion?.points ?? 0;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      {isCompleted && (
        <div className="card-extras" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <div className="note-row">
            {onNoteChange && (
              <input
                type="text"
                className="note-input"
                placeholder="Add a note..."
                value={completion?.note ?? ""}
                onChange={(e) => onNoteChange(challenge.id, e.target.value)}
              />
            )}
            {onPhotoUpload && (
              <>
                <button
                  className="photo-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload photo"
                  type="button"
                >
                  📷
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onPhotoUpload(challenge.id, file);
                    e.target.value = "";
                  }}
                />
              </>
            )}
          </div>
          {completion?.photoUrl && (
            <img
              src={completion.photoUrl}
              alt="Challenge photo"
              className="card-photo-thumbnail"
              onClick={() => window.open(completion.photoUrl, "_blank")}
            />
          )}
        </div>
      )}
    </div>
  );
}

import { useRef, useState } from "react";
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
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={`challenge-card ${isCompleted ? "completed" : ""}`}
      onClick={() => {
        if (challenge.type === "fixed" || challenge.type === "competition") onToggle(challenge.id);
      }}
      role={challenge.type === "fixed" || challenge.type === "competition" ? "button" : undefined}
      tabIndex={challenge.type === "fixed" || challenge.type === "competition" ? 0 : undefined}
      onKeyDown={(e) => {
        if ((challenge.type === "fixed" || challenge.type === "competition") && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onToggle(challenge.id);
        }
      }}
    >
      <div className="card-top">
        <span className="card-check">{isCompleted ? "✅" : "⬜"}</span>
        <span className="card-text">{challenge.text}</span>
        <div className="card-badge-col">
          <span className="card-points">
            {challenge.type === "competition"
              ? `${challenge.basePoints} + up to ${challenge.winnerPoints} pts`
              : challenge.type === "fixed"
              ? `${challenge.basePoints} pts`
              : `${points} pts`}
          </span>
          {challenge.info && (
            <button
              type="button"
              className="card-info-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo((v) => !v);
              }}
              aria-label="More info"
            >
              i
            </button>
          )}
        </div>
      </div>
      {showInfo && challenge.info && (
        <div className="card-info" onClick={(e) => e.stopPropagation()}>
          {challenge.info}
        </div>
      )}
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
                placeholder={challenge.type === "competition" ? "Describe your placement or upload a photo..." : "Add a note..."}
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

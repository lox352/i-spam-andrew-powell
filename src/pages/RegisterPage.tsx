import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerContext } from "../context/PlayerContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register } = usePlayerContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSubmitting(true);
    setError("");
    try {
      await register(trimmed);
      navigate("/challenges", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>
          <span className="title-main">Powell Play</span>
          <span className="title-sub">🎂 The Birthday Trials 🎉</span>
        </h1>
        <div className="register-info">
          <p><strong>How to play:</strong> Complete challenges throughout the day to earn points. Tap a challenge to mark it done, add a note or photo as proof, and climb the leaderboard.</p>
          <p><strong>When:</strong> Today only! All challenges must be completed by end of day.</p>
          <p><strong>Prizes:</strong> Top scorers may win something from the prize box (if Andrew is gracious enough) and the legendary Voldemort Candrew.</p>
        </div>
        <p>Enter your name to start competing!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            autoFocus
            disabled={submitting}
          />
          <button type="submit" disabled={!name.trim() || submitting}>
            {submitting ? "Joining..." : "Let's Go!"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

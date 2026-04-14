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
        <h1>🎉 Andrew's Birthday Challenges</h1>
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

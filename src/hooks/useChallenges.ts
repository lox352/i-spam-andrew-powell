import { useState, useCallback, useRef, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { challenges } from "../data/challenges";
import { calculatePoints, calculateTotalScore } from "../utils/scoring";
import { updatePlayerChallenge } from "../services/firestore";
import { uploadChallengePhoto } from "../services/storage";
import { usePlayerContext } from "../context/PlayerContext";
import type { ChallengeCompletion } from "../types";

export function useChallenges() {
  const { player, setPlayer } = usePlayerContext();
  const [completions, setCompletions] = useState<Record<string, ChallengeCompletion>>(
    () => player?.challenges ?? {}
  );
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Sync completions when player loads/changes
  useEffect(() => {
    if (player?.challenges) {
      setCompletions(player.challenges);
    }
  }, [player]);

  const writeToFirestore = useCallback(
    (challengeId: string, completion: ChallengeCompletion, allCompletions: Record<string, ChallengeCompletion>) => {
      if (!player) return;
      const totalScore = calculateTotalScore(allCompletions);
      updatePlayerChallenge(player.id, challengeId, completion, totalScore).then(() => {
        setPlayer({ ...player, challenges: allCompletions, totalScore });
      });
    },
    [player, setPlayer]
  );

  const toggleFixed = useCallback(
    (challengeId: string) => {
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge || (challenge.type !== "fixed" && challenge.type !== "competition")) return;

      setCompletions((prev) => {
        const current = prev[challengeId];
        const nowCompleted = !current?.completed;
        const completion: ChallengeCompletion = {
          completed: nowCompleted,
          points: nowCompleted ? challenge.basePoints : 0,
          completedAt: nowCompleted ? Timestamp.now() : null,
        };
        const next = { ...prev, [challengeId]: completion };
        writeToFirestore(challengeId, completion, next);
        return next;
      });
    },
    [writeToFirestore]
  );

  const setVariableCount = useCallback(
    (challengeId: string, count: number) => {
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge || challenge.type !== "variable") return;

      const safeCount = Math.max(0, count);
      const points = calculatePoints(challenge, safeCount);
      const completion: ChallengeCompletion = {
        completed: safeCount > 0,
        points,
        completedAt: safeCount > 0 ? Timestamp.now() : null,
        count: safeCount,
      };

      setCompletions((prev) => {
        const next = { ...prev, [challengeId]: completion };

        // Debounce the Firestore write
        if (debounceTimers.current[challengeId]) {
          clearTimeout(debounceTimers.current[challengeId]);
        }
        debounceTimers.current[challengeId] = setTimeout(() => {
          writeToFirestore(challengeId, completion, next);
        }, 300);

        return next;
      });
    },
    [writeToFirestore]
  );

  const setNote = useCallback(
    (challengeId: string, note: string) => {
      setCompletions((prev) => {
        const current = prev[challengeId];
        if (!current?.completed) return prev;
        const completion: ChallengeCompletion = { ...current, note: note || undefined };
        const next = { ...prev, [challengeId]: completion };

        if (debounceTimers.current[`note-${challengeId}`]) {
          clearTimeout(debounceTimers.current[`note-${challengeId}`]);
        }
        debounceTimers.current[`note-${challengeId}`] = setTimeout(() => {
          writeToFirestore(challengeId, completion, next);
        }, 500);

        return next;
      });
    },
    [writeToFirestore]
  );

  const uploadPhoto = useCallback(
    async (challengeId: string, file: File) => {
      if (!player) return;
      const current = completions[challengeId];
      if (!current?.completed) return;

      const photoUrl = await uploadChallengePhoto(player.id, challengeId, file);
      const completion: ChallengeCompletion = { ...current, photoUrl };
      const next = { ...completions, [challengeId]: completion };
      setCompletions(next);
      writeToFirestore(challengeId, completion, next);
    },
    [player, completions, writeToFirestore]
  );

  const totalScore = calculateTotalScore(completions);

  return {
    challenges,
    completions,
    totalScore,
    toggleFixed,
    setVariableCount,
    setNote,
    uploadPhoto,
  };
}

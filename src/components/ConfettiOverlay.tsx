import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiOverlayProps {
  trigger: boolean;
}

export default function ConfettiOverlay({ trigger }: ConfettiOverlayProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (trigger && !hasFired.current) {
      hasFired.current = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff922b"],
      });
    }
  }, [trigger]);

  return null;
}

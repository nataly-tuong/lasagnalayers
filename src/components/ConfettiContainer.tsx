import Confetti from "react-confetti";
import type { JSX } from "react";

export default function ConfettiContainer({
  isGameWon,
}: {
  isGameWon: boolean;
}): JSX.Element | null {
  if (!isGameWon) {
    return null;
  } else {
    return (
      <>
        {isGameWon && (
          <Confetti
            recycle={false}
            numberOfPieces={1000}
            colors={["#D7263D", "#FFE9A8", "#F4C95D", "#3E7C3A", "#FFF5E1"]}
          />
        )}
      </>
    );
  }
}

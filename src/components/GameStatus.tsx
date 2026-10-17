import { clsx } from "clsx";
import { languages } from "../languages";
import { getFarewellText } from "../utils";
import type { JSX } from "react";

type GameStatusProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  isGameOver: boolean;
  isLastGuessIncorrect: boolean;
  wrongGuessCount: number;
};

export default function GameStatus({
  isGameWon,
  isGameLost,
  isGameOver,
  isLastGuessIncorrect,
  wrongGuessCount,
}: GameStatusProps): JSX.Element {
  const isFarewell = !isGameOver && isLastGuessIncorrect;

  const gameStatusClass: string = clsx(
    "flex flex-col items-center justify-center w-full max-w-87.5 min-h-15 mt-9 mb-6 rounded text-[#F9F4DA] text-center",
    {
      "bg-correct": isGameWon,
      "bg-wrong": isGameLost,
      "bg-[#8C4A2F] border border-dashed border-[#F9F4DA] italic font-bold":
        isFarewell,
    },
  );

  function renderGameStatus() {
    if (isFarewell) {
      return (
        <p className="m-0">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2 className="text-[1.25rem] font-bold m-0">Perfect bake!</h2>
          <p className="m-0">Nonna would be proud 🍝</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2 className="text-[1.25rem] font-bold m-0">Burnt to a crisp!</h2>
          <p className="m-0">
            Nothing left but the pan. Time to preheat again 🔥
          </p>
        </>
      );
    }

    return null;
  }

  return (
    <section aria-live="polite" role="status" className={gameStatusClass}>
      {renderGameStatus()}
    </section>
  );
}

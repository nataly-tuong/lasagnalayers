import type { JSX } from "react";

type NewGameButtonProps = {
  isGameOver: boolean;
  startNewGame: () => void;
};

export default function NewGameButton({
  isGameOver,
  startNewGame,
}: NewGameButtonProps): JSX.Element | null {
  if (!isGameOver) return null;

  return (
    <button
      onClick={startNewGame}
      className="mt-6 h-10 w-56.25 bg-[#11B5E5] border border-[#D7D7D7] rounded-sm cursor-pointer text-[#262626]"
    >
      New Game
    </button>
  );
}

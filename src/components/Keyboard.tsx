import { clsx } from "clsx";
import type { JSX } from "react";

type KeyboardProps = {
  currentWord: string;
  guessedLetters: string[];
  isGameOver: boolean;
  addGuessedLetter: (letter: string) => void;
};

export default function Keyboard({
  currentWord,
  guessedLetters,
  isGameOver,
  addGuessedLetter,
}: KeyboardProps): JSX.Element {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const keyboardElements: JSX.Element[] = alphabet
    .split("")
    .map((letter: string): JSX.Element => {
      const isGuessed: boolean = guessedLetters.includes(letter);
      const isCorrect: boolean = isGuessed && currentWord.includes(letter);
      const isWrong: boolean = isGuessed && !currentWord.includes(letter);
      const className: string = clsx(
        "h-8.75 w-8.75 disabled:opacity-50 border border-[#D7D7D7] rounded-[3px] cursor-pointer text-[#262626]",
        {
          "bg-[#FCBA29]": !isGuessed,
          "bg-correct": isCorrect,
          "bg-wrong": isWrong,
        },
      );

      return (
        <button
          disabled={isGameOver}
          onClick={() => addGuessedLetter(letter)}
          aria-disabled={guessedLetters.includes(letter)}
          aria-label={`Letter ${letter}`}
          className={className}
          key={letter}
        >
          {letter.toUpperCase()}
        </button>
      );
    });

  return (
    <section className="flex mt-5 flex-wrap gap-2 justify-center max-w-112.5">
      {keyboardElements}
    </section>
  );
}

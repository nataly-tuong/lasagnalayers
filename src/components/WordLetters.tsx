import { clsx } from "clsx";
import type { JSX } from "react";

type WordLettersProps = {
  currentWord: string;
  guessedLetters: string[];
  isGameLost: boolean;
};

export default function WordLetters({
  currentWord,
  guessedLetters,
  isGameLost,
}: WordLettersProps): JSX.Element {
  const letterElements = currentWord
    .split("")
    .map((letter: string, index: number): JSX.Element => {
      const shouldRevealLetter: boolean =
        isGameLost || guessedLetters.includes(letter);

      const letterClassName: string = clsx(
        "h-10 w-10 bg-[#3A2418] flex justify-center items-center text-[1.125rem] border-b border-[#F9F4DA]",
        isGameLost && !guessedLetters.includes(letter) && "text-[#EC5D49]",
      );

      return (
        <span key={index} className={letterClassName}>
          {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
      );
    });

  return (
    <section className="flex mt-5 justify-center gap-0.5">
      {letterElements}
    </section>
  );
}

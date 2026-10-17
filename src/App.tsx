import { useState } from "react";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getRandomWord } from "./utils";
import Header from "./components/Header";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";

export default function App() {
  const maxGuesses = languages.length - 1;
  const [currentWord, setCurrentWord] = useState<string>((): string =>
    getRandomWord(),
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuessCount: number = guessedLetters.filter(
    (letter: string): boolean => !currentWord.includes(letter),
  ).length;
  const guessesLeft: number = maxGuesses - wrongGuessCount;
  const isGameWon: boolean = currentWord
    .split("")
    .every((letter: string): boolean => guessedLetters.includes(letter));
  const isGameLost: boolean = wrongGuessCount >= maxGuesses;
  const isGameOver: boolean = isGameWon || isGameLost;

  const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect: boolean = Boolean(
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter),
  );

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevLetters: string[]): string[] =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  function startNewGame(): void {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const className = clsx(
      "relative rounded-[3px] p-[4.5px]",
      isLanguageLost &&
        "before:content-['🍴'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-[0.85rem] before:bg-black/70",
    );

    return (
      <span key={lang.name} className={className} style={styles}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);

    const letterClassName = clsx(
      "h-10 w-10 bg-[#3A2418] flex justify-center items-center text-[1.125rem] border-b border-[#F9F4DA]",
      isGameLost && !guessedLetters.includes(letter) && "text-[#EC5D49]",
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx(
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
    <main className="flex flex-col items-center min-h-screen p-5 bg-[#2B1810] text-[#d9d9d9]">
      <ConfettiContainer isGameWon={isGameWon} />

      <Header />

      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
      />

      <section className="flex text-wrap gap-1.25 justify-center max-w-87.5">
        {languageElements}
      </section>

      {!isGameOver && (
        <p className="mt-3 text-[0.875rem] text-[#A89684]">
          {guessesLeft} {guessesLeft === 1 ? "slice" : "slices"} left
        </p>
      )}

      <section className="flex mt-5 justify-center gap-0.5">
        {letterElements}
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {lastGuessedLetter &&
            (currentWord.includes(lastGuessedLetter)
              ? `Correct! The letter ${lastGuessedLetter} is in the word. `
              : `Sorry, the letter ${lastGuessedLetter} is not in the word. `)}
          You have {guessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter : "blank.",
            )
            .join(" ")}
        </p>
      </section>

      <section className="flex mt-5 flex-wrap gap-2 justify-center max-w-112.5">
        {keyboardElements}
      </section>

      {isGameOver && (
        <button
          onClick={startNewGame}
          className="mt-6 h-10 w-56.25 bg-[#11B5E5] border border-[#D7D7D7] rounded-sm cursor-pointer text-[#262626]"
        >
          New Game
        </button>
      )}
    </main>
  );
}

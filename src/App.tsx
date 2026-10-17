import { useState } from "react";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getRandomWord } from "./utils";
import Header from "./components/Header";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";
import AriaLiveStatus from "./components/AriaLiveStatus";
import LanguageChips from "./components/LanguageChips";
import WordLetters from "./components/WordLetters";
import NewGameButton from "./components/NewGameButton";

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

      <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />

      {!isGameOver && (
        <p className="mt-3 text-[0.875rem] text-[#A89684]">
          {guessesLeft} {guessesLeft === 1 ? "slice" : "slices"} left
        </p>
      )}

      <WordLetters
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />

      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessedLetter={lastGuessedLetter}
        guessedLetters={guessedLetters}
        guessesLeft={guessesLeft}
      />

      <section className="flex mt-5 flex-wrap gap-2 justify-center max-w-112.5">
        {keyboardElements}
      </section>

      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}

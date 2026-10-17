import { useState } from "react";
import { languages } from "./languages";
import { getRandomWord } from "./utils";
import Header from "./components/Header";
import ConfettiContainer from "./components/ConfettiContainer";
import GameStatus from "./components/GameStatus";
import AriaLiveStatus from "./components/AriaLiveStatus";
import LanguageChips from "./components/LanguageChips";
import WordLetters from "./components/WordLetters";
import Keyboard from "./components/Keyboard";
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

  function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevLetters: string[]): string[] =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  function startNewGame(): void {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

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

      <Keyboard
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameOver={isGameOver}
        addGuessedLetter={addGuessedLetter}
      />

      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}

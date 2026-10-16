import { useState } from "react";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getFarewellText } from "./utils";

export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = Boolean(
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter),
  );
  const isFarewell = !isGameOver && isLastGuessIncorrect;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
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
        "before:content-['💀'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-[0.85rem] before:bg-black/70",
    );

    return (
      <span key={lang.name} className={className} style={styles}>
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      className="h-10 w-10 bg-[#323232] flex justify-center items-center text-[1.125rem] border-b border-[#F9F4DA]"
    >
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ));

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx(
      "h-8.75 w-8.75 border border-[#D7D7D7] rounded-[3px] cursor-pointer text-[#262626]",
      {
        "bg-[#FCBA29]": !isGuessed,
        "bg-correct": isCorrect,
        "bg-wrong": isWrong,
      },
    );

    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        className={className}
        key="{letter}}"
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx(
    "flex flex-col items-center justify-center w-full max-w-87.5 min-h-15 mt-9 mb-6 rounded text-[#F9F4DA] text-center",
    {
      "bg-correct": isGameWon,
      "bg-wrong": isGameLost,
      "bg-[#7A5EA7] border border-dashed border-[#323232] italic font-bold":
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
          <h2 className="text-[1.25rem] font-bold m-0">You win!</h2>
          <p className="m-0">Well done 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2 className="text-[1.25rem] font-bold m-0">Game over!</h2>
          <p className="m-0">You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-[#262626] text-[#d9d9d9]">
      <header className="text-center">
        <h1 className="text-[1.25rem] font-bold text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-[0.875rem] max-w-87.5 mx-auto text-[#8E8E8E]">
          Guess the word within 8 attempts to keep the programming word safe
          from Assembly!
        </p>
      </header>

      <section className={gameStatusClass}>{renderGameStatus()}</section>

      <section className="flex text-wrap gap-1.25 justify-center max-w-87.5">
        {languageElements}
      </section>
      <section className="flex mt-5 justify-center gap-0.5">
        {letterElements}
      </section>
      <section className="flex mt-5 flex-wrap gap-2 justify-center max-w-112.5">
        {keyboardElements}
      </section>
      {isGameOver && (
        <button className="mt-6 h-10 w-56.25 bg-[#11B5E5] border border-[#D7D7D7] rounded-sm cursor-pointer text-[#262626]">
          New Game
        </button>
      )}
    </main>
  );
}

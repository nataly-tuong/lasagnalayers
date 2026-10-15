import { languages } from "./languages";

export default function App() {
  const languageElements = languages.map((lang) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    return (
      <span key={lang.name} className="rounded-[3px] p-[4.5px]" style={styles}>
        {lang.name}
      </span>
    );
  });

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
      <section className="flex flex-col mb-6 items-center justify-center w-full max-w-87.5 min-h-15 mt-9 rounded bg-[#10A95B] text-[#F9F4DA] text-center">
        <h2 className="text-[1.25rem] font-bold m-0">You win!</h2>
        <p className="m-0">Well done 🎉</p>
      </section>
      <section className="flex text-wrap gap-1.25 justify-center max-w-[350px]">
        {languageElements}
      </section>
    </main>
  );
}

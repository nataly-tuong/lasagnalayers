import type { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className="text-center">
      <h1 className="text-[1.25rem] font-bold text-[#F9F4DA]">
        Lasagna Layers
      </h1>
      <p className="text-[0.875rem] max-w-87.5 mx-auto text-[#A89684]">
        Guess the word within 8 attempts to keep the last layer safe from hungry
        hands!
      </p>
    </header>
  );
}

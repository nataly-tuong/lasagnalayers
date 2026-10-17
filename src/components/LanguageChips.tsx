import { clsx } from "clsx";
import type { JSX } from "react";
import type { Language } from "../languages";

type LanguageChipProps = {
  languages: Language[];
  wrongGuessCount: number;
};

export default function LanguageChips({
  languages,
  wrongGuessCount,
}: LanguageChipProps): JSX.Element {
  const languageElements: JSX.Element[] = languages.map(
    (lang: Language, index: number): JSX.Element => {
      const isLanguageLost: boolean = index < wrongGuessCount;
      const styles: Omit<Language, "name"> = {
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      };

      const className: string = clsx(
        "relative rounded-[3px] p-[4.5px]",
        isLanguageLost &&
          "before:content-['🍴'] before:absolute before:inset-0 before:flex before:items-center before:justify-center before:text-[0.85rem] before:bg-black/70",
      );

      return (
        <span key={lang.name} className={className} style={styles}>
          {lang.name}
        </span>
      );
    },
  );

  return (
    <section className="flex text-wrap gap-1.25 justify-center max-w-87.5">
      {languageElements}
    </section>
  );
}

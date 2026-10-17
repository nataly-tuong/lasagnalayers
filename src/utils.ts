import { words } from "./words";

function getRandomIndex(arr: string[]): number {
  return Math.floor(Math.random() * arr.length);
}

export function getRandomWord(): string {
  return words[getRandomIndex(words)];
}

export function getFarewellText(layer: string): string {
  const options: string[] = [
    `Goodbye, ${layer}. You were the best part.`,
    `Someone just ate the ${layer}.`,
    `${layer} has left the pan.`,
    `Oh no, not the ${layer}!`,
    `RIP ${layer}, gone but not forgotten.`,
    `The ${layer} was delicious. Too bad it's gone.`,
    `${layer} didn't survive the dinner rush.`,
    `Who took the ${layer}?!`,
  ];

  return words[getRandomIndex(options)];
}

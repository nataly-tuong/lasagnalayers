import { words } from "./words";

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function getFarewellText(layer) {
  const options = [
    `Goodbye, ${layer}. You were the best part.`,
    `Someone just ate the ${layer}.`,
    `${layer} has left the pan.`,
    `Oh no, not the ${layer}!`,
    `RIP ${layer}, gone but not forgotten.`,
    `The ${layer} was delicious. Too bad it's gone.`,
    `${layer} didn't survive the dinner rush.`,
    `Who took the ${layer}?!`,
  ];
  return options[Math.floor(Math.random() * options.length)];
}

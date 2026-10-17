import { words } from "./words";

export function getRandomWord(): string {
  const randomIndex:number = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function getFarewellText(layer:string):string {
  const options:string[] = [
    `Goodbye, ${layer}. You were the best part.`,
    `Someone just ate the ${layer}.`,
    `${layer} has left the pan.`,
    `Oh no, not the ${layer}!`,
    `RIP ${layer}, gone but not forgotten.`,
    `The ${layer} was delicious. Too bad it's gone.`,
    `${layer} didn't survive the dinner rush.`,
    `Who took the ${layer}?!`,
  ];
  
  const randomIndex:number = Math.floor(Math.random() * options.length));
  return options[randomIndex];
}

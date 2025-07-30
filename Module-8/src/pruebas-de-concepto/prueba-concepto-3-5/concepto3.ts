import { tablero, type Carta } from "../memoria-data";
import { shuffleArray } from "../prueba-concepto-1/concepto1";
import { createFullCard } from "../prueba-concepto-2/concepto2";

export const getImgUrl = (card: number) => {
  return `https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/${card}.png?raw=true`;
};

export const createGrid = (
  parent: HTMLElement,
  cardList: Carta[]
): HTMLElement[] => {
  return cardList.map((element) => {
    return createFullCard(parent, element);
  });
};

export const mainConcept3 = () => {
  const conceptThreeDiv = document.getElementById("concept-three-div");
  const cardList = shuffleArray(tablero.cartas);
  if (conceptThreeDiv instanceof HTMLElement) {
    createGrid(conceptThreeDiv, cardList);
  }
};

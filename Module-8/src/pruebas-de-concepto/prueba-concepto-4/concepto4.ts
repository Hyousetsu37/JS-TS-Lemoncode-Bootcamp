import { tablero } from "../memoria-data";
import { createFullCard } from "../prueba-concepto-2/concepto2";

export const mainConcept4 = () => {
  const conceptFourDiv = document.getElementById("concept-four-div");
  if (conceptFourDiv instanceof HTMLElement) {
    createFullCard(conceptFourDiv, tablero.cartas[0]);
    createFullCard(conceptFourDiv, tablero.cartas[2]);
  }
};

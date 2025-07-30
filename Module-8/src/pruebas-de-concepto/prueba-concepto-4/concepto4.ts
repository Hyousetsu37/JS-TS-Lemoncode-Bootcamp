import { createFullCard } from "../prueba-concepto-2/concepto2";
import { getImgUrl } from "../prueba-concepto-3/concepto3";

export const mainConcept4 = () => {
  const conceptFourDiv = document.getElementById("concept-four-div");
  if (conceptFourDiv instanceof HTMLElement) {
    createFullCard(conceptFourDiv, getImgUrl(2));
    createFullCard(conceptFourDiv, getImgUrl(5));
  }
};

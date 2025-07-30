import "../style.css";
import { mainConcept1 } from "./prueba-concepto-1/concepto1";
import { mainConcept2 } from "./prueba-concepto-2/concepto2";
import { mainConcept3 } from "./prueba-concepto-3-5/concepto3";
import { mainConcept4 } from "./prueba-concepto-4/concepto4";

const conceptOne = document.getElementById("concept-one");
const conceptTwo = document.getElementById("concept-two");
const conceptThree = document.getElementById("concept-three");
const conceptFour = document.getElementById("concept-four");

document.addEventListener("DOMContentLoaded", () => {
  if (conceptOne instanceof HTMLButtonElement) {
    conceptOne.addEventListener("click", mainConcept1);
  }
  if (conceptTwo instanceof HTMLButtonElement) {
    conceptTwo.addEventListener("click", () => {
      mainConcept2();
      conceptTwo.disabled = true;
    });
  }
  if (conceptThree instanceof HTMLButtonElement) {
    conceptThree.addEventListener("click", () => {
      mainConcept3();
      conceptThree.disabled = true;
    });
  }
  if (conceptFour instanceof HTMLButtonElement) {
    conceptFour.addEventListener("click", () => {
      mainConcept4();
      conceptFour.disabled = true;
    });
  }
});

import "../style.css";
import { mainConcept1 } from "./prueba-concepto-1/concepto1";
import { mainConcept2 } from "./prueba-concepto-2/concepto2";

const conceptOne = document.getElementById("concept-one");

document.addEventListener("DOMContentLoaded", () => {
  if (conceptOne instanceof HTMLButtonElement) {
    conceptOne.addEventListener("click", mainConcept1);
  }
});

const conceptTwo = document.getElementById("concept-two");

document.addEventListener("DOMContentLoaded", () => {
  if (conceptTwo instanceof HTMLButtonElement) {
    conceptTwo.addEventListener("click", () => {
      mainConcept2();
      conceptTwo.disabled = true;
    });
  }
});

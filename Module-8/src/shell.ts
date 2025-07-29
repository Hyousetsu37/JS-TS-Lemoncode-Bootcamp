import { mainArray } from "./Array-methods";
import { mainBucle } from "./bucles";

const arrayButton = document.getElementById("array-button");
const bucleButton = document.getElementById("bucle-button");

document.addEventListener("DOMContentLoaded", () => {
  if (arrayButton instanceof HTMLButtonElement) {
    arrayButton.addEventListener("click", mainArray);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  if (bucleButton instanceof HTMLButtonElement) {
    bucleButton.addEventListener("click", mainBucle);
  }
});

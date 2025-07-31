import { tablero } from "./model";
import { shuffleArray } from "./motor";
import "./styles.css";
import { createGrid } from "./ui";

const startGameButton = document.getElementById("start-game");

document.addEventListener("DOMContentLoaded", () => {
  const parentDiv = document.getElementById("memory-div");
  const shuffledCards = shuffleArray(tablero.cartas);

  if (parentDiv) {
    createGrid(parentDiv, shuffledCards);
  }

  if (startGameButton instanceof HTMLButtonElement) {
    startGameButton.addEventListener("click", () => {
      console.log("start game");
    });
  }
});

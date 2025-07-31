import { tablero } from "./model";
import { iniciaPartida } from "./motor";
import "./styles.css";
import { createGrid } from "./ui";

const startGameButton = document.getElementById("start-game");

document.addEventListener("DOMContentLoaded", () => {
  const parentDiv = document.getElementById("memory-div");

  if (startGameButton instanceof HTMLButtonElement) {
    startGameButton.addEventListener("click", () => {
      iniciaPartida(tablero);
      if (parentDiv) {
        createGrid(parentDiv, tablero.cartas);
      }
      console.log("start game");
    });
  }
});

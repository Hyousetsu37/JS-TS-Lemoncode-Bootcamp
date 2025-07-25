import {
  askButtonHandler,
  stayButtonHandler,
  afterButtonHandler,
  resetButtonHandler,
  askCardButton,
  stayButton,
  resetButton,
  afterButton,
  renderGame,
} from "./ui";

//Inicializamos
//Invocar cuando el Dom este listo
document.addEventListener("DOMContentLoaded", () => {
  if (askCardButton instanceof HTMLButtonElement) {
    askCardButton.addEventListener("click", askButtonHandler);
  }
  if (stayButton instanceof HTMLButtonElement) {
    stayButton?.addEventListener("click", stayButtonHandler);
  }
  if (resetButton instanceof HTMLButtonElement) {
    resetButton?.addEventListener("click", resetButtonHandler);
  }
  if (afterButton instanceof HTMLButtonElement) {
    afterButton?.addEventListener("click", afterButtonHandler);
  }

  // Pintamos el estado inicial del juego al cargar la pagina
  renderGame();
});

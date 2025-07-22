import { game } from "./model";
import { dameCarta, evalGameStatus } from "./motor";

const scoreText = document.getElementById("texto-score");
export const askCardButton = document.getElementById("pedir-carta");
export const stayButton = document.getElementById("plantarse");
export const resetButton = document.getElementById("reset");
const displayImage = document.getElementById("carta-para-mostrar");
export const afterButton = document.getElementById("que-habria-pasado");
const resultDisplay = document.getElementById("result-display");
const hubieraDisplay = document.getElementById("hubiera-display");

export const setScore = (score: number): number => {
  return (game.currentScore = score);
};

export const muestraPuntuacion = () => {
  const scoreDisplay = document.getElementById("puntuacion-actual");
  if (scoreDisplay && scoreDisplay instanceof HTMLElement) {
    scoreDisplay.innerHTML = game.currentScore.toString();
  }
};

export const mostrarCarta = (card: number): void => {
  let cardToShow = "";
  switch (card) {
    case 1:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10: // Sota de copas
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11: // Caballo de copas
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12: // Rey de copas
      cardToShow =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      cardToShow = ""; // Or a fallback image
  }
  if (displayImage && displayImage instanceof HTMLImageElement) {
    displayImage.src = cardToShow;
  }
};

export const gameOver = (result: string): void => {
  if (
    askCardButton &&
    stayButton &&
    askCardButton instanceof HTMLButtonElement &&
    stayButton instanceof HTMLButtonElement
  ) {
    askCardButton.disabled = true;
    stayButton.disabled = true;
  }
  if (scoreText && resultDisplay) {
    scoreText.innerHTML = `Puntuación final: <span id="puntuacion-actual">${game.currentScore}</span>`;
    resultDisplay.innerHTML = result;
    resultDisplay.style = "display:block;";
  }
};

export const resetGame = () => {
  game.currentScore = 0;
  if (displayImage instanceof HTMLImageElement) {
    displayImage.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  if (scoreText && hubieraDisplay && resultDisplay) {
    scoreText.innerHTML = `Su puntuación actual es:
            <span id="puntuacion-actual"></span>`;
    resultDisplay.innerHTML = "";
    resultDisplay.style = "display:none;";
    hubieraDisplay.innerHTML = "";
    hubieraDisplay.style = "display:none;";
  }
  if (
    askCardButton instanceof HTMLButtonElement &&
    stayButton instanceof HTMLButtonElement &&
    afterButton instanceof HTMLButtonElement
  ) {
    askCardButton.disabled = false;
    stayButton.disabled = false;
    afterButton.disabled = false;
    afterButton.style = "display:none;";
  }
};

export const askButtonHandler = () => {
  const currentCard = dameCarta();
  mostrarCarta(currentCard);
  game.currentScore += currentCard <= 7 ? currentCard : 0.5;
  if (game.currentScore > 7.5) {
    gameOver(evalGameStatus(game.currentScore));
  }
  muestraPuntuacion();
};

export const stayButtonHandler = () => {
  gameOver(evalGameStatus(game.currentScore));
  if (game.currentScore < 7.5 && afterButton instanceof HTMLButtonElement) {
    afterButton.style = "display:block;";
  }
};

export const resetButtonHandler = () => {
  resetGame();
};

export const afterButtonHandler = () => {
  const currentCard = dameCarta();
  mostrarCarta(currentCard);
  let maybeScore = (currentCard <= 7 ? currentCard : 0.5) + game.currentScore;
  if (hubieraDisplay) {
    hubieraDisplay.innerHTML = `Hubieras logrado este resultado: <span id="puntuacion-actual">${maybeScore}</span>`;
    hubieraDisplay.style = "display:block;";
  }

  if (afterButton instanceof HTMLButtonElement) {
    afterButton.disabled = true;
  }
};

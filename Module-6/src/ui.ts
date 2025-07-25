import { config, gameState } from "./model";
import {
  evalGameStatus,
  dameCarta,
  getRandomNumber,
  getCardPoints,
} from "./motor";

//Seleccionamos los elementos del DOM

const scoreText = document.getElementById("puntuacion-actual");
export const askCardButton = document.getElementById("pedir-carta");
export const stayButton = document.getElementById("plantarse");
export const resetButton = document.getElementById("reset");
const displayImage = document.getElementById("carta-para-mostrar");
export const afterButton = document.getElementById("que-habria-pasado");
const resultDisplay = document.getElementById("result-display");
const hubieraDisplay = document.getElementById("hubiera-display");

//Renderizado de la UI

export function renderGame() {
  // Mostrar la puntuación
  if (scoreText) {
    scoreText.textContent = gameState.score.toString();
  }

  // Mostrar la carta
  if (displayImage instanceof HTMLImageElement) {
    const cardKey = gameState.lastCard as keyof typeof config.imageUrls.cards; //Con esto le decimos a TypeScript que el numero de lastCard es un numero valido de config.imageUrls.cards, es decir una de las opciones de la interfaz cards creadas al inicio del documento y no un numero cualquiera
    const imageUrl = config.imageUrls.cards[cardKey];
    displayImage.src = imageUrl
      ? `${config.imageUrls.front}${imageUrl}`
      : config.imageUrls.back;
  }

  // Actualizar estado de los botones principales
  if (
    askCardButton instanceof HTMLButtonElement &&
    stayButton instanceof HTMLButtonElement
  ) {
    askCardButton.disabled = gameState.isGameOver;
    stayButton.disabled = gameState.isGameOver;
  }

  // Mostrar mensaje de resultado si el juego ha terminado
  if (resultDisplay) {
    if (gameState.isGameOver) {
      resultDisplay.textContent = evalGameStatus(gameState.score);
      resultDisplay.style.display = "block";
    } else {
      resultDisplay.style.display = "none";
    }
  }

  // Mostrar el botón "Qué habría pasado"
  if (afterButton instanceof HTMLButtonElement) {
    const showAfterButton = gameState.isGameOver && gameState.score < 7.5;
    afterButton.style.display = showAfterButton ? "block" : "none";
  }

  // Limpiar el mensaje de "hubiera" si no es necesario que se vea
  if (hubieraDisplay && !gameState.isGameOver) {
    hubieraDisplay.style.display = "none";
  }
}
//Handlers

export const askButtonHandler = () => {
  if (gameState.isGameOver) return;

  const card = dameCarta(getRandomNumber());
  const points = getCardPoints(card);

  gameState.lastCard = card;
  gameState.score += points;

  if (gameState.score >= 7.5) {
    gameState.isGameOver = true;
  }
  renderGame();
};

export const stayButtonHandler = () => {
  if (gameState.isGameOver) return;
  gameState.isGameOver = true;
  renderGame();
};

export const afterButtonHandler = () => {
  if (!gameState.isGameOver) return;

  const card = dameCarta(getRandomNumber());
  const points = getCardPoints(card);
  const maybeScore = gameState.score + points;

  gameState.lastCard = card; // Mostramos la nueva carta

  if (hubieraDisplay) {
    hubieraDisplay.innerHTML = `Hubieras logrado este resultado: <span id="puntuacion-actual">${maybeScore}</span>`;
    hubieraDisplay.style.display = "block";
  }

  if (afterButton instanceof HTMLButtonElement) {
    afterButton.disabled = true; // Deshabilitamos el boton despues de usarlo
  }

  // Volvemos a renderizar por si la imagen de la carta cambio
  renderGame();
};

export const resetButtonHandler = () => {
  gameState.score = 0;
  gameState.isGameOver = false;
  gameState.lastCard = 0; // Para que muestre el dorso

  // Habilitar el botón "que habria pasado" de nuevo
  if (afterButton instanceof HTMLButtonElement) {
    afterButton.disabled = false;
  }

  renderGame();
};

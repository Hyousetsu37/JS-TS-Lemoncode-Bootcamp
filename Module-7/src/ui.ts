import { config, gameState } from "./model";
import {
  evalGameStatus,
  dameCarta,
  getRandomNumber,
  getCardPoints,
  getImageUrl,
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

const showScore = () => {
  if (scoreText) {
    scoreText.textContent = gameState.score.toString();
  }
};

const showCard = (imageUrl: string) => {
  if (displayImage instanceof HTMLImageElement) {
    displayImage.src = imageUrl;
  }
};

const changeDisabledAskAndStayButtonsState = (isGameOver: boolean) => {
  if (
    askCardButton instanceof HTMLButtonElement &&
    stayButton instanceof HTMLButtonElement
  ) {
    askCardButton.disabled = isGameOver;
    stayButton.disabled = isGameOver;
  }
};

const showResultIfGameEnded = (gameEnded: boolean) => {
  if (resultDisplay) {
    if (gameEnded) {
      resultDisplay.textContent = evalGameStatus(gameState.score);
      resultDisplay.style.display = "block";
    } else {
      resultDisplay.style.display = "none";
    }
  }
};

const showWhatIfButton = (gameEnded: boolean) => {
  if (afterButton instanceof HTMLButtonElement) {
    const showAfterButton = gameEnded && gameState.score < 7.5;
    afterButton.style.display = showAfterButton ? "block" : "none";
  }
};
const showWhatIfMessage = (maybeScore: number) => {
  if (hubieraDisplay) {
    hubieraDisplay.innerHTML = `Hubieras logrado este resultado: <span id="puntuacion-actual">${maybeScore}</span>`;
    showHubieraDisplay(true);
  }
};
const disableAfterButton = (shouldDisable: boolean) => {
  if (afterButton instanceof HTMLButtonElement) {
    afterButton.disabled = shouldDisable; // Deshabilitamos el boton despues de usarlo
  }
};

const showHubieraDisplay = (shouldShow: boolean) => {
  if (hubieraDisplay) {
    hubieraDisplay.style.display = shouldShow ? "block" : "none";
  }
};
const checkGameOver = () => {
  if (gameState.score >= 7.5) {
    showResultIfGameEnded(true);
    showWhatIfButton(true);
    changeDisabledAskAndStayButtonsState(true);
  }
};

export const renderGame = (cardNumber: number) => {
  checkGameOver();
  // Mostrar la puntuación
  const ImageUrl = getImageUrl(cardNumber);
  showCard(ImageUrl);
  showScore();

  // Mostrar la carta
};

const sumPoints = (score: number) => {
  return gameState.score + score;
};
const updateScore = (newScore: number) => {
  gameState.score = newScore;
};

//Handlers
export const askButtonHandler = () => {
  const card = dameCarta(getRandomNumber());
  const points = getCardPoints(card);
  const newScore = sumPoints(points);
  updateScore(newScore);
  renderGame(card);
};
export const stayButtonHandler = () => {
  showResultIfGameEnded(true);
  showWhatIfButton(true);
  changeDisabledAskAndStayButtonsState(true);
  renderGame(0);
};

export const afterButtonHandler = () => {
  const randomNumber = getRandomNumber();
  const card = dameCarta(randomNumber);
  const points = getCardPoints(card);
  const maybeScore = gameState.score + points;
  showWhatIfMessage(maybeScore);
  disableAfterButton(true);

  // Volvemos a renderizar por si la imagen de la carta cambio
  renderGame(card);
};

export const resetButtonHandler = () => {
  updateScore(0);
  showResultIfGameEnded(false);
  showWhatIfButton(false);
  changeDisabledAskAndStayButtonsState(false);
  // Habilitar el botón "que habria pasado" de nuevo
  disableAfterButton(false);
  showHubieraDisplay(false);

  renderGame(0);
};

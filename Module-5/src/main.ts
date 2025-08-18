//Interfaces necesarias para tipar nuestro objeto
interface ConfigObject {
  gameMessages: gameMessages;
}

interface gameMessages {
  conservative: string;
  scared: string;
  almost: string;
  winner: string;
  gameOver: string;
}

//Interfaces necesarias para tipar nuestro estado
interface gameStateObject {
  score: number;
  isGameOver: boolean;
}

//Creamos un objeto con todos nuestros textos y URL
const config: ConfigObject = {
  gameMessages: {
    conservative: "Has sido muy conservador",
    scared: "Te ha entrado el canguelo eh?",
    almost: "Casi casi...",
    winner: "¡ Lo has clavado! ¡Enhorabuena!",
    gameOver: "Game Over",
  },
};

let gameState: gameStateObject = {
  score: 0,
  isGameOver: false,
};

//Seleccionamos los elementos del DOM

const scoreText = document.getElementById("puntuacion-actual");
const askCardButton = document.getElementById("pedir-carta");
const stayButton = document.getElementById("plantarse");
const resetButton = document.getElementById("reset");
const displayImage = document.getElementById("carta-para-mostrar");
const afterButton = document.getElementById("que-habria-pasado");
const resultDisplay = document.getElementById("result-display");
const hubieraDisplay = document.getElementById("hubiera-display");

//Logica
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 10 + 1);
};
const dameCarta = (randomNumber: number): number => {
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
};

const getCardPoints = (card: number): number => {
  return card > 7 ? 0.5 : card;
};

const evalGameStatus = (score: number): string => {
  if (score === 7.5) {
    return config.gameMessages.winner;
  }
  if (score > 7.5) {
    return config.gameMessages.gameOver;
  }
  if (score >= 6) {
    return config.gameMessages.almost;
  }
  if (score >= 5) {
    return config.gameMessages.scared;
  }
  return config.gameMessages.conservative;
};

const showScore = () => {
  if (scoreText) {
    scoreText.textContent = gameState.score.toString();
  }
};

const getImageUrl = (cardNumber: number): string => {
  let urlEnding = "";
  switch (cardNumber) {
    case 1:
      urlEnding = "1_as-copas.jpg";
      break;
    case 2:
      urlEnding = "2_dos-copas.jpg";
      break;
    case 3:
      urlEnding = "3_tres-copas.jpg";
      break;
    case 4:
      urlEnding = "4_cuatro-copas.jpg";
      break;
    case 5:
      urlEnding = "5_cinco-copas.jpg";
      break;
    case 6:
      urlEnding = "6_seis-copas.jpg";
      break;
    case 7:
      urlEnding = "7_siete-copas.jpg";
      break;
    case 10:
      urlEnding = "10_sota-copas.jpg";
      break;
    case 11:
      urlEnding = "11_caballo-copas.jpg";
      break;
    case 12:
      urlEnding = "12_rey-copas.jpg";
      break;
    default:
      urlEnding =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  let urlImage =
    cardNumber > 0
      ? `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${urlEnding}`
      : urlEnding;
  return urlImage;
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

//Renderizado de la UI

function renderGame(cardNumber: number) {
  checkGameOver();
  // Mostrar la puntuación
  const ImageUrl = getImageUrl(cardNumber);
  showCard(ImageUrl);
  showScore();

  // Mostrar la carta
}
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
const sumPoints = (score: number) => {
  return gameState.score + score;
};
const updateScore = (newScore: number) => {
  gameState.score = newScore;
};

//Handlers

const askButtonHandler = () => {
  const card = dameCarta(getRandomNumber());
  const points = getCardPoints(card);
  const newScore = sumPoints(points);
  updateScore(newScore);
  renderGame(card);
};

const stayButtonHandler = () => {
  showResultIfGameEnded(true);
  showWhatIfButton(true);
  changeDisabledAskAndStayButtonsState(true);
  renderGame(0);
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

const afterButtonHandler = () => {
  const randomNumber = getRandomNumber();
  const card = dameCarta(randomNumber);
  const points = getCardPoints(card);
  const maybeScore = gameState.score + points;
  showWhatIfMessage(maybeScore);
  disableAfterButton(true);

  // Volvemos a renderizar por si la imagen de la carta cambio
  renderGame(card);
};

const resetButtonHandler = () => {
  updateScore(0);
  showResultIfGameEnded(false);
  showWhatIfButton(false);
  changeDisabledAskAndStayButtonsState(false);
  // Habilitar el botón "que habria pasado" de nuevo
  disableAfterButton(false);
  showHubieraDisplay(false);

  renderGame(0);
};

//Inicializamos
//Invocar cuando el Dom este listo
document.addEventListener("DOMContentLoaded", () => {
  if (askCardButton instanceof HTMLButtonElement) {
    askCardButton.addEventListener("click", askButtonHandler);
  }
  if (stayButton instanceof HTMLButtonElement) {
    stayButton.addEventListener("click", stayButtonHandler);
  }
  if (resetButton instanceof HTMLButtonElement) {
    resetButton.addEventListener("click", resetButtonHandler);
  }
  if (afterButton instanceof HTMLButtonElement) {
    afterButton.addEventListener("click", afterButtonHandler);
  }

  // Pintamos el estado inicial del juego al cargar la pagina
  renderGame(0);
});

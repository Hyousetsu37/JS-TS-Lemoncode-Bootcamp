//Interfaces necesarias para tipar nuestro objeto
interface ConfigObject {
  imageUrls: imageUrls;
  gameMessages: gameMessages;
}

interface imageUrls {
  front: string;
  back: string;
  cards: cards;
}

interface cards {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  10: string;
  11: string;
  12: string;
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
  lastCard: number;
}

//Creamos un objeto con todos nuestros textos y URL
const config: ConfigObject = {
  imageUrls: {
    front:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/",
    back: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg",
    cards: {
      1: "1_as-copas.jpg",
      2: "2_dos-copas.jpg",
      3: "3_tres-copas.jpg",
      4: "4_cuatro-copas.jpg",
      5: "5_cinco-copas.jpg",
      6: "6_seis-copas.jpg",
      7: "7_siete-copas.jpg",
      10: "10_sota-copas.jpg",
      11: "11_caballo-copas.jpg",
      12: "12_rey-copas.jpg",
    },
  },
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
  lastCard: 0, // Para mostrar la carta actual
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
  if (score === 7.5) return config.gameMessages.winner;
  if (score > 7.5) return config.gameMessages.gameOver;
  if (score >= 6) return config.gameMessages.almost;
  if (score >= 5) return config.gameMessages.scared;
  return config.gameMessages.conservative;
};

//Renderizado de la UI

function renderGame() {
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

const askButtonHandler = () => {
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

const stayButtonHandler = () => {
  if (gameState.isGameOver) return;
  gameState.isGameOver = true;
  renderGame();
};

const afterButtonHandler = () => {
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

const resetButtonHandler = () => {
  gameState.score = 0;
  gameState.isGameOver = false;
  gameState.lastCard = 0; // Para que muestre el dorso

  // Habilitar el botón "que habria pasado" de nuevo
  if (afterButton instanceof HTMLButtonElement) {
    afterButton.disabled = false;
  }

  renderGame();
};

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

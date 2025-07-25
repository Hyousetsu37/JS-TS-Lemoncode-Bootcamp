import "./style.css";

let currentTurn = 1;
// Guardo los Botones en variables para manipularlos despues
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");
const setTurnButton = document.getElementById("boton-elegir-turno");

//Guardo el elemento que se va a actualizar
const turnNumberElement = document.getElementById("numero-turno");

//Guardo el input element
const setTurnInput = document.getElementById("elegir-turno");

// Una función dedicada solo para actualizar el HTML
function updateTurnDisplay(turn: number): void {
  if (turnNumberElement) {
    const formattedTurn = turn.toString().padStart(2, "0");
    turnNumberElement.textContent = formattedTurn;
  }
}

// Inicializamos la vista al cargar
updateTurnDisplay(currentTurn);

function handleTurnAction(action: string): void {
  switch (action) {
    case "next":
      currentTurn++;
      break;
    case "previous":
      if (currentTurn > 0) {
        currentTurn--;
      }
      break;
    case "reset":
      currentTurn = 0;
      break;
    case "set":
      const newTurn = getTurnFromInput();
      currentTurn = newTurn;
      break;
    default:
      console.error("Acción no reconocida");
  }
  updateTurnDisplay(currentTurn);
}

function getTurnFromInput(): number {
  if (setTurnInput instanceof HTMLInputElement) {
    const inputValue = setTurnInput.value;
    const parsedValue = parseInt(inputValue, 10);
    // Si no es un número o es negativo, devolvemos el turno actual para no cambiarlo
    if (isNaN(parsedValue) || parsedValue < 0) {
      return currentTurn;
    }
    return parsedValue;
  }
  return currentTurn; // Valor por defecto
}

//Crear los event listener para cada boton
if (nextButton instanceof HTMLButtonElement) {
  nextButton.addEventListener("click", () => {
    handleTurnAction("next");
  });
}
if (previousButton instanceof HTMLButtonElement) {
  previousButton.addEventListener("click", () => {
    handleTurnAction("previous");
  });
}
if (resetButton instanceof HTMLButtonElement) {
  resetButton.addEventListener("click", () => {
    handleTurnAction("reset");
  });
}
if (setTurnButton instanceof HTMLButtonElement) {
  setTurnButton.addEventListener("click", () => {
    handleTurnAction("next");
  });
}

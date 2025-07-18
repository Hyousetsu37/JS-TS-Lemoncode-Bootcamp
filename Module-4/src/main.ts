import "./style.css";

// Guardo los Botones en variables para manipularlos despues
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");
const setTurnButton = document.getElementById("boton-elegir-turno");

//Guardo el elemento que se va a actualizar
const turnNumberElement = document.getElementById("numero-turno");

//Guardo el input element
const setTurnInput = document.getElementById("elegir-turno");

//Creo una función que me lee el numero actual y lo devuelve en formato number
function readCurrentTurn(): number {
  if (turnNumberElement?.innerText) {
    return parseInt(turnNumberElement.innerText);
  } else {
    return 0;
  }
}

//Crear una función que se encargue de la logica para elegir el turno dependiendo de si es siguiente turno, turno anterior o resetear

function setCurrentTurn(action: string): void {
  //Usa la funcion creada anteriormente para leer el numero que se encuentra en pantalla
  const currentNumber = readCurrentTurn();
  //Crea una variable result y le asignal el valor actual del turno como default
  let result: string = currentNumber.toString();
  //si la acción que se le pasa a la funcion es igual a next, ejecuta la logica para avanzar el turno
  if (action === "next") {
    //le agrega 1 al valor actual y lo convierte en string para luego mostrarse en pantalla
    result = (currentNumber + 1).toString();
    // si el valor es menor a 10 le añade un 0 al inicio para siempre mostrar dos digitos, sino lo deja tal y como esta
    if (currentNumber < 10) {
      result = result.padStart(2, "0");
    }
    //si la acción que se le pasa a la funcion es igual a previous, ejecuta la logica para retroceder el turno
  } else if (action === "previous") {
    //si el turno actual es mayor igual a 1, al turno actual le resta uno, sino lo deja como esta (esto evita valores negativos)
    if (currentNumber >= 1) {
      result = (currentNumber - 1).toString();
    }
    if (currentNumber <= 10) {
      result = result.padStart(2, "0");
    }
    //si la acción que se le pasa a la funcion es igual a set, ejecuta la logica para settear el turno usando el input
  } else if (action === "set") {
    //si el input existe y ademas es una instancia de input (este codigo checkea los dos ya que undefined daria false)
    if (setTurnInput instanceof HTMLInputElement) {
      // si el input tiene un valor se lo asignamos a la variable input value, de lo contrario le asignamos 0
      const inputValue = setTurnInput.value || "0";
      if (parseInt(inputValue) < 10) {
        result = inputValue.padStart(2, "0");
      } else {
        result = inputValue;
      }
    }
    //si la acción es reset, se selecciona 00 como el numero y se continua
  } else if (action === "reset") {
    result = "00";
  }

  if (turnNumberElement) {
    turnNumberElement.textContent = result;
  }
}

//Crear los event listener para cada boton
nextButton?.addEventListener("click", () => {
  setCurrentTurn("next");
});

previousButton?.addEventListener("click", () => {
  setCurrentTurn("previous");
});

resetButton?.addEventListener("click", () => {
  setCurrentTurn("reset");
});

setTurnButton?.addEventListener("click", () => {
  setCurrentTurn("set");
});

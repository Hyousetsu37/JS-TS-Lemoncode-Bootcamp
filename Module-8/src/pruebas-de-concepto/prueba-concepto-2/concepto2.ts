import "../concepto-style.css";
import { type Carta, tablero } from "../memoria-data";

const createDiv = (parent: HTMLElement, className: string) => {
  const createdDiv = document.createElement("div");
  createdDiv.classList = className;
  parent.appendChild(createdDiv);
  return createdDiv;
};

const readDataIndex = (card: HTMLElement) => {
  if (card.dataset.indexId) {
    return parseInt(card.dataset.indexId, 10);
  }
  return 0;
};

const updateCartasVolteadas = (index: number) => {
  const cartaVolteadaA = tablero.indiceCartaVolteadaA;
  const cartaVolteadaB = tablero.indiceCartaVolteadaB;
  if (cartaVolteadaA === undefined) {
    tablero.indiceCartaVolteadaA = index;
  } else if (cartaVolteadaB === undefined) {
    tablero.indiceCartaVolteadaB = index;
  }
};

// const updatePartida = () => {
//   if (
//     tablero.indiceCartaVolteadaA !== undefined &&
//     tablero.indiceCartaVolteadaB !== undefined
//   ) {
//     if (tablero.indiceCartaVolteadaA === tablero.indiceCartaVolteadaB) {
//       tablero.cartas = tablero.cartas.map((carta) => ({
//         ...carta,
//         encontrada:
//           carta.idFoto === tablero.indiceCartaVolteadaA ? true : false,
//       }));
//     } else if (tablero.indiceCartaVolteadaA !== tablero.indiceCartaVolteadaB) {
//       tablero.cartas = tablero.cartas.map((carta) => ({
//         ...carta,
//         estaVuelta:
//           carta.idFoto === tablero.indiceCartaVolteadaA ||
//           carta.idFoto === tablero.indiceCartaVolteadaB
//             ? false
//             : carta.estaVuelta,
//       }));
//     }
//     tablero.indiceCartaVolteadaA = undefined;
//     tablero.indiceCartaVolteadaB = undefined;
//   }
//   console.log(tablero);
// };

const updatePartida = () => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (
    tablero.indiceCartaVolteadaA !== undefined &&
    tablero.indiceCartaVolteadaB !== undefined
  ) {
    if (tablero.indiceCartaVolteadaA === tablero.indiceCartaVolteadaB) {
      tablero.cartas.forEach((carta) => {
        carta.encontrada =
          carta.idFoto === tablero.indiceCartaVolteadaA ? true : false;
      });
    } else if (tablero.indiceCartaVolteadaA !== tablero.indiceCartaVolteadaB) {
      tablero.cartas.forEach((carta) => {
        carta.estaVuelta =
          carta.idFoto === tablero.indiceCartaVolteadaA ||
          carta.idFoto === tablero.indiceCartaVolteadaB
            ? false
            : carta.estaVuelta;
      });
      setTimeout(() => {
        if (indiceA && indiceB) manageTurning(indiceA, indiceB);
      }, 500);
    }
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  }
  console.log(tablero);
};

const manageTurning = (indiceA: number, indiceB: number) => {
  const elementA = document.querySelectorAll(`[data-index-id="${indiceA}"]`);
  const elementB = document.querySelectorAll(`[data-index-id="${indiceB}"]`);
  elementA.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.classList.remove("is-flipped");
    }
  });
  elementB.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.classList.remove("is-flipped");
    }
  });
};

export const addFlipping = (element: HTMLElement, card: Carta): void => {
  const indexId = readDataIndex(element);
  element.addEventListener("click", () => {
    if (!card.estaVuelta) {
      element.classList.add("is-flipped");
      card.estaVuelta = true;
      updateCartasVolteadas(indexId);
      updatePartida();
    }
  });
};

export const createFullCard = (parent: HTMLElement, card: Carta) => {
  // El contenedor principal de la carta
  const cardContainer = createDiv(parent, "card-container");
  if (cardContainer instanceof HTMLElement) {
    cardContainer.dataset.indexId = card.idFoto.toString();
  }

  // El elemento interior que girará
  const cardInner = createDiv(cardContainer, "card-inner");

  // La cara frontal (que usaremos como reverso)
  createDiv(cardInner, "card-front");

  // La cara trasera (que usaremos como anverso con la imagen)
  const cardBack = createDiv(cardInner, "card-back");

  createImg(cardBack, card.imagen);

  addFlipping(cardContainer, card);

  return cardContainer; // Devolvemos el contenedor principal
};

const createImg = (parent: HTMLElement, src: string) => {
  const createdImg = document.createElement("img");
  createdImg.src = src;
  parent.appendChild(createdImg);
  return createdImg;
};

export const mainConcept2 = () => {
  const conceptTwoDiv = document.getElementById("concept-two-div");
  if (conceptTwoDiv instanceof HTMLElement) {
    createFullCard(conceptTwoDiv, tablero.cartas[0]); // Creamos la carta completa

    // Al hacer clic, simplemente cambiamos la clase
  } else {
    console.error("No se encontró el contenedor para la carta.");
  }
};

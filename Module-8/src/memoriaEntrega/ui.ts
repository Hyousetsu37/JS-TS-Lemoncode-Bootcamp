import { tablero, type Carta, type Tablero } from "./model";
import {
  esPartidaCompleta,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
} from "./motor";

const createDiv = (parent: HTMLElement, className: string) => {
  const createdDiv = document.createElement("div");
  createdDiv.classList = className;
  parent.appendChild(createdDiv);
  return createdDiv;
};

const createImg = (parent: HTMLElement, src: string) => {
  const createdImg = document.createElement("img");
  createdImg.src = src;
  parent.appendChild(createdImg);
  return createdImg;
};

export const turnBackDown = (indiceA: number, indiceB: number) => {
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

const removeFlippedClass = <T>(element: T) => {
  if (element instanceof HTMLElement) {
    element.classList.remove("is-flipped");
  } else {
    console.log("Element not found");
  }
};

export const updateElements = (indexA: number, indexB: number) => {
  const elementA = document.querySelector(`[data-index-id="${indexA}"]`);
  const elementB = document.querySelector(`[data-index-id="${indexB}"]`);
  removeFlippedClass(elementA);
  removeFlippedClass(elementB);
};

const voltearCartaUi = (index: number) => {
  const element = document.querySelector(`[data-index-id="${index}"]`);
  element?.classList.add("is-flipped");
};

const checkGameStatus = (tablero: Tablero, index: number) => {
  if (sePuedeVoltearLaCarta(tablero, index)) {
    voltearLaCarta(tablero, index);
    voltearCartaUi(index);
  }
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    const indexA = tablero.indiceCartaVolteadaA;
    const indexB = tablero.indiceCartaVolteadaB;
    if (indexA !== undefined && indexB !== undefined) {
      if (sonPareja(indexA, indexB, tablero)) {
        parejaEncontrada(tablero, indexA, indexB);
        if (esPartidaCompleta(tablero)) {
          setTimeout(() => {
            alert("Partida completada");
          }, 200);
        }
      } else {
        setTimeout(() => {
          parejaNoEncontrada(tablero, indexA, indexB);
        }, 1000);
      }
    }
  }
};

export const handleClicking = (element: HTMLElement, index: number): void => {
  element.addEventListener("click", () => {
    checkGameStatus(tablero, index);
  });
};

export const createFullCard = (
  parent: HTMLElement,
  card: Carta,
  index: number
) => {
  // El contenedor principal de la carta
  const cardContainer = createDiv(parent, "card-container");
  if (cardContainer instanceof HTMLElement) {
    cardContainer.dataset.indexId = index.toString();
  }

  // El elemento interior que girará
  const cardInner = createDiv(cardContainer, "card-inner");

  // La cara frontal
  createDiv(cardInner, "card-front");

  // La cara trasera
  const cardBack = createDiv(cardInner, "card-back");

  createImg(cardBack, card.imagen);

  handleClicking(cardContainer, index);

  return cardContainer; // Devolvemos el contenedor principal
};

export const createGrid = (parent: HTMLElement, cardList: Carta[]): void => {
  cardList.forEach((card, index) => {
    createFullCard(parent, card, index);
  });
};

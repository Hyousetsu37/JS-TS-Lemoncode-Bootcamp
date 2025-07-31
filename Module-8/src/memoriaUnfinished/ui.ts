import type { Carta } from "./model";
import { updateCartasVolteadas, updatePartida } from "./motor";

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

const readDataIndex = (card: HTMLElement) => {
  if (card.dataset.indexId) {
    return parseInt(card.dataset.indexId, 10);
  }
  return 0;
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

export const createGrid = (
  parent: HTMLElement,
  cardList: Carta[]
): HTMLElement[] => {
  return cardList.map((element) => {
    return createFullCard(parent, element);
  });
};

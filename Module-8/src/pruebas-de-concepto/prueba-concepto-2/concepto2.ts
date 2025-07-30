import "../concepto-style.css";
import { cardsFlipped } from "../memoria-data";

const createDiv = (parent: HTMLElement, className: string) => {
  const createdDiv = document.createElement("div");
  createdDiv.classList = className;
  parent.appendChild(createdDiv);
  return createdDiv;
};

const checkCards = () => {
  if (cardsFlipped == 2) {
  }
};

export const addFlipping = (element: HTMLElement): void => {
  element.addEventListener("click", () => {
    element.classList.toggle("is-flipped");
  });
};

export const createFullCard = (parent: HTMLElement, src: string) => {
  // El contenedor principal de la carta
  const cardContainer = createDiv(parent, "card-container");

  // El elemento interior que girará
  const cardInner = createDiv(cardContainer, "card-inner");

  // La cara frontal (que usaremos como reverso)
  createDiv(cardInner, "card-front");

  // La cara trasera (que usaremos como anverso con la imagen)
  const cardBack = createDiv(cardInner, "card-back");

  createImg(cardBack, src);

  addFlipping(cardContainer);

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
    createFullCard(
      conceptTwoDiv,
      "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true"
    ); // Creamos la carta completa

    // Al hacer clic, simplemente cambiamos la clase
  } else {
    console.error("No se encontró el contenedor para la carta.");
  }
};

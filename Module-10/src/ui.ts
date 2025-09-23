import type { Character } from "./model";

const createDiv = (parent: HTMLElement, className: string) => {
  const createdDiv = document.createElement("div");
  createdDiv.classList = className;
  parent.appendChild(createdDiv);
  return createdDiv;
};

const createImg = (parent: HTMLElement, src: string, alt: string) => {
  const createdImg: HTMLImageElement = document.createElement("img");
  createdImg.src = src;
  createdImg.alt = alt;
  parent.appendChild(createdImg);
  return createdImg;
};

export const createCard = (
  parent: HTMLElement,
  src: string,
  characterName: string
) => {
  const createdCard = document.createElement("article");
  createdCard.classList = "card";
  createdCard.dataset.chName = characterName;
  const chImage = createImg(
    createdCard,
    `http://localhost:3000/${src}`,
    `Image of the character ${characterName}`
  );
  const chName = document.createElement("h3");
  chName.innerText = characterName;
  createdCard.appendChild(chImage);
  createdCard.appendChild(chName);
  parent.appendChild(createdCard);
  return createdCard;
};

export const createCardGrid = (
  parent: HTMLElement,
  characters: Character[]
) => {
  console.log("entered");
  characters.forEach((character) => {
    parent.appendChild(createCard(parent, character.imagen, character.nombre));
    console.log("created");
  });
};

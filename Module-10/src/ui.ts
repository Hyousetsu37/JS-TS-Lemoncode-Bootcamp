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
  createdImg.classList = "card-img";
  parent.appendChild(createdImg);
  return createdImg;
};

const createInfoLine = (parent: HTMLElement, tagName: string, info: string) => {
  const infoLine = createDiv(parent, "info-line");
  const tag = document.createElement("label");
  tag.innerText = tagName;
  tag.style = "font-weight: bold";
  const tagInfo = document.createElement("span");
  tagInfo.innerText = info;
  infoLine.appendChild(tag);
  infoLine.appendChild(tagInfo);
  return infoLine;
};

export const createCard = (parent: HTMLElement, character: Character) => {
  const createdCard = document.createElement("article");
  createdCard.classList = "card";
  createdCard.dataset.chName = character.nombre;
  const chImage = createImg(
    createdCard,
    `http://localhost:3000/${character.imagen}`,
    `Image of the character ${character.nombre}`
  );
  const chName = document.createElement("h3");
  chName.innerText = character.nombre;
  createdCard.appendChild(chImage);
  createdCard.appendChild(chName);
  parent.appendChild(createdCard);

  const infoContainer = createDiv(createdCard, "info-container");
  const specialityLine = createInfoLine(
    infoContainer,
    "Especialidad: ",
    `${character.especialidad}.`
  );
  const habilityLine = createInfoLine(
    infoContainer,
    "Habilidades: ",
    `${character.habilidades.join(", ")}.`
  );
  infoContainer.appendChild(specialityLine);
  infoContainer.appendChild(habilityLine);

  return createdCard;
};

export const createCardGrid = (
  parent: HTMLElement,
  characters: Character[]
) => {
  characters.forEach((character) => {
    parent.appendChild(createCard(parent, character));
  });
};

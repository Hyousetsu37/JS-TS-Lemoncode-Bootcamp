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
  //Create the card as an article
  const createdCard = document.createElement("article");
  //Add the class to the created Card
  createdCard.classList = "card";
  createdCard.dataset.chName = character.nombre;
  //Create the Img element
  const chImage = createImg(
    createdCard,
    `http://localhost:3000/${character.imagen}`,
    `Image of the character ${character.nombre}`
  );
  //Create the title of the card to add the name of the character
  const chName = document.createElement("h3");
  //Set the inner text of the title to the name of the character
  chName.innerText = character.nombre;
  //Append both the Title and the image to the card
  createdCard.appendChild(chImage);
  createdCard.appendChild(chName);
  // Create the container for habilities and speciality
  const infoContainer = createDiv(createdCard, "info-container");
  //Create the speciality line with the information
  const specialityLine = createInfoLine(
    infoContainer,
    "Especialidad: ",
    `${character.especialidad}.`
  );
  //Create the hability line with the information
  const habilityLine = createInfoLine(
    infoContainer,
    "Habilidades: ",
    `${character.habilidades.join(", ")}.`
  );
  //Append the speciality and hability lines to the Info container
  infoContainer.appendChild(specialityLine);
  infoContainer.appendChild(habilityLine);
  //Append the info container to the Card so the information is displayed at the end of the card
  createdCard.appendChild(infoContainer);
  //Append the card to the parent to show the card
  parent.appendChild(createdCard);
  //Return the card for possible management if needed.
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

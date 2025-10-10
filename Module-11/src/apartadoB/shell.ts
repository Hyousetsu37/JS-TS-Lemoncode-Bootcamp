import { getUrls } from "./motor";
import { displayUrls } from "./ui";

const getValidatedElement = <T extends HTMLElement>(
  id: string,
  typeConstructor: new () => T
): T => {
  const element = document.getElementById(id);
  if (!element || !(element instanceof typeConstructor)) {
    throw new Error(`Couldn´t find the element with id ${id}`);
  }
  return element as T;
};

const getValueFromSearchbar = (inputField: HTMLTextAreaElement): string => {
  const searchValue = inputField.value.trim();
  return searchValue;
};

const initializeApp = () => {
  const inputField = getValidatedElement("search-input", HTMLTextAreaElement);
  const searchButton = getValidatedElement("search-button", HTMLButtonElement);
  const infoContainer = getValidatedElement("info-container", HTMLElement);

  const processAndDisplay = () => {
    const textToSearch = getValueFromSearchbar(inputField);
    const urlArray = getUrls(textToSearch);
    displayUrls(infoContainer, urlArray);
  };

  searchButton.addEventListener("click", processAndDisplay);
  inputField.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      processAndDisplay();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeApp();
  } catch (error) {
    console.error("There was a problem while initializing", error);
  }
});

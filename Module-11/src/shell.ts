import { ibanRegEx } from "./model";
import { getIbanInfo, isCorrectlyFormed, isValidIban } from "./motor";
import { displayIbanInfo } from "./ui";

const ibanLists = [
  "ES21 1465 0100 72 2030876293",
  "ES2114650100722030876293",
  "ES21-1465-0100-72-2030876293",
  "ES6621000418401234567891",
  "ES66 2100 0418 40 1234567891",
  "ES66-2100-0418-40-1234567891",
];

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

const getIbanFromSearchbar = (inputField: HTMLInputElement): string => {
  const searchValue = inputField.value.trim();
  return searchValue;
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    const inputField = getValidatedElement("search-input", HTMLInputElement);
    const searchButton = getValidatedElement(
      "search-button",
      HTMLButtonElement
    );
    const infoContainer = getValidatedElement("info-container", HTMLElement);

    const processAndDisplay = () => {
      const ibanValue = getIbanFromSearchbar(inputField);
      const isFormed = isCorrectlyFormed(ibanValue, ibanRegEx);
      const isValid = isValidIban(ibanValue);
      const ibanInformation = getIbanInfo(ibanValue, ibanRegEx);

      displayIbanInfo(infoContainer, ibanInformation, isFormed, isValid);
    };

    searchButton.addEventListener("click", processAndDisplay);
    inputField.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        processAndDisplay();
      }
    });
  } catch (error) {
    console.error("There was a problem while initializing", error);
  }
});

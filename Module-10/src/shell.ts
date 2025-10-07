import type { Character } from "./model";
import { createCardGrid } from "./ui";
import { recallAllCharacters, recallFilteredCharacters } from "./motor";

// Función de ayuda para obtener y validar elementos del DOM de forma segura.
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    // Call elements at the start
    const characterSection = getValidatedElement(
      "character-container",
      HTMLElement
    );
    const searchInput = getValidatedElement("search-input", HTMLInputElement);
    const searchButton = getValidatedElement(
      "search-button",
      HTMLButtonElement
    );
    //
    const paintCards = (characters: Character[]) => {
      characterSection.innerHTML = "";
      createCardGrid(characterSection, characters);
    };

    const retrieveValue = (): string => {
      const searchValue = searchInput.value.trim();
      return searchValue;
    };

    const searchAndPaint = async () => {
      const searchValue = retrieveValue();
      let characters: Character[];
      if (searchValue === "") {
        characters = await recallAllCharacters();
      } else {
        characters = await recallFilteredCharacters(searchValue);
      }
      paintCards(characters);
    };

    searchButton.addEventListener("click", searchAndPaint);
    searchInput.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        searchAndPaint();
      }
    });
    searchAndPaint();
  } catch (error) {
    console.error("There was a problem while initializing", error);
  }
});

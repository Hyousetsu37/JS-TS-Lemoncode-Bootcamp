import type { Character } from "./model";
import { recallAllCharacters, recallFilteredCharacters } from "./motor";
import { createCardGrid } from "./ui";

document.addEventListener("DOMContentLoaded", async () => {
  const characterSection = document.getElementById("character-container");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  const retrieveValue = (): string => {
    if (searchInput instanceof HTMLInputElement) {
      return searchInput.value;
    }
    return "";
  };

  const handleSearch = async () => {
    const searchValue = retrieveValue();
    paintCards(recallFilteredCharacters, searchValue);
  };

  const handlePaintAll = async () => {
    paintCards(recallAllCharacters);
  };

  const handleEnter = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (retrieveValue() === "") {
        handlePaintAll();
      } else {
        await handleSearch();
      }
    }
  };

  const paintCards = async (callFunc: Function, searchValue?: string) => {
    if (characterSection instanceof HTMLElement) {
      const info: Character[] = searchValue
        ? await callFunc(searchValue)
        : await callFunc();
      characterSection.innerHTML = "";
      createCardGrid(characterSection, info);
    }
  };

  handlePaintAll();

  if (searchButton instanceof HTMLButtonElement) {
    searchButton.addEventListener("click", handleSearch);
    searchInput?.addEventListener("keypress", handleEnter);
  }
});

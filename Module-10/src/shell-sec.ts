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

  const searchInfo = async (callFunc: Function, searchValue?: string) => {
    const info: Character[] = searchValue
      ? await callFunc(searchValue)
      : await callFunc();
    return info;
  };

  const paintCards = (info: Character[]) => {
    if (characterSection instanceof HTMLElement) {
      characterSection.innerHTML = "";
      createCardGrid(characterSection, info);
    }
  };

  const paintFiltered = async (value: string) => {
    const information = await searchInfo(recallFilteredCharacters, value);
    paintCards(information);
  };

  const searchAndPaint = async () => {
    if (retrieveValue() === "") {
      paintAll();
    } else {
      const valueToSearch = retrieveValue();
      await paintFiltered(valueToSearch);
    }
  };

  const paintAll = async () => {
    const information = await searchInfo(recallAllCharacters);
    paintCards(information);
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchAndPaint();
    }
  };

  paintAll();

  if (searchButton instanceof HTMLButtonElement) {
    searchButton.addEventListener("click", searchAndPaint);
    searchInput?.addEventListener("keypress", handleEnter);
  }
});

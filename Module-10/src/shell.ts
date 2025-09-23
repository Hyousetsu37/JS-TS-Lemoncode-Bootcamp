import type { Character } from "./model";
import { recallAllCharacters } from "./motor";
import { createCardGrid } from "./ui";

console.log("notloaded");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded");
  const characterSection = document.getElementById("character-container");
  if (characterSection instanceof HTMLElement) {
    const info: Character[] = await recallAllCharacters();
    createCardGrid(characterSection, info);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("load");
});

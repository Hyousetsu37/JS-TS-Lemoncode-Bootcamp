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
    const characterGrid = getValidatedElement(
      "character-container",
      HTMLElement
    );
  } catch (error) {}
});

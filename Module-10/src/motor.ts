import type { Character } from "./model";

const BASEURL = "http://localhost:3000";

export const recallAllCharacters = async (): Promise<Character[]> => {
  const response = await fetch(`${BASEURL}/personajes`);
  const data = await response.json();
  return data;
};

export const recallFilteredCharacters = async (
  filterWord: string
): Promise<Character[]> => {
  const response = await fetch(
    `${BASEURL}/personajes?nombre_like=${filterWord}`
  );
  const data = await response.json();
  return data as Character[];
};

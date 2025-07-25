import { config } from "./model";

//Logica
export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 10 + 1);
};

export const dameCarta = (randomNumber: number): number => {
  return randomNumber > 7 ? randomNumber + 2 : randomNumber;
};

export const getCardPoints = (card: number): number => {
  return card > 7 ? 0.5 : card;
};

export const evalGameStatus = (score: number): string => {
  if (score === 7.5) return config.gameMessages.winner;
  if (score > 7.5) return config.gameMessages.gameOver;
  if (score >= 6) return config.gameMessages.almost;
  if (score >= 5) return config.gameMessages.scared;
  return config.gameMessages.conservative;
};

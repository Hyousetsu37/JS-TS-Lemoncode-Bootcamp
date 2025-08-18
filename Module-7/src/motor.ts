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
  if (score === 7.5) {
    return config.gameMessages.winner;
  }
  if (score > 7.5) {
    return config.gameMessages.gameOver;
  }
  if (score >= 6) {
    return config.gameMessages.almost;
  }
  if (score >= 5) {
    return config.gameMessages.scared;
  }
  return config.gameMessages.conservative;
};

export const getImageUrl = (cardNumber: number): string => {
  let urlEnding = "";
  switch (cardNumber) {
    case 1:
      urlEnding = "1_as-copas.jpg";
      break;
    case 2:
      urlEnding = "2_dos-copas.jpg";
      break;
    case 3:
      urlEnding = "3_tres-copas.jpg";
      break;
    case 4:
      urlEnding = "4_cuatro-copas.jpg";
      break;
    case 5:
      urlEnding = "5_cinco-copas.jpg";
      break;
    case 6:
      urlEnding = "6_seis-copas.jpg";
      break;
    case 7:
      urlEnding = "7_siete-copas.jpg";
      break;
    case 10:
      urlEnding = "10_sota-copas.jpg";
      break;
    case 11:
      urlEnding = "11_caballo-copas.jpg";
      break;
    case 12:
      urlEnding = "12_rey-copas.jpg";
      break;
    default:
      urlEnding =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  let urlImage =
    cardNumber > 0
      ? `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${urlEnding}`
      : urlEnding;
  return urlImage;
};

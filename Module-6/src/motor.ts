export const dameCarta = (): number => {
  let givenCard = Math.random() * 10 + 1;
  givenCard = Math.floor(givenCard);
  givenCard = givenCard > 7 ? givenCard + 2 : givenCard;
  return givenCard;
};

export const evalGameStatus = (score: number): string => {
  if (score < 4) {
    return "Has sido muy conservador";
  } else if (score <= 5) {
    return "Te ha entrado el canguelo eh?";
  } else if (score <= 7) {
    return "Casi casi...";
  } else if (score === 7.5) {
    return "¡ Lo has clavado! ¡Enhorabuena!";
  } else {
    return "Game Over";
  }
};

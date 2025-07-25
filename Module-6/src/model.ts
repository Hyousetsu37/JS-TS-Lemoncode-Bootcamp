//Interfaces necesarias para tipar nuestro objeto
interface ConfigObject {
  imageUrls: imageUrls;
  gameMessages: gameMessages;
}

interface imageUrls {
  front: string;
  back: string;
  cards: cards;
}

interface cards {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  10: string;
  11: string;
  12: string;
}
interface gameMessages {
  conservative: string;
  scared: string;
  almost: string;
  winner: string;
  gameOver: string;
}

//Interfaces necesarias para tipar nuestro estado
interface gameStateObject {
  score: number;
  isGameOver: boolean;
  lastCard: number;
}

//Creamos un objeto con todos nuestros textos y URL
export const config: ConfigObject = {
  imageUrls: {
    front:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/",
    back: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg",
    cards: {
      1: "1_as-copas.jpg",
      2: "2_dos-copas.jpg",
      3: "3_tres-copas.jpg",
      4: "4_cuatro-copas.jpg",
      5: "5_cinco-copas.jpg",
      6: "6_seis-copas.jpg",
      7: "7_siete-copas.jpg",
      10: "10_sota-copas.jpg",
      11: "11_caballo-copas.jpg",
      12: "12_rey-copas.jpg",
    },
  },
  gameMessages: {
    conservative: "Has sido muy conservador",
    scared: "Te ha entrado el canguelo eh?",
    almost: "Casi casi...",
    winner: "¡ Lo has clavado! ¡Enhorabuena!",
    gameOver: "Game Over",
  },
};

export let gameState: gameStateObject = {
  score: 0,
  isGameOver: false,
  lastCard: 0, // Para mostrar la carta actual
};

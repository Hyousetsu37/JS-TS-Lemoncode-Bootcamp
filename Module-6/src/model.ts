//Interfaces necesarias para tipar nuestro objeto
interface ConfigObject {
  gameMessages: gameMessages;
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
}

//Creamos un objeto con todos nuestros textos y URL
export const config: ConfigObject = {
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
};

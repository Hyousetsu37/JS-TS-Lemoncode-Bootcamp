import { tablero, type Carta } from "./model";
import { turnBackDown } from "./ui";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

export const updateCartasVolteadas = (index: number) => {
  const cartaVolteadaA = tablero.indiceCartaVolteadaA;
  const cartaVolteadaB = tablero.indiceCartaVolteadaB;
  if (cartaVolteadaA === undefined) {
    tablero.indiceCartaVolteadaA = index;
  } else if (cartaVolteadaB === undefined) {
    tablero.indiceCartaVolteadaB = index;
  }
};

const bothIndexAreUndefined = (
  indexA: number | undefined,
  indexB: number | undefined
): boolean => {
  return indexA !== undefined && indexB !== undefined;
};

const bothIndexesAreEqual = (
  indexA: number | undefined,
  indexB: number | undefined
): boolean => {
  return indexA === indexB;
};

const updateFoundStatusFromArray = (
  array: Carta[],
  index: number | undefined
): void => {
  if (index) {
    array.forEach((carta) => {
      carta.encontrada = carta.idFoto === index ? true : false;
    });
  }
};

const resetTurnedStatusFromArray = (
  array: Carta[],
  indexA: number | undefined,
  indexB: number | undefined
): void => {
  if (indexA && indexB) {
    array.forEach((carta) => {
      carta.estaVuelta =
        carta.idFoto === indexA || carta.idFoto === indexB
          ? false
          : carta.estaVuelta;
    });
  }
};

export const updatePartida = () => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  const cartas = tablero.cartas;
  if (bothIndexAreUndefined(indiceA, indiceB)) {
    if (bothIndexesAreEqual(indiceA, indiceB)) {
      updateFoundStatusFromArray(cartas, indiceA);
    } else if (bothIndexesAreEqual(indiceA, indiceB) !== true) {
      // Igual que poner else if (!bothIndexesAreEqual(indiceA, indiceB))
      resetTurnedStatusFromArray(cartas, indiceA, indiceB);
      setTimeout(() => {
        if (indiceA && indiceB) turnBackDown(indiceA, indiceB);
      }, 500);
    }
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  }
  console.log(tablero);
};

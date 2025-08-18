import { describe, it, expect, vi } from "vitest";
import {
  dameCarta,
  evalGameStatus,
  getCardPoints,
  getRandomNumber,
} from "./motor";
import { config } from "./model";

//Apartados obligatorios
//Identifica las funciones y componentes que determinan si un jugador ha ganado la partida o no.
describe("Testearemos la lógica que permite evaluar si el juego ha terminado, si el jugador ha ganado la partida o no", () => {
  it("Deberia devolver '¡ Lo has clavado! ¡Enhorabuena!' si el jugador se planta en 7.5", () => {
    const currentScore = 7.5;
    const winnerMessage = config.gameMessages.winner;
    expect(evalGameStatus(currentScore)).toBe(winnerMessage);
  });

  it("Deberia devolver 'Casi casi...' si el jugador se planta en menos de 7.5 y mas o igual a 6", () => {
    const currentScore = 6.2;
    const almostMessage = config.gameMessages.almost;
    expect(evalGameStatus(currentScore)).toBe(almostMessage);
  });

  it("Deberia devolver 'Te ha entrado el canguelo eh?' si el jugador se planta en menos de 6 y mas o igual a 5", () => {
    const currentScore = 5.5;
    const scaredMessage = config.gameMessages.scared;
    expect(evalGameStatus(currentScore)).toBe(scaredMessage);
  });

  it("Deberia devolver 'Has sido muy conservador' si el jugador se planta en menos de 5 ", () => {
    const currentScore = 4;
    const conservativeMessage = config.gameMessages.conservative;
    expect(evalGameStatus(currentScore)).toBe(conservativeMessage);
  });

  it("Deberia devolver 'Game Over' si el jugador se pasa de 7.5 puntos ", () => {
    const currentScore = 8;
    const gameOverMessage = config.gameMessages.gameOver;
    expect(evalGameStatus(currentScore)).toBe(gameOverMessage);
  });
});

//Apartados opcionales
describe("Testearemos las funciones que generan los numeros de las cartas", () => {
  //Habrás tenido que generar una función que genere un número aleatorio entre 0 y 10 y en el caso de que este número sea mayor que 7, sume 2 al resultado final. Para asegurarnos de que la función se comporta como se espera, se van a realizar sus pruebas unitarias correspondientes.

  it("Deberia devolver un numero random en el rango que esperamos, en este caso el limite superior de 10", () => {
    const generatedNumber = 0.999999;
    const expectedNumber = 10;
    vi.spyOn(Math, "random").mockReturnValue(generatedNumber);
    const result = getRandomNumber();
    expect(result).toBe(expectedNumber);
  });

  it("Deberia devolver un numero random en el rango que esperamos, en este caso el limite inferior de 1", () => {
    const generatedNumber = 0;
    const expectedNumber = 1;
    vi.spyOn(Math, "random").mockReturnValue(generatedNumber);
    const result = getRandomNumber();
    expect(result).toBe(expectedNumber);
  });

  //Testearemos lo relacionado a la funcion dame carta que recibe un randomNumber el cual probamos anteriormente
  it("Deberia devolver 1 si el numero generado aleatoreamente es 1", () => {
    const expectedNumber = 1;
    const randomNumber = 1;
    expect(dameCarta(randomNumber)).toBe(expectedNumber);
  });

  it("Deberia devolver 7 si el numero generado aleatoreamente es 7", () => {
    const expectedNumber = 7;
    const randomNumber = 7;
    expect(dameCarta(randomNumber)).toBe(expectedNumber);
  });

  it("Deberia devolver 10 si el numero generado aleatoreamente es 8", () => {
    const expectedNumber = 10;
    const randomNumber = 8;
    expect(dameCarta(randomNumber)).toBe(expectedNumber);
  });

  it("Deberia devolver 11 si el numero generado aleatoreamente es 9", () => {
    const expectedNumber = 11;
    const randomNumber = 9;
    expect(dameCarta(randomNumber)).toBe(expectedNumber);
  });

  it("Deberia devolver 12 si el numero generado aleatoreamente es 10", () => {
    const expectedNumber = 12;
    const randomNumber = 10;
    expect(dameCarta(randomNumber)).toBe(expectedNumber);
  });

  //En el caso de que el jugador haya obtenido una carta, debemos de haber creado una función que devuelva el valor de esa carta. Al igual que en el caso anterior, se van a realizar pruebas unitarias para comprobar que la función se comporta como se espera en diferentes situaciones.
  it("Deberia devolver 1 si la carta obtenida fue 1", () => {
    const generatedCard = 1;
    const expectedPoints = 1;
    expect(getCardPoints(generatedCard)).toBe(expectedPoints);
  });

  it("Deberia devolver 4 si la carta obtenida fue 4", () => {
    const generatedCard = 4;
    const expectedPoints = 4;
    expect(getCardPoints(generatedCard)).toBe(expectedPoints);
  });

  it("Deberia devolver 0.5 si la carta obtenida fue 10", () => {
    const generatedCard = 10;
    const expectedPoints = 0.5;
    expect(getCardPoints(generatedCard)).toBe(expectedPoints);
  });
  it("Deberia devolver 0.5 si la carta obtenida fue 10", () => {
    const generatedCard = 11;
    const expectedPoints = 0.5;
    expect(getCardPoints(generatedCard)).toBe(expectedPoints);
  });
});

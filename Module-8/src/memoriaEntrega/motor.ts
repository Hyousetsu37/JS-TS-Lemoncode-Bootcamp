import type { Carta, Tablero } from "./model";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const shuffledArray = [...cartas];
  for (let i = cartas.length - 1; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  //..
  const card = tablero.cartas[indice];

  return (
    !card.encontrada &&
    !card.estaVuelta &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  //...
  const card = tablero.cartas[indice];
  card.estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  //...
  const cardA = tablero.cartas[indiceA];
  const cardB = tablero.cartas[indiceB];
  return cardA.idFoto === cardB.idFoto;
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  //...
  const cardA = tablero.cartas[indiceA];
  const cardB = tablero.cartas[indiceB];
  cardA.encontrada = true;
  cardB.encontrada = true;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  // ...
  const cardA = tablero.cartas[indiceA];
  const cardB = tablero.cartas[indiceB];
  cardA.estaVuelta = false;
  cardB.estaVuelta = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.intentos++;
};

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  //...
  return tablero.cartas.every((card) => card.encontrada === true);
};

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  //...
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.cartas.forEach((card) => {
    card.encontrada = false;
    card.estaVuelta = false;
  });
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.intentos = 0;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

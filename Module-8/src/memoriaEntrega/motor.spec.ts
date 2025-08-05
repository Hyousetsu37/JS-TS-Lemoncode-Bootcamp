import { beforeEach, describe, expect, it } from "vitest";
import {
  barajarCartas,
  esPartidaCompleta,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
} from "./motor";
import { tablero, type Carta, type Tablero } from "./model";

const createExampleDashboad = (modifiers?: Partial<Tablero>): Tablero => {
  const exampleDashboard: Tablero = {
    cartas: [
      // Un set de cartas genérico y más grande puede ser un buen defecto
      { idFoto: 1, encontrada: false, estaVuelta: false, imagen: "img1" },
      { idFoto: 2, encontrada: true, estaVuelta: false, imagen: "img2" },
      { idFoto: 3, encontrada: false, estaVuelta: true, imagen: "img3" },
    ],
    estadoPartida: "CeroCartasLevantadas",
    intentos: 0,
    indiceCartaVolteadaA: undefined,
    indiceCartaVolteadaB: undefined,
  };
  return {
    ...exampleDashboard,
    ...modifiers,
  };
};

describe("Test de la funcion barajarCartas", () => {
  let cartasOriginales: Carta[];
  let cartasBarajadas: Carta[];

  beforeEach(() => {
    cartasOriginales = [...tablero.cartas];
    cartasBarajadas = barajarCartas(tablero.cartas);
  });

  it("Debería devolver un array con la misma cantidad de cartas.", () => {
    expect(cartasOriginales.length).toEqual(cartasBarajadas.length);
  });

  /** 
  it("El array devuelto no debería ser igual al array original.", () => {
    const sonDifferentes = cartasOriginales.some((carta, index) => {
      // if at least one of the cards ID is different comparing the initial array to the shuffled array in the same position it means that the cards were shuffled. There is also a possibility that the shuffled array is the same as the initial array, so this test shouldn't be run
      return carta.idFoto !== cartasBarajadas[index].idFoto;
    });
    expect(sonDifferentes).toBeTruthy();
  });
*/

  it("El array barajado debería contener los mismos elementos que el original.", () => {
    const sortedShuffled = [...cartasBarajadas].sort(
      (a, b) => a.idFoto - b.idFoto
    );
    const sortedOriginal = [...cartasOriginales].sort(
      (a, b) => a.idFoto - b.idFoto
    );
    // const checkEqualCards = (array1: Carta, array2: Carta): boolean => {
    //   const sameID = array1.idFoto === array2.idFoto;
    //   const sameFoto = array1.imagen === array2.imagen;
    //   return sameID && sameFoto;
    // };
    // const sonIguales = sortedOriginal.every((card, index) => {
    //   return checkEqualCards(card, sortedShuffled[index]);
    // });
    //expect(sonIguales).toBe(true)
    expect(sortedOriginal).toEqual(sortedShuffled);
  });
});

describe("Test de la funcion sePuedeVoltearCarta", () => {
  //Arange
  let exampleDashboard: Tablero; // Declaramos la variable aqui

  // Esto se ejecutara ANTES de cada 'it'
  beforeEach(() => {
    // Creamos una copia fresca y profunda en cada ocasion
    exampleDashboard = createExampleDashboad();
  });

  it("Debería devolver true si la carta no está encontrada, no está vuelta y no hay dos cartas levantadas.", () => {
    //Act
    //Assert
    expect(sePuedeVoltearLaCarta(exampleDashboard, 0)).toBe(true);
  });

  it("Debería devolver false si la carta ya ha sido encontrada.", () => {
    //Act
    //Assert
    expect(sePuedeVoltearLaCarta(exampleDashboard, 1)).toBe(false);
  });

  it("Debería devolver false si la carta ya está volteada.", () => {
    //Act
    //Assert
    expect(sePuedeVoltearLaCarta(exampleDashboard, 2)).toBe(false);
  });

  it("Debería devolver false si el estado de la partida es DosCartasLevantadas.", () => {
    //Arrange
    exampleDashboard.estadoPartida = "DosCartasLevantadas";
    //Act
    //Assert
    expect(sePuedeVoltearLaCarta(exampleDashboard, 0)).toBe(false);
  });
});

describe("Test para la funcion voltearLaCarta", () => {
  //Arrange
  let exampleDashboard: Tablero;
  beforeEach(() => {
    exampleDashboard = createExampleDashboad();
  });

  it("Cuando se voltea la primera carta, debería cambiar estaVuelta a true y el estado de la partida a UnaCartaLevantada.", () => {
    //Act
    const chosenCard: number = 0;
    voltearLaCarta(exampleDashboard, chosenCard);
    //Assert
    expect(exampleDashboard.cartas[chosenCard].estaVuelta).toBe(true);
    expect(exampleDashboard.estadoPartida).toBe("UnaCartaLevantada");
  });
  it("Debería cambiar estaVuelta a true y cambiar el estado de la partida a DosCartasLevantadas cuando se voltea la segunda carta.", () => {
    //Act
    exampleDashboard.estadoPartida = "UnaCartaLevantada";
    const chosenCard: number = 1;
    voltearLaCarta(exampleDashboard, chosenCard);
    //Assert
    expect(exampleDashboard.cartas[chosenCard].estaVuelta).toBe(true);
    expect(exampleDashboard.estadoPartida).toBe("DosCartasLevantadas");
  });
});

describe("Test para la funcion sonPareja", () => {
  //Arrange
  let exampleDashboard: Tablero;
  beforeEach(() => {
    exampleDashboard = createExampleDashboad({
      cartas: [
        {
          idFoto: 1,
          encontrada: false,
          estaVuelta: false,
          imagen: "someImage1",
        },
        {
          idFoto: 3,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage3",
        },
        {
          idFoto: 2,
          encontrada: true,
          estaVuelta: false,
          imagen: "someImage2",
        },
        {
          idFoto: 3,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage3",
        },
        {
          idFoto: 1,
          encontrada: false,
          estaVuelta: false,
          imagen: "someImage1",
        },
        {
          idFoto: 2,
          encontrada: true,
          estaVuelta: false,
          imagen: "someImage2",
        },
      ],
    });
  });

  it("Debería devolver true si los idFoto de las dos cartas son iguales.", () => {
    const chosenCard1: number = 0;
    const chosenCard2: number = 4;
    const resultado = sonPareja(chosenCard1, chosenCard2, exampleDashboard);
    expect(resultado).toBe(true);
  });
  it("Debería devolver false si los idFoto de las dos cartas son diferentes.", () => {
    const chosenCard1: number = 0;
    const chosenCard2: number = 2;
    const resultado = sonPareja(chosenCard1, chosenCard2, exampleDashboard);
    expect(resultado).toBe(false);
  });
});

describe("Test para la funcion parejaEncontrada", () => {
  //Arrange

  let exampleDashboard: Tablero;
  beforeEach(() => {
    exampleDashboard = createExampleDashboad({
      cartas: [
        {
          idFoto: 1,
          encontrada: false,
          estaVuelta: false,
          imagen: "someImage1",
        },
        {
          idFoto: 3,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage3",
        },
        {
          idFoto: 2,
          encontrada: true,
          estaVuelta: false,
          imagen: "someImage2",
        },
        {
          idFoto: 3,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage3",
        },
        {
          idFoto: 1,
          encontrada: false,
          estaVuelta: false,
          imagen: "someImage1",
        },
        {
          idFoto: 2,
          encontrada: true,
          estaVuelta: false,
          imagen: "someImage2",
        },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 4,
    });
  });

  it("Debería marcar ambas cartas como encontrada y reiniciar el estado de la partida.", () => {
    //Act

    const chosenCardNum1: number = 0;
    const chosenCardNum2: number = 4;
    parejaEncontrada(exampleDashboard, chosenCardNum1, chosenCardNum2);

    const chosenCard1 = exampleDashboard.cartas[chosenCardNum1];
    const chosenCard2 = exampleDashboard.cartas[chosenCardNum2];

    //Assert
    expect(chosenCard1.encontrada).toBe(true);
    expect(chosenCard2.encontrada).toBe(true);
    expect(exampleDashboard.estadoPartida).toBe("CeroCartasLevantadas");
    expect(exampleDashboard.indiceCartaVolteadaA).toBeUndefined();
    expect(exampleDashboard.indiceCartaVolteadaB).toBeUndefined();
  });
});

describe("Test para la funcion parejaNoEncontrada", () => {
  //Arrange
  let exampleDashboard: Tablero;
  beforeEach(() => {
    exampleDashboard = createExampleDashboad({
      cartas: [
        {
          idFoto: 1,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage1",
        },
        {
          idFoto: 2,
          encontrada: false,
          estaVuelta: true,
          imagen: "someImage2",
        },
      ],
      estadoPartida: "DosCartasLevantadas",
      intentos: 0,
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
    });
  });

  it("Debería marcar ambas cartas como no volteadas (estaVuelta: false) y reiniciar el estado de la partida.", () => {
    //Act
    parejaNoEncontrada(exampleDashboard, 0, 1);

    //Assert
    expect(exampleDashboard.cartas[0].estaVuelta).toBe(false);
    expect(exampleDashboard.cartas[1].estaVuelta).toBe(false);
    expect(exampleDashboard.estadoPartida).toBe("CeroCartasLevantadas");
    expect(exampleDashboard.indiceCartaVolteadaA).toBeUndefined();
    expect(exampleDashboard.indiceCartaVolteadaB).toBeUndefined();
  });
});

describe("Test para la funcion esPartidaCompleta", () => {
  //Arrange

  let exampleDashboard: Tablero;
  beforeEach(() => {
    exampleDashboard = createExampleDashboad({
      cartas: [
        { idFoto: 1, encontrada: true, estaVuelta: true, imagen: "someImage1" },
        { idFoto: 3, encontrada: true, estaVuelta: true, imagen: "someImage3" },
        { idFoto: 2, encontrada: true, estaVuelta: true, imagen: "someImage2" },
        { idFoto: 3, encontrada: true, estaVuelta: true, imagen: "someImage3" },
        { idFoto: 1, encontrada: true, estaVuelta: true, imagen: "someImage1" },
        { idFoto: 2, encontrada: true, estaVuelta: true, imagen: "someImage2" },
      ],
      estadoPartida: "CeroCartasLevantadas",
      intentos: 0,
    });
  });

  it("Debería devolver true si todas las cartas del tablero están marcadas como encontrada.", () => {
    //Act
    //Assert

    expect(esPartidaCompleta(exampleDashboard)).toBe(true);
  });
  it("Debería devolver false si al menos una carta no está marcada como encontrada.", () => {
    const testDashboard = createExampleDashboad({
      cartas: [
        { idFoto: 1, encontrada: true, estaVuelta: true, imagen: "someImage1" },
        {
          idFoto: 2,
          encontrada: false,
          estaVuelta: false,
          imagen: "someImage2",
        },
      ],
    });
    //Act
    //Assert

    expect(esPartidaCompleta(testDashboard)).toBe(false);
  });
});

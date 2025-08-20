import { describe, expect, test } from "vitest";
import {
  tieneCaracteresEspeciales,
  tieneLongitudMinima,
  tieneMayusculasYMinusculas,
  tieneNombreUsuario,
  tieneNumeros,
  tienePalabrasComunes,
} from "./motor";
import { commonPasswords, type ValidacionClave } from "./model";

describe("tieneMayusculasYMinusculas", () => {
  test("Should return valid if the password has lowercase and uppercase letters.", () => {
    //Arrange
    const password = "SomeLowerUpperCasePassword";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tieneMayusculasYMinusculas(password);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password does not have lowercase and uppercase letters.", () => {
    //Arrange
    const password1 = "alllowercaseletters";
    const password2 = "ALLUPPERCASELETTERS";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave debe de tener mayúsculas y minúsculas",
    };
    //Act
    const result1 = tieneMayusculasYMinusculas(password1);
    const result2 = tieneMayusculasYMinusculas(password2);
    expect(result1).toEqual(expectedResult);
    expect(result2).toEqual(expectedResult);
  });
});

describe("tieneNumeros", () => {
  test("Should return valid if the password has numbers.", () => {
    //Arrange
    const password = "SomePasswordWithNumbers123";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tieneNumeros(password);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password does not have numbers.", () => {
    //Arrange
    const password = "somepasswordwithoutnumbers";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave debe contener numeros",
    };
    //Act
    const result = tieneNumeros(password);
    expect(result).toEqual(expectedResult);
  });
});

describe("tieneCaracteresEspeciales", () => {
  test("Should return valid if the password has special characters.", () => {
    //Arrange
    const password = "SomePasswordWithSpecialCharacters123#";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tieneCaracteresEspeciales(password);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password does not have special characters.", () => {
    //Arrange
    const password = "SomePasswordWithoutSpecialCharacters123";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave debe de tener caracteres especiales",
    };
    //Act
    const result = tieneCaracteresEspeciales(password);
    expect(result).toEqual(expectedResult);
  });
});

describe("tieneLongitudMinima", () => {
  test("Should return valid if the password has special characters.", () => {
    //Arrange
    const password = "LongPassword";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tieneLongitudMinima(password);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password does not have special characters.", () => {
    //Arrange
    const password = "ShortPd";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave debe tener al menos 8 caracteres",
    };
    //Act
    const result = tieneLongitudMinima(password);
    expect(result).toEqual(expectedResult);
  });
});

describe("tieneNombreUsuario", () => {
  test("Should return valid if the password is not the username.", () => {
    //Arrange
    const password = "LongPassword";
    const username = "Pepito";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tieneNombreUsuario(password, username);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password is the username.", () => {
    //Arrange
    const password = "Pepito";
    const username = "Pepito";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave no puede contener el nombre de usuario",
    };
    //Act
    const result = tieneNombreUsuario(password, username);
    expect(result).toEqual(expectedResult);
  });
});

describe("tienePalabrasComunes", () => {
  test("Should return valid if the password is not the username.", () => {
    //Arrange
    const password = "LongPassword";
    const expectedResult: ValidacionClave = { esValida: true };
    //Act
    const result = tienePalabrasComunes(password, commonPasswords);
    expect(result).toEqual(expectedResult);
  });
  test("Should return not valid and error if the password is the username.", () => {
    //Arrange
    const password = "welcome";
    const expectedResult: ValidacionClave = {
      esValida: false,
      error: "La clave no debe de contener palabras comunes",
    };
    //Act
    const result = tienePalabrasComunes(password, commonPasswords);
    expect(result).toEqual(expectedResult);
  });
});

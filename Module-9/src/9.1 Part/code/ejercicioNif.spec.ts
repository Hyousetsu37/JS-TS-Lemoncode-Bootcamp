import { describe, expect, it, test } from "vitest";
import { validarNIF } from "./ejercicioNif";

describe("Tests de validaNIF", () => {
  it.each([
    ["12345678", "Z", true],
    ["73536276", "D", true],
    ["72184153", "X", true],
    ["36218255", "V", true],
    ["21137848", "C", true],
    ["12345678", "A", false],
    ["98765432", "A", false],
    ["33333333", "C", false],
  ])(
    "el resultado de %s%s deberia ser %s",
    (numero: string, letra: string, resultadoEsperado: boolean) => {
      expect(validarNIF(numero, letra)).toBe(resultadoEsperado);
    }
  );
});

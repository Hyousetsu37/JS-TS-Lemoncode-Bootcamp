import { beforeEach, describe, expect, it, test } from "vitest";
import type { LineaTicket, TicketFinal } from "./model";
import { calculateTicketLine, calculaTicket } from "./motor";

describe("calculateTicketLine", () => {
  let testProduct: LineaTicket;
  beforeEach(() => {
    testProduct = {
      producto: { nombre: "smt", precio: 10, tipoIva: "general" },
      cantidad: 2,
    };
  });
  it("Should return a ticket line correctly", () => {
    expect(calculateTicketLine(testProduct)).toEqual({
      nombre: "smt",
      cantidad: 2,
      precioSinIva: 20,
      tipoIva: "general",
      precioConIva: 24.2,
    });
  });
  it("Should return a ticket line correctly even when the IVA is 0%", () => {
    testProduct.producto.tipoIva = "superreducidoC";
    const result = calculateTicketLine(testProduct);

    expect(result.precioConIva).toEqual(result.precioSinIva);
    expect(result).toEqual({
      nombre: "smt",
      cantidad: 2,
      precioSinIva: 20,
      tipoIva: "superreducidoC",
      precioConIva: 20,
    });
  });

  it("Should return a ticket line correctly even when the amount is 1", () => {
    testProduct.producto.tipoIva = "superreducidoA";
    testProduct.cantidad = 1;
    const result = calculateTicketLine(testProduct);

    expect(testProduct.producto.precio).toEqual(result.precioSinIva);
    expect(result).toEqual({
      nombre: "smt",
      cantidad: 1,
      precioSinIva: 10,
      tipoIva: "superreducidoA",
      precioConIva: 10.5,
    });
  });
});

describe("calculaTicket", () => {
  let productos: LineaTicket[];
  let resultExample: TicketFinal;
  beforeEach(() => {
    productos = [
      {
        producto: {
          nombre: "Legumbres",
          precio: 2,
          tipoIva: "general",
        },
        cantidad: 2,
      },
      {
        producto: {
          nombre: "Perfume",
          precio: 20,
          tipoIva: "general",
        },
        cantidad: 3,
      },
      {
        producto: {
          nombre: "Leche",
          precio: 1,
          tipoIva: "superreducidoC",
        },
        cantidad: 6,
      },
      {
        producto: {
          nombre: "Lasaña",
          precio: 5,
          tipoIva: "superreducidoA",
        },
        cantidad: 1,
      },
    ];
    resultExample = {
      lineas: [
        {
          nombre: "Legumbres",
          cantidad: 2,
          precioSinIva: 4,
          tipoIva: "general",
          precioConIva: 4.84,
        },
        {
          nombre: "Perfume",
          cantidad: 3,
          precioSinIva: 60,
          tipoIva: "general",
          precioConIva: 72.6,
        },
        {
          nombre: "Leche",
          cantidad: 6,
          precioSinIva: 6,
          tipoIva: "superreducidoC",
          precioConIva: 6,
        },
        {
          nombre: "Lasaña",
          cantidad: 1,
          precioSinIva: 5,
          tipoIva: "superreducidoA",
          precioConIva: 5.25,
        },
      ],
      total: {
        totalConIva: 88.69,
        totalSinIva: 75,
        totalIva: 13.69,
      },
      desgloseIva: [
        {
          tipoIva: "general",
          cuantia: 13.44,
        },
        {
          tipoIva: "superreducidoC",
          cuantia: 0,
        },
        {
          tipoIva: "superreducidoA",
          cuantia: 0.25,
        },
      ],
    };
  });
  test("Should return the correct information for a given set of products", () => {
    expect(calculaTicket(productos)).toEqual(resultExample);
  });

  test("Should return an empty array if nothing is given", () => {
    resultExample = {
      desgloseIva: [],
      lineas: [],
      total: {
        totalConIva: 0,
        totalIva: 0,
        totalSinIva: 0,
      },
    };
    expect(calculaTicket([])).toEqual(resultExample);
  });

  test('Should have one element only in "desgloseIva" if all products have the same "tipoIva"', () => {
    const changedProducts: LineaTicket[] = productos.map((product) => {
      const newProduct = { ...product.producto, tipoIva: "general" };
      return { ...product, producto: newProduct } as LineaTicket;
    });
    const result = calculaTicket(changedProducts);
    expect(result.desgloseIva).toEqual([
      { tipoIva: "general", cuantia: 15.75 },
    ]);
  });
});

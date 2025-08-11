import { productos } from "./model";

// Definimos los tipos que nos dio el README para que TypeScript nos ayude
type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precionSinIva: number; // Ojo, en el README hay una errata aquí, debería ser precioSinIva
  tipoIva: TipoIva;
  precioConIva: number;
}

interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}
const porcentajesIva = {
  general: 0.21,
  reducido: 0.1,
  superreducidoA: 0.05,
  superreducidoB: 0.04,
  superreducidoC: 0.0, // 0%
  sinIva: 0.0, // 0%
};

// ------ IMPLEMENTACIÓN ------

function obtenerPorcentajeIva(tipoIva: TipoIva): number {
  return porcentajesIva[tipoIva];
}

function redondear(numero: number): number {
  // .toFixed(2) devuelve un string, por eso lo convertimos de nuevo a número
  return Number(numero.toFixed(2));
}

const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  // 1. Definimos el estado inicial de nuestro "acumulador" (la caja vacía)
  const ticketInicial: TicketFinal = {
    lineas: [],
    total: {
      totalSinIva: 0,
      totalConIva: 0,
      totalIva: 0,
    },
    desgloseIva: [],
  };

  // 2. Usamos reduce para procesar cada línea y construir el ticket final
  return lineasTicket.reduce((ticketAcumulado, lineaActual) => {
    // --- CÁLCULOS POR LÍNEA ---
    const precioSinIvaLinea =
      lineaActual.producto.precio * lineaActual.cantidad;
    const porcentajeIva = obtenerPorcentajeIva(lineaActual.producto.tipoIva);
    const ivaDeLaLinea = precioSinIvaLinea * porcentajeIva;
    const precioConIvaLinea = precioSinIvaLinea + ivaDeLaLinea;

    // --- ACTUALIZAR LÍNEAS DEL TICKET ---
    ticketAcumulado.lineas.push({
      nombre: lineaActual.producto.nombre,
      cantidad: lineaActual.cantidad,
      precionSinIva: redondear(precioSinIvaLinea), // Corrigiendo la errata del README al usar el campo
      tipoIva: lineaActual.producto.tipoIva,
      precioConIva: redondear(precioConIvaLinea),
    });

    // --- ACTUALIZAR TOTALES GLOBALES ---
    ticketAcumulado.total.totalSinIva += precioSinIvaLinea;
    ticketAcumulado.total.totalIva += ivaDeLaLinea;
    ticketAcumulado.total.totalConIva += precioConIvaLinea;

    // --- ACTUALIZAR DESGLOSE DE IVA ---
    const tipoIvaActual = lineaActual.producto.tipoIva;
    const desgloseExistente = ticketAcumulado.desgloseIva.find(
      (d) => d.tipoIva === tipoIvaActual
    );

    if (desgloseExistente) {
      // Si ya tenemos este tipo de IVA en el desglose, sumamos la cuantia
      desgloseExistente.cuantia += ivaDeLaLinea;
    } else {
      // Si es la primera vez que vemos este tipo de IVA, lo añadimos
      ticketAcumulado.desgloseIva.push({
        tipoIva: tipoIvaActual,
        cuantia: ivaDeLaLinea,
      });
    }

    // Devolvemos la "caja" actualizada para la siguiente iteración
    return ticketAcumulado;
  }, ticketInicial); // ¡No olvidar pasar el estado inicial!
};

// Versión final de la función, con el redondeo de totales al final.
const calculaTicketFinal = (lineasTicket: LineaTicket[]): TicketFinal => {
  // Ejecutamos el reduce que ya definimos
  const ticketBruto = calculaTicket(lineasTicket);

  // Redondeamos todos los totales
  ticketBruto.total.totalSinIva = redondear(ticketBruto.total.totalSinIva);
  ticketBruto.total.totalIva = redondear(ticketBruto.total.totalIva);
  ticketBruto.total.totalConIva = redondear(ticketBruto.total.totalConIva);

  // Redondeamos el desglose
  ticketBruto.desgloseIva.forEach((desglose) => {
    desglose.cuantia = redondear(desglose.cuantia);
  });

  return ticketBruto;
};

const miTicketFinal = calculaTicketFinal(productos);
console.log(miTicketFinal);

import {
  percentageIva,
  type LineaTicket,
  type ResultadoLineaTicket,
  type ResultadoTotalTicket,
  type TicketFinal,
  type TipoIva,
  type TotalPorTipoIva,
} from "./model";

function round2Decimals(numero: number): number {
  return Number(numero.toFixed(2));
}

export const calculateTicketLine = (
  ticketLine: LineaTicket
): ResultadoLineaTicket => {
  const productQuantity = ticketLine.cantidad;
  const productPriceWithoutIva = ticketLine.producto.precio;
  const productIva = ticketLine.producto.tipoIva;
  return {
    nombre: ticketLine.producto.nombre,
    cantidad: productQuantity,
    precioSinIva: productPriceWithoutIva * productQuantity,
    tipoIva: productIva,
    precioConIva: round2Decimals(
      productPriceWithoutIva * (1 + percentageIva[productIva]) * productQuantity
    ),
  };
};

const calculateTotalTicket = (
  ticketResultArray: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  const totalWithoutIva = ticketResultArray.reduce((acc, ticketResult) => {
    return acc + ticketResult.precioSinIva;
  }, 0);
  const totalWithIva = ticketResultArray.reduce((acc, ticketResult) => {
    return acc + round2Decimals(ticketResult.precioConIva);
  }, 0);
  const totalIva = ticketResultArray.reduce((acc, ticketResult) => {
    return (
      acc +
      round2Decimals(ticketResult.precioConIva - ticketResult.precioSinIva)
    );
  }, 0);

  return {
    totalConIva: totalWithIva,
    totalSinIva: totalWithoutIva,
    totalIva,
  };
};

const calculateTotalTicketLines = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  return lineasTicket.reduce(
    (acc: ResultadoLineaTicket[], lineaTicker: LineaTicket) => {
      return [...acc, calculateTicketLine(lineaTicker)];
    },
    []
  );
};

const calculateByIvaType = (
  ticketResultArray: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const totalByType = ticketResultArray.reduce((acc, ticketLine) => {
    const { tipoIva, precioConIva, precioSinIva } = ticketLine;
    acc[tipoIva] =
      (acc[tipoIva] || 0) + round2Decimals(precioConIva - precioSinIva);
    return acc;
  }, {} as Record<TipoIva, number>);

  const finalResult: TotalPorTipoIva[] = Object.keys(totalByType).map(
    (ivaKey) => ({
      tipoIva: ivaKey as TipoIva,
      cuantia: round2Decimals(totalByType[ivaKey as TipoIva]),
    })
  );
  return finalResult;
};

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const totalTicketLines = calculateTotalTicketLines(lineasTicket);
  const totalTicketResult = calculateTotalTicket(totalTicketLines);
  const totalByIvaType = calculateByIvaType(totalTicketLines);
  return {
    lineas: totalTicketLines,
    total: totalTicketResult,
    desgloseIva: totalByIvaType,
  };
};

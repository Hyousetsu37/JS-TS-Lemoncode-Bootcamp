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

const calculateTotalPriceWithoutIvaProduct = (
  priceWithoutIva: number,
  percentageIva: number,
  productQuantity: number
): number => {
  return round2Decimals(
    priceWithoutIva * (1 + percentageIva) * productQuantity
  );
};

const calculateTotalPriceWithIvaProduct = (
  priceWithoutIva: number,
  productQuantity: number
): number => {
  return round2Decimals(priceWithoutIva * productQuantity);
};

export const calculateTicketLine = (
  ticketLine: LineaTicket
): ResultadoLineaTicket => {
  const productQuantity = ticketLine.cantidad;
  const productPriceWithoutIva = ticketLine.producto.precio;
  const productIva = ticketLine.producto.tipoIva;
  return {
    nombre: ticketLine.producto.nombre,
    cantidad: productQuantity,
    precioSinIva: calculateTotalPriceWithIvaProduct(
      productPriceWithoutIva,
      productQuantity
    ),
    tipoIva: productIva,
    precioConIva: calculateTotalPriceWithoutIvaProduct(
      productPriceWithoutIva,
      percentageIva[productIva],
      productQuantity
    ),
  };
};

const calculateTotalWithoutIva = (ticketArray: ResultadoLineaTicket[]) => {
  return ticketArray.reduce((acc, ticketResult) => {
    return acc + ticketResult.precioSinIva;
  }, 0);
};

const calculateTotalWithIva = (ticketArray: ResultadoLineaTicket[]) => {
  return ticketArray.reduce((acc, ticketResult) => {
    return acc + round2Decimals(ticketResult.precioConIva);
  }, 0);
};

const calculateTotalIva = (ticketArray: ResultadoLineaTicket[]) => {
  return ticketArray.reduce((acc, ticketResult) => {
    return (
      acc +
      round2Decimals(ticketResult.precioConIva - ticketResult.precioSinIva)
    );
  }, 0);
};

const calculateTotalTicket = (
  ticketResultArray: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  const totalWithoutIva = calculateTotalWithoutIva(ticketResultArray);
  const totalWithIva = calculateTotalWithIva(ticketResultArray);
  const totalIva = calculateTotalIva(ticketResultArray);

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

const calculateTotalByIvaType = (ticketArray: ResultadoLineaTicket[]) => {
  return ticketArray.reduce((acc, ticketLine) => {
    const { tipoIva, precioConIva, precioSinIva } = ticketLine;
    acc[tipoIva] =
      (acc[tipoIva] || 0) + round2Decimals(precioConIva - precioSinIva);
    return acc;
  }, {} as Record<TipoIva, number>);
};

const calculateByIvaType = (
  ticketResultArray: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const totalByType = calculateTotalByIvaType(ticketResultArray);

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

const obtenerResto = (numero: string): number => {
  const parsedNumber = parseInt(numero, 10);
  const __DIVISOR_CONSTANTE = 23;
  return parsedNumber % __DIVISOR_CONSTANTE;
};

const obtenerLetra = (numeroResto: number): string => {
  const __LETRAS = "TRWAGMYFPDXBNJZSQVHLCKE";
  return __LETRAS[numeroResto];
};

/**
 *
 * @param numero Es un numero como string sin separadores de ningun tipo
 * @param letra Es una letra en Mayuscula
 * @returns boolean
 */
export const validarNIF = (numero: string, letra: string): boolean => {
  const resto = obtenerResto(numero);
  const letraObtenida = obtenerLetra(resto);
  return letraObtenida === letra;
};

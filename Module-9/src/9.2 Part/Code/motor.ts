import type { ValidacionClave } from "./model";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  let encontroMinuscula = false;
  let encontroMayuscula = false;

  for (const caracter of clave) {
    // Un carácter es letra si al cambiarlo a mayúscula o minúscula, es diferente.
    // Esto evita que números o símbolos como '5' o '#' cuenten como letras.
    const esLetra = caracter.toLowerCase() !== caracter.toUpperCase();

    if (esLetra) {
      if (caracter === caracter.toLowerCase()) {
        encontroMinuscula = true;
      }
      if (caracter === caracter.toUpperCase()) {
        encontroMayuscula = true;
      }
    }

    // Si ya encontramos ambas, podemos salir del bucle.
    if (encontroMinuscula && encontroMayuscula) {
      break;
    }
  }

  if (encontroMinuscula && encontroMayuscula) {
    return { esValida: true };
  }

  return {
    esValida: false,
    error: "La clave debe de tener mayúsculas y minúsculas",
  };
};

export const tieneNumeros = (clave: string): ValidacionClave => {
  let encontroNumero = false;
  for (const caracter of clave) {
    if (caracter.toLowerCase() === caracter.toUpperCase()) {
      encontroNumero = true;
      break;
    }
  }
  return encontroNumero
    ? { esValida: true }
    : { esValida: false, error: "La clave debe contener numeros" };
};

export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const caracteresAlfanumericos = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (const caracter of clave) {
    // Convertimos el carácter a minúscula para no tener que incluir las mayúsculas
    // en nuestra lista de "caracteresAlfanumericos".
    const esAlfanumerico = caracteresAlfanumericos.includes(
      caracter.toLowerCase()
    );

    if (!esAlfanumerico) {
      // Si el carácter NO es alfanumérico, entonces es especial.
      return { esValida: true };
    }
  }

  // Si terminamos el bucle, significa que todos los caracteres eran letras o números.
  return {
    esValida: false,
    error: "La clave debe de tener caracteres especiales",
  };
};

export const tieneLongitudMinima = (clave: string): ValidacionClave => {
  return clave.length >= 8
    ? { esValida: true }
    : { esValida: false, error: "La clave debe tener al menos 8 caracteres" };
};

export const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): ValidacionClave => {
  const nombreUser = nombreUsuario.toLowerCase();
  const tempClave = clave.toLowerCase();
  const tieneNombre = tempClave.includes(nombreUser);
  console.log(tempClave, nombreUser);
  console.log(tempClave.includes(nombreUser));
  return tieneNombre
    ? {
        esValida: false,
        error: "La clave no puede contener el nombre de usuario",
      }
    : { esValida: true };
};

export const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  if (commonPasswords.includes(clave)) {
    return {
      esValida: false,
      error: "La clave no debe de contener palabras comunes",
    };
  }

  return { esValida: true };
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  // Verificación 1: Longitud mínima
  let validacion = tieneLongitudMinima(clave);
  if (!validacion.esValida) {
    return validacion; // Si falla, devolvemos el error inmediatamente
  }

  // Verificación 2: Mayúsculas y minúsculas
  validacion = tieneMayusculasYMinusculas(clave);
  if (!validacion.esValida) {
    return validacion;
  }

  // Verificación 3: Números
  validacion = tieneNumeros(clave);
  if (!validacion.esValida) {
    return validacion;
  }

  // Verificación 4: Caracteres especiales
  validacion = tieneCaracteresEspeciales(clave);
  if (!validacion.esValida) {
    return validacion;
  }

  // Verificación 5: Nombre de usuario
  validacion = tieneNombreUsuario(nombreUsuario, clave);
  if (!validacion.esValida) {
    return validacion;
  }

  // Verificación 6: Palabras comunes
  validacion = tienePalabrasComunes(clave, commonPasswords);
  if (!validacion.esValida) {
    return validacion;
  }

  // Si pasó todas las validaciones, la clave es válida.
  return { esValida: true };
};

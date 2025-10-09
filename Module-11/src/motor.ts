import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import type { ibanInformation } from "./model";

export const isCorrectlyFormed = (
  iban: string,
  ibanFormat: RegExp
): boolean => {
  return ibanFormat.test(iban);
};

export const getIbanInfo = (iban: string, ibanFormat: RegExp) => {
  const foundValues = ibanFormat.exec(iban);
  if (foundValues && foundValues.groups) {
    const { bankCode, officeCode, controlDigit, accountNumber } =
      foundValues.groups as ibanInformation;
    return { bankCode, officeCode, controlDigit, accountNumber };
  }
  return undefined;
};

export const isValidIban = (iban: string): boolean => {
  const elecIban = electronicFormatIBAN(iban);
  if (elecIban) {
    return isValidIBAN(elecIban);
  }
  return false;
};

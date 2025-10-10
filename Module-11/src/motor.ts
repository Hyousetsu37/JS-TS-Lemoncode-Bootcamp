import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import {
  bankList,
  type ibanInformation,
  type ibanResultInformation,
} from "./model";

export const isCorrectlyFormed = (
  iban: string,
  ibanFormat: RegExp
): boolean => {
  return ibanFormat.test(iban);
};

export const getIbanInfo = (
  iban: string,
  ibanFormat: RegExp
): ibanResultInformation | undefined => {
  const foundValues = ibanFormat.exec(iban);
  if (foundValues && foundValues.groups) {
    const { bankCode, officeCode, controlDigit, accountNumber } =
      foundValues.groups as ibanInformation;

    console.log(bankCode);
    let bank =
      bankCode in bankList
        ? bankList[bankCode as keyof typeof bankList]
        : "No bank found";
    return { bank, officeCode, controlDigit, accountNumber };
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

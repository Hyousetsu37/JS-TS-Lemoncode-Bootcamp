import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import {
  bankList,
  type IbanInformation,
  type IbanResultInformation,
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
): IbanResultInformation | undefined => {
  const foundValues = ibanFormat.exec(iban);
  if (!foundValues?.groups) return undefined;

  const { bankCode, officeCode, controlDigit, accountNumber } =
    foundValues.groups as IbanInformation;

  const bankName = bankList[bankCode] ?? "No bank found";

  return { bankName, officeCode, controlDigit, accountNumber };
};

export const isValidIban = (iban: string): boolean => {
  const elecIban = electronicFormatIBAN(iban);
  return elecIban ? isValidIBAN(elecIban) : false;
};

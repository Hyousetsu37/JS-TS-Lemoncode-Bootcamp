import { ibanRegEx } from "./model";
import { getIbanInfo, isCorrectlyFormed, isValidIban } from "./motor";

const ibanLists = [
  "ES21 1465 0100 72 2030876293",
  "ES2114650100722030876293",
  "ES21-1465-0100-72-2030876293",
  "ES6621000418401234567891",
  "ES66 2100 0418 40 1234567891",
  "ES66-2100-0418-40-1234567891",
];

ibanLists.forEach((iban: string) => {
  console.log(
    `${iban} ->`,
    isCorrectlyFormed(iban, ibanRegEx),
    isValidIban(iban),
    getIbanInfo(iban, ibanRegEx)
  );
});

const getValidatedElement = <T extends HTMLElement>(
  id: string,
  typeConstructor: new () => T
): T => {
  const element = document.getElementById(id);
  if (!element || !(element instanceof typeConstructor)) {
    throw new Error(`Couldn´t find the element with id ${id}`);
  }
  return element as T;
};

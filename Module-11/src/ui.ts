import type { ibanResultInformation } from "./model";

const createLine = (parent: HTMLElement, text: string) => {
  const line = document.createElement("p");
  line.innerText = text;
  parent.appendChild(line);
};

export const displayIbanInfo = (
  parent: HTMLElement,
  ibanInfo: ibanResultInformation | undefined,
  isCorrectlyFormed: boolean,
  isValid: boolean
) => {
  parent.innerHTML = "";
  if (ibanInfo) {
    createLine(parent, `IBAN is correctly formed: ${isCorrectlyFormed}`);
    createLine(parent, `IBAN is valid: ${isValid}`);
    createLine(parent, `Bank: ${ibanInfo.bank}`);
    createLine(parent, `Office code: ${ibanInfo.officeCode}`);
    createLine(parent, `Control digit: ${ibanInfo.controlDigit}`);
    createLine(parent, `Account Number: ${ibanInfo.accountNumber}`);
  } else {
    createLine(parent, "There is no information to display");
  }
};

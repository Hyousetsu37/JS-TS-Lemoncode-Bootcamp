import type { IbanResultInformation } from "./model";

const appendTextLine = (parent: HTMLElement, text: string) => {
  const line = document.createElement("p");
  line.innerText = text;
  parent.appendChild(line);
};

export const displayIbanInfo = (
  parent: HTMLElement,
  ibanInfo: IbanResultInformation | undefined,
  isCorrectlyFormed: boolean,
  isValid: boolean
) => {
  parent.innerHTML = "";
  appendTextLine(parent, `IBAN is correctly formed: ${isCorrectlyFormed}`);
  appendTextLine(parent, `IBAN is valid: ${isValid}`);
  if (ibanInfo) {
    appendTextLine(parent, `Bank: ${ibanInfo.bankName}`);
    appendTextLine(parent, `Office code: ${ibanInfo.officeCode}`);
    appendTextLine(parent, `Control digit: ${ibanInfo.controlDigit}`);
    appendTextLine(parent, `Account Number: ${ibanInfo.accountNumber}`);
  } else {
    appendTextLine(parent, "There is no information to display");
  }
};
